import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

import { DEEZER_AUTH_BASE } from '../env';
import { useQuery } from '@tanstack/react-query';
import { setCookieDeezerToken } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { setUserTokenDeezerData } from '../reducers/userDeezerReducer';
import { useEffect } from 'react';
import axios from 'axios';

// Generate access token
const URL_PARAMS: Record<string, string | null> = {
  "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
  "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
  "output": "json",
}

export default function DeezerRedirection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';  

  const deezerAuthURL = new URL('/oauth/access_token.php', DEEZER_AUTH_BASE);

  for (const [key, value] of Object.entries({...URL_PARAMS, code})) {
    if (value) deezerAuthURL.searchParams.append(key, value);
  }

  const { isPending, data, error } = useQuery({ queryKey: ['deezer-token'], queryFn: async () => {
    const req = await axios(deezerAuthURL.toString());
    return req.data;
  }})
  
  useEffect(() => {
    
      if (!isPending && data['access_token']) {
        const token = {
          accessToken: data['access_token'],
          expires: data.expires
        }
        setCookieDeezerToken(JSON.stringify(token), data.expires);
        dispatch(setUserTokenDeezerData(token));

        navigate('/home');
      }

  }, [isPending]);

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>

  return <h1>OK</h1>
}
