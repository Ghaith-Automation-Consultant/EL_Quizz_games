from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Dict, Optional
from pydantic import BaseModel
import re
import os
import json

import sys
sys.path.append("..")
from database import get_db
import models

router = APIRouter(
    prefix="/api/bw",
    tags=["Bent Waled Dictionary"]
)

# Pydantic Schemas
class BwLocalizedAnswerBase(BaseModel):
    entity_id: Optional[str] = None
    language: str
    category: str
    answer: str
    letter: str
    aliases: List[str] = []
    status: str = "approved"

class BwLocalizedAnswerCreate(BwLocalizedAnswerBase):
    pass

class BwLocalizedAnswerResponse(BaseModel):
    id: int
    entity_id: str
    language: str
    category: str
    answer: str
    letter: str
    normalized: str
    aliases: List[str]
    status: str
    entity_type: Optional[str] = None

    class Config:
        from_attributes = True

class BwValidateRequest(BaseModel):
    letter: str
    language: str
    answers: Dict[str, str]

class BwAiCheckItem(BaseModel):
    category: str
    answer: str

class BwAiCheckRequest(BaseModel):
    letter: str
    language: str
    items: List[BwAiCheckItem]

# Normalization Helpers
def normalize_string(text: str, is_arabic: bool = False) -> str:
    if not text:
        return ""
    t = text.strip().lower()
    if is_arabic:
        # replace common alefs
        t = re.sub(r'[أإآٱ]', 'ا', t)
        # replace teh marbuta
        t = re.sub(r'ة', 'ت', t)
        # replace yeh / alef maksura
        t = re.sub(r'[ىي]', 'ي', t)
    return t

def normalize_letter(letter: str, language: str) -> str:
    if not letter:
        return ""
    is_arabic = language in ["ar", "tn"]
    return normalize_string(letter, is_arabic=is_arabic)

def generate_entity_id(category: str, answer: str) -> str:
    # Keep alphanumeric characters (including unicode letters like Arabic)
    clean = re.sub(r'[^\w\s]', '', answer).strip().lower()
    slug = re.sub(r'\s+', '_', clean)
    if not slug:
        import uuid
        slug = str(uuid.uuid4())[:8]
    return f"{category}_{slug}"

@router.get("/stats")
def get_bw_stats(db: Session = Depends(get_db)):
    from sqlalchemy import func
    total_entities = db.query(models.BwEntity).count()
    total_answers = db.query(models.BwLocalizedAnswer).count()
    approved = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.status == "approved").count()
    pending = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.status == "pending").count()
    
    # Categories distribution
    cat_stats = db.query(
        models.BwLocalizedAnswer.category, 
        func.count(models.BwLocalizedAnswer.id)
    ).group_by(models.BwLocalizedAnswer.category).all()
    
    # Languages distribution
    lang_stats = db.query(
        models.BwLocalizedAnswer.language, 
        func.count(models.BwLocalizedAnswer.id)
    ).group_by(models.BwLocalizedAnswer.language).all()
    
    return {
        "total_entities": total_entities,
        "total_answers": total_answers,
        "approved": approved,
        "pending": pending,
        "categories": {cat: count for cat, count in cat_stats},
        "languages": {lang: count for lang, count in lang_stats}
    }

