import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormAddPlaylist from "../components/FormAddPlaylist";
import ListTracks from "../components/ListTracks";
import Track from "../components/Track";
import { UserGlobal } from "../types";

export default function Playlist() {
  const history = useHistory();
  const [result, setResult] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>({});
  const [tracksSelected, setTracksSelected] = useState<Array<string>>([]);
  const [playlistForm, setPlaylistForm] = useState({
    title: "",
    description: "",
  });
  const user_access_token = useSelector(
    (state: { user: UserGlobal }) => state.user.access_token
  );

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_access_token !== ""]);

  const getUser = () => {
    fetch(`https://api.spotify.com/v1/me`, {
      headers: { Authorization: "Bearer " + user_access_token },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
      });
  };

  const getSearchResult = () => {
    fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
      headers: { Authorization: "Bearer " + user_access_token },
    })
      .then((response) => response.json())
      .then((response) => setResult(response.tracks));
  };

  const createPlaylist = () => {
    return fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user_access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: playlistForm.title,
        description: playlistForm.description,
        public: false,
      }),
    })
      .then((response) => response.json())
      .catch((err) => alert(err));
  };

  const addTrackToPlaylist = (playlistID: string) => {
    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user_access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        uris: tracksSelected,
      }),
    })
      .then((response) => response.json())
      .catch((err) => alert(err));
  };

  const onDeselect = (trackURI: string) => {
    const newTracksSelected = tracksSelected.filter(
      (track) => track !== trackURI
    );
    setTracksSelected([...newTracksSelected]);
  };

  const onSelect = (trackURI: string) => {
    setTracksSelected([...tracksSelected, trackURI]);
  };

  const handleOnChange = (input: any) => {
    const { name, value } = input.target;
    setPlaylistForm({ ...playlistForm, [name]: value });
  };

  const handleOnSubmit = async (e: HTMLFormElement) => {
    e.preventDefault();
    const playlist = await createPlaylist();
    addTrackToPlaylist(playlist.id);
    alert("Playlist created");
    clearState();
  };

  const clearState = () => {
    setTracksSelected([]);
    setPlaylistForm({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Playlist Search</h1>
      <button
        className="absolute top-2 left-2 border-2 border-black rounded-sm py-1 px-4"
        onClick={() => history.push("/")}
      >
        Back
      </button>
      <div className="row-center mt-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="input-text"
          type="text"
          name="search"
        />
        <button
          onClick={() => getSearchResult()}
          className="search-button"
          type="button"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col justify-center text-center">
        <h2>Create your playlist</h2>
        <div className="header-wrapper">
          <FormAddPlaylist
            data={playlistForm}
            handleOnSubmit={handleOnSubmit}
            handleOnChange={handleOnChange}
          />
          <ListTracks tracksSelected={tracksSelected} />
        </div>
      </div>
      {result ? (
        <>
          <h3 className="text-center my-4 font-bold">
            Showing {result?.items?.length} tracks
          </h3>
          <div className="grid-view">
            {result.items.map((track: any, i: number) => {
              return (
                <Track
                  key={i}
                  height={track.album.images[0].height}
                  imgUrl={track.album.images[0].url}
                  title={track.name}
                  artistName={track.artists[0].name}
                  albumName={track.album.name}
                  onSelected={() => onSelect(track.uri)}
                  selected={tracksSelected.some(
                    (trackURI) => trackURI === track.uri
                  )}
                  onDeselected={() => onDeselect(track.uri)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Tracks Show</h3>
      )}
    </>
  );
}
