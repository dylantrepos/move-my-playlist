import { useCallback, useEffect, useState } from "react";
import { openPopup } from "../../utils/utils";
import { DEEZER_AUTH_BASE } from "../../env";
import { useDispatch } from "react-redux";
import { setDeezerToken } from "../../reducers/deezerReducer";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import DeezerLogo from '../../assets/images/deezer-lg.png';
import { setDeezerCookieToken } from "../../utils/cookie";

type DeezerMessageEvent = {
  title: string;
  data: DeezerAccessToken | null;
}

type Props = {
  updateDeezerConnection: () => void;
  isLogged: boolean;
}


export const DeezerLoginItem = ({ updateDeezerConnection, isLogged }: Props) => {
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
  
  const connectToDeezerAPI = async () => {
    if (!isPopupOpen && !isLoggedInDeezer && !isLogged) {
      const deezerUserURL = new URL('/oauth/auth.php', DEEZER_AUTH_BASE);
      deezerUserURL.searchParams.append("app_id", import.meta.env.VITE_DEEZER_APP_ID);
      deezerUserURL.searchParams.append("redirect_uri", import.meta.env.VITE_DEEZER_REDIRECT_URL);

      const perms = [
        'basic_access',
        'email',
        'manage_library',
      ].join(',')

      deezerUserURL.searchParams.append("perms", perms);
      
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

  return (
    <button className={`login__button-deezer ${isLoggedInDeezer || isLogged ? '-logged' : ''}`} onClick={connectToDeezerAPI} disabled={isLoggedInDeezer || isLogged}>
      <img className="login__button-deezer-image" src={DeezerLogo}/>
      <p className="login__button-deezer-title">{isLoggedInDeezer || isLogged ? 'Connected' : 'Connect to Deezer'}</p>
    </button>
  )
}
