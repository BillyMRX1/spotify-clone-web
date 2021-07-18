import Title from'../title';
import Album from'../album';
import './index.css'

function index(props){
    return(
        <div className="music-contents">
            <Title title={props.title}/>
            <Album artist={props.artist} album={props.album}/>
        </div>
    )
}

export default index;