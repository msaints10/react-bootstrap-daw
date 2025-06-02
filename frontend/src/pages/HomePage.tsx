import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container className="mt-5 page-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">¡Bienvenido!</h1>
            <p className="lead text-muted">Gestiona tus tareas y metas de manera eficiente</p>
          </div>
          
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 hover-card">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-list-check page-icon icon-tasks"></i>
                  </div>
                  <Card.Title className="h3 mb-3">📋 Tareas</Card.Title>
                  <Card.Text className="text-muted mb-4">
                    Organiza y administra todas tus tareas pendientes de manera eficiente. 
                    Mantén el control de tu productividad diaria.
                  </Card.Text>
                  <Link to="/tasks" className="text-decoration-none">
                    <Button variant="primary" size="lg" className="w-100 py-3 action-button">
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Ir a Tareas
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 hover-card">
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <i className="bi bi-bullseye page-icon icon-goals"></i>
                  </div>
                  <Card.Title className="h3 mb-3">🎯 Metas</Card.Title>
                  <Card.Text className="text-muted mb-4">
                    Define y sigue el progreso de tus objetivos y metas a largo plazo. 
                    Alcanza tus sueños paso a paso.
                  </Card.Text>
                  <Link to="/goals" className="text-decoration-none">
                    <Button variant="success" size="lg" className="w-100 py-3 action-button">
                      <i className="bi bi-arrow-right-circle me-2"></i>
                      Ir a Metas
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
