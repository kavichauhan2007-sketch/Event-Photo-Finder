from fastapi import FastAPI, UploadFile, File,Form
from fastapi.middleware.cors import CORSMiddleware
from embedding.utils import get_embedding
from cosine.compare import cosine_similarity
from db import photos
from imagekitio import ImageKit
from imagekitio.models.UploadFileRequestOptions import UploadFileRequestOptions
from dotenv import load_dotenv
import os
import shutil
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

imagekit = ImageKit(
    public_key=os.getenv("IMAGEKIT_PUBLIC_KEY"),
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
    url_endpoint=os.getenv("IMAGEKIT_URL_ENDPOINT")
)

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)



@app.get("/home")
def home():
    return {"message": "Hello, FastAPI!"}


@app.post("/upload")
async def upload_files(event_name:str=Form(...),files: list[UploadFile] = File(...)):

    results = []
    
    
    
    print("Event-----------------------------------==================================---")
    print(event_name)
    

    for file in files:

  
        contents = await file.read()
        embedding = get_embedding(contents)

        temp_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.jpg")

        try:
       
            with open(temp_path, "wb") as buffer:
                buffer.write(contents)

       
            with open(temp_path, "rb") as f:
                result = imagekit.upload_file(
                    file=f,
                    file_name=file.filename,
                    options=UploadFileRequestOptions(
                        folder=event_name
                    )
                )
                
            print("------------------------------------------")
            print(result.url)

         
            photos.insert_one({
                "url": result.url,
                "encoding": embedding,
                "event_name":event_name
            })

            results.append({
                "url": result.url,
                "event_name":event_name
            })

        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    return {"uploaded": results}



@app.post("/get_similar")
async def sim(file: UploadFile,event_name:str=Form(...),photo_mode: str = Form(...)):
    
    if photo_mode == "all":
        if photos.find_one({"event_name": event_name}) is None:
            return {"message": "Invalid event name"}
        matches = []
            
        for photo in photos.find({"event_name":event_name}):
            
            matches.append(photo["url"])
        
        
        return {"matches": matches}
            
        
        

    contents = await file.read()
    query_embedding = get_embedding(contents)
    
    if len(query_embedding)>1 or len(query_embedding)==0:
        return {"message":"Please Upload another clear image with one Face"}

    matches = []
    
    a=photos.find({event_name:event_name})
    
    if photos.find_one({"event_name": event_name}) is None:
        return {"message": "Invalid event name"}

    for photo in photos.find({"event_name":event_name}):

        db_embedding = photo["encoding"]
        
        
        
        for i in db_embedding:
            score = cosine_similarity(query_embedding, i)
            

            if score > 0.65:
                matches.append(photo["url"])

    return {"matches": matches}