import React from "react";

export default function ImgCover(props) {
  return (
    <img
      alt="songs"
      style={{
        height: props.height - 300,
        width: "auto",
      }}
      src={props.url}
    />
  );
}
