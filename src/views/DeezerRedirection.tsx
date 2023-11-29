import { useEffect} from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useGenerateAccessToken } from '../hooks/useGetAccessToken';
import { setCookieDeezerToken } from '../utils/utils';

export default function DeezerRedirection() {
  const navigate = useNavigate();

  // Get code from URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';
  
  // Generate access token
  const [accessToken] = useGenerateAccessToken(code);

  useEffect(() => {
    if (accessToken.expires > 0) {
      setCookieDeezerToken(JSON.stringify(accessToken), accessToken?.expires ?? 0);
      navigate('/home');
    }
  }, [accessToken]);

  return <div>Redirection...</div>
}
