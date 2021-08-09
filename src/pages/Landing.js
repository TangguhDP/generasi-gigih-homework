/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FlatButton } from "../components/Buttons";

export default function Landing() {
  const generateRandomString = (length) => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const loginSpotify = () => {
    const state = generateRandomString(16);
    localStorage.setItem("spotify_auth_state", state);
    const scope = "user-read-private user-read-email playlist-modify-private";
    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url +=
      "&client_id=" +
      encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENT_ID);
    url += "&scope=" + encodeURIComponent(scope);
    url +=
      "&redirect_uri=" + encodeURIComponent(process.env.REACT_APP_REDIRECT_URI);
    url += "&state=" + encodeURIComponent(state);
    window.location = url;
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <FlatButton
        className="py-2 px-4 bg-green-700 text-white shadow-lg border-2 rounded-lg cursor-pointer text-lg font-semibold"
        value="Login Spotify"
        onClick={() => loginSpotify()}
      />
    </div>
  );
}
