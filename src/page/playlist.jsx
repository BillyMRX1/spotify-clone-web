import React from 'react';
import Card from '../components/card';
import data from '../datadummy/data';
import './index.css';

function CardPlaylist(){
    return(
        <div className="card-music">
            {data.map(music => (
                <Card key={music.id} image_url={music.album.images[1].url} title={music.name} artist={music.artists[0].name} album={music.album.name}/>
            ))}
        </div>
    );
}

export default CardPlaylist;