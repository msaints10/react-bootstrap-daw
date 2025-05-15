import "./Formulario.scss";
import { useDispatch } from "react-redux";
import { useRef, FormEvent } from "react";
import { addTodo } from "../../reducers/todoSlice";

export default function Formulario() {
  const dispatch = useDispatch();
  const inputRefName = useRef<HTMLInputElement>(null);

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRefName.current?.value.trim()) {
      dispatch(
        addTodo({
          name: inputRefName.current.value,
        })
      );
      inputRefName.current.value = ""; // Limpiar después de agregar
    }
  };

  return (
    <>
      <h4 className="mb-3">Billing address</h4>
      <form className="needs-validation" noValidate onSubmit={addItem}>
        <div className="row g-3">
          <div className="col-sm-4">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder=""
                ref={inputRefName}
                required
              />
              <label htmlFor="Name">Name</label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Description</label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                id="floatingTextarea"
              />
              <label htmlFor="floatingTextarea">Due Date</label>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <button className="w-100 btn btn-primary btn-lg" type="submit">
          Add Goal
        </button>
      </form>
    </>
  );
}
