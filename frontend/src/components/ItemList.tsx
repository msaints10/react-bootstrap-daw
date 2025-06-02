import { Card, Badge, ListGroup, Button } from "react-bootstrap";

// Interfaz genérica para elementos que pueden ser metas o tareas
interface ListItem {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ItemListProps {
  title: string;
  icon: string;
  items: ListItem[];
  loading: boolean;
  badgeVariant: string;
  emptyMessage: string;
  emptySubMessage: string;
  datePrefix: string;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export function ItemList({
  title,
  icon,
  items,
  loading,
  badgeVariant,
  emptyMessage,
  emptySubMessage,
  datePrefix,
  onDelete,
  formatDate
}: ItemListProps) {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{icon} {title}</h5>
        <Badge bg={badgeVariant}>{items.length}</Badge>
      </Card.Header>
      <Card.Body>
        {loading && <div className="text-center">Cargando...</div>}
        
        {items.length === 0 && !loading ? (
          <div className="text-center text-muted">
            <p>{emptyMessage}</p>
            <small>{emptySubMessage}</small>
          </div>
        ) : (
          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-start">
                <div className="me-auto">
                  <div className="fw-bold">{item.name}</div>
                  <p className="mb-1 text-muted">{item.description}</p>
                  <small className="text-muted">
                    {datePrefix}: {formatDate(item.dueDate)}
                  </small>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(item._id)}
                  disabled={loading}
                >
                  🗑️
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
