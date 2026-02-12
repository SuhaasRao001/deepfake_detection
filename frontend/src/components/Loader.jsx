import React from 'react';
import { Container } from 'react-bootstrap';

const Loader = () => {
    return (
        <Container className="loader-container">
            <div className="spinner"></div>
            <h4 className="mt-3 text-white">Analyzing Video...</h4>
            <p className="text-white-50">This may take a few moments based on file size.</p>
        </Container>
    );
};

export default Loader;
