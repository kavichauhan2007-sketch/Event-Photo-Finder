from pymongo import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()




MONGO_URI = os.getenv("MONGO")

client = MongoClient(MONGO_URI)

db = client["event_photo_finder"]

users = db["users"]
events = db["events"]
photos = db["photos"]

