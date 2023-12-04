import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { setDeezerCookieToken } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { setDeezerToken } from '../reducers/deezerReducer';
import { useEffect } from 'react';
import { useGetDeezerAccessToken } from '../hooks/deezer/useGetDeezerAccessToken';

export default function DeezerRedirection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';  
  const [token, isPending, error] = useGetDeezerAccessToken(code);

  
  useEffect(() => {
      if (!isPending && token?.accessToken) {
        setDeezerCookieToken(JSON.stringify(token), token.expires);
        dispatch(setDeezerToken(token));

        navigate('/home');
      }
  }, [isPending, token]);

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>

  return <h1>OK</h1>
}
