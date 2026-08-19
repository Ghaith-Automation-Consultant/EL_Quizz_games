from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, JSON, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True) # e.g. "diaspora", "student", "geek", "football_fan"
    interests = Column(JSON, default=list)      # list of category names
    disinterests = Column(JSON, default=list)   # list of category names

    users = relationship("User", back_populates="persona")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(100), nullable=False)
    country = Column(String(50), nullable=False)
    preferred_language = Column(String(10), nullable=False)
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relational interests and chosen persona
    interests = Column(JSON, default=list)      # Custom interests list
    disinterests = Column(JSON, default=list)   # Custom disinterests list
    persona_id = Column(Integer, ForeignKey("personas.id", ondelete="SET NULL"), nullable=True)

    # Relationships
    persona = relationship("Persona", back_populates="users")
    stats = relationship("UserStats", back_populates="user", uselist=False, cascade="all, delete-orphan")
    suggested_questions = relationship("Question", back_populates="creator")
    feedbacks = relationship("Feedback", back_populates="user")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(String, nullable=True)

    subcategories = relationship("Subcategory", back_populates="category", cascade="all, delete-orphan")
    questions = relationship("Question", back_populates="category_rel")

class Subcategory(Base):
    __tablename__ = "subcategories"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False, index=True)
    description = Column(String, nullable=True)

    category = relationship("Category", back_populates="subcategories")
    questions = relationship("Question", back_populates="subcategory_rel")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False)
    subcategory_id = Column(Integer, ForeignKey("subcategories.id", ondelete="SET NULL"), nullable=True)
    region = Column(String(50), nullable=False)  # e.g., "Tunisia", "MENA", "Global"
    difficulty = Column(Integer, nullable=False)  # 1 to 5
    generation = Column(String(30), nullable=True)  # e.g., "Gen Z", "Golden", "All"
    created_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    is_approved = Column(Boolean, default=False)
    is_flagged = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="suggested_questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")
    category_rel = relationship("Category", back_populates="questions")
    subcategory_rel = relationship("Subcategory", back_populates="questions")
    translations = relationship("QuestionText", back_populates="question", cascade="all, delete-orphan")
    stats = relationship("QuestionStats", back_populates="question", uselist=False, cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="question", cascade="all, delete-orphan")
    universe_links = relationship("UniverseQuestion", back_populates="question", cascade="all, delete-orphan")

    @property
    def text(self) -> str:
        for tr in self.translations:
            if tr.language == "ar":
                return tr.text
        return self.translations[0].text if self.translations else ""

    @property
    def language(self) -> str:
        return self.translations[0].language if self.translations else "ar"

    @property
    def universe_ids(self) -> list:
        return [link.universe_id for link in self.universe_links]

    @property
    def category(self) -> str:
        return self.category_rel.name if self.category_rel else ""

    @property
    def subcategory(self) -> str:
        return self.subcategory_rel.name if self.subcategory_rel else ""

class QuestionText(Base):
    __tablename__ = "question_text"

    id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), primary_key=True)
    language = Column(String(10), primary_key=True) # 'ar', 'tn', 'fr', 'en'
    text = Column(String, nullable=False)

    question = relationship("Question", back_populates="translations")

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), nullable=False)
    is_correct = Column(Boolean, default=False)
    points = Column(Integer, default=1) # Stores Fibonacci difficulty reference (1, 2, 3, 5, 8)

    question = relationship("Question", back_populates="answers")
    translations = relationship("AnswerText", back_populates="answer", cascade="all, delete-orphan")
    stats = relationship("AnswerStats", back_populates="answer", uselist=False, cascade="all, delete-orphan")

    @property
    def text(self) -> str:
        for tr in self.translations:
            if tr.language == "ar":
                return tr.text
        return self.translations[0].text if self.translations else ""

class AnswerText(Base):
    __tablename__ = "answers_text"

    id = Column(Integer, ForeignKey("answers.id", ondelete="CASCADE"), primary_key=True)
    language = Column(String(10), primary_key=True) # 'ar', 'tn', 'fr', 'en'
    text = Column(String, nullable=False)

    answer = relationship("Answer", back_populates="translations")

