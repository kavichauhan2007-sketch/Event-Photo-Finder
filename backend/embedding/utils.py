import cv2
import numpy as np
from insightface.app import FaceAnalysis

# Initialize FaceAnalysis model once
app = FaceAnalysis(name="buffalo_l", providers=['CPUExecutionProvider'])
app.prepare(ctx_id=-1, det_size=(640, 640))


def get_embedding(image_bytes):
    """
    Extract facial embeddings for all detected faces in an image.
    Returns: list of 512-dimensional float lists: [[...], [...]]
    """
    if not image_bytes:
        return []

    try:
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return []

        faces = app.get(img)

        if not faces:
            return []

        embeddings = []
        for face in faces:
            if hasattr(face, "embedding") and face.embedding is not None:
                embeddings.append(face.embedding.tolist())

        return embeddings
    except Exception as e:
        print(f"[ERROR] Face embedding extraction error: {e}")
        return []


def get_primary_face_embedding(image_bytes):
    """
    Extract the primary (largest/clearest) face embedding for search queries.
    Returns: (embedding_list, face_count)
    """
    if not image_bytes:
        return None, 0

    try:
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return None, 0

        faces = app.get(img)
        if not faces:
            return None, 0

        # Sort by bounding box area (w * h) to pick the largest, closest face in the selfie
        faces.sort(key=lambda f: (f.bbox[2] - f.bbox[0]) * (f.bbox[3] - f.bbox[1]), reverse=True)
        primary_emb = faces[0].embedding.tolist()

        return primary_emb, len(faces)
    except Exception as e:
        print(f"[ERROR] Primary face extraction error: {e}")
        return None, 0