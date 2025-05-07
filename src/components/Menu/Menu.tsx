import "./Menu.scss";

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-md  navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="src/assets/react.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <span className="ms-2">React + Bootstrap</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#home">
                  Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#link">
                  Goals
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
