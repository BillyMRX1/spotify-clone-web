import "./style.css";

function index(props) {
  const { selected, onSelect, onDeselect } = props;
  const value = selected ? "Deselect" : "Select";

  return (
    <button
      value={selected ? "Deselect" : "Select"}
      onClick={selected ? onDeselect : onSelect}
      className="btn"
    >
      {value}
    </button>
  );
}

export default index;
