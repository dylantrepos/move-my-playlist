import { SpotifyLoginItem } from "../components/spotify/SpotifyLoginItem";
import { DeezerLoginItem } from "../components/deezer/DeezerLoginItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate('/home');
    }
  }, [currentConnection])

  return (
    <>
      <DeezerLoginItem updateDeezerConnection={updateDeezerConnection} />
      <SpotifyLoginItem updateSpotifyConnection={updateSpotifyConnection} />
    </>
  )
}
