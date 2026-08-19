from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
import database
import models
import schemas
import auth

router = APIRouter(tags=["questions"])

@router.post("/api/questions/suggest", response_model=schemas.QuestionResponse, status_code=status.HTTP_201_CREATED)
def suggest_question(
    q_data: schemas.QuestionCreate, 
    current_user: models.User = Depends(auth.get_current_user), 
    db: Session = Depends(database.get_db)
):
    # Lookup or create Category
    category_obj = db.query(models.Category).filter(models.Category.name == q_data.category).first()
    if not category_obj:
        category_obj = models.Category(name=q_data.category)
        db.add(category_obj)
        db.commit()
        db.refresh(category_obj)

    # Lookup or create Subcategory
    subcategory_obj = None
    if q_data.subcategory:
        subcategory_obj = db.query(models.Subcategory).filter(
            models.Subcategory.category_id == category_obj.id,
            models.Subcategory.name == q_data.subcategory
        ).first()
        if not subcategory_obj:
            subcategory_obj = models.Subcategory(category_id=category_obj.id, name=q_data.subcategory)
            db.add(subcategory_obj)
            db.commit()
            db.refresh(subcategory_obj)

    new_q = models.Question(
        category_id=category_obj.id,
        subcategory_id=subcategory_obj.id if subcategory_obj else None,
        region=q_data.region,
        difficulty=q_data.difficulty,
        generation=q_data.generation,
        created_by=current_user.id,
        is_approved=False
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)

    # Save translation for the question
    q_trans = models.QuestionText(
        id=new_q.id,
        language=q_data.language,
        text=q_data.text
    )
    db.add(q_trans)

    for ans in q_data.answers:
        db_ans = models.Answer(
            question_id=new_q.id,
            is_correct=ans.is_correct,
            points=ans.points
        )
        db.add(db_ans)
        db.commit()
        db.refresh(db_ans)
        
        # Save translation for the answer
        ans_trans = models.AnswerText(
            id=db_ans.id,
            language=q_data.language,
            text=ans.text
        )
        db.add(ans_trans)
        
    db.commit()
    
    # Reload question with relationships
    db.refresh(new_q)
    reloaded_q = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(models.Question.id == new_q.id).first()
    return reloaded_q

@router.get("/api/questions/list", response_model=List[schemas.QuestionResponse])
def list_questions(db: Session = Depends(database.get_db)):
    return db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).all()

@router.get("/api/categories/list", response_model=List[schemas.CategoryListResponse])
def list_categories(db: Session = Depends(database.get_db)):
    return db.query(models.Category).options(
        joinedload(models.Category.subcategories)
    ).all()

@router.post("/api/questions/create", response_model=schemas.QuestionResponse, status_code=status.HTTP_201_CREATED)
def create_question(q_data: schemas.QuestionCreate, db: Session = Depends(database.get_db)):
    # Lookup or create Category
    category_obj = db.query(models.Category).filter(models.Category.name == q_data.category).first()
    if not category_obj:
        category_obj = models.Category(name=q_data.category)
        db.add(category_obj)
        db.commit()
        db.refresh(category_obj)

    # Lookup or create Subcategory
    subcategory_obj = None
    if q_data.subcategory:
        subcategory_obj = db.query(models.Subcategory).filter(
            models.Subcategory.category_id == category_obj.id,
            models.Subcategory.name == q_data.subcategory
        ).first()
        if not subcategory_obj:
            subcategory_obj = models.Subcategory(category_id=category_obj.id, name=q_data.subcategory)
            db.add(subcategory_obj)
            db.commit()
            db.refresh(subcategory_obj)

    new_q = models.Question(
        category_id=category_obj.id,
        subcategory_id=subcategory_obj.id if subcategory_obj else None,
        region=q_data.region,
        difficulty=q_data.difficulty,
        generation=q_data.generation,
        is_approved=True
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)

    # Save translation for the question
    q_trans = models.QuestionText(
        id=new_q.id,
        language=q_data.language,
        text=q_data.text
    )
    db.add(q_trans)

    for ans in q_data.answers:
        db_ans = models.Answer(
            question_id=new_q.id,
            is_correct=ans.is_correct,
            points=ans.points
        )
        db.add(db_ans)
        db.commit()
        db.refresh(db_ans)
        
        # Save translation for the answer
        ans_trans = models.AnswerText(
            id=db_ans.id,
            language=q_data.language,
            text=ans.text
        )
        db.add(ans_trans)
        
    db.commit()
    
    # Reload question with relationships
    db.refresh(new_q)
    reloaded_q = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(models.Question.id == new_q.id).first()
    return reloaded_q

