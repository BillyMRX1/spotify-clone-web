import React from "react";
import Image from "../image";
import Contents from "../contents";
import Button from "../button";
import "./style.css";

function CardComponent(props) {
  const { image_url, title, artist, album, selected, onSelect, onDeselect } =
    props;
  return (
    <div className="card">
      <div className="container">
        <Image src={image_url} />
        <Contents title={title} artist={artist} album={album} />
        <Button
          selected={selected}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      </div>
    </div>
  );
}

export default CardComponent;
