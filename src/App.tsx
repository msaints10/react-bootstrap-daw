import Item from "./components/Item/Item";
import Menu from "./components/Menu/Menu";
import Formulario from "./components/Formulario/Formulario";

function App() {
  return (
    <>
      <Menu />
      <div className="container p-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-8">
            <Formulario />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