@router.post("/api/questions/create_multilang", response_model=schemas.QuestionResponse, status_code=status.HTTP_201_CREATED)
def create_question_multilang(q_data: schemas.QuestionCreateMultilang, db: Session = Depends(database.get_db)):
    # Lookup or create Category
    category_obj = db.query(models.Category).filter(models.Category.name == q_data.category).first()
    if not category_obj:
        category_obj = models.Category(name=q_data.category)
        db.add(category_obj)
        db.commit()
        db.refresh(category_obj)

    # Lookup or create Subcategory
    subcategory_obj = None
    if q_data.subcategory:
        subcategory_obj = db.query(models.Subcategory).filter(
            models.Subcategory.category_id == category_obj.id,
            models.Subcategory.name == q_data.subcategory
        ).first()
        if not subcategory_obj:
            subcategory_obj = models.Subcategory(category_id=category_obj.id, name=q_data.subcategory)
            db.add(subcategory_obj)
            db.commit()
            db.refresh(subcategory_obj)

    new_q = models.Question(
        category_id=category_obj.id,
        subcategory_id=subcategory_obj.id if subcategory_obj else None,
        region=q_data.region,
        difficulty=q_data.difficulty,
        generation=q_data.generation,
        is_approved=True
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)

    # Save translations for the question
    for lang, text in q_data.translations.items():
        q_trans = models.QuestionText(
            id=new_q.id,
            language=lang,
            text=text
        )
        db.add(q_trans)

    # Save answers and their translations
    for ans in q_data.answers:
        db_ans = models.Answer(
            question_id=new_q.id,
            is_correct=ans.is_correct,
            points=ans.points
        )
        db.add(db_ans)
        db.commit()
        db.refresh(db_ans)
        
        for lang, text in ans.translations.items():
            ans_trans = models.AnswerText(
                id=db_ans.id,
                language=lang,
                text=text
            )
            db.add(ans_trans)
        
    db.commit()
    
    # Reload question with relationships
    db.refresh(new_q)
    reloaded_q = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(models.Question.id == new_q.id).first()
    return reloaded_q

@router.put("/api/questions/{question_id}", response_model=schemas.QuestionResponse)
def update_question_multilang(question_id: int, q_data: schemas.QuestionCreateMultilang, db: Session = Depends(database.get_db)):
    db_q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not db_q:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # 1. Lookup or create Category
    category_obj = db.query(models.Category).filter(models.Category.name == q_data.category).first()
    if not category_obj:
        category_obj = models.Category(name=q_data.category)
        db.add(category_obj)
        db.commit()
        db.refresh(category_obj)
    
    # 2. Lookup or create Subcategory
    subcategory_obj = None
    if q_data.subcategory:
        subcategory_obj = db.query(models.Subcategory).filter(
            models.Subcategory.category_id == category_obj.id,
            models.Subcategory.name == q_data.subcategory
        ).first()
        if not subcategory_obj:
            subcategory_obj = models.Subcategory(category_id=category_obj.id, name=q_data.subcategory)
            db.add(subcategory_obj)
            db.commit()
            db.refresh(subcategory_obj)
            
    # 3. Update question metadata
    db_q.category_id = category_obj.id
    db_q.subcategory_id = subcategory_obj.id if subcategory_obj else None
    db_q.region = q_data.region
    db_q.difficulty = q_data.difficulty
    db_q.generation = q_data.generation or db_q.generation
    db_q.is_flagged = q_data.is_flagged if q_data.is_flagged is not None else db_q.is_flagged
    db_q.is_approved = q_data.is_approved if q_data.is_approved is not None else db_q.is_approved
    
    # 4. Delete old question translations
    db.query(models.QuestionText).filter(models.QuestionText.id == question_id).delete()
    
    # 5. Insert new question translations
    for lang, text in q_data.translations.items():
        q_trans = models.QuestionText(
            id=question_id,
            language=lang,
            text=text
        )
        db.add(q_trans)
        
    # 6. Delete old answers and answer translations (CASCADE handles answers_text table deletion automatically)
    db.query(models.Answer).filter(models.Answer.question_id == question_id).delete()
    
    # 7. Insert new answers and answer translations
    for ans in q_data.answers:
        db_ans = models.Answer(
            question_id=question_id,
            is_correct=ans.is_correct,
            points=ans.points
        )
        db.add(db_ans)
        db.commit()
        db.refresh(db_ans)
        
        for lang, text in ans.translations.items():
            ans_trans = models.AnswerText(
                id=db_ans.id,
                language=lang,
                text=text
            )
            db.add(ans_trans)
            
    db.commit()
    db.refresh(db_q)
    
    # 8. Reload question with relationships
    reloaded_q = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(models.Question.id == question_id).first()
    return reloaded_q

