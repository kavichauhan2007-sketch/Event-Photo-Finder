from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from embedding.utils import get_embedding, get_primary_face_embedding
from cosine.compare import find_best_match_score, DEFAULT_THRESHOLD
from db import photos, events, db_engine_type
from imagekitio import ImageKit
from dotenv import load_dotenv
import os
import uuid
import datetime
from typing import Optional

load_dotenv()

app = FastAPI(title="Event Photo Finder API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static and temporary directories
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
UPLOAD_DIR = os.path.join(STATIC_DIR, "uploads")
TEMP_DIR = os.path.join(os.path.dirname(__file__), "temp_uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# ImageKit Initialization with new SDK
imagekit_client = None
IMAGEKIT_PRIVATE_KEY = os.getenv("IMAGEKIT_PRIVATE_KEY", "private_JykViLxv5Cz2Qz4eIL06lMDSVfk=")
try:
    imagekit_client = ImageKit(private_key=IMAGEKIT_PRIVATE_KEY)
    print("[INFO] ImageKit Client initialized successfully")
except Exception as e:
    print(f"[WARN] ImageKit initialization fallback: {e}")


@app.get("/")
@app.get("/home")
@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "Event Photo Finder AI Core",
        "version": "2.0.0",
        "db_engine": db_engine_type,
        "imagekit_configured": imagekit_client is not None,
        "indexed_photos": len(photos.find())
    }


@app.get("/events")
def get_all_events():
    """List all available events, photo counts, and preview thumbnails."""
    all_photos = photos.find()
    event_map = {}
    for p in all_photos:
        ev = p.get("event_name", "General").strip()
        if not ev:
            continue
        if ev not in event_map:
            event_map[ev] = {
                "name": ev,
                "photo_count": 0,
                "faces_count": 0,
                "cover_url": p.get("url"),
                "latest_update": p.get("created_at", "")
            }
        event_map[ev]["photo_count"] += 1
        event_map[ev]["faces_count"] += len(p.get("encoding") or [])
    
    return {"events": list(event_map.values())}


@app.post("/upload")
async def upload_files(
    event_name: str = Form(...),
    files: list[UploadFile] = File(...)
):
    event_name = event_name.strip()
    if not event_name:
        raise HTTPException(status_code=400, detail="Event name is required")

    results = []
    print(f"[INGESTION] Processing {len(files)} files for event: '{event_name}'")

    for file in files:
        contents = await file.read()
        if not contents:
            continue

        # Extract embeddings for all faces present in the photo
        embeddings = get_embedding(contents)
        unique_id = str(uuid.uuid4())
        safe_filename = f"{unique_id}_{file.filename}"
        photo_url = None

        # 1. Try ImageKit upload first
        if imagekit_client:
            try:
                upload_res = imagekit_client.files.upload(
                    file=contents,
                    file_name=safe_filename,
                    folder=f"event_photos/{event_name}"
                )
                photo_url = upload_res.url
                print(f"[CDN] ImageKit uploaded: {photo_url}")
            except Exception as ik_err:
                print(f"[WARN] ImageKit upload failed ({ik_err}), using local storage")

        # 2. Local Fallback if CDN upload is not available
        if not photo_url:
            local_path = os.path.join(UPLOAD_DIR, safe_filename)
            with open(local_path, "wb") as buffer:
                buffer.write(contents)
            photo_url = f"http://127.0.0.1:8000/static/uploads/{safe_filename}"
            print(f"[LOCAL] Saved locally: {photo_url}")

        doc = {
            "url": photo_url,
            "encoding": embeddings,
            "event_name": event_name,
            "filename": file.filename,
            "faces_detected": len(embeddings),
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        photos.insert_one(doc)

        results.append({
            "url": photo_url,
            "event_name": event_name,
            "faces_detected": len(embeddings)
        })

    return {
        "success": True,
        "uploaded_count": len(results),
        "event_name": event_name,
        "uploaded": results
    }


@app.post("/get_similar")
async def get_similar_photos(
    event_name: str = Form(...),
    photo_mode: str = Form("mine"),
    file: Optional[UploadFile] = File(None),
    threshold: Optional[float] = Form(DEFAULT_THRESHOLD)
):
    event_name = event_name.strip()
    
    # Flexible event search (case-insensitive fallback)
    event_photos = photos.find({"event_name": event_name})
    if not event_photos:
        # Check case-insensitive
        all_p = photos.find()
        matching_photos = [p for p in all_p if p.get("event_name", "").strip().lower() == event_name.lower()]
        if matching_photos:
            event_photos = matching_photos
            event_name = matching_photos[0].get("event_name")

    if not event_photos:
        return {
            "success": False,
            "message": f"No photos found for event '{event_name}'. Please verify the event name or host a new event.",
            "matches": []
        }

    # MODE: ALL PHOTOS
    if photo_mode == "all":
        urls = [p["url"] for p in event_photos]
        matches = [{"url": p["url"], "score": 100.0, "faces": len(p.get("encoding") or [])} for p in event_photos]
        return {
            "success": True,
            "photo_mode": "all",
            "event_name": event_name,
            "total_photos": len(urls),
            "matches": urls,  # Maintains direct URL list for compatibility
            "detailed_matches": matches
        }

    # MODE: MINE (FACE SEARCH)
    if not file:
        return {
            "success": False,
            "message": "Please select or capture a selfie photo to search.",
            "matches": []
        }

    contents = await file.read()
    if not contents:
        return {
            "success": False,
            "message": "The uploaded selfie file appears to be empty.",
            "matches": []
        }

    query_emb, face_count = get_primary_face_embedding(contents)

    if query_emb is None or face_count == 0:
        return {
            "success": False,
            "message": "No face was detected in your selfie. Please upload a clear photo looking straight towards the camera with good lighting.",
            "matches": []
        }

    matched_items = []
    matched_urls = []

    for photo in event_photos:
        db_embeddings = photo.get("encoding") or []
        if not db_embeddings:
            continue

        best_score = find_best_match_score(query_emb, db_embeddings)
        if best_score >= threshold:
            match_pct = round(best_score * 100, 1)
            matched_items.append({
                "url": photo["url"],
                "score": match_pct,
                "filename": photo.get("filename", "")
            })

    # Sort results by similarity score descending (best matches first)
    matched_items.sort(key=lambda x: x["score"], reverse=True)
    matched_urls = [item["url"] for item in matched_items]

    return {
        "success": True,
        "photo_mode": "mine",
        "event_name": event_name,
        "faces_in_selfie": face_count,
        "total_event_photos": len(event_photos),
        "total_matches": len(matched_items),
        "matches": matched_urls,  # Directly compatible with frontend match.map
        "detailed_matches": matched_items
    }


@app.post("/seed_demo")
def seed_demo_photos(event_name: str = "Annual Tech Gala 2026"):
    """Seeds sample photos from backend/test_photos into the database for immediate testing."""
    test_photos_dir = os.path.join(os.path.dirname(__file__), "test_photos")
    if not os.path.exists(test_photos_dir):
        return {"success": False, "message": "test_photos folder not found"}

    # Check if already seeded
    existing = photos.find({"event_name": event_name})
    if existing and len(existing) >= 5:
        return {
            "success": True,
            "message": f"Event '{event_name}' already contains {len(existing)} photos.",
            "event_name": event_name,
            "count": len(existing)
        }

    seeded = 0
    for filename in sorted(os.listdir(test_photos_dir)):
        if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        file_path = os.path.join(test_photos_dir, filename)
        with open(file_path, "rb") as f:
            contents = f.read()

        embeddings = get_embedding(contents)
        dest_filename = f"demo_{filename}"
        dest_path = os.path.join(UPLOAD_DIR, dest_filename)
        with open(dest_path, "wb") as f_out:
            f_out.write(contents)

        photo_url = f"http://127.0.0.1:8000/static/uploads/{dest_filename}"
        photos.insert_one({
            "url": photo_url,
            "encoding": embeddings,
            "event_name": event_name,
            "filename": filename,
            "faces_detected": len(embeddings),
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        })
        seeded += 1

    return {
        "success": True,
        "message": f"Successfully seeded {seeded} demo photos for '{event_name}'.",
        "event_name": event_name,
        "count": seeded
    }