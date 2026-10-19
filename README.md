# 📸 EventSnap AI — Biometric Event Photo Retrieval Engine

> **Sub-200ms Facial Vector Discovery** powered by InsightFace Buffalo_L (RetinaFace + ArcFace) and modern B2B SaaS architecture.

---

## ⚡ Overview

**EventSnap AI** eliminates hours of manual event gallery scrolling. Attendees simply upload a single reference selfie to immediately index and extract every photo of them across weddings, college fests, corporate summits, and sports events.

### Key Architectural Highlights
- 🧠 **ArcFace 512-D Embeddings:** Projects aligned facial landmarks onto invariant hyperspherical manifolds for extreme precision even with side angles, festive lighting, or accessories.
- ⚡ **Sub-200ms Latency:** High-speed normalized vector cosine distance search across tens of thousands of event images.
- 🔒 **Zero Data Retention:** Query selfies are analyzed strictly in ephemeral RAM and instantly destroyed.
- ☁️ **Hybrid Storage Architecture:** Native ImageKit CDN integration with automatic local edge fallback (`backend/static/uploads/`).
- 🗄️ **Resilient Storage Layer:** Seamless MongoDB Atlas support with zero-config local JSON document store fallback.
- 🎨 **Enterprise UI/UX:** Apollo-inspired design system with dark engineering grid, metric counters, interactive lightbox, and multi-file drag & drop portal.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Apollo-inspired Design System
- **Icons:** Lucide React & React Icons
- **Routing:** React Router v7

### Backend & AI Engine
- **Web API:** FastAPI + Uvicorn (ASGI)
- **Face Detection:** InsightFace Buffalo_L (RetinaFace)
- **Face Recognition:** 512-D ArcFace ResNet Deep Embedding Backbone
- **Image Processing:** OpenCV & NumPy
- **CDN Storage:** ImageKit Python SDK v5+
- **Database:** MongoDB / PyMongo with Local Resilient Engine Fallback

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+

### 2. Backend Setup

```bash
cd backend

# Create & activate virtualenv (if not already created)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI backend
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

*Backend runs at `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`).*

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

*Frontend runs at `http://localhost:5173`.*

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Healthcheck and active DB engine status |
| `GET` | `/events` | Lists all available events with photo & face counts |
| `POST` | `/upload` | Bulk upload photographs for a designated event |
| `POST` | `/get_similar` | Execute facial match query or retrieve full album |
| `POST` | `/seed_demo` | Seeds demo event photos for instant testing |

---

## 📄 License
Licensed under the [MIT License](LICENSE).
