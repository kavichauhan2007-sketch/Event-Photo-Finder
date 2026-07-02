import numpy as np

THRESHOLD = 0.57

def cosine_similarity(emb1, emb2):
    e2 = np.array(emb2)

    denom = np.linalg.norm(emb1) * np.linalg.norm(e2)
    if denom == 0:
        return False

    similarity = np.dot(emb1, e2) / denom
    
    

    return similarity