import './home.css'

const Music = (props) => {
    return(
        <div className="body">
            <img id="image" src={props.image_url} alt='cover'/>
            <p id="track_title">Track Title: {props.title}</p>
            <p id="artist">Artist: {props.artist}</p>
            <p id="album">Album: {props.album}</p>
            <button className="button button_hover">Select</button>
        </div>
    );
}

export default Music;

