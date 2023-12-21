import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.scss';

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
    if (currentConnection.deezer && currentConnection.spotify) {
      setTimeout(() => navigate('/home'), 500)
      ;
    }
  }, [currentConnection])

  return (
    <div className="login__main-container">
      <h1 className="login__main-title">
        Start by login you on each platform
      </h1>
      <DeezerLoginItem updateDeezerConnection={updateDeezerConnection} />
      <SpotifyLoginItem updateSpotifyConnection={updateSpotifyConnection} />
    </div>
  )
}
