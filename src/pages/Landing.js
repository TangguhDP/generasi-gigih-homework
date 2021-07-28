/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlatButton } from "../components/Buttons";
import { setAccessToken } from "../data/userSlice";

export default function Landing(props) {
  const dispatch = useDispatch();
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

  const getHashParams = () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    dispatch(setAccessToken(hashParams.access_token));
    props.onLogin(hashParams);
  };

  useEffect(() => {
    getHashParams();
  }, []);

  return (
    <div className="center">
      <FlatButton
        className="green-button"
        value="Login Spotify"
        onClick={() => loginSpotify()}
      />
    </div>
  );
}
