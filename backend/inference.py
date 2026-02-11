import cv2
import torch
import numpy as np
from PIL import Image

from utils.face_detector import detect_faces
from utils.preprocess import get_transform

def predict_video(video_path, model, device, fps=5, threshold=0.65):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        return {"error": "Could not open video"}

    video_fps = cap.get(cv2.CAP_PROP_FPS)
    interval = int(video_fps // fps) if video_fps > fps else 1

    transform = get_transform()
    frame_id = 0
    probabilities = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % interval == 0:
            faces = detect_faces(frame)

            for (x, y, w, h) in faces[:1]:  # only first face
                face = frame[y:y+h, x:x+w]

                if face.size == 0:
                    continue

                face = cv2.resize(face, (224, 224))
                face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
                face = Image.fromarray(face)

                input_tensor = transform(face).unsqueeze(0).to(device)

                with torch.no_grad():
                    output = torch.sigmoid(model(input_tensor)).item()
                    probabilities.append(output)

        frame_id += 1

    cap.release()

    if len(probabilities) == 0:
        return {
            "prediction": "No face detected",
            "confidence": 0.0
        }

    final_score = float(np.mean(probabilities))

    prediction = "FAKE" if final_score > threshold else "REAL"

    return {
        "prediction": prediction,
        "confidence": round(final_score, 4),
        "frames_used": len(probabilities)
    }
