import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { setCookieDeezerToken } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { setUserTokenDeezerData } from '../reducers/userDeezerReducer';
import { useEffect } from 'react';
import { useGenerateAccessToken } from '../hooks/useGetAccessToken';

export default function DeezerRedirection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';  
  const [token, isPending, error] = useGenerateAccessToken(code);

  
  useEffect(() => {
      if (!isPending && token?.accessToken) {
        setCookieDeezerToken(JSON.stringify(token), token.expires);
        dispatch(setUserTokenDeezerData(token));

        navigate('/home');
      }
  }, [isPending, token]);

  if (isPending) 
    return <span>Loading...</span>
  if (error) 
    return <span>Error: {error.message}</span>

  return <h1>OK</h1>
}
