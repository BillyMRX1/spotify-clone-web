import React from 'react';
import data from '../../datadummy/data.js';
import './home.css';

function Music(){
    return(
        <div class="body">
            <img id="image" src={data.album.images[1].url}/>
            <p id="track_title">Track Title: {data.name}</p>
            <p id="artist">Artist: {data.artists[0].name}</p>
            <p id="album">Album: {data.album.name}</p>
            <button>Select</button>
        </div>
    );
}

export default Music;

