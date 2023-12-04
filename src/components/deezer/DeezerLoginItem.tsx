import { useCallback, useEffect, useState } from "react";
import { openPopup, setDeezerCookieToken } from "../../utils/utils";
import { DEEZER_AUTH_BASE } from "../../env";
import { useDispatch } from "react-redux";
import { setDeezerToken } from "../../reducers/deezerReducer";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";

type DeezerMessageEvent = {
  title: string;
  data: DeezerAccessToken | null;
}

type Props = {
  updateDeezerConnection: () => void;
}


export const DeezerLoginItem = ({ updateDeezerConnection }: Props) => {
  const [isLoggedInDeezer, setIsLoggedInDeezer] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const deezerPopupListener = useCallback((event: MessageEvent<DeezerMessageEvent>) => {
    const {title, data} = event.data;
    console.log(event.data);
    if (title && title === 'deezer-popup') {
      setIsPopupOpen(false);
      window.removeEventListener('message', deezerPopupListener);

      if (data) {
        dispatch(setDeezerToken(data));
        setDeezerCookieToken(JSON.stringify(data), data.expires);
        setIsLoggedInDeezer(true);

        updateDeezerConnection();
      } 
    }
  }, [])
  
  const connectToSpotifyAPI = async () => {
    if (!isPopupOpen) {
      const deezerUserURL = new URL('/oauth/auth.php', DEEZER_AUTH_BASE);
      deezerUserURL.searchParams.append("app_id", import.meta.env.VITE_DEEZER_APP_ID);
      deezerUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_DEEZER_REDIRECT_URL);
      deezerUserURL.searchParams.append("perms", "basic_access,email");
      
      const popup = openPopup(deezerUserURL.toString());
      setIsPopupOpen(true);

      const checkPopupClosed = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed); 
          setIsPopupOpen(false);
          window.removeEventListener('message', deezerPopupListener);
        }
      }, 1000);
      
      window.removeEventListener('message', deezerPopupListener);
      window.addEventListener('message', deezerPopupListener); 
    }
  }

  useEffect(() => 
    () => { 
      window.removeEventListener('message', deezerPopupListener);

    }
  , [])

  return (<>
      <p>
        Logged into Deezer.
      </p>
      {isLoggedInDeezer ? '✅' : ''}
      <button onClick={connectToSpotifyAPI}>Connect to Deezer</button>
  </>)
}
