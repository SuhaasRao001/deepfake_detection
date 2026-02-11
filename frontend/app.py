import streamlit as st
import requests
import os
import tempfile

# Backend API URL
API_URL = "http://127.0.0.1:8000/predict"

st.set_page_config(page_title="Deepfake Detection", layout="centered")

st.title("🎭 Deepfake Detection System")
st.write("Upload a video to check if it is REAL or FAKE.")

uploaded_file = st.file_uploader(
    "Choose a video file",
    type=["mp4", "avi", "mov"]
)

if uploaded_file is not None:

    st.video(uploaded_file)

    if st.button("Analyze Video"):

        with st.spinner("Processing... This may take a while ⏳"):

            try:
                files = {
                    "file": (uploaded_file.name, uploaded_file, uploaded_file.type)
                }

                response = requests.post(API_URL, files=files)

                if response.status_code == 200:
                    result = response.json()

                    prediction = result.get("prediction")
                    confidence = result.get("confidence")
                    frames = result.get("frames_used")
                    inference_time = result.get("inference_time_sec")

                    st.subheader("📊 Result")

                    if prediction == "FAKE":
                        st.error(f"Prediction: {prediction}")
                    elif prediction == "REAL":
                        st.success(f"Prediction: {prediction}")
                    else:
                        st.warning(prediction)

                    st.write(f"**Confidence:** {confidence}")
                    st.write(f"**Frames Used:** {frames}")
                    st.write(f"**Inference Time (sec):** {inference_time}")

                else:
                    st.error("Error from backend:")
                    st.write(response.json())

            except Exception as e:
                st.error(f"Connection error: {e}")
                st.info("Make sure FastAPI backend is running on port 8000.")
