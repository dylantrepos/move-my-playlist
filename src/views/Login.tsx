import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();


  const codeDeezer = queryParams.get('code');
  const errorCodeDeezer = queryParams.get('error_reason');

  const connectToDeezerAPI = async () => {
    window.open(import.meta.env.VITE_DEEZER_URL, "_self");
  }

  useEffect(() => {
    console.log('code : ', codeDeezer ?? 'no code');
    if (codeDeezer) navigate("/home", { state: { key: codeDeezer } })
  }, [])


  return (
    <>
      <div>
        <p>
          Hello world
        </p>
        <button onClick={connectToDeezerAPI}>Connect to Deezer</button>
      </div>
    </>
  )
}
