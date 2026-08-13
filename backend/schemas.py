from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    country: str = Field(..., min_length=2, max_length=50)
    preferred_language: str = Field(..., min_length=2, max_length=10)
    interests: Optional[List[str]] = None
    disinterests: Optional[List[str]] = None
    persona_id: Optional[int] = None

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    country: str
    preferred_language: str
    xp: int
    level: int
    is_premium: bool
    created_at: datetime
    interests: List[str]
    disinterests: List[str]
    persona_id: Optional[int]

    class Config:
        from_attributes = True

class UserStatsResponse(BaseModel):
    games_played: int
    games_won: int
    win_rate: float
    favorite_category: Optional[str] = None
    total_points: int
    current_streak: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class AnswerCreate(BaseModel):
    text: str
    is_correct: bool = False
    points: int = 1 # Fibonacci points reference

class QuestionTextResponse(BaseModel):
    language: str
    text: str
    class Config:
        from_attributes = True

class AnswerTextResponse(BaseModel):
    language: str
    text: str
    class Config:
        from_attributes = True

class AnswerResponse(BaseModel):
    id: int
    question_id: int
    text: str
    is_correct: bool
    points: int
    translations: List[AnswerTextResponse]

    class Config:
        from_attributes = True

class QuestionCreate(BaseModel):
    text: str
    category: str
    subcategory: Optional[str] = None
    region: str
    language: str
    difficulty: int = Field(..., ge=1, le=5)
    generation: Optional[str] = None
    answers: List[AnswerCreate]

class QuestionResponse(BaseModel):
    id: int
    text: str
    category: str
    subcategory: Optional[str]
    region: str
    language: str
    difficulty: int
    generation: Optional[str]
    is_approved: bool
    created_by: Optional[int]
    created_at: Optional[datetime]
    answers: List[AnswerResponse]
    translations: List[QuestionTextResponse]
    universe_ids: List[int] = []

    class Config:
        from_attributes = True

class AnswerCreateMultilang(BaseModel):
    is_correct: bool = False
    points: int = 1
    translations: dict # dict mapping language key to text

class QuestionCreateMultilang(BaseModel):
    category: str
    subcategory: Optional[str] = None
    region: str
    difficulty: int = Field(..., ge=1, le=5)
    generation: Optional[str] = None
    translations: dict # dict mapping language key to question text
    answers: List[AnswerCreateMultilang]

class SubcategoryResponse(BaseModel):
    id: int
    category_id: int
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

class CategoryListResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    subcategories: List[SubcategoryResponse]

    class Config:
        from_attributes = True

class QuestionPlayStatsSubmit(BaseModel):
    correct_guesses: int = 0
    wrong_guesses: int = 0
    answered_ids: List[int] = []

class FeedbackSubmit(BaseModel):
    rating: str  # 'love', 'like', 'meh', 'dislike', 'shit'
    comment: Optional[str] = None

class ActivityEventCreate(BaseModel):
    session_id: Optional[str] = None
    user_id: Optional[int] = None
    event_type: str
    page_path: Optional[str] = None
    element_id: Optional[str] = None
    game_mode: Optional[str] = None
    ip_address: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None
    user_agent: Optional[str] = None

class GamePlayLogCreate(BaseModel):
    session_id: Optional[str] = None
    game_mode: str
    status: str
    score: int = 0
    duration_seconds: int = 0

class GamePlayLogUpdate(BaseModel):
    status: str
    score: int = 0
    duration_seconds: int = 0

class UniverseBase(BaseModel):
    name: str
    description: Optional[str] = None

class UniverseCreate(UniverseBase):
    pass

class UniverseResponse(UniverseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UniverseQuestionLink(BaseModel):
    universe_id: int
    question_id: int
