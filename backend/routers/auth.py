from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import database
import models
import schemas
import auth

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: schemas.UserRegister, db: Session = Depends(database.get_db)):
    # Check if username or email already exists
    existing_user = db.query(models.User).filter(
        (models.User.username == user_data.username) | (models.User.email == user_data.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
        
    hashed_pwd = auth.get_password_hash(user_data.password)
    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_pwd,
        country=user_data.country,
        preferred_language=user_data.preferred_language,
        interests=user_data.interests or [],
        disinterests=user_data.disinterests or [],
        persona_id=user_data.persona_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Initialize blank stats for the user
    user_stats = models.UserStats(user_id=new_user.id)
    db.add(user_stats)
    db.commit()
    
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == login_data.username).first()
    if not user or not auth.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
