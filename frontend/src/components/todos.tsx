import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import {
  fetchTasks,
  addTaskAsync,
  deleteTaskAsync,
  clearError,
  selectTasks,
  selectTasksLoading,
  selectTasksError
} from "../reducers/todoSlice";
import { AppDispatch } from "../store";
import { ItemList } from "./ItemList";

export function Todos() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: ""
  });
  // Cargar tareas al montar el componente
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.dueDate) {
      return;
    }

    try {
      await dispatch(addTaskAsync(formData)).unwrap();
      // Limpiar formulario solo si la acción fue exitosa
      setFormData({ name: "", description: "", dueDate: "" });
    } catch (error) {
      // El error ya se maneja en el reducer
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await dispatch(deleteTaskAsync(taskId)).unwrap();
    } catch (error) {
      console.error('Error deleting task:', error);
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
              <h5 className="mb-0">📝 Añadir Nueva Tarea</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la tarea</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre de la tarea"
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
                    placeholder="Describe la tarea"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha límite</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? 'Añadiendo...' : 'Añadir Tarea'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <ItemList
            title="Lista de Tareas"
            icon="📋"
            items={tasks}
            loading={loading}
            badgeVariant="primary"
            emptyMessage="No hay tareas pendientes"
            emptySubMessage="¡Añade tu primera tarea!"
            datePrefix="📅 Vencimiento"
            onDelete={handleDelete}
            formatDate={formatDate}
          />
        </Col>
      </Row>
    </div>
  );
}
