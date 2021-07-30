import Card from '../card/index';
import axios from 'axios';
import { useState } from 'react';
import FormPlaylistComponent from '../formplaylist/index';
import { useSelector } from 'react-redux';

const LandingComponent = () =>{
    
    const token = useSelector((state) => state.token.token);
    const[search, setSearch] = useState('')
    const[result, setResult] = useState([])
    const[trackSelect, setSelectedTrack] = useState([])
    const[userId, setUserId] = useState("")

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

    const getUserId = async() =>{
        try {
            const response = await axios.get("https://api.spotify.com/v1/me",{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            setUserId(response.data.id)
        } catch(error){
            console.error(error);
        }
    }

    getUserId();

    return(
        <div>
            <h1>Create Playlist</h1>
            <div>
                <FormPlaylistComponent userId={userId} token={`Bearer ${token}`} data={trackSelect}/>
            </div>
            <div>
                <h1>Search</h1>
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