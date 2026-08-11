import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database
import models

# Add current directory to path to prevent module resolution errors
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routers.auth import router as auth_router
from routers.profile import router as profile_router
from routers.questions import router as questions_router
from routers.multiplayer import router as multiplayer_router
from routers.bw_dictionary import router as bw_dictionary_router
from routers.analytics import router as analytics_router

# Create database tables at startup
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="El Quizz Backend API",
    description="Refactored & Modularized FastAPI Backend for El Quizz",
    version="1.1.0"
)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Modular Routers
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(questions_router)
app.include_router(multiplayer_router)
app.include_router(bw_dictionary_router)
app.include_router(analytics_router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to El Quizz API. Head to /docs for interactive documentation."
    }
