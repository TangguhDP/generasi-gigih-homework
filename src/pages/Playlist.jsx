import React, { useEffect, useState } from "react";
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
          <img
            alt="songs"
            style={{
              height: state.album.images[0].height - 300,
              width: "auto",
            }}
            src={state.album.images[0].url}
          />
          <p id="showTitle">{state.name}</p>
          <p id="showArtis">{state.artists[0].name}</p>
          <p id="showAlbum">{state.album.name}</p>
          <button type="button">Select</button>
        </div>
      )}
    </>
  );
}
