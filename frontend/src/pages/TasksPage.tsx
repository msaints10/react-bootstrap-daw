import { Container, Row, Col, Card } from 'react-bootstrap';
import { Todos } from '../components/todos';

export default function TasksPage() {
  return (
    <Container className="mt-4 page-container">
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">
                <i className="bi bi-list-check me-2"></i>
                📋 Gestión de Tareas
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Todos />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
