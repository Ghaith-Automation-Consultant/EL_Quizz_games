-- ==========================================
-- El Quizz Database Schema DDL (PostgreSQL)
-- ==========================================

-- 1. Personas Table
CREATE TABLE IF NOT EXISTS personas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    interests JSONB DEFAULT '[]'::jsonb,
    disinterests JSONB DEFAULT '[]'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_personas_name ON personas(name);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    preferred_language VARCHAR(10) NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interests JSONB DEFAULT '[]'::jsonb,
    disinterests JSONB DEFAULT '[]'::jsonb,
    persona_id INTEGER REFERENCES personas(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- 4. Subcategories Table
CREATE TABLE IF NOT EXISTS subcategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE INDEX IF NOT EXISTS idx_subcategories_name ON subcategories(name);

-- 5. Questions Table (Metadata)
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE SET NULL,
    region VARCHAR(50) NOT NULL,
    difficulty INTEGER NOT NULL,
    generation VARCHAR(30),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5b. Questions Translations Table
CREATE TABLE IF NOT EXISTS question_text (
    id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL, -- 'ar', 'tn', 'fr', 'en'
    text TEXT NOT NULL,
    PRIMARY KEY (id, language)
);

-- 6. Answers Table (Metadata)
CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    is_correct BOOLEAN DEFAULT FALSE,
    points INTEGER DEFAULT 1
);

-- 6b. Answers Translations Table
CREATE TABLE IF NOT EXISTS answers_text (
    id INTEGER NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL, -- 'ar', 'tn', 'fr', 'en'
    text TEXT NOT NULL,
    PRIMARY KEY (id, language)
);

-- 7. User Stats Table
CREATE TABLE IF NOT EXISTS user_stats (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    games_played INTEGER DEFAULT 0,
    games_won INTEGER DEFAULT 0,
    win_rate DOUBLE PRECISION DEFAULT 0.0,
    favorite_category VARCHAR(50),
    total_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0
);

-- Index to enforce uniqueness of subcategory names within the same category
CREATE UNIQUE INDEX IF NOT EXISTS idx_subcategories_cat_name ON subcategories(category_id, name);

-- ===================================================
-- Initial Categories & Subcategories Seed
-- ===================================================

-- Insert Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'History & Politics', 'Ancient, Medieval, Modern, Contemporary, Leaders & Governments'),
(2, 'Geography', 'Worldwide, Region, Country'),
(3, 'Economy & Business', 'Industries, Agriculture, Tourism, Finance, Companies'),
(4, 'Science & Technology', 'Mathematics, Natural Sciences, Medicine, Computing, Engineering'),
(5, 'Sports', 'Football, Team Sports, Individual Sports, Olympics, Records'),
(6, 'Arts', 'Literature, Music, Visual Arts, Theatre, Architecture'),
(7, 'Entertainment', 'Cinema, Television, Video Games, anime, Humor & Internet Culture'),
(8, 'Gastronomy', 'Dishes, Desserts, Ingredients, Drinks, Regional Cuisine'),
(9, 'Culture & Lifestyle', 'Traditions, Languages & Dialects, Daily Life, Fashion, Social Media & Trends'),
(10, 'Religion & Philosophy', 'Islam, Philosophy, christianity, judism, other religions')
ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;

-- Insert Subcategories
INSERT INTO subcategories (category_id, name) VALUES
-- History & Politics
(1, 'Ancient'), (1, 'Medieval'), (1, 'Modern'), (1, 'Contemporary'), (1, 'Leaders & Governments'),
-- Geography
(2, 'Worldwide'), (2, 'Region'), (2, 'Country'),
-- Economy & Business
(3, 'Industries'), (3, 'Agriculture'), (3, 'Tourism'), (3, 'Finance'), (3, 'Companies'),
-- Science & Technology
(4, 'Mathematics'), (4, 'Natural Sciences'), (4, 'Medicine'), (4, 'Computing'), (4, 'Engineering'),
-- Sports
(5, 'Football'), (5, 'Team Sports'), (5, 'Individual Sports'), (5, 'Olympics'), (5, 'Records'),
-- Arts
(6, 'Literature'), (6, 'Music'), (6, 'Visual Arts'), (6, 'Theatre'), (6, 'Architecture'),
-- Entertainment
(7, 'Cinema'), (7, 'Television'), (7, 'Video Games'), (7, 'anime'), (7, 'Humor & Internet Culture'),
-- Gastronomy
(8, 'Dishes'), (8, 'Desserts'), (8, 'Ingredients'), (8, 'Drinks'), (8, 'Regional Cuisine'),
-- Culture & Lifestyle
(9, 'Traditions'), (9, 'Languages & Dialects'), (9, 'Daily Life'), (9, 'Fashion'), (9, 'Social Media & Trends'),
-- Religion & Philosophy
(10, 'Islam'), (10, 'Philosophy'), (10, 'christianity'), (10, 'judism'), (10, 'other religions')
ON CONFLICT (category_id, name) DO NOTHING;

