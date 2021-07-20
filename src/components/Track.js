import React from "react";

import { FlatButton } from "./Buttons";
import ImgCover from "./ImgCover";
import InfoTextWithTitle from "./InfoTextWithTitle";

export default function Track(props) {
  return (
    <div className="track-card">
      <ImgCover height={props.height} url={props.imgUrl} />
      <div className="track-info">
        <InfoTextWithTitle title="Title" value={props.title} />
        <InfoTextWithTitle title="Artist" value={props.artistName} />
        <InfoTextWithTitle title="Album" value={props.albumName} />
        <FlatButton className="green-button" value="Select" />
      </div>
    </div>
  );
}
