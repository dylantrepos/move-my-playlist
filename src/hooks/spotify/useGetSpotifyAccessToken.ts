import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessToken, SpotifyAccessTokenResponse } from '../../types/spotify/SpotifyLogin';
import { setSpotifyToken } from '../../reducers/spotifyReducer';
import { setSpotifyCookieToken } from '../../utils/utils';

// const fetchToken = async (url: string) => (await axios(url)).data;
const fetchToken = async () => {
  const params: Record<string, string | null> = {
    'client_id': import.meta.env?.VITE_SPOTIFY_APP_ID ?? null,
    'client_secret': import.meta.env?.VITE_SPOTIFY_SECRET_KEY ?? null,
    'grant_type': 'client_credentials'
  };

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const data = await axios.post(
    'spotify-token', 
    params,
    { headers }
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

export const useGetSpotifyAccessToken = (): [SpotifyAccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<SpotifyAccessToken>();
  const dispatch = useDispatch();
  
  const { isPending, data, error } = useQuery({ 
    queryKey: ['spotify-token'], 
    queryFn: () => fetchToken(),
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setSpotifyToken(data));
      setSpotifyCookieToken(JSON.stringify(data), data.expires);
      setToken(data);
    }
  }, [isPending]);

  return [token, isPending, error];
}