-- ===================================================
-- Analytical & Reporting SQL Queries
-- ===================================================

-- 1. Count of Questions per Main Category
-- Measures the content balance across the 10 official categories.
-- RUN QUERY:
-- SELECT c.name AS category_name, COUNT(q.id) AS question_count
-- FROM categories c
-- LEFT JOIN questions q ON q.category_id = c.id
-- GROUP BY c.id, c.name
-- ORDER BY question_count DESC;

-- 2. Subcategory Popularity Breakdown
-- Shows the depth of questions nested inside each main category's subtopics.
-- RUN QUERY:
-- SELECT c.name AS category_name, s.name AS subcategory_name, COUNT(q.id) AS question_count
-- FROM categories c
-- JOIN subcategories s ON s.category_id = c.id
-- LEFT JOIN questions q ON q.subcategory_id = s.id
-- GROUP BY c.name, s.name
-- ORDER BY c.name, question_count DESC;

-- 3. High Score User Leaderboard
-- Ranks players by level, total XP, and win rate.
-- RUN QUERY:
-- SELECT 
--     u.username,
--     u.level,
--     u.xp,
--     s.games_played,
--     s.games_won,
--     s.win_rate,
--     s.total_points,
--     DENSE_RANK() OVER (ORDER BY u.xp DESC, s.total_points DESC) AS server_rank
-- FROM users u
-- JOIN user_stats s ON s.user_id = u.id
-- ORDER BY server_rank ASC;

-- 4. Translation Coverage Audit
-- Calculates how many questions are fully translated across all four supported languages ('ar', 'tn', 'fr', 'en').
-- RUN QUERY:
-- SELECT 
--     language,
--     COUNT(id) AS translated_questions_count,
--     ROUND((COUNT(id) * 100.0) / (SELECT COUNT(*) FROM questions), 2) AS translation_coverage_percentage
-- FROM question_text
-- GROUP BY language;

-- 5. Fibonacci Point Balance Validation
-- Ensures that every question has the correct Fibonacci point configuration (9 correct options).
-- Returns questions that do NOT have exactly 9 correct options.
-- RUN QUERY:
-- SELECT 
--     q.id AS question_id,
--     qt.text AS question_sample_text,
--     COUNT(a.id) AS correct_answers_count
-- FROM questions q
-- JOIN question_text qt ON qt.id = q.id AND qt.language = 'ar'
-- LEFT JOIN answers a ON a.question_id = q.id AND a.is_correct = TRUE
-- GROUP BY q.id, qt.text
-- HAVING COUNT(a.id) != 9;

-- 6. Filter Questions by Category, Subcategory, or Difficulty
-- Replace parameters as needed (e.g. category = 'Gastronomy', difficulty = 3, language = 'en')
-- RUN QUERY:
-- SELECT 
--     q.id AS question_id,
--     c.name AS category,
--     s.name AS subcategory,
--     q.difficulty,
--     qt.language,
--     qt.text AS question_text
-- FROM questions q
-- JOIN categories c ON q.category_id = c.id
-- LEFT JOIN subcategories s ON q.subcategory_id = s.id
-- JOIN question_text qt ON qt.id = q.id
-- WHERE c.name = 'Gastronomy'
--   AND q.difficulty = 3
--   AND qt.language = 'en';

-- 7. Get Question Details and Answers by Question ID
-- Replace parameters as needed (e.g. q.id = 1, languages = 'en')
-- RUN QUERY:
-- SELECT 
--     q.id AS question_id,
--     c.name AS category,
--     s.name AS subcategory,
--     qt.text AS question_text,
--     a.id AS answer_id,
--     at.text AS answer_text,
--     a.is_correct,
--     a.points
-- FROM questions q
-- JOIN categories c ON q.category_id = c.id
-- LEFT JOIN subcategories s ON q.subcategory_id = s.id
-- JOIN question_text qt ON qt.id = q.id AND qt.language = 'en'
-- JOIN answers a ON a.question_id = q.id
-- JOIN answers_text at ON at.id = a.id AND at.language = 'en'
-- WHERE q.id = 1
-- ORDER BY a.is_correct DESC, a.points ASC;


