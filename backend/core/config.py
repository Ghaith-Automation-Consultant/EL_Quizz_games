import os

# Helper to load a local .env file if it exists and python-dotenv is not installed
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
if os.path.exists(env_path):
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path)
    except ImportError:
        # Simple manual parser for .env to avoid external dependency issues
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip("'").strip('"')
                os.environ.setdefault(k, v)

# Database Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:Mogador%4075@localhost:5432/el_quizz"
)

# JWT Configurations
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "el-quizz-secret-key-for-jwt-tokens-should-be-kept-safe"
)
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

# External API Integrations
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
