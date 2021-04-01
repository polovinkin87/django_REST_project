import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navibar() {
    return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Users</Link></Nav.Link>
                    <Nav.Link><Link to="/projects">Projects</Link></Nav.Link>
                    <Nav.Link><Link to="/todos">TODOs</Link></Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="primary" className="mr-2">Log In</Button>
                    <Button variant="primary">Sign out</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
    )
}

export default Navibar;