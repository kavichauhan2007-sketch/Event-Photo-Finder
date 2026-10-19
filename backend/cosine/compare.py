import numpy as np

# ArcFace / Buffalo_l 512-D normalized cosine similarity threshold
# 0.50 - 0.60 is the industry standard range for balanced precision and recall
DEFAULT_THRESHOLD = 0.52

def cosine_similarity(emb1, emb2):
    """
    Compute cosine similarity between two 1D embedding vectors.
    Returns: float similarity score between -1.0 and 1.0
    """
    if emb1 is None or emb2 is None:
        return 0.0

    try:
        e1 = np.asarray(emb1, dtype=np.float32).ravel()
        e2 = np.asarray(emb2, dtype=np.float32).ravel()

        if e1.shape[0] != e2.shape[0] or e1.shape[0] == 0:
            return 0.0

        norm1 = np.linalg.norm(e1)
        norm2 = np.linalg.norm(e2)

        if norm1 == 0 or norm2 == 0:
            return 0.0

        similarity = float(np.dot(e1, e2) / (norm1 * norm2))
        return similarity
    except Exception:
        return 0.0


def find_best_match_score(query_emb, photo_embeddings):
    """
    Compares query face embedding against all faces in a target photo.
    Returns the maximum similarity score found among all faces.
    """
    if not photo_embeddings or not query_emb:
        return 0.0

    # If photo_embeddings is a single 1D vector
    if isinstance(photo_embeddings, list) and len(photo_embeddings) > 0 and isinstance(photo_embeddings[0], (int, float)):
        return cosine_similarity(query_emb, photo_embeddings)

    max_score = 0.0
    for face_vec in photo_embeddings:
        score = cosine_similarity(query_emb, face_vec)
        if score > max_score:
            max_score = score

    return max_score