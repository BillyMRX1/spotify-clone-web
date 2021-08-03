import "./style.css";

function index(props) {
  const { artist, album } = props;
  return (
    <div>
      <p>{artist}</p>
      <p>{album}</p>
    </div>
  );
}

export default index;
