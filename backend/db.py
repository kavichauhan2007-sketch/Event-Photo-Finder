import os
import json
import logging
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("event_photo_db")
logging.basicConfig(level=logging.INFO)

# Check MongoDB
MONGO_URI = os.getenv("MONGO_URI") or os.getenv("MONGO")

class LocalCollection:
    """Lightweight persistent fallback collection that mirrors PyMongo API."""
    def __init__(self, name, filepath):
        self.name = name
        self.filepath = filepath
        self._ensure_file()

    def _ensure_file(self):
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)
        if not os.path.exists(self.filepath):
            with open(self.filepath, "w", encoding="utf-8") as f:
                json.dump([], f)

    def _read_data(self):
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _write_data(self, data):
        with open(self.filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def insert_one(self, doc):
        data = self._read_data()
        data.append(doc)
        self._write_data(data)
        return type("InsertResult", (), {"inserted_id": len(data)})()

    def find(self, query=None):
        data = self._read_data()
        if not query:
            return list(data)
        
        results = []
        for item in data:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                results.append(item)
        return results

    def find_one(self, query=None):
        res = self.find(query)
        return res[0] if res else None

    def delete_many(self, query=None):
        if not query:
            self._write_data([])
            return
        data = self._read_data()
        filtered = [item for item in data if not all(item.get(k) == v for k, v in query.items())]
        self._write_data(filtered)


def init_db():
    use_mongo = False
    client = None
    db = None

    if MONGO_URI and (MONGO_URI.startswith("mongodb://") or MONGO_URI.startswith("mongodb+srv://")):
        try:
            from pymongo import MongoClient
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
            client.server_info()  # triggers connection check
            db = client["event_photo_finder"]
            use_mongo = True
            logger.info(" Connected successfully to MongoDB!")
            return db["users"], db["events"], db["photos"], "mongodb"
        except Exception as e:
            logger.warning(f" MongoDB connection unavailable ({e}). Falling back to local storage engine.")

    # Fallback local engine
    store_dir = os.path.join(os.path.dirname(__file__), "data")
    users = LocalCollection("users", os.path.join(store_dir, "users.json"))
    events = LocalCollection("events", os.path.join(store_dir, "events.json"))
    photos = LocalCollection("photos", os.path.join(store_dir, "photos.json"))
    logger.info(" Initialized reliable local storage engine at backend/data/")
    return users, events, photos, "local_json"

users, events, photos, db_engine_type = init_db()
