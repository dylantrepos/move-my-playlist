import { useLocation } from 'react-router';
import { setDeezerCookieToken } from '../utils/cookie';
import { useDispatch } from 'react-redux';
import { setDeezerToken } from '../reducers/deezerReducer';
import { useEffect } from 'react';
import { useGetDeezerAccessToken } from '../hooks/deezer/useGetDeezerAccessToken';

export default function DeezerRedirection() {
  const dispatch = useDispatch();

  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';  
  const [token, isPending, error] = useGetDeezerAccessToken(code);

  
  useEffect(() => {
      if (!isPending && token) {
        setDeezerCookieToken(JSON.stringify(token), token.expires);
        dispatch(setDeezerToken(token));

        console.log({token});

        window.opener.postMessage({
          title: 'deezer-popup',
          data: error ?? token,
        }, '*');
        window.close();
      }
  }, [isPending, token]);

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>
}
