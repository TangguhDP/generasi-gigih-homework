import React from "react";

import { FlatButton } from "./Buttons";
import ImgCover from "./ImgCover";
import NameAlbum from "./NameAlbum";
import NameArtist from "./NameArtist";
import TitleSong from "./TitleSong";

export default function Track(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "0.5em",
      }}
    >
      <ImgCover height={props.height} url={props.imgUrl} />
      <TitleSong name={props.title} />
      <NameArtist name={props.artistName} />
      <NameAlbum name={props.albumName} />
      <FlatButton name="Select" />
    </div>
  );
}
