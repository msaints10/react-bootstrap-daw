import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Formulario from "./components/Formulario/Formulario";
import Item from "./components/Item/Item";
import Menu from "./components/Menu/Menu";
import { initAddTodo } from "./reducers/todoSlice";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.value);

  const initialTodos = [
    {
      id: 1,
      name: "caminar al perro 1",
      complete: false,
    },
    {
      id: 2,
      name: "caminar al perro 2",
      complete: false,
    },
  ];

  useEffect(() => {
    initialTodos.forEach((todo) => {
      dispatch(initAddTodo(todo));
    });
  }, [dispatch]); // Agregamos dispatch como dependencia

  return (
    <>
      <Menu />
      <div className="container p-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8">
            <Formulario />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            {todos.map((todo) => (
              <Item key={todo.id} id={todo.id} name={todo.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
