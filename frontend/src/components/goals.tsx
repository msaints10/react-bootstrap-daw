import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { 
  fetchGoals, 
  addGoalAsync, 
  deleteGoalAsync, 
  clearError,
  selectGoals,
  selectGoalsLoading,
  selectGoalsError
} from "../reducers/goalsSlice";
import { AppDispatch } from "../store";
import { ItemList } from "./ItemList";

export function Goals() {
  const dispatch = useDispatch<AppDispatch>();
  const goals = useSelector(selectGoals);
  const loading = useSelector(selectGoalsLoading);
  const error = useSelector(selectGoalsError);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: ""
  });
  // Cargar metas al montar el componente
  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.dueDate) {
      return;
    }

    try {
      await dispatch(addGoalAsync(formData)).unwrap();
      // Limpiar formulario solo si la acción fue exitosa
      setFormData({ name: "", description: "", dueDate: "" });
    } catch (error) {
      // El error ya se maneja en el reducer
      console.error('Error adding goal:', error);
    }
  };
  const handleDelete = async (goalId: string) => {
    try {
      await dispatch(deleteGoalAsync(goalId)).unwrap();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Limpiar error cuando el usuario empieza a escribir
    if (error) {
      dispatch(clearError());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">🎯 Añadir Nueva Meta</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la meta</Form.Label>                  
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre de la meta"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>                  
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe tu meta"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha objetivo</Form.Label>                  
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="success" 
                  type="submit" 
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? 'Añadiendo...' : 'Añadir Meta'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <ItemList
            title="Lista de Metas"
            icon="🎯"
            items={goals}
            loading={loading}
            badgeVariant="success"
            emptyMessage="No hay metas definidas"
            emptySubMessage="¡Define tu primera meta!"
            datePrefix="🎯 Objetivo"
            onDelete={handleDelete}
            formatDate={formatDate}
          />
        </Col>
      </Row>
    </div>
  );
}
