import { useCallback, useEffect, useState } from "react";
import { generateCodeChallenge, generateCodeVerifier, openPopup, setSpotifyCookieToken } from "../../utils/utils";
import { SPOTIFY_AUTH_BASE } from "../../env";
import { setSpotifyToken } from "../../reducers/spotifyReducer";
import { SpotifyAccessToken } from "../../types/spotify/SpotifyLogin";
import { useDispatch } from "react-redux";

type SpotifyMessageEvent = {
  title: string;
  data: SpotifyAccessToken | null;
}


type Props = {
  updateSpotifyConnection: () => void;
}

export const SpotifyLoginItem = ({ updateSpotifyConnection }: Props) => {
  const [isLoggedInSpotify, setIsLoggedInSpotify] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const spotifyPopupListener = useCallback((event: MessageEvent<SpotifyMessageEvent>) => {
    const {title, data} = event.data;
    console.log(event.data);
    if (title && title === 'spotify-popup') {
      setIsPopupOpen(false);
      window.removeEventListener('message', spotifyPopupListener);

      if (data) {
        dispatch(setSpotifyToken(data));
        setSpotifyCookieToken(JSON.stringify(data), data.expires);
        setIsLoggedInSpotify(true);
        
        updateSpotifyConnection();
      } 
    }
  }, [])

  const connectToSpotifyAPI = async () => {
    if (!isPopupOpen) {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      setIsPopupOpen(true);
  
      localStorage.setItem("verifier", verifier);
  
      const spotifyUserURL = new URL('/authorize', SPOTIFY_AUTH_BASE);
      spotifyUserURL.searchParams.append("client_id", import.meta.env.VITE_SPOTIFY_APP_ID);
      spotifyUserURL.searchParams.append("response_type", "code");
      spotifyUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_SPOTIFY_REDIRECT_URL);
      spotifyUserURL.searchParams.append("scope", "playlist-read-private user-read-private user-read-email");
      spotifyUserURL.searchParams.append("code_challenge_method", "S256");
      spotifyUserURL.searchParams.append("code_challenge", challenge);
  
      const popup = openPopup(spotifyUserURL.toString());

      const checkPopupClosed = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed); 
          setIsPopupOpen(false);
          window.removeEventListener('message', spotifyPopupListener);
        }
      }, 1000);
      
      window.removeEventListener('message', spotifyPopupListener);
      window.addEventListener('message', spotifyPopupListener); 
    }
  }

  useEffect(() => 
    () => { window.removeEventListener('message', spotifyPopupListener) }
  , [])

  return (<>
      <p>
        Logged into Spotify.
      </p>
      {isLoggedInSpotify ? '✅' : ''}
      <button onClick={connectToSpotifyAPI}>Connect to Spotify</button>
  </>)
}
