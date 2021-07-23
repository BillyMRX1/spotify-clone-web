import Card from '../card/index';
import axios from 'axios';
import { useState } from 'react';

const LandingComponent = (props) =>{
    
    const token = props.token;
    const[search, setSearch] = useState('')
    const[result, setResult] = useState([])
    const[trackSelect, setSelectedTrack] = useState([])

    const getText = () =>{
        const auth = {
            headers: { Authorization: `Bearer ${token}` }
        }
    
        axios
            .get(`https://api.spotify.com/v1/search?q=${search}&type=track`, auth)
            .then(response=>{
                console.log(response.data.tracks.items)
                setResult(response.data.tracks.items)
            })
    }
    
    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const handleSelect = (id) =>{
        setSelectedTrack([...trackSelect, id])
    }

    const handleDeselect = (id) =>{
        const selectedTrack = trackSelect.filter((track) => track !== id)
        setSelectedTrack([...selectedTrack]);
    }

    return(
        <div>
            <div>
                <input type="text" className="search_bar" onChange={handleSearch}/>
                <button onClick={getText} className="btn">Search</button>
            </div>
            <div className="card-music">
                {result.map(music => (
                    <Card 
                        key={music.id} 
                        image_url={music.album.images[1].url} 
                        title={music.name} artist={music.artists[0].name} 
                        album={music.album.name} 
                        url={music.external_urls.spotify}
                        
                        selected={trackSelect.some((id) => id === music.uri)}
                        onSelect={() => handleSelect(music.uri)}
                        onDeselect={() => handleDeselect(music.uri)}
                    />
                ))}            
            </div>
        </div>
    )
}

export default LandingComponent;