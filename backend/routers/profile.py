from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import database
import models
import schemas
import auth

router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.get("", response_model=schemas.UserResponse)
def get_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.get("/stats", response_model=schemas.UserStatsResponse)
def get_stats(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    stats = db.query(models.UserStats).filter(models.UserStats.user_id == current_user.id).first()
    if not stats:
        stats = models.UserStats(user_id=current_user.id)
        db.add(stats)
        db.commit()
        db.refresh(stats)
    return stats
