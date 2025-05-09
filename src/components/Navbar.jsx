import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavigationBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3"
      style={{
        background: 'linear-gradient(to right, #007bff, #0056b3)',
        color: '#fff',
        fontWeight: 500
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to={currentUser ? '/tasks' : '/'}
          className="text-white fw-bold"
          style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}
        >
          📝 Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/tasks" className="text-white me-3">
                  My Tasks
                </Nav.Link>
                <span className="text-white me-3">Welcome! <strong>{currentUser.username}</strong></span>
                <Button
                  variant="light"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-pill px-3"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white me-3">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="sm"
                  className="rounded-pill px-3"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