@router.get("/words", response_model=Dict)
def get_words(
    category: Optional[str] = None,
    letter: Optional[str] = None,
    language: Optional[str] = None,
    query: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    q = db.query(models.BwLocalizedAnswer)
    
    if category:
        q = q.filter(models.BwLocalizedAnswer.category == category)
    if letter:
        norm_l = normalize_letter(letter, language or "en")
        q = q.filter(models.BwLocalizedAnswer.letter == norm_l)
    if language:
        q = q.filter(models.BwLocalizedAnswer.language == language)
    if query:
        q = q.filter(models.BwLocalizedAnswer.answer.ilike(f"%{query}%"))
        
    total = q.count()
    answers = q.order_by(models.BwLocalizedAnswer.id.desc()).offset(skip).limit(limit).all()
    
    words_list = []
    for a in answers:
        words_list.append({
            "id": a.id,
            "entity_id": a.entity_id,
            "language": a.language,
            "category": a.category,
            "answer": a.answer,
            "letter": a.letter,
            "normalized": a.normalized,
            "aliases": a.aliases,
            "status": a.status,
            "entity_type": a.entity.type if a.entity else None
        })
        
    return {
        "total": total,
        "words": words_list
    }

@router.post("/words", response_model=BwLocalizedAnswerResponse)
def create_word(word_in: BwLocalizedAnswerCreate, db: Session = Depends(get_db)):
    norm_letter = normalize_letter(word_in.letter, word_in.language)
    clean_answer = (word_in.answer or "").strip()
    is_ar = word_in.language in ["ar", "tn"]
    norm_answer = normalize_string(clean_answer, is_arabic=is_ar)
    
    # 1. Ensure Entity Exists
    ent_id = word_in.entity_id or generate_entity_id(word_in.category, clean_answer)
    entity = db.query(models.BwEntity).filter(models.BwEntity.id == ent_id).first()
    if not entity:
        entity = models.BwEntity(id=ent_id, type=word_in.category)
        db.add(entity)
        db.commit()
        db.refresh(entity)
        
    # 2. Check duplicate localized answer
    existing = db.query(models.BwLocalizedAnswer).filter(
        models.BwLocalizedAnswer.language == word_in.language,
        models.BwLocalizedAnswer.category == word_in.category,
        models.BwLocalizedAnswer.normalized == norm_answer
    ).first()
    
    if existing:
        return existing
        
    # 3. Create Localized Answer
    db_ans = models.BwLocalizedAnswer(
        entity_id=ent_id,
        language=word_in.language,
        category=word_in.category,
        answer=clean_answer,
        letter=norm_letter,
        normalized=norm_answer,
        aliases=word_in.aliases,
        status=word_in.status
    )
    db.add(db_ans)
    db.commit()
    db.refresh(db_ans)
    return db_ans

@router.put("/words/{id}", response_model=BwLocalizedAnswerResponse)
def update_word(id: int, word_in: BwLocalizedAnswerCreate, db: Session = Depends(get_db)):
    db_ans = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.id == id).first()
    if not db_ans:
        raise HTTPException(status_code=404, detail="Localized answer not found")
        
    clean_answer = (word_in.answer or "").strip()
    is_ar = word_in.language in ["ar", "tn"]
    norm_answer = normalize_string(clean_answer, is_arabic=is_ar)
    norm_letter = normalize_letter(word_in.letter, word_in.language)
    
    # Check if parent entity ID needs updating or creation
    ent_id = word_in.entity_id or db_ans.entity_id
    entity = db.query(models.BwEntity).filter(models.BwEntity.id == ent_id).first()
    if not entity:
        entity = models.BwEntity(id=ent_id, type=word_in.category)
        db.add(entity)
        db.commit()
        
    db_ans.entity_id = ent_id
    db_ans.category = word_in.category
    db_ans.language = word_in.language
    db_ans.answer = clean_answer
    db_ans.letter = norm_letter
    db_ans.normalized = norm_answer
    db_ans.aliases = word_in.aliases
    db_ans.status = word_in.status
    
    db.commit()
    db.refresh(db_ans)
    return db_ans

@router.delete("/words/{id}")
def delete_word(id: int, db: Session = Depends(get_db)):
    db_ans = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.id == id).first()
    if not db_ans:
        raise HTTPException(status_code=404, detail="Word not found")
        
    ent_id = db_ans.entity_id
    db.delete(db_ans)
    db.commit()
    
    # Clean up parent entity if no other localized answers reference it
    sibling_count = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.entity_id == ent_id).count()
    if sibling_count == 0:
        entity = db.query(models.BwEntity).filter(models.BwEntity.id == ent_id).first()
        if entity:
            db.delete(entity)
            db.commit()
            
    return {"detail": "Word deleted successfully"}

@router.post("/validate")
def validate_answers(req: BwValidateRequest, db: Session = Depends(get_db)):
    results = {}
    is_ar = req.language in ["ar", "tn"]
    req_letter = normalize_letter(req.letter, req.language)
    
    # Map 'tn' language to 'ar' for database dictionary lookups
    db_lang = "ar" if req.language == "tn" else req.language

    for category, raw_word in req.answers.items():
        word = (raw_word or "").strip()
        if not word:
            results[category] = False
            continue
            
        # 1. Prefix checks on the word
        first_char = word[0].lower()
        prefix_match = normalize_letter(first_char, req.language) == req_letter
            
        if not prefix_match:
            results[category] = False
            continue

        # 2. Database validation check
        db_words = db.query(models.BwLocalizedAnswer).filter(
            models.BwLocalizedAnswer.category == category,
            models.BwLocalizedAnswer.letter == req_letter,
            models.BwLocalizedAnswer.language == db_lang,
            models.BwLocalizedAnswer.status == "approved"
        ).all()
        
        # Normalize and compare input against answer and its aliases
        norm_input = normalize_string(word, is_arabic=is_ar)
        match_found = False
        for db_word_obj in db_words:
            norm_db = normalize_string(db_word_obj.answer, is_arabic=is_ar)
            if norm_input == norm_db:
                match_found = True
                break
            
            # Check aliases
            for alias in (db_word_obj.aliases or []):
                norm_alias = normalize_string(alias, is_arabic=is_ar)
                if norm_input == norm_alias:
                    match_found = True
                    break
            
            if match_found:
                break
                
        results[category] = match_found

    return results

