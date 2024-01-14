import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.scss';
import { getCookieDeezerToken, getCookieSpotifyToken } from "../utils/cookie";

export default function Login() {
  const navigate = useNavigate();
  const [currentConnection, setCurrentConnection] = useState({
    deezer: false,
    spotify: false,
  })

  const [isCookieCheckLoaded, setIsCookieCheckLoaded] = useState(false);

  const updateDeezerConnection = () => setCurrentConnection((old) => ({ ...old, deezer: true }));
  const updateSpotifyConnection = () => setCurrentConnection((old) => ({...old, spotify: true}));

  useEffect(() => {
      const checkExistingTokens = async () => {
        const deezerCookieToken = await getCookieDeezerToken();
        const spotifyCookieToken = await getCookieSpotifyToken();
  
        if (deezerCookieToken && !currentConnection.deezer) updateDeezerConnection();
        if (spotifyCookieToken && !currentConnection.spotify) updateSpotifyConnection();

        setIsCookieCheckLoaded(true);
      }
  
       checkExistingTokens();
  
      if (currentConnection.deezer && currentConnection.spotify) {
        setTimeout(() => navigate('/home'), 500);
      }
  }, [currentConnection, navigate])

  return isCookieCheckLoaded && (
    <div className="login__main-container">
      <h1 className="login__main-title">
        Start by login you on each platform
      </h1>
      <DeezerLoginItem 
        updateDeezerConnection={updateDeezerConnection} 
        isLogged={currentConnection.deezer} 
      />
      <SpotifyLoginItem 
        updateSpotifyConnection={updateSpotifyConnection}
        isLogged={currentConnection.spotify}
      />
    </div>
  )
}
