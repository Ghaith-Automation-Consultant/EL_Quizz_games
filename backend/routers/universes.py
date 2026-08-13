from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db
import models
import schemas

router = APIRouter(
    prefix="/api/universes",
    tags=["Universes Management"]
)

@router.get("", response_model=List[schemas.UniverseResponse])
def list_universes(db: Session = Depends(get_db)):
    return db.query(models.Universe).order_by(models.Universe.name.asc()).all()

@router.post("", response_model=schemas.UniverseResponse, status_code=status.HTTP_201_CREATED)
def create_universe(univ: schemas.UniverseCreate, db: Session = Depends(get_db)):
    # Check if name already exists
    existing = db.query(models.Universe).filter(models.Universe.name == univ.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Universe with name '{univ.name}' already exists."
        )
    
    db_univ = models.Universe(
        name=univ.name,
        description=univ.description
    )
    db.add(db_univ)
    db.commit()
    db.refresh(db_univ)
    return db_univ

@router.get("/{universe_id}/questions", response_model=List[schemas.QuestionResponse])
def get_universe_questions(universe_id: int, db: Session = Depends(get_db)):
    univ = db.query(models.Universe).filter(models.Universe.id == universe_id).first()
    if not univ:
        raise HTTPException(status_code=404, detail="Universe not found")

    # Join questions via UniverseQuestion link table
    links = db.query(models.UniverseQuestion).filter(models.UniverseQuestion.universe_id == universe_id).all()
    q_ids = [link.question_id for link in links]
    
    if not q_ids:
        return []
        
    questions = db.query(models.Question).filter(models.Question.id.in_(q_ids)).all()
    
    # Preload mappings for response schema matching standard questions list
    response_list = []
    for q in questions:
        # Load linked universe_ids
        q_links = db.query(models.UniverseQuestion).filter(models.UniverseQuestion.question_id == q.id).all()
        u_ids = [lnk.universe_id for lnk in q_links]
        
        # Build Response item
        response_list.append(schemas.QuestionResponse(
            id=q.id,
            text=q.text,
            category=q.category_rel.name if q.category_rel else "General",
            subcategory=q.subcategory_rel.name if q.subcategory_rel else "General",
            region=q.region,
            language=q.translations[0].language if q.translations else "ar",
            difficulty=q.difficulty,
            generation=q.generation,
            is_approved=q.is_approved,
            created_by=q.created_by,
            created_at=q.created_at,
            answers=[schemas.AnswerResponse(
                id=ans.id,
                is_correct=ans.is_correct,
                points=ans.points,
                translations=[schemas.AnswerTextResponse(
                    language=t.language,
                    text=t.text
                ) for t in ans.translations]
            ) for ans in q.answers],
            translations=[schemas.QuestionTextResponse(
                language=t.language,
                text=t.text
            ) for t in q.translations],
            universe_ids=u_ids
        ))
        
    return response_list

@router.post("/{universe_id}/questions/{question_id}", response_model=schemas.UniverseQuestionLink, status_code=status.HTTP_201_CREATED)
def link_question_to_universe(universe_id: int, question_id: int, db: Session = Depends(get_db)):
    univ = db.query(models.Universe).filter(models.Universe.id == universe_id).first()
    if not univ:
        raise HTTPException(status_code=404, detail="Universe not found")

    q = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")

    # Check existing link
    existing = db.query(models.UniverseQuestion).filter(
        models.UniverseQuestion.universe_id == universe_id,
        models.UniverseQuestion.question_id == question_id
    ).first()
    
    if existing:
        return schemas.UniverseQuestionLink(universe_id=universe_id, question_id=question_id)

    db_link = models.UniverseQuestion(
        universe_id=universe_id,
        question_id=question_id
    )
    db.add(db_link)
    db.commit()
    return schemas.UniverseQuestionLink(universe_id=universe_id, question_id=question_id)

@router.delete("/{universe_id}/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def unlink_question_from_universe(universe_id: int, question_id: int, db: Session = Depends(get_db)):
    link = db.query(models.UniverseQuestion).filter(
        models.UniverseQuestion.universe_id == universe_id,
        models.UniverseQuestion.question_id == question_id
    ).first()
    
    if not link:
        raise HTTPException(status_code=404, detail="Link relationship not found")
        
    db.delete(link)
    db.commit()
    return
