import "./Item.scss";
import { useDispatch } from "react-redux";
import { removeTodo } from "../../reducers/todoSlice";

interface ItemProps {
  id: number;
  name: string;
}

function Item({ id, name }: ItemProps) {
  const dispatch = useDispatch();
  const removeItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeTodo(id));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text fw-bold">Description</p>
        <p className="card-text">
          Elaborar una aplicación web responsive en la que se pueda llevar el
          control de mis tareas y metas personales.
        </p>
        <p className="card-text fw-bold">Due Date</p>
        <p className="card-text">31/05/2024</p>
      </div>
      <div className="card-body">
        <button className="btn btn-info me-2">Editar</button>
        <button className="btn btn-info" onClick={removeItem}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Item;
