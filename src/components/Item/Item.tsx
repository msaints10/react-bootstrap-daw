import "./Item.scss";

function Item() {
  return (
    <div className="card w-full">
      <div className="card-body">
        <h5 className="card-title text-center">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-info w-full">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default Item;