@router.delete("/api/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question(question_id: int, db: Session = Depends(database.get_db)):
    db_q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not db_q:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(db_q)
    db.commit()
    return None

@router.post("/api/questions/{question_id}/play-stats")
def submit_question_play_stats(
    question_id: int,
    stats_data: schemas.QuestionPlayStatsSubmit,
    db: Session = Depends(database.get_db)
):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
        
    q_stats = db.query(models.QuestionStats).filter(models.QuestionStats.question_id == question_id).first()
    if not q_stats:
        q_stats = models.QuestionStats(
            question_id=question_id,
            times_played=0,
            correct_guesses=0,
            wrong_guesses=0,
            loves_count=0,
            likes_count=0,
            mehs_count=0,
            dislikes_count=0,
            shits_count=0
        )
        db.add(q_stats)
        
    q_stats.times_played += 1
    q_stats.correct_guesses += stats_data.correct_guesses
    q_stats.wrong_guesses += stats_data.wrong_guesses
    
    # Increment answer counts
    for ans_id in stats_data.answered_ids:
        ans = db.query(models.Answer).filter(models.Answer.id == ans_id, models.Answer.question_id == question_id).first()
        if ans:
            ans_stats = db.query(models.AnswerStats).filter(models.AnswerStats.answer_id == ans_id).first()
            if not ans_stats:
                ans_stats = models.AnswerStats(answer_id=ans_id, times_selected=0)
                db.add(ans_stats)
            ans_stats.times_selected += 1
            
    db.commit()
    return {"status": "success"}

@router.post("/api/questions/{question_id}/feedback")
def submit_question_feedback(
    question_id: int,
    fb_data: schemas.FeedbackSubmit,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(database.get_db)
):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
        
    user_id = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        try:
            payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
            username = payload.get("sub")
            user = db.query(models.User).filter(models.User.username == username).first()
            if user:
                user_id = user.id
        except Exception:
            pass
            
    fb = models.Feedback(
        question_id=question_id,
        user_id=user_id,
        rating=fb_data.rating.lower(),
        comment=fb_data.comment
    )
    db.add(fb)
    
    q_stats = db.query(models.QuestionStats).filter(models.QuestionStats.question_id == question_id).first()
    if not q_stats:
        q_stats = models.QuestionStats(
            question_id=question_id,
            times_played=0,
            correct_guesses=0,
            wrong_guesses=0,
            loves_count=0,
            likes_count=0,
            mehs_count=0,
            dislikes_count=0,
            shits_count=0
        )
        db.add(q_stats)
        
    rating_key = fb_data.rating.lower()
    if rating_key == "love":
        q_stats.loves_count += 1
    elif rating_key == "like":
        q_stats.likes_count += 1
    elif rating_key == "meh":
        q_stats.mehs_count += 1
    elif rating_key == "dislike":
        q_stats.dislikes_count += 1
    elif rating_key == "shit":
        q_stats.shits_count += 1
        
    db.commit()
    return {"status": "success"}

@router.post("/api/questions/{question_id}/flag", response_model=schemas.QuestionResponse)
def flag_question(question_id: int, is_flagged: bool, db: Session = Depends(database.get_db)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    q.is_flagged = is_flagged
    db.commit()
    db.refresh(q)
    return q

@router.post("/api/questions/{question_id}/approve", response_model=schemas.QuestionResponse)
def approve_question(question_id: int, is_approved: bool, db: Session = Depends(database.get_db)):
    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    q.is_approved = is_approved
    db.commit()
    
    # Reload question with relationships eagerly loaded to avoid LazyLoading errors when returning schemas
    reloaded_q = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(models.Question.id == question_id).first()
    
    return reloaded_q

