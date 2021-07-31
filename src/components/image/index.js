import "./style.css";

function index(props) {
  return (
    <div className="img">
      <img src={props.src} alt="cover" />
    </div>
  );
}

export default index;
