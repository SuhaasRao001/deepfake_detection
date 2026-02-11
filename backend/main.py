import os
import torch
import time
import logging
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse


from model_loader import load_model
from inference import predict_video

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Deepfake Detection API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "spatial.pth")


device = "cuda" if torch.cuda.is_available() else "cpu"


 # change to your actual file

try:
    model = load_model(MODEL_PATH, device)
    logging.info("Model loaded successfully.")
except Exception as e:
    print("MODEL LOAD ERROR:", e)
    raise



UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = [".mp4", ".avi", ".mov"]
MAX_FILE_SIZE_MB = 200


@app.get("/")
def health():
    return {"status": "API Running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    contents = await file.read()
    file_size_mb = len(contents) / (1024 * 1024)

    if file_size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail="File too large")

    await file.seek(0)

    video_path = os.path.join(UPLOAD_DIR, filename)

    try:
        start = time.time()

        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = predict_video(video_path, model, device)

        result["inference_time_sec"] = round(time.time() - start, 2)

        return JSONResponse(content=result)

    except Exception as e:
        logging.error(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail="Inference failed")

    finally:
        if os.path.exists(video_path):
            os.remove(video_path)
