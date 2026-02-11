import torch
import numpy as np
import cv2
from PIL import Image
from utils.frame_extractor import extract_frames
from utils.face_detector import detect_faces
from utils.preprocess import get_transform


def predict_video(video_path, model, device, fps=5, threshold=0.65):

    frames = extract_frames(video_path, fps)
    transform = get_transform()

    scores = []

    for frame in frames:
        faces = detect_faces(frame)

        if len(faces) == 0:
            continue

        x, y, w, h = faces[0]
        face = frame[y:y + h, x:x + w]

        if face.size == 0:
            continue

        face = cv2.resize(face, (224, 224))
        face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
        face = Image.fromarray(face)

        input_tensor = transform(face).unsqueeze(0).to(device)

        with torch.no_grad():
            output = model(input_tensor)
            prob = torch.sigmoid(output).item()
            scores.append(prob)

    if len(scores) == 0:
        return {
            "prediction": "No face detected",
            "confidence": 0.0,
            "frames_used": 0
        }

    final_score = float(np.mean(scores))
    prediction = "FAKE" if final_score > threshold else "REAL"

    return {
        "prediction": prediction,
        "confidence": round(final_score, 4),
        "frames_used": len(scores)
    }
