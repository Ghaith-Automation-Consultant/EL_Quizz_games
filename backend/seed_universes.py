import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine
import models

def seed_universes():
    print("Starting universes seeding...")
    print("Opening DB Session...")
    db = SessionLocal()
    print("DB Session opened.")
    try:
        # Create tables if not exists
        print("Creating tables via metadata.create_all...")
        models.Base.metadata.create_all(bind=engine)
        print("Tables created successfully.")

        # 1. Create or retrieve Choufli Hal Universe
        print("Fetching Choufli Hal universe...")
        choufli_univ = db.query(models.Universe).filter(models.Universe.name == "Choufli Hal").first()
        if not choufli_univ:
            choufli_univ = models.Universe(
                name="Choufli Hal",
                description="عالم شوفلي حل - Tunisian Choufli Hal sitcom questions"
            )
            db.add(choufli_univ)
            db.flush()
            print("Created Choufli Hal universe.")
        
        # 2. Create or retrieve Spacetoon Universe
        spacetoon_univ = db.query(models.Universe).filter(models.Universe.name == "Spacetoon").first()
        if not spacetoon_univ:
            spacetoon_univ = models.Universe(
                name="Spacetoon",
                description="عالم سبيستون - Golden childhood cartoon/anime questions"
            )
            db.add(spacetoon_univ)
            db.flush()
            print("Created Spacetoon universe.")
        
        db.commit()

        # Keywords for matching
        choufli_keywords = [
            "شوفلي", "حل", "سبوعي", "سليمان", "زينب", "فوشيكا", "السبوعي", "اماني", "زكريا",
            "choufli", "hal", "seboui", "slimane", "slimene", "fouchika"
        ]
        
        spacetoon_keywords = [
            "سبيستون", "سبيس", "تون", "كرتون", "انمي", "ابطال الديجيتال", "المحقق كونان", "القناص",
            "spacetoon", "cartoon", "anime", "conan", "digimon", "naruto"
        ]

        questions = db.query(models.Question).all()
        choufli_links = 0
        spacetoon_links = 0

        for q in questions:
            # Check question texts
            search_texts = []
            for tr in q.translations:
                search_texts.append(tr.text.lower())
            
            # Check answer texts
            for ans in q.answers:
                for tr in ans.translations:
                    search_texts.append(tr.text.lower())

            # 1. Match Choufli Hal
            is_choufli = False
            for kw in choufli_keywords:
                # We want specifically "شوفلي حل" or references to characters/sitcom
                if any(kw in txt for txt in search_texts):
                    is_choufli = True
                    break
            
            # Additional check: "شوفلي" or "choufli" is high confidence. If it is just "حل", let's make sure it contains "شوفلي" too to avoid false positives with other questions having "حل".
            # If it only matched "حل", let's reject unless "شوفلي" or a main character is also present.
            if is_choufli:
                has_strong_choufli_indicator = any(x in " ".join(search_texts) for x in ["شوفلي", "choufli", "سبوعي", "seboui", "slimane", "fouchika", "فوشيكا"])
                if not has_strong_choufli_indicator:
                    is_choufli = False

            if is_choufli:
                # Check link
                link = db.query(models.UniverseQuestion).filter(
                    models.UniverseQuestion.universe_id == choufli_univ.id,
                    models.UniverseQuestion.question_id == q.id
                ).first()
                if not link:
                    link = models.UniverseQuestion(universe_id=choufli_univ.id, question_id=q.id)
                    db.add(link)
                    choufli_links += 1

            # 2. Match Spacetoon
            is_spacetoon = False
            for kw in spacetoon_keywords:
                if any(kw in txt for txt in search_texts):
                    is_spacetoon = True
                    break
            
            if is_spacetoon:
                link = db.query(models.UniverseQuestion).filter(
                    models.UniverseQuestion.universe_id == spacetoon_univ.id,
                    models.UniverseQuestion.question_id == q.id
                ).first()
                if not link:
                    link = models.UniverseQuestion(universe_id=spacetoon_univ.id, question_id=q.id)
                    db.add(link)
                    spacetoon_links += 1

        db.commit()
        print(f"Seeding completed successfully! Linked {choufli_links} questions to Choufli Hal and {spacetoon_links} questions to Spacetoon.")

    except Exception as e:
        db.rollback()
        print(f"Error during seeding: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_universes()
