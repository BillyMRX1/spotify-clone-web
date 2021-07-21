import Card from '../card/index';
import { Component } from 'react';
import axios from 'axios';

class index extends Component{
    constructor(props){
        super(props)
        this.token = props.token;
    }

    state = {
        search: '',
        track: []
    };

    getText = () =>{
        const auth = {
            headers: { Authorization: `Bearer ${this.token}` }
        }

        axios
            .get(`https://api.spotify.com/v1/search?q=${this.state.search}&type=track`, auth)
            .then(response=>{
                console.log(response.data.tracks.items)
                this.setState({track: response.data.tracks.items})
            })
    }
    
    handleSearch = (e) =>{
        this.setState({
            search: e.target.value
        })
    }

    render(){
        return(
            <div>
                <div>
                    <input type="text" className="search_bar" onChange={this.handleSearch}/>
                    <button onClick={this.getText} className="btn">Search</button>
                </div>
                <div className="card-music">
                    {this.state.track.map(music => (
                        <Card key={music.id} image_url={music.album.images[1].url} title={music.name} artist={music.artists[0].name} album={music.album.name} url={music.external_urls.spotify}/>
                    ))}            
                </div>
            </div>
        )
    }
}

export default index;