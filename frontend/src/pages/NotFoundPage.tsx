import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container className="mt-5 page-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-sm border-0">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i className="bi bi-exclamation-triangle page-icon icon-error"></i>
              </div>
              <Card.Title as="h1" className="display-4 fw-bold">404</Card.Title>
              <Card.Subtitle className="mb-3 text-muted h5">Página no encontrada</Card.Subtitle>
              <Card.Text className="mb-4">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </Card.Text>
              <Link to="/" className="text-decoration-none">
                <Button variant="primary" size="lg" className="action-button">
                  <i className="bi bi-house-door me-2"></i>
                  Volver al inicio
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
