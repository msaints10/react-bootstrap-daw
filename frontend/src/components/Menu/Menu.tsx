import "./Menu.scss";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();
  
  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/src/assets/react.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          <span className="ms-2">React + Bootstrap</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              🏠 Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/tasks" 
              active={location.pathname === '/tasks'}
            >
              📋 Tasks
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/goals" 
              active={location.pathname === '/goals'}
            >
              🎯 Goals
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
