import axios from 'axios';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessToken } from '../types/spotify/SpotifyLogin';

const fetchToken = async (url: string, body: URLSearchParams) => {
  const data = await axios.post(
    url, 
    body,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )

  const token = data.data

  const newToken: SpotifyAccessToken = {
    accessToken: token['access_token'],
    expires: token['expires_in'],
    tokenType: token['token_type'],
    scope: token['scope']
  }

  return newToken;
};

export default function SpotifyRedirection() {
  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';  
  const codeError = queryParams.get('error');  

  if (codeError) {
    window.opener.postMessage({
      title: 'spotify-popup',
      data: null,
    }, '*');
    close();
  }

  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_SPOTIFY_APP_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", import.meta.env.VITE_SPOTIFY_REDIRECT_URL);
  params.append("code_verifier", verifier!);

  console.log({params});
  
  const { isPending, data, error } = useQuery({ 
    queryKey: ['spotify-user-token'], 
    queryFn: () => fetchToken("https://accounts.spotify.com/api/token", params),
  })

  useEffect(() => {
    if (!isPending) {
      // Final user token
      if (!error) {
        opener.postMessage({
          title: 'spotify-popup',
          data: data,
        }, '*');
        window.close();
      } else {
        opener.postMessage({
          title: 'spotify-popup',
          data: error
        }, '*');
        window.close();
      }
    }
  }, [isPending, data])

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>
}
