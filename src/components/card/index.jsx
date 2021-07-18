import React from 'react';
import Image from '../image';
import Contents from '../contents';
import Button from '../button';
import './index.css';

function Card(props){
    return(
        <div className="card">
            <div className="container">
                <Image src={props.image_url}/>
                <Contents title={props.title} artist={props.artist} album={props.album}/>
                <Button/>
            </div>
        </div>
    )
}

export default Card;