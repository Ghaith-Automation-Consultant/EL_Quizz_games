---
name: content-first-architecture
description: Guidelines for content-first and JSON-first application design, utilizing local static files as the runtime data layer and relational databases as the authoring/administrative source.
risk: low
source: workspace
---

# Content-First & JSON-First Architecture Guide

Use this skill when designing or refactoring subsystems to follow a content-first pattern, ensuring zero-latency data querying, offline playability, and high-speed validation.

## Architecture Philosophy
Avoid querying database servers for static, immutable game data during active gameplay loops. Instead, structure components around static asset trees:

* **PostgreSQL / DBMS**: Acts as the authoring workspace and metadata manager. It is only modified during curation, importing raw inputs, or editing answers in the admin dashboard.
* **Disk JSON Files**: Automatically compiled from the database using seeding/exporting pipelines. These files are loaded directly by client apps, enabling offline capability.
* **Asset Bundling**: Package folders into structured JavaScript scripts (e.g. `window.CONTENT_BUNDLE = {...}`) to allow CORS-free play when loading html files directly from the filesystem (`file://` protocol).

## Dynamic Seeding & Sync Loops
1. **DB to JSON (Export)**: Query database models, format the results, and write them to matching directories `/content/<module>/<lang>/<key>.json`.
2. **JSON to DB (Import)**: Walk the asset directory recursively, parse content arrays, generate missing entity slugs, and write back into the database to update tracking metadata.
3. **Runtime Lookup**: Check the local bundled cache first. If cache is empty, load the specific JSON asset asynchronously via `fetch(`./content/...`)`.
