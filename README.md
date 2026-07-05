# 📸 Event Photo Finder

Event Photo Finder is an AI-powered web application that helps users instantly find their photos from an event using facial recognition. Users simply upload a selfie, and the system searches the event gallery to return all matching photos.

## ✨ Features

* 🔍 AI-powered face recognition
* 📤 Upload a selfie to search photos
* 🖼️ Event gallery management
* ⚡ Fast and accurate matching
* 🔒 Secure image processing
* 📱 Responsive and modern UI

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router

### Backend

* FastAPI
* Python

### Database

* MongoDB

### AI & Image Processing

* Face Embeddings
* Cosine Similarity

### Storage

* ImageKit

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/event-photo-finder.git
cd event-photo-finder
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📂 Project Structure

```
frontend/
backend/
README.md
```

## 📸 How It Works

1. Admin uploads event photos.
2. Face embeddings are generated and stored.
3. User uploads a selfie.
4. The system generates the selfie embedding.
5. Cosine similarity is used to find matching faces.
6. Matching photos are displayed to the user.

## 🔮 Future Improvements

* Multi-face detection
* Event authentication
* Download selected photos
* Email notifications
* Mobile app support
* Face clustering for automatic albums

## 📄 License

This project is licensed under the MIT License.
