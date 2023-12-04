import axios from 'axios';
import { DEEZER_AUTH_BASE, SPOTIFY_AUTH_BASE, SPOYIFY_AUTH_BASE } from '../../env';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeezerToken } from '../../reducers/deezerReducer';
import { AccessToken } from '../../types/deezer/DeezerLogin';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessToken, SpotifyAccessTokenResponse } from '../../types/spotify/LoginSpotify';
import { setSpotifyToken } from '../../reducers/spotifyReducer';
import { setSpotifyCookieToken } from '../../utils/utils';

// const fetchToken = async (url: string) => (await axios(url)).data;
const fetchToken = async (url: string) => {
  const data = await axios.post(
    url, 
    {
      'client_id': import.meta.env?.VITE_SPOTIFY_APP_ID ?? null,
      'client_secret': import.meta.env?.VITE_SPOTIFY_SECRET_KEY ?? null,
      'grant_type': 'client_credentials'
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  )

  const token: SpotifyAccessTokenResponse = data.data

  if (token) {
    const newToken: SpotifyAccessToken = {
      accessToken: token['access_token'],
      expires: token['expires_in'],
      tokenType: token['token_type']
    }

    return newToken;
  }


};

export const useGetSpotifyAccessToken = (): [AccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<AccessToken>();
  const dispatch = useDispatch();

  const spotifyAuthURL = new URL('/api/token', SPOTIFY_AUTH_BASE);
  
  // Refetch after 30 minutes (in milliseconds)
  const { isPending, data, error } = useQuery({ 
    queryKey: ['spotify-token'], 
    queryFn: () => fetchToken(spotifyAuthURL.toString()),
    staleTime: 18000000,
  })

  useEffect(() => {
    if (!isPending && data) {
      // dispatch(setDeezerToken(newToken));
      dispatch(setSpotifyToken(data));
      setSpotifyCookieToken(JSON.stringify(data), data.expires);
      setToken(data);
    }
  }, [isPending]);

  return [token, isPending, error];
}