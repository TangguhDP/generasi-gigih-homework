import React from "react";
import { FlatButton } from "../components/Buttons";
import ImgCover from "../components/ImgCover";
import NameAlbum from "../components/NameAlbum";
import NameArtist from "../components/NameArtist";
import TitleSong from "../components/TitleSong";

export default function Playlist(props) {
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
