import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { MdSecurity } from 'react-icons/md';

const AppNavbar = () => {
    return (
        <Navbar expand="lg" className="glass-navbar" variant="dark">
            <Container>
                <Navbar.Brand href="#" className="d-flex align-items-center fw-bold fs-4">
                    <MdSecurity className="me-2 text-info" size={30} />
                    Deepfake<span className="text-info">Detector</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