class UserStats(Base):
    __tablename__ = "user_stats"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    games_played = Column(Integer, default=0)
    games_won = Column(Integer, default=0)
    win_rate = Column(Float, default=0.0)
    favorite_category = Column(String(50), nullable=True)
    total_points = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)

    user = relationship("User", back_populates="stats")

class QuestionStats(Base):
    __tablename__ = "question_stats"

    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), primary_key=True)
    times_played = Column(Integer, default=0)
    correct_guesses = Column(Integer, default=0)
    wrong_guesses = Column(Integer, default=0)
    loves_count = Column(Integer, default=0)
    likes_count = Column(Integer, default=0)
    mehs_count = Column(Integer, default=0)
    dislikes_count = Column(Integer, default=0)
    shits_count = Column(Integer, default=0)

    question = relationship("Question", back_populates="stats")

class AnswerStats(Base):
    __tablename__ = "answer_stats"

    answer_id = Column(Integer, ForeignKey("answers.id", ondelete="CASCADE"), primary_key=True)
    times_selected = Column(Integer, default=0)

    answer = relationship("Answer", back_populates="stats")

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    rating = Column(String(10), nullable=False) # 'love', 'like', 'meh', 'dislike', 'shit'
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    question = relationship("Question", back_populates="feedbacks")
    user = relationship("User", back_populates="feedbacks")

class BwEntity(Base):
    __tablename__ = "bw_entities"

    id = Column(String(100), primary_key=True, index=True) # e.g. "country_ma"
    type = Column(String(50), nullable=False, index=True)   # the category type, e.g. "country"

    localized_answers = relationship("BwLocalizedAnswer", back_populates="entity", cascade="all, delete-orphan")

class BwLocalizedAnswer(Base):
    __tablename__ = "bw_localized_answers"

    id = Column(Integer, primary_key=True, index=True)
    entity_id = Column(String(100), ForeignKey("bw_entities.id", ondelete="CASCADE"), nullable=False)
    language = Column(String(10), nullable=False, index=True)
    category = Column(String(50), nullable=False, index=True)
    answer = Column(String(100), nullable=False)
    letter = Column(String(5), nullable=False, index=True)
    normalized = Column(String(100), nullable=False, index=True)
    aliases = Column(JSON, default=list, nullable=False)
    status = Column(String(20), default="approved", nullable=False) # e.g. "approved", "pending"

    __table_args__ = (
        UniqueConstraint('language', 'category', 'normalized', name='uq_bw_loc_ans'),
    )

    entity = relationship("BwEntity", back_populates="localized_answers")

class UserActivity(Base):
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    event_type = Column(String(50), nullable=False, index=True)   # 'page_view', 'click', 'game_start', 'game_end'
    page_path = Column(String(255), nullable=True)
    element_id = Column(String(100), nullable=True)
    game_mode = Column(String(50), nullable=True)
    ip_address = Column(String(45), nullable=True)
    country = Column(String(100), nullable=True)
    region = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

class GamePlayLog(Base):
    __tablename__ = "game_play_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    game_mode = Column(String(50), nullable=False, index=True)  # 'talla3_9' or 'bent_waled'
    status = Column(String(20), nullable=False)                 # 'started', 'completed', 'abandoned'
    score = Column(Integer, default=0)
    duration_seconds = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

class Universe(Base):
    __tablename__ = "universes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True, index=True)
    description = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("UniverseQuestion", back_populates="universe", cascade="all, delete-orphan")

class UniverseQuestion(Base):
    __tablename__ = "universe_questions"

    id = Column(Integer, primary_key=True, index=True)
    universe_id = Column(Integer, ForeignKey("universes.id", ondelete="CASCADE"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="CASCADE"), nullable=False)

    universe = relationship("Universe", back_populates="questions")
    question = relationship("Question", back_populates="universe_links")

    __table_args__ = (
        UniqueConstraint('universe_id', 'question_id', name='uq_universe_question'),
    )


