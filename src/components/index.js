import Music from '../components/home/home'
import data from '../datadummy/data';

function Index(){
    return(
        <div className="body">
            <Music image_url={data.album.images[1].url} title={data.name} artist={data.artists[0].name} album={data.album.name}/>
        </div>
    );
}

export default Index;