@router.post("/export")
def export_dictionary_to_disk(db: Session = Depends(get_db)):
    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    CONTENT_DIR = os.path.join(ROOT_DIR, "content", "bent_waled")
    WEB_CONTENT_DIR = os.path.join(ROOT_DIR, "web_poc", "content", "bent_waled")
    
    # 1. Read all approved words
    answers = db.query(models.BwLocalizedAnswer).filter(models.BwLocalizedAnswer.status == "approved").all()
    
    # Group by language -> letter -> category
    data_tree = {}
    for a in answers:
        lang = a.language
        letter = a.letter
        cat = a.category
        
        if lang not in data_tree:
            data_tree[lang] = {}
        if letter not in data_tree[lang]:
            data_tree[lang][letter] = {}
        if cat not in data_tree[lang][letter]:
            data_tree[lang][letter][cat] = []
            
        data_tree[lang][letter][cat].append({
            "entity_id": a.entity_id,
            "answer": a.answer,
            "normalized": a.normalized,
            "aliases": a.aliases,
            "status": a.status
        })
        
    # Write files to content/bent_waled/ and web_poc/content/bent_waled/
    exported_files_count = 0
    for lang, letters in data_tree.items():
        for letter, categories in letters.items():
            for cat, items in categories.items():
                for base_dir in [CONTENT_DIR, WEB_CONTENT_DIR]:
                    folder = os.path.join(base_dir, lang, letter)
                    os.makedirs(folder, exist_ok=True)
                    filepath = os.path.join(folder, f"{cat}.json")
                    with open(filepath, "w", encoding="utf-8") as f:
                        json.dump(items, f, ensure_ascii=False, indent=2)
                exported_files_count += 1
                
    # 2. Build the bundled JS database for offline play
    bundle_path = os.path.join(ROOT_DIR, "web_poc", "content", "bent_waled_bundle.js")
    os.makedirs(os.path.dirname(bundle_path), exist_ok=True)
    with open(bundle_path, "w", encoding="utf-8") as f:
        f.write("window.BW_CONTENT_BUNDLE = ")
        json.dump(data_tree, f, ensure_ascii=False, indent=2)
        f.write(";\n")
        
    return {
        "status": "success",
        "exported_categories_count": exported_files_count,
        "bundle_file": bundle_path
    }

@router.post("/import-local")
def import_dictionary_from_disk(db: Session = Depends(get_db)):
    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    CONTENT_DIR = os.path.join(ROOT_DIR, "content", "bent_waled")
    
    if not os.path.exists(CONTENT_DIR):
        raise HTTPException(status_code=404, detail=f"Local content directory not found at {CONTENT_DIR}")
        
    imported_entities = 0
    imported_answers = 0
    
    # Walk tree: language -> letter -> category.json
    for lang in os.listdir(CONTENT_DIR):
        lang_path = os.path.join(CONTENT_DIR, lang)
        if not os.path.isdir(lang_path):
            continue
            
        for letter in os.listdir(lang_path):
            letter_path = os.path.join(lang_path, letter)
            if not os.path.isdir(letter_path):
                continue
                
            for filename in os.listdir(letter_path):
                if not filename.endswith(".json"):
                    continue
                cat = filename[:-5]
                filepath = os.path.join(letter_path, filename)
                
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        items = json.load(f)
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
                    continue
                    
                for item in items:
                    ent_id = item.get("entity_id") or generate_entity_id(cat, item.get("answer"))
                    # Create entity if missing
                    entity = db.query(models.BwEntity).filter(models.BwEntity.id == ent_id).first()
                    if not entity:
                        entity = models.BwEntity(id=ent_id, type=cat)
                        db.add(entity)
                        db.commit()
                        imported_entities += 1
                        
                    # Create localized answer if missing
                    answer = item.get("answer", "").strip()
                    is_ar = lang in ["ar", "tn"]
                    norm_answer = normalize_string(answer, is_arabic=is_ar)
                    norm_letter = normalize_letter(letter, lang)
                    
                    existing = db.query(models.BwLocalizedAnswer).filter(
                        models.BwLocalizedAnswer.language == lang,
                        models.BwLocalizedAnswer.category == cat,
                        models.BwLocalizedAnswer.normalized == norm_answer
                    ).first()
                    
                    if not existing:
                        db_ans = models.BwLocalizedAnswer(
                            entity_id=ent_id,
                            language=lang,
                            category=cat,
                            answer=answer,
                            letter=norm_letter,
                            normalized=norm_answer,
                            aliases=item.get("aliases", []),
                            status=item.get("status", "approved")
                        )
                        db.add(db_ans)
                        db.commit()
                        imported_answers += 1
                        
    return {
        "status": "success",
        "imported_entities": imported_entities,
        "imported_answers": imported_answers
    }

