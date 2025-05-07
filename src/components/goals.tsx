import List from "./list";
import { useSelector, useDispatch } from "react-redux";
import {
  addGoal,
  selectGoals,
  removeGoal,
  toggleGoal,
} from "../reducers/goalsSlice";
import { useRef, FormEvent } from "react";

interface Goal {
  id: number;
  name: string;
  complete: boolean;
}

export function Goals() {
  const dispatch = useDispatch();
  const goals = useSelector(selectGoals);
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      dispatch(addGoal({ name: inputRef.current.value }));
      inputRef.current.value = "";
    }
  };

  const handleRemove = (item: Goal) => {
    dispatch(removeGoal(item.id));
  };

  const handleToggle = (id: number) => {
    dispatch(toggleGoal(id));
  };

  return (
    <div>
      <h1>Goals List</h1>
      <input type="text" placeholder="Add Goal" ref={inputRef} />
      <button onClick={addItem}>Add Goal</button>

      <List items={goals} remove={handleRemove} toggle={handleToggle} />
    </div>
  );
}
