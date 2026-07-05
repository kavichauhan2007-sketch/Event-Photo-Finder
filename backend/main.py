from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from embedding.utils import get_embedding
from cosine.compare import cosine_similarity
from db import photos
from dotenv import load_dotenv
import os
import uuid

load_dotenv()

app = FastAPI() 

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_origin_regex=".*",
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"],
                   )

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/home")
def home():
    return {"message": "Hello, FastAPI with Local Engine!"}


@app.post("/upload")
async def upload_files(event_name: str = Form(...), files: list[UploadFile] = File(...)):
    results = []
    print(f"Event Name Received: {event_name}")
    
    for file in files:
        contents = await file.read()
        embedding = get_embedding(contents)
        
        unique_filename = f"{uuid.uuid4()}.jpg"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        local_url = f"http://127.0.0.1:5000/static/uploads/{unique_filename}"
        print(f"Saved locally: {local_url}")

        photos.insert_one({
            "url": local_url,
            "encoding": embedding,
            "event_name": event_name
        })

        results.append({
            "url": local_url,
            "event_name": event_name
        })

    return {"uploaded": results}


@app.post("/get_similar")
async def sim(file: UploadFile, event_name: str = Form(...), photo_mode: str = Form(...)):
    
    if photos.find_one({"event_name": event_name}) is None:
        return {"message": "Invalid event name"}

    if photo_mode == "all":
        matches = []
        for photo in photos.find({"event_name": event_name}):
            matches.append(photo["url"])
        return {"matches": matches}

    contents = await file.read()
    query_embedding = get_embedding(contents)
    
    if not query_embedding:
        return {"message": "Please Upload another clear image with one Face"}

    matches = []

    for photo in photos.find({"event_name": event_name}):
        db_embedding = photo["encoding"]
        
        if isinstance(db_embedding, list) and len(db_embedding) > 0:
            if isinstance(db_embedding[0], list):
                for face_vector in db_embedding:
                    score = cosine_similarity(query_embedding, face_vector)
                    if score > 0.65:
                        matches.append(photo["url"])
                        break 
            else:
                score = cosine_similarity(query_embedding, db_embedding)
                if score > 0.65:
                    matches.append(photo["url"])

    return {"matches": matches}