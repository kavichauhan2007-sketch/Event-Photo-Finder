# AGENTS

## Purpose
This repository contains a React frontend in `frontend/` and a Python FastAPI backend in `backend/`.

## When working on Python backend code
- Primary backend files:
  - `backend/main.py`
  - `backend/db.py`
  - `backend/embedding/utils.py`
  - `backend/cosine/compare.py`
- The backend uses `python-dotenv` via `load_dotenv()` to load environment variables from `backend/.env`.
- `backend/db.py` reads `os.getenv("MONGO")`, but `backend/.env` currently defines `MONGO_URI=`. Confirm or fix the environment variable name before running the backend.
- Frontend fetch calls target `http://127.0.0.1:8000`, while backend-generated upload URLs use `http://127.0.0.1:5000/static/uploads/`. Verify port consistency when restoring or changing backend routing.

## Startup and environment notes
- README says:
  - `cd backend`
  - `pip install -r requirements.txt`
  - `uvicorn main:app --reload`
- The repository currently has no `requirements.txt` in `backend/`; use `pip install fastapi uvicorn python-dotenv pymongo` if needed.
- For local execution, prefer loading `backend/.env` via VS Code terminal `python.terminal.useEnvFile` or an equivalent dotenv mechanism.

## Frontend notes
- Frontend is a Vite React app in `frontend/`.
- Important frontend paths:
  - `frontend/src/Components/UploadPhoto.jsx`
  - `frontend/src/Components/Home.jsx`
- The frontend expects the backend API to be available at `http://127.0.0.1:8000`.

## Fixes and review focus
- When adding or changing backend behavior, verify:
  - env variable names match between code and `backend/.env`
  - backend port used by the frontend and static upload URL generation are aligned
  - file upload storage path `backend/static/uploads` is correct and accessible

## Why this matters
This file helps AI agents avoid common repo pitfalls: inconsistent local ports, missing dependency file expectations, and backend env-file handling.
