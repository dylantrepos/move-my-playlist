import { useDispatch } from "react-redux";
import { DEEZER_AUTH_BASE, SPOTIFY_AUTH_BASE } from "../env";
import { generateCodeChallenge, generateCodeVerifier, setSpotifyCookieToken } from "../utils/utils";
import { SpotifyAccessToken } from "../types/spotify/LoginSpotify";
import { useState } from "react";
import { setSpotifyToken } from "../reducers/spotifyReducer";

type SpotifyMessageEvent = {
  title: string;
  data: SpotifyAccessToken;
}

export default function Login() {
  const dispatch = useDispatch();
  const [isLoggedInSpotify, setIsLoggedInSpotify] = useState(false);
  
 
  
  const connectToDeezerAPI = async () => {
    const deezerUserURL = new URL('/oauth/auth.php', DEEZER_AUTH_BASE);
    deezerUserURL.searchParams.append("app_id", import.meta.env.VITE_DEEZER_APP_ID);
    deezerUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_DEEZER_REDIRECT_URL);
    deezerUserURL.searchParams.append("perms", "basic_access,email");
  
    open(deezerUserURL.toString(), '_blank', 'width=600,height=400');
  }

  const connectToSpotifyAPI = async () => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const spotifyUserURL = new URL('/authorize', SPOTIFY_AUTH_BASE);
    spotifyUserURL.searchParams.append("client_id", import.meta.env.VITE_SPOTIFY_APP_ID);
    spotifyUserURL.searchParams.append("response_type", "code");
    spotifyUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_SPOTIFY_REDIRECT_URL);
    spotifyUserURL.searchParams.append("scope", "user-read-private user-read-email");
    spotifyUserURL.searchParams.append("code_challenge_method", "S256");
    spotifyUserURL.searchParams.append("code_challenge", challenge);

    open(spotifyUserURL.toString(), '_blank', 'width=600,height=400');

    const spotifyPopupListener = (event: MessageEvent<SpotifyMessageEvent>) => {
      const {title, data} = event.data;
      console.log(event.data);
      if (title && title === 'spotify-popup') {
        window.removeEventListener('message', spotifyPopupListener);

        dispatch(setSpotifyToken(data));
        setSpotifyCookieToken(JSON.stringify(data), data.expires);
        setIsLoggedInSpotify(true);
      }
    }

    window.addEventListener('message', spotifyPopupListener); 
  }

  return (
    <>
      <div>
        <p>
          Logged into Deezer to start.
        </p>
        <button onClick={connectToDeezerAPI}>Connect to Deezer</button>
      </div>
      <div>
        <p>
          Logged into Spotify.
        </p>
        {isLoggedInSpotify ? '(logged in successfully)' : ''}
        <button onClick={connectToSpotifyAPI}>Connect to Spotify</button>
      </div> 
    </>
  )
}
