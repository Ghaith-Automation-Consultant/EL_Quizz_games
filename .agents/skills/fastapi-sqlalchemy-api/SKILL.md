---
name: fastapi-sqlalchemy-api
description: Guidelines for developing secure, high-performance REST APIs with FastAPI, Pydantic data schemas, and SQLAlchemy database models, focusing on normalized structures and import/export patterns.
risk: low
source: workspace
---

# FastAPI & SQLAlchemy REST API Design Guide

Use this skill when implementing backend services, creating database models, designing schemas, or authoring data synchronization/migration APIs.

## Schema Modeling Best Practices
* **Keep Data Normalized**: Divide complex schemas into core Entities (representing concepts) and Localized tables (containing translations or user-specific records) to prevent redundancy.
* **Cascading Operations**: Configure parent relationships with `cascade="all, delete-orphan"` and Foreign Keys with `ondelete="CASCADE"` to ensure integrity.
* **Indexes & Unique Constraints**: Index columns commonly used in filters (e.g. `language`, `category`, `letter`, `status`). Define `UniqueConstraint` on composite unique fields.

## FastAPI Endpoint Design
* **Router Prefixing**: Structure code into modular routers using `APIRouter(prefix="/api/...")` and mount them dynamically in the main file.
* **Pydantic Validation**: Define request/response data contracts via Pydantic models. Enable `from_attributes = True` inside Pydantic Config to easily parse SQLAlchemy instances.
* **Error Handling**: Raise `HTTPException` with specific HTTP status codes (e.g. `400 Bad Request`, `404 Not Found`) and return standard JSON error payloads.

## Data Import/Export Synchronization
* **Recursive File Parsing**: Implement file walkers to parse directory hierarchies (e.g., `lang/letter/category.json`) and seed the database.
* **Bundle Compiling**: Support exporting database records into a single optimized JavaScript file (e.g., writing `window.BW_CONTENT_BUNDLE = ...` to disk) for CORS-free local playback fallbacks.
