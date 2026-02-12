import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaFileVideo } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UploadCard = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.avi', '.mov'],
            'image/*': ['.jpg', '.jpeg', '.png']
        },
        multiple: false
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`custom-file-upload ${isDragActive ? 'drag-active' : ''}`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <div className="d-flex flex-column align-items-center">
                <FaCloudUploadAlt size={50} className="mb-3 text-info" />
                {isDragActive ? (
                    <h5 className="text-white">Drop the file here...</h5>
                ) : (
                    <>
                        <h5 className="text-white">Drag & drop video/image here</h5>
                        <p className="text-white-50">or click to select file</p>
                        <p className="small text-white-50 mt-2">Supported formats: MP4, AVI, MOV, JPG, PNG</p>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default UploadCard;
