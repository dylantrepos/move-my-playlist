import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.scss';
import { getCookieDeezerToken } from "../utils/cookie";

export default function Login() {
  const navigate = useNavigate();
  const [currentConnection, setCurrentConnection] = useState({
    deezer: false,
    spotify: false,
  })

  const updateDeezerConnection = () => setCurrentConnection((old) => ({ ...old, deezer: true }));
  const updateSpotifyConnection = () => setCurrentConnection((old) => ({...old, spotify: true}));

  useEffect(() => {
    console.log({currentConnection});
    const checkExistingTokens = async () => {
      const deezerCookieToken = await getCookieDeezerToken();

      /**
       * ! TODO : intégrer cookie state dans DeezerLoginItem pour le mettre en vert
       * ! Check log, currentConn call too many times
       */
      
      if (deezerCookieToken) updateDeezerConnection();
    }

    checkExistingTokens();

    if (currentConnection.deezer && currentConnection.spotify) {
      setTimeout(() => navigate('/home'), 500);
    }
  }, [currentConnection])

  return (
    <div className="login__main-container">
      <h1 className="login__main-title">
        Start by login you on each platform
      </h1>
      <DeezerLoginItem updateDeezerConnection={updateDeezerConnection} isLogged={currentConnection.deezer} />
      <SpotifyLoginItem updateSpotifyConnection={updateSpotifyConnection} />
    </div>
  )
}
