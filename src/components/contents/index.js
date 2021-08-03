import Title from "../title";
import Album from "../album";

function index(props) {
  const { title, artist, album } = props;
  return (
    <div className="music-contents">
      <Title title={title} />
      <Album artist={artist} album={album} />
    </div>
  );
}

export default index;
