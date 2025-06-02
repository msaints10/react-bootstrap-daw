import { Container, Row, Col, Card } from 'react-bootstrap';
import { Goals } from '../components/goals';

export default function GoalsPage() {
  return (
    <Container className="mt-4 page-container">
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-success text-white">
              <h2 className="mb-0">
                <i className="bi bi-bullseye me-2"></i>
                🎯 Gestión de Metas
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              <Goals />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
