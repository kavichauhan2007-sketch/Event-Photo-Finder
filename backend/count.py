import os
import cv2
import numpy as np
from insightface.app import FaceAnalysis

# Load model only once
app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=0)

# -----------------------------
# Function to get embedding
# -----------------------------
def get_embedding(image_path):
    img = cv2.imread(image_path)

    if img is None:
        return None

    faces = app.get(img)

    if len(faces) == 0:
        return None

    print(len(faces))
    




x=get_embedding("test_photos/ampalji.png")

print(x)
