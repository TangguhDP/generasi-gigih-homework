import Playlist from "./pages/Playlist";
import Data from "./data/ManyData";
import "./App.css";

function App() {
  return Data.map((obj, i) => {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Create Playlist</h1>
        <Playlist
          key={i}
          height={obj.album.images[0].height}
          imgUrl={obj.album.images[0].url}
          title={obj.name}
          artistName={obj.artists[0].name}
          albumName={obj.album.name}
        />
      </>
    );
  });
}

export default App;
