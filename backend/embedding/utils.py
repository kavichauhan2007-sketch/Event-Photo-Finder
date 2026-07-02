import cv2
import numpy as np
from insightface.app import FaceAnalysis

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)


def get_embedding(image_bytes):
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if img is None:
        return None

    faces = app.get(img)

    if len(faces) == 0:
        return None
    arr=[]
    for i in faces:
        arr.append(i.embedding.tolist())


    return arr