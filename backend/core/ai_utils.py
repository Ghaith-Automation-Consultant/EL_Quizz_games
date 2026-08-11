import json
import urllib.request
import random
from fastapi import HTTPException, status
from core.config import GEMINI_API_KEY

def get_random_points_distribution() -> list:
    rand = random.random()
    if rand < 0.15:
        # Hard Mix: contains exactly one 8
        return [1, 1, 1, 2, 2, 3, 3, 5, 8]
    elif rand < 0.55:
        # Easy Mix: mostly 1s and 2s
        options = [
            [1, 1, 1, 1, 1, 2, 2, 3, 5],
            [1, 1, 1, 1, 2, 2, 2, 3, 5],
            [1, 1, 1, 1, 1, 2, 3, 3, 5]
        ]
        return random.choice(options)
    else:
        # Balanced Mix: balanced 1, 2, 3, 5
        options = [
            [1, 1, 1, 2, 2, 2, 3, 3, 5],
            [1, 1, 2, 2, 2, 3, 3, 3, 5],
            [1, 1, 1, 2, 2, 3, 3, 5, 5]
        ]
        return random.choice(options)

def parse_clean_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()
    return json.loads(text)

def call_gemini(system_prompt: str, user_prompt: str) -> dict:
    # Use config-managed GEMINI_API_KEY
    gemini_key = GEMINI_API_KEY or ""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={gemini_key}"
    
    # 1. Attempt with Search Grounding tools enabled
    payload = {
        "contents": [{
            "parts": [{
                "text": f"{system_prompt}\n\nUser Prompt: {user_prompt}"
            }]
        }],
        "generationConfig": {
            "responseMimeType": "application/json"
        },
        "tools": [{"googleSearch": {}}]
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            resp_data = json.loads(response.read().decode('utf-8'))
            text = resp_data['candidates'][0]['content']['parts'][0]['text'].strip()
            return parse_clean_json(text)
    except Exception as e:
        # Fallback to standard request without search tools on rate limit/quota failure
        print(f"Failed to query Gemini with search grounding: {str(e)}. Retrying without search grounding...")
        
        payload_no_search = {
            "contents": [{
                "parts": [{
                    "text": f"{system_prompt}\n\nUser Prompt: {user_prompt}"
                }]
            }],
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        }
        
        req_fallback = urllib.request.Request(
            url,
            data=json.dumps(payload_no_search).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        try:
            with urllib.request.urlopen(req_fallback) as response:
                resp_data = json.loads(response.read().decode('utf-8'))
                text = resp_data['candidates'][0]['content']['parts'][0]['text'].strip()
                return parse_clean_json(text)
        except Exception as fallback_err:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Gemini API invocation failed (both search and fallback): {str(fallback_err)}"
            )
