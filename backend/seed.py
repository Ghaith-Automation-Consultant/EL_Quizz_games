import os
import json
import database
import models

def seed_database():
    print("Terminating other database connections...")
    try:
        from sqlalchemy import text
        with database.engine.connect() as conn:
            # We use text() to execute raw SQL in SQLAlchemy 2.0
            conn.execute(text("""
                SELECT pg_terminate_backend(pg_stat_activity.pid)
                FROM pg_stat_activity
                WHERE pg_stat_activity.datname = 'el_quizz'
                  AND pid <> pg_backend_pid();
            """))
            conn.commit()
    except Exception as e:
        print(f"Could not terminate connections (non-fatal): {e}")

    # 1. Recreate all tables to ensure clean schema migrations
    print("Dropping existing tables...")
    models.Base.metadata.drop_all(bind=database.engine)
    print("Recreating tables...")
    models.Base.metadata.create_all(bind=database.engine)
    
    db = database.SessionLocal()
    try:
        print("Seeding database with 200 Tunisian and general trivia questions...")
        
        # Load compiled questions from JSON
        dir_path = os.path.dirname(os.path.abspath(__file__))
        json_path = os.path.join(dir_path, "seed_questions.json")
        with open(json_path, "r", encoding="utf-8") as f:
            questions_data = json.load(f)
            
        # Official 10 Categories and Subcategories from schema.sql
        official_categories = {
            "History & Politics": ["Ancient", "Medieval", "Modern", "Contemporary", "Leaders & Governments"],
            "Geography": ["Worldwide", "Region", "Country"],
            "Economy & Business": ["Industries", "Agriculture", "Tourism", "Finance", "Companies"],
            "Science & Technology": ["Mathematics", "Natural Sciences", "Medicine", "Computing", "Engineering"],
            "Sports": ["Football", "Team Sports", "Individual Sports", "Olympics", "Records"],
            "Arts": ["Literature", "Music", "Visual Arts", "Theatre", "Architecture"],
            "Entertainment": ["Cinema", "Television", "Video Games", "anime", "Humor & Internet Culture"],
            "Gastronomy": ["Dishes", "Desserts", "Ingredients", "Drinks", "Regional Cuisine"],
            "Culture & Lifestyle": ["Traditions", "Languages & Dialects", "Daily Life", "Fashion", "Social Media & Trends"],
            "Religion & Philosophy": ["Islam", "Philosophy", "christianity", "judism", "other religions"]
        }

        category_map = {}
        subcategory_map = {}
        
        for cat_name, subcats in official_categories.items():
            cat = models.Category(name=cat_name)
            db.add(cat)
            db.commit()
            db.refresh(cat)
            category_map[cat_name] = cat.id
            
            for sub_name in subcats:
                sub = models.Subcategory(category_id=cat.id, name=sub_name)
                db.add(sub)
                db.commit()
                db.refresh(sub)
                subcategory_map[(cat.id, sub_name)] = sub.id

        # Seed category mapping helper to resolve historical seed category names
        seed_to_official = {
            "Geography": ("Geography", "Country"),
            "History": ("History & Politics", "Modern"),
            "Food": ("Gastronomy", "Dishes"),
            "Slang": ("Culture & Lifestyle", "Languages & Dialects"),
            "Culture": ("Culture & Lifestyle", "Traditions"),
            "Art": ("Arts", "Visual Arts"),
            "Sports": ("Sports", "Team Sports"),
            "Science": ("Science & Technology", "Natural Sciences"),
            "Anime": ("Entertainment", "anime"),
            "Video Games": ("Entertainment", "Video Games"),
            "TV Series": ("Entertainment", "Television"),
            "Technology": ("Science & Technology", "Computing"),
            "Music (Rap)": ("Arts", "Music"),
            "Sports (Football)": ("Sports", "Football"),
            "Cars & Car Brands": ("Economy & Business", "Companies")
        }

        # Create target Personas matching the official categories
        personas_data = [
            {
                "name": "diaspora",
                "interests": ["Gastronomy", "Culture & Lifestyle", "Geography", "History & Politics"],
                "disinterests": ["Science & Technology"]
            },
            {
                "name": "student",
                "interests": ["History & Politics", "Geography", "Science & Technology"],
                "disinterests": ["Sports"]
            },
            {
                "name": "geek",
                "interests": ["Entertainment", "Science & Technology"],
                "disinterests": ["Sports"]
            },
            {
                "name": "football_fan",
                "interests": ["Sports", "Entertainment", "Culture & Lifestyle"],
                "disinterests": ["Arts"]
            }
        ]
        for p_data in personas_data:
            p = models.Persona(
                name=p_data["name"],
                interests=p_data["interests"],
                disinterests=p_data["disinterests"]
            )
            db.add(p)
        db.commit()

        for rq in questions_data:
            # Map raw categories to official database categories & subcategories
            mapped_cat_name, mapped_sub_name = seed_to_official.get(rq["category"], ("Geography", "Country"))
            cat_id = category_map[mapped_cat_name]
            subcat_id = subcategory_map[(cat_id, mapped_sub_name)]

            q = models.Question(
                category_id=cat_id,
                subcategory_id=subcat_id,
                region="Tunisia",
                difficulty=rq["difficulty"],
                generation="All",
                is_approved=rq.get("is_approved", True)
            )
            db.add(q)
            db.commit()
            db.refresh(q)
            
            # Seed translations for the Question
            qt_ar = models.QuestionText(id=q.id, language="ar", text=rq["translations"]["ar"])
            qt_tn = models.QuestionText(id=q.id, language="tn", text=rq["translations"]["tn"])
            qt_fr = models.QuestionText(id=q.id, language="fr", text=rq["translations"]["fr"])
            qt_en = models.QuestionText(id=q.id, language="en", text=rq["translations"]["en"])
            db.add(qt_ar)
            db.add(qt_tn)
            db.add(qt_fr)
            db.add(qt_en)
            
            for correct_ans in rq["correct"]:
                ans = models.Answer(
                    question_id=q.id,
                    is_correct=True,
                    points=correct_ans["points"]
                )
                db.add(ans)
                db.commit()
                db.refresh(ans)
                
                # Seed translations for the Answer
                at_ar = models.AnswerText(id=ans.id, language="ar", text=correct_ans["translations"]["ar"])
                at_tn = models.AnswerText(id=ans.id, language="tn", text=correct_ans["translations"]["tn"])
                at_fr = models.AnswerText(id=ans.id, language="fr", text=correct_ans["translations"]["fr"])
                at_en = models.AnswerText(id=ans.id, language="en", text=correct_ans["translations"]["en"])
                db.add(at_ar)
                db.add(at_tn)
                db.add(at_fr)
                db.add(at_en)
                
            wrong_data = rq["wrong"]
            wrong_ans = models.Answer(
                question_id=q.id,
                is_correct=False,
                points=0
            )
            db.add(wrong_ans)
            db.commit()
            db.refresh(wrong_ans)
            
            # Seed translations for wrong answer
            wat_ar = models.AnswerText(id=wrong_ans.id, language="ar", text=wrong_data["translations"]["ar"])
            wat_tn = models.AnswerText(id=wrong_ans.id, language="tn", text=wrong_data["translations"]["tn"])
            wat_fr = models.AnswerText(id=wrong_ans.id, language="fr", text=wrong_data["translations"]["fr"])
            wat_en = models.AnswerText(id=wrong_ans.id, language="en", text=wrong_data["translations"]["en"])
            db.add(wat_ar)
            db.add(wat_tn)
            db.add(wat_fr)
            db.add(wat_en)
            db.commit()

        print(f"Successfully seeded {len(questions_data)} questions with their associated answers!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
