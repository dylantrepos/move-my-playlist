import { useCallback, useEffect, useState } from "react";
import { generateCodeChallenge, generateCodeVerifier, openPopup } from "../../utils/utils";
import { SPOTIFY_AUTH_BASE } from "../../env";
import { setSpotifyToken } from "../../reducers/spotifyReducer";
import { SpotifyAccessToken } from "../../types/spotify/SpotifyLogin";
import { useDispatch } from "react-redux";
import SpotifyLogo from '../../assets/images/spotify-lg.png';
import { setSpotifyCookieToken } from "../../utils/cookie";

type SpotifyMessageEvent = {
  title: string;
  data: SpotifyAccessToken | null;
}


type Props = {
  updateSpotifyConnection: () => void;
  isLogged: boolean;
}

export const SpotifyLoginItem = ({ updateSpotifyConnection, isLogged }: Props) => {
  const [isLoggedInSpotify, setIsLoggedInSpotify] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const spotifyPopupListener = useCallback((event: MessageEvent<SpotifyMessageEvent>) => {
    const {title, data} = event.data;
    
    if (title && title === 'spotify-popup') {
      setIsPopupOpen(false);
      window.removeEventListener('message', spotifyPopupListener);

      if (data) {
        dispatch(setSpotifyToken(data));
        setSpotifyCookieToken(JSON.stringify(data), data['expires_in']);
        setIsLoggedInSpotify(true);
        
        updateSpotifyConnection();
      } 
    }
  }, [])

  const connectToSpotifyAPI = async () => {
    if (!isPopupOpen && !isLoggedInSpotify && !isLogged) {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      setIsPopupOpen(true);
  
      localStorage.setItem("verifier", verifier);
      
      const scope = [
        'playlist-read-private',
        'user-read-private',
        'user-library-read',
        'user-read-email',
        'playlist-modify-public',
        'playlist-modify-private',
      ]
  
      const spotifyUserURL = new URL('/authorize', SPOTIFY_AUTH_BASE);
      spotifyUserURL.searchParams.append("client_id", import.meta.env.VITE_SPOTIFY_APP_ID);
      spotifyUserURL.searchParams.append("response_type", "code");
      spotifyUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_SPOTIFY_REDIRECT_URL);
      spotifyUserURL.searchParams.append("scope", scope.join(' '));
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

  return (
    <button className={`login__button-spotify ${isLoggedInSpotify || isLogged ? '-logged' : ''}`} onClick={connectToSpotifyAPI} disabled={isLoggedInSpotify || isLogged}>
      <img className="login__button-spotify-image" src={SpotifyLogo} />
      <p className="login__button-spotify-title">{isLoggedInSpotify || isLogged ? 'Connected' : 'Connect to Spotify'}</p>
    </button>
  )
}
