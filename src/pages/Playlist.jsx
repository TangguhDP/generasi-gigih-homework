import React, { useEffect, useState } from "react";
import { FlatButton } from "../components/Buttons";
import ImgCover from "../components/ImgCover";
import NameAlbum from "../components/NameAlbum";
import NameArtist from "../components/NameArtist";
import TitleSong from "../components/TitleSong";
import data from "../data/Data";

export default function Playlist() {
  const [state, setState] = useState();
  useEffect(() => {
    const response = data;
    setState(response);
  }, []);
  return (
    <>
      {!state ? (
        <center>
          <h1>Loading</h1>
        </center>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Create Playlist</h1>
          <ImgCover
            height={state.album.images[0].height}
            url={state.album.images[0].url}
          />
          <TitleSong name={state.name} />
          <NameArtist name={state.artists[0].name} />
          <NameAlbum name={state.album.name} />
          <FlatButton name="Select" />
        </div>
      )}
    </>
  );
}
