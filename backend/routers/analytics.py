from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/api/analytics",
    tags=["analytics"]
)

@router.post("/track", status_code=status.HTTP_201_CREATED)
def track_activity(event: schemas.ActivityEventCreate, db: Session = Depends(get_db)):
    db_event = models.UserActivity(
        session_id=event.session_id,
        user_id=event.user_id,
        event_type=event.event_type,
        page_path=event.page_path,
        element_id=event.element_id,
        game_mode=event.game_mode,
        ip_address=event.ip_address,
        country=event.country,
        region=event.region,
        city=event.city,
        user_agent=event.user_agent
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return {"status": "success", "event_id": db_event.id}

@router.post("/game-log", status_code=status.HTTP_201_CREATED)
def start_game_log(log: schemas.GamePlayLogCreate, db: Session = Depends(get_db)):
    db_log = models.GamePlayLog(
        session_id=log.session_id,
        game_mode=log.game_mode,
        status=log.status,
        score=log.score,
        duration_seconds=log.duration_seconds
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return {"status": "success", "log_id": db_log.id}

@router.put("/game-log/{log_id}")
def update_game_log(log_id: int, update: schemas.GamePlayLogUpdate, db: Session = Depends(get_db)):
    db_log = db.query(models.GamePlayLog).filter(models.GamePlayLog.id == log_id).first()
    if not db_log:
        raise HTTPException(status_code=404, detail="Game play log not found")
    
    db_log.status = update.status
    db_log.score = update.score
    db_log.duration_seconds = update.duration_seconds
    db.commit()
    db.refresh(db_log)
    return {"status": "success", "log_id": db_log.id}

@router.get("/stats")
def get_analytics_stats(db: Session = Depends(get_db)):
    # Total visits & Unique sessions
    total_actions = db.query(func.count(models.UserActivity.id)).scalar() or 0
    unique_sessions = db.query(func.count(models.distinct(models.UserActivity.session_id))).scalar() or 0
    
    # Mode comparison (Talla3 9 vs Bent Waled)
    mode_counts_raw = db.query(
        models.GamePlayLog.game_mode,
        func.count(models.GamePlayLog.id)
    ).group_by(models.GamePlayLog.game_mode).all()
    
    mode_counts = {"talla3_9": 0, "bent_waled": 0}
    for mode, count in mode_counts_raw:
        if mode in ["talla3", "talla3_9"]:
            mode_counts["talla3_9"] += count
        elif mode in ["bw", "bent_waled"]:
            mode_counts["bent_waled"] += count

    # Region breakdown (page hits count per country)
    region_raw = db.query(
        models.UserActivity.country,
        func.count(models.UserActivity.id)
    ).filter(models.UserActivity.country.isnot(None)).group_by(models.UserActivity.country).order_by(func.count(models.UserActivity.id).desc()).limit(10).all()
    
    region_stats = [{"country": country or "Unknown", "count": count} for country, count in region_raw]

    # Duration Histogram (grouping game play logs into buckets)
    # Buckets: 0-10s, 11-30s, 31-60s, 61-120s, 120s+
    duration_logs = db.query(models.GamePlayLog.duration_seconds).filter(models.GamePlayLog.duration_seconds > 0).all()
    duration_buckets = {
        "0-10s": 0,
        "11-30s": 0,
        "31-60s": 0,
        "61-120s": 0,
        "120s+": 0
    }
    for log in duration_logs:
        seconds = log[0]
        if seconds <= 10:
            duration_buckets["0-10s"] += 1
        elif seconds <= 30:
            duration_buckets["11-30s"] += 1
        elif seconds <= 60:
            duration_buckets["31-60s"] += 1
        elif seconds <= 120:
            duration_buckets["61-120s"] += 1
        else:
            duration_buckets["120s+"] += 1

    # Score Histogram (grouping game play logs into buckets)
    # Buckets: 0-10, 11-30, 31-50, 51-100, 100+
    score_logs = db.query(models.GamePlayLog.score).filter(models.GamePlayLog.status == "completed").all()
    score_buckets = {
        "0-10": 0,
        "11-30": 0,
        "31-50": 0,
        "51-100": 0,
        "100+": 0
    }
    for log in score_logs:
        score = log[0]
        if score <= 10:
            score_buckets["0-10"] += 1
        elif score <= 30:
            score_buckets["11-30"] += 1
        elif score <= 50:
            score_buckets["31-50"] += 1
        elif score <= 100:
            score_buckets["51-100"] += 1
        else:
            score_buckets["100+"] += 1

    # Daily active plays over last 7 days
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    daily_raw = db.query(
        func.date(models.GamePlayLog.created_at),
        func.count(models.GamePlayLog.id)
    ).filter(models.GamePlayLog.created_at >= seven_days_ago).group_by(func.date(models.GamePlayLog.created_at)).all()
    
    daily_stats = {str(date): count for date, count in daily_raw}

    return {
        "total_actions": total_actions,
        "unique_sessions": unique_sessions,
        "mode_counts": mode_counts,
        "region_stats": region_stats,
        "duration_histogram": duration_buckets,
        "score_histogram": score_buckets,
        "daily_stats": daily_stats
    }
