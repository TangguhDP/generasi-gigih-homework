import React from "react";
import Track from "../components/Track";

import Data from "../data/ManyData";

export default function Playlist() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create Playlist</h1>
      {Data.map((obj, i) => {
        return (
          <Track
            key={i}
            height={obj.album.images[0].height}
            imgUrl={obj.album.images[0].url}
            title={obj.name}
            artistName={obj.artists[0].name}
            albumName={obj.album.name}
          />
        );
      })}
    </>
  );
}
