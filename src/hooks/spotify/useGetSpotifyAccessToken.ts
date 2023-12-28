import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { SpotifyAccessToken } from '../../types/spotify/SpotifyLogin';
import { setSpotifyToken } from '../../reducers/spotifyReducer';
import { setSpotifyCookieToken } from '../../utils/cookie';
import { fetchSpotifyToken } from '../../services/spotifyApi';

export const useGetSpotifyAccessToken = (): [SpotifyAccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<SpotifyAccessToken>();
  const dispatch = useDispatch();
  
  const { isPending, data, error } = useQuery({ 
    queryKey: ['spotify-token'], 
    queryFn: () => fetchSpotifyToken(),
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setSpotifyToken(data));
      setSpotifyCookieToken(JSON.stringify(data), data['expires_in']);
      setToken(data);
    }
  }, [isPending]);

  return [token, isPending, error];
}