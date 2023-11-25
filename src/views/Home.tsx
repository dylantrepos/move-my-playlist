import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AccessToken, AccessTokenResponse } from '../types/Login';

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const [accessToken, setAccessToken] = useState<AccessToken>();
  
  useEffect(() => {
    (async () => {
      const accessTokenURL = `${import.meta.env.VITE_DEEZER_AUTH_URL}&code=${code}`
      const accessTokenRequest = await axios.get(accessTokenURL);
      const accessTokenResponse: AccessTokenResponse = await accessTokenRequest.data;
      const {access_token: accessToken, expires} = accessTokenResponse;

      setAccessToken({accessToken, expires});
    })()
  }, [code]);

  return (<>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <p><b>Key :</b> {code}</p>
      <p><b>Token :</b> {accessToken?.accessToken ?? 'Loading...'}</p>
      <p><b>Expires (in seconds) :</b> {accessToken?.expires ?? 'Loading...'}</p>
    </>
  )
}