@router.post("/ai-check")
def ai_check_answers(req: BwAiCheckRequest, db: Session = Depends(get_db)):
    if not req.items:
        return {"results": []}

    system_prompt = """
You are an expert validator for the Arabic/Tunisian category word game "Bent Waled" (similar to Petit Bac / Categories).
Your task is to analyze a list of word answers submitted by a player for a specific starting letter, category, and language, and determine if they are factually correct.

For each item:
- Validate if the word is commonly accepted as correct for the given category, starting letter, and language context.
- Language context is either "ar" (Standard Arabic) or "tn" (Tunisian Dialect).
- Tunisian dialect and Arabic dialect variations should be accepted in "tn" and "ar" mode.
- Starting letter matches the Arabic alphabet or Latin alphabet.
- Categories are:
  - 'boy': Male human names
  - 'girl': Female human names
  - 'country': Countries, cities, states, capitals, or major regions
  - 'animal': Animals (mammals, birds, insects, fish, reptiles, etc.)
  - 'object': Inanimate objects, tools, furniture, clothing, etc.
  - 'plant': Plants, trees, fruits, vegetables, flowers, etc.
  - 'profession': Jobs, careers, occupations, titles, etc.
  - 'food': Dishes, meals, ingredients, bread types, desserts, drinks, etc.

Return a JSON object containing a list of checked items. Output format MUST be strictly:
{
  "results": [
    {
      "category": "category_name",
      "answer": "original_submitted_answer",
      "is_valid": true_or_false,
      "normalized": "normalized spelling of the word",
      "aliases": ["synonym1", "synonym2"]
    }
  ]
}
"""

    user_prompt = f"Letter: {req.letter}\nLanguage: {req.language}\nItems:\n" + "\n".join(
        [f"- Category: {item.category}, Answer: {item.answer}" for item in req.items]
    )

    try:
        from core.ai_utils import call_gemini
        gemini_response = call_gemini(system_prompt, user_prompt)
    except Exception as e:
        print(f"Gemini API failure during Bent Waled AI Check: {e}")
        results = []
        for item in req.items:
            results.append({
                "category": item.category,
                "answer": item.answer,
                "is_valid": False,
                "normalized": item.answer,
                "aliases": []
            })
        return {"results": results}

    results = gemini_response.get("results", [])
    
    # Process only valid/true answers and insert them into the DB dictionary
    inserted_words = []
    is_arabic = req.language in ["ar", "tn"]
    norm_l = normalize_letter(req.letter, req.language)
    db_lang = "ar" if req.language == "tn" else req.language

    for res in results:
        if res.get("is_valid") is True:
            category = res.get("category")
            answer = res.get("answer")
            normalized = res.get("normalized", answer)
            aliases = res.get("aliases", [])

            if not category or not normalized:
                continue

            entity_id = generate_entity_id(category, normalized)
            
            # 1. Create Entity if missing
            entity = db.query(models.BwEntity).filter(models.BwEntity.id == entity_id).first()
            if not entity:
                entity = models.BwEntity(id=entity_id, type=category)
                db.add(entity)
                db.flush()

            # 2. Check if BwLocalizedAnswer already exists
            normalized_val = normalize_string(normalized, is_arabic=is_arabic)
            loc_ans = db.query(models.BwLocalizedAnswer).filter(
                models.BwLocalizedAnswer.language == db_lang,
                models.BwLocalizedAnswer.category == category,
                models.BwLocalizedAnswer.normalized == normalized_val
            ).first()

            if not loc_ans:
                loc_ans = models.BwLocalizedAnswer(
                    entity_id=entity_id,
                    language=db_lang,
                    category=category,
                    answer=normalized,
                    letter=norm_l,
                    normalized=normalized_val,
                    aliases=aliases,
                    status="approved"
                )
                db.add(loc_ans)
                inserted_words.append(normalized)
    
    if inserted_words:
        db.commit()
        print(f"AI Check seeded {len(inserted_words)} new words to DB: {inserted_words}")
        
    return {"results": results}
