import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.scss';
import { getCookieDeezerToken, getCookieSpotifyToken } from "../utils/cookie";

export default function Login() {
  const navigate = useNavigate();
  const [currentConnection, setCurrentConnection] = useState({
    deezer: false,
    spotify: false,
  })
  const hasLoaded = useRef(false);

  const updateDeezerConnection = () => setCurrentConnection((old) => ({ ...old, deezer: true }));
  const updateSpotifyConnection = () => setCurrentConnection((old) => ({...old, spotify: true}));

  useEffect(() => {
    if(hasLoaded.current) {
      const checkExistingTokens = async () => {
        console.log('hello');
        const deezerCookieToken = await getCookieDeezerToken();
        const spotifyCookieToken = await getCookieSpotifyToken();
  
        if (deezerCookieToken && !currentConnection.deezer) updateDeezerConnection();
        if (spotifyCookieToken && !currentConnection.spotify) updateSpotifyConnection();
      }
  
       checkExistingTokens();

       console.log({currentConnection});
  
      if (currentConnection.deezer && currentConnection.spotify) {
        setTimeout(() => navigate('/home'), 500);
      }
    }

    return () => {
      hasLoaded.current = true;
    }
  }, [currentConnection, navigate])

  return (
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
