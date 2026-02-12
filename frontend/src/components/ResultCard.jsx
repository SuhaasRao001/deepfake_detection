import React from 'react';
import { Card, ProgressBar, Row, Col, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResultCard = ({ result, reset }) => {
    const isReal = result.prediction === "REAL";
    const confidencePercent = (result.confidence * 100).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="glass-card p-4 mt-4 text-center">
                <h3 className="mb-4">Analysis Result</h3>

                <div className="mb-4">
                    {isReal ? (
                        <FaCheckCircle size={80} className="text-success mb-3" />
                    ) : (
                        <FaExclamationTriangle size={80} className="text-danger mb-3" />
                    )}

                    <h2 className={`fw-bold display-4 ${isReal ? 'result-real' : 'result-fake'}`}>
                        {result.prediction}
                    </h2>
                </div>

                <Row className="justify-content-center mb-4">
                    <Col md={8}>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Confidence Score</span>
                            <span>{confidencePercent}%</span>
                        </div>
                        <ProgressBar
                            now={confidencePercent}
                            variant={isReal ? "success" : "danger"}
                            animated
                            className="mb-3"
                            style={{ height: '10px' }}
                        />
                    </Col>
                </Row>

                <div className="d-flex justify-content-center gap-3 mb-4">
                    <Badge bg="secondary" className="p-2">Frames Analyzed: {result.frames_used}</Badge>
                    <Badge bg="secondary" className="p-2">Time: {result.inference_time_sec}s</Badge>
                </div>

                <button className="btn btn-custom" onClick={reset}>
                    Analyze Another File
                </button>
            </div>
        </motion.div>
    );
};

export default ResultCard;
