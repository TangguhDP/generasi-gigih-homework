import Landing from "./pages/Landing";
import Playlist from "./pages/Playlist";

import "./App.css";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState({ status: false, params: {} });
  const getAccessToken = (params) => {
    if (params?.access_token) {
      setIsLogin({ status: true, params: params });
    }
  };

  return isLogin.status ? (
    <Playlist params={isLogin.params} />
  ) : (
    <Landing onLogin={getAccessToken} />
  );
}

export default App;
