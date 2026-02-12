import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaImage } from 'react-icons/fa';

const VideoPreview = ({ file, onAnalyze, onCancel }) => {
    const isVideo = file.type.startsWith('video/');
    const fileURL = URL.createObjectURL(file);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-4"
        >
            <div className="text-center mb-3">
                <h4 className="text-white mb-3">
                    {isVideo ? <FaVideo className="me-2" /> : <FaImage className="me-2" />}
                    Preview
                </h4>
            </div>

            <div className="mb-4" style={{ borderRadius: '15px', overflow: 'hidden', maxHeight: '400px' }}>
                {isVideo ? (
                    <video
                        src={fileURL}
                        controls
                        style={{ width: '100%', maxHeight: '400px', display: 'block' }}
                        className="rounded"
                    />
                ) : (
                    <img
                        src={fileURL}
                        alt="Preview"
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block' }}
                        className="rounded"
                    />
                )}
            </div>

            <div className="text-center">
                <p className="text-white-50 mb-3">
                    <strong>File:</strong> {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <button className="btn btn-custom" onClick={onAnalyze}>
                        Analyze for Deepfake
                    </button>
                    <button className="btn btn-outline-light" onClick={onCancel}>
                        Choose Different File
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default VideoPreview;
