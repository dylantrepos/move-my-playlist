import axios from 'axios';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessToken } from '../types/spotify/LoginSpotify';

const fetchToken = async (url: string, body: URLSearchParams) => {
  console.log('fetching a');
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
    tokenType: token['token_type']
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
  params.append("redirect_uri", "http://localhost:5173/spotify-redirection");
  params.append("code_verifier", verifier!);
  
  const { isPending, data, error } = useQuery({ 
    queryKey: ['spotify-user-token'], 
    queryFn: () => fetchToken("https://accounts.spotify.com/api/token", params),
  })

  useEffect(() => {
    if (!isPending) {
      // Final user token
      if (!error) {
        window.opener.postMessage({
          title: 'spotify-popup',
          data: data,
        }, '*');
        window.close();
      } else {
        window.opener.postMessage({
          title: 'spotify-popup',
          data: error
        }, '*');
        window.close();
      }
    }
  }, [isPending])

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>
}
