import List from "./list";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  selectTodos,
  removeTodo,
  toggleTodo,
} from "../reducers/todoSlice";
import { useRef, FormEvent } from "react";

export function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      dispatch(addTodo({ name: inputRef.current.value }));
      inputRef.current.value = "";
    }
  };

  const handleRemove = (item: {
    id: number;
    name: string;
    complete: boolean;
  }) => {
    dispatch(removeTodo(item.id));
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div>
      <h1>Todo List </h1>
      <input type="text" placeholder="Add Todo" ref={inputRef} />
      <button onClick={addItem}> Add Todo </button>

      <List items={todos} remove={handleRemove} toggle={handleToggle} />
    </div>
  );
}
