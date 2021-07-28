import './style.css';

function index(props){
    const value = props.selected ? "Deselect" : "Select";

    return(
        <button
            value={props.selected ? "Deselect" : "Select"}
            onClick={props.selected ? props.onDeselect : props.onSelect}
            className="btn"
        >{value}</button>
    )
}

export default index;