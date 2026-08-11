# Bent Waled (Categories Mode) MVP Architecture

This document details the system design, database schemas, local offline validation, UI localization, and networking decisions implemented for the Bent Waled mode in **El Quizz V2**.

---

## 1. Architectural Principles (Content-First & Offline-Playable)

To ensure the game is highly performant and playable without network latency or server bottlenecks (even offline), Bent Waled is modeled with a **content-first / JSON-first database architecture**:

* **PostgreSQL as the Source of Truth**: Serves as the persistent administrative store for authoring, querying, modifying, and localizing concepts, synonym mappings, and entity relationships.
* **Local JSON Files on Disk**: Serves as the high-speed local question bank. The client fetches individual files at runtime under `/content/bent_waled/<lang>/<letter>/<category>.json`.
* **CORS-Free Offline Bundle**: Compiled during export into a single compressed JavaScript bundle (`web_poc/content/bent_waled_bundle.js`). The gameplay client falls back to checking `window.BW_CONTENT_BUNDLE` if fetching fails or if running directly from the filesystem without a local web server (avoiding CORS security blocks on `file://` protocols).

```
                  [ ADMIN CRUD DASHBOARD ]
                             │
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   Source DB     │
                    └────────┬────────┘
                             │
                      /api/bw/export
                             │
                             ▼
             ┌───────────────┴───────────────┐
             ▼                               ▼
     ┌──────────────┐                ┌──────────────┐
     │  Local JSON  │                │ Offline JS   │
     │ Directory    │                │ Bundle       │
     └──────┬───────┘                └──────┬───────┘
            │                               │
            │ (Dynamic runtime fetch)       │ (CORS-free fallback)
            └───────────────┬───────────────┘
                            ▼
                     [ GAME PLAY ]
```

---

## 2. Normalized Database Schema

We replaced the flat dictionary structure with two normalized entities in [models.py](file:///d:/2_PROJECTS/DEV%20PROJECTS/EL%20QUIZZ/backend/models.py):

### BwEntity
* **Description**: Represents a globally unique concept (e.g., `country_ma` representing Morocco).
* **Fields**:
  * `id`: `String(100)` (Primary Key, unique slug)
  * `type`: `String(50)` (The category tag, indexed, e.g., `"country"`)
* **Relationships**: Has a one-to-many relationship with localized answers, configured with `cascade="all, delete-orphan"`.

### BwLocalizedAnswer
* **Description**: Contains the translation of a concept in a specific language along with its synonym mappings.
* **Fields**:
  * `id`: `Integer` (Primary Key)
  * `entity_id`: `String(100)` (Foreign Key linking to `BwEntity.id`, cascades on delete)
  * `language`: `String(10)` (Indexed, e.g., `"ar"`, `"en"`, `"fr"`)
  * `category`: `String(50)` (Indexed, e.g., `"animal"`)
  * `answer`: `String(100)` (The base translated name, e.g., `"أسد"`)
  * `letter`: `String(5)` (The prefix letter representing this translation, indexed)
  * `normalized`: `String(100)` (The normalized comparison value, indexed)
  * `aliases`: `JSON` (List of string aliases/synonyms)
  * `status`: `String(20)` (State of translation, defaults to `"approved"`)
* **Constraints**: Unique constraint on `('language', 'category', 'normalized')` to prevent identical translations.

---

## 3. Seeding & Export Lifecycle APIs

The backend dictionary router [bw_dictionary.py](file:///d:/2_PROJECTS/DEV%20PROJECTS/EL%20QUIZZ/backend/routers/bw_dictionary.py) implements synchronization endpoints to bridge the database and disk files:

### Import Local Files (`POST /api/bw/import-local`)
* Walks the local tree under `content/bent_waled/` recursively.
* Automatically generates a unique entity ID/slug if not provided (`generate_entity_id()`).
* Seeds PostgreSQL database, checking for duplicates.

### Export to Disk (`POST /api/bw/export`)
* Query all approved localized answers from the database.
* Write structured JSON files under `content/bent_waled/<lang>/<letter>/<category>.json` for backend lookup.
* Copy files to the client PoC directory `web_poc/content/bent_waled/...`.
* Package the complete tree structure inside `web_poc/content/bent_waled_bundle.js` as `window.BW_CONTENT_BUNDLE` for CORS-free offline client play.

---

## 4. Gameplay Runtime & Local Validation

The gameplay screen in [app.js](file:///d:/2_PROJECTS/DEV%20PROJECTS/EL%20QUIZZ/web_poc/app.js) executes an optimized, dual-validation flow:

1. **Prefix Validation**:
   * Extracts the first character of the input and checks it against the active challenge letter.
   * In Arabic mode, normalize the character (replacing common variations `أ/إ/آ/ٱ` with `ا`, `ة` with `ت`, and `ى/ي` with `ي`) before checking prefix matches.
2. **Local Dictionary Validation**:
   * Locates category records from the offline `BW_CONTENT_BUNDLE` database. If offline bundle is missing, falls back to fetching the individual JSON file at runtime.
   * If both sources are unavailable (or dictionary is empty), the client defaults to accepting a valid prefix match to guarantee seamless play.
   * Checks the normalized input against both the base `answer` and the list of `aliases`.
3. **Backend Sync Fallback**:
   * Sends the inputs to `/api/bw/validate` to verify answers against the database as a final verification, falling back gracefully to the local validation results if offline.

---

## 5. UI Localization & Translation Loop

Translations are integrated into the client game loop in [app.js](file:///d:/2_PROJECTS/DEV%20PROJECTS/EL%20QUIZZ/web_poc/app.js):

* **Translation Keys**: All hardcoded bilingual strings (e.g. `ستبدأ اللعبة بعد: / Game starts in:`) are replaced with element IDs.
* **Unified Updater (`updateBwUILanguage`)**: Fetches translations from the `BW_TRANSLATIONS` dictionary and updates all labels, countdown overlays, range sliders, player input lists, and standings tables.
* **Automatic Route Trigger**: Hooked to the `showScreen` navigation method. Whenever any screen starting with `screen-bw-` is shown, the UI automatically translates all text to the active language.

---

## 6. Loopback Network Bindings

During local testing, we diagnosed that some virtualization services (like WSL2 network proxies or Docker) listen on the loopback port `127.0.0.1:8000` and respond with a `404 Not Found`.

To bypass loopback conflicts, the client scripts resolve `BACKEND_URL` and `WS_URL` dynamically:
* If the page is hosted on a remote server, it uses the host's URL hostname.
* If the page is loaded locally from disk (`file://`), it bypasses loopback and routes directly to the machine's active bound IP `http://192.168.1.139:8000` where the Python daemon is running.
