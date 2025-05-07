interface Item {
  id: number;
  name: string;
  complete: boolean;
}

interface ListProps {
  items?: Item[];
  toggle?: (id: number) => void;
  remove: (item: Item) => void;
}

const List: React.FC<ListProps> = (props) => {
  return (
    <ul>
      {props.items &&
        props.items.map((item) => (
          <li key={item.name}>
            <span
              onClick={() => props.toggle && props.toggle(item.id)}
              style={{
                textDecoration: item.complete ? "line-through" : "none",
              }}
            >
              {item.name}
            </span>
            <button onClick={() => props.remove(item)}> X </button>
          </li>
        ))}
    </ul>
  );
};

export default List;
