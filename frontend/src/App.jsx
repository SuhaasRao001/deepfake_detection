import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

import AppNavbar from './components/Navbar';
import UploadCard from './components/UploadCard';
import VideoPreview from './components/VideoPreview';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import api from './api';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        setShowPreview(true);
        setResult(null);
        setError(null);
    };

    const handleAnalyze = async () => {
        setShowPreview(false);
        setLoading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/predict', formData);
            setResult(response.data);
            toast.success("Analysis Complete!");
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.detail || "An error occurred during analysis.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelPreview = () => {
        setFile(null);
        setShowPreview(false);
    };

    const resetAnalysis = () => {
        setFile(null);
        setResult(null);
        setError(null);
        setShowPreview(false);
    };

    return (
        <div className="App">
            <AppNavbar />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <AnimatePresence mode="wait">
                            {!file && !loading && !result && (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="text-center mb-5">
                                        <h1 className="fw-bold mb-3">Is it Real or Fake?</h1>
                                        <p className="lead text-white-50">
                                            Upload a video or image to detect deepfakes using our advanced AI model.
                                        </p>
                                    </div>
                                    <UploadCard onFileSelect={handleFileSelect} />
                                </motion.div>
                            )}

                            {showPreview && file && (
                                <VideoPreview
                                    key="preview"
                                    file={file}
                                    onAnalyze={handleAnalyze}
                                    onCancel={handleCancelPreview}
                                />
                            )}

                            {loading && (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Loader />
                                </motion.div>
                            )}

                            {result && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ResultCard result={result} reset={resetAnalysis} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && !loading && (
                            <Alert variant="danger" className="mt-4" onClose={() => setError(null)} dismissible>
                                {error}
                                <div className="mt-2">
                                    <button className="btn btn-sm btn-outline-danger" onClick={resetAnalysis}>Try Again</button>
                                </div>
                            </Alert>
                        )}

                    </Col>
                </Row>
            </Container>
            <ToastContainer position="top-right" theme="dark" />
        </div>
    );
}

export default App;
