Deepfake Detection System
This repository contains the source code and documentation for the Deepfake Detection System, a project developed for Tech Savishkaar 4.0 at the Vasavi College of Engineering. Our system is designed to combat digital misinformation by identifying manipulated facial regions in video content.

### Problem Statement
The rapid advancement of AI has made it increasingly difficult to distinguish between authentic and manipulated media. This system addresses the growing threat of deepfakes used in cybercrime, digital forensics, and the spread of misinformation across social media platforms.

### Core Features

Facial Focus: The system prioritizes analysis on facial regions where most digital manipulations occur.


Dual-Layer Detection: It identifies subtle visual (spatial) and frequency-based inconsistencies that are often invisible to the human eye.


Temporal Consistency: Multiple frames are analyzed (at 3–5 FPS) and aggregated to prevent errors that might occur from analyzing a single image.


Confidence Reporting: Provides a final "REAL" or "FAKE" prediction accompanied by a confidence score.

### Pipeline Architecture
The system follows a three-stage processing flow:


Input and Preprocessing: Video upload, frame extraction, and face detection/alignment.


Frame Level Analysis: Parallel spatial analysis (CNN) and frequency analysis (FFT + CNN) are combined into ensemble scores.


Aggregation and Output: Results are aggregated across frames to produce the final prediction and user review.

### Tech Stack

Language: Python.


Deep Learning: PyTorch, EfficientNet, CNN, LSTM, and rPPG.


Video Processing: OpenCV and MediaPipe.


Signal Processing: FFT (Fast Fourier Transform).


Backend: FastAPI and Uvicorn.


Frontend: React.js, Chart.js (for confidence visualization), and Vercel.

### Quick Start Guide

#### 1. Backend (API)
```bash
cd backend
python api_wrapper.py
```
*Wait for "Model loaded successfully" and "Uvicorn running on http://127.0.0.1:8000".*

#### 2. Frontend (React)
```bash
cd frontend
npm run dev
```
*Access the application at http://localhost:5173/*

### Project Structure
- `backend/`: FastAPI server and AI inference logic.
- `frontend/`: React application (Vite-based).
- `requirements.txt`: Python dependencies for the backend.

### Team Details

Team Leader: Thallapali Suhaas Rao (IT, 3rd Year).

Team Member 1: Pramod Kumar Potturu (IT, 3rd Year).

Team Member 2: Srikrishna Kasivajhula (IT, 3rd Year).

Team Member 3: Thrilochan Chidurala (IT, 3rd Year).
