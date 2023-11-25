import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  
  useEffect(() => {
    (async () => {
      const accessTokenRequest = await axios.get(`${import.meta.env.VITE_DEEZER_AUTH_URL}&code=${code}`);
      const regex = /access_token=([^&]+)&expires=([^&]+)/;
      const matches = accessTokenRequest.data.match(regex);

      if (matches) {
        const accessToken = matches[1];
        const expires = matches[2];
        console.log({accessToken, expires});
      }
    })()
  }, [code])

  const connect = async () => {
    window.open(`${import.meta.env.VITE_DEEZER_AUTH_URL}&code=${code}`, "_self");
    
  }

  return (<>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <h1>Key : {code}</h1>
      <button onClick={connect}>Auth button</button>
    </>
  )
}
