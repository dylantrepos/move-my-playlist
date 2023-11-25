import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AccessToken, AccessTokenResponse } from '../types/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDeezerData } from '../reducers/userDeezerReducer';
import { RootState } from '../store/store';
import { useNavigate } from "react-router-dom";

export default function DeezerRedirection() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const [accessToken, setAccessToken] = useState<AccessToken>();
  const userDeezerData = useSelector((state: RootState) => state.userDeezer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      const accessTokenURL = `${import.meta.env.VITE_DEEZER_AUTH_URL}&code=${code}`
      const accessTokenRequest = await axios.get(accessTokenURL);
      const accessTokenResponse: AccessTokenResponse = await accessTokenRequest.data;
      const {access_token: accessToken, expires} = accessTokenResponse;
      const checkUserDataRequest = await axios.get(`https://api.deezer.com/user/me?access_token=${accessToken}`);
      const checkUserDataResponse = await checkUserDataRequest.data;

      // User added in store
      if (checkUserDataResponse 
          && !Object.keys(checkUserDataResponse).includes('error')) {
        dispatch(setUserDeezerData(checkUserDataResponse));
  
        setAccessToken({accessToken, expires});
        console.log('checked ! ', userDeezerData);
        setTimeout(() => navigate('/home'), 2000);
      }
    })()
  }, [code]);

  return (<>
      <div>Redirection...</div>
      <Link to={'/'}>go back to connection</Link>
      <p><b>Key :</b> {code}</p>
      <p><b>Token :</b> {accessToken?.accessToken ?? 'Loading...'}</p>
      <p><b>Expires (in seconds) :</b> {accessToken?.expires ?? 'Loading...'}</p>
    </>
  )
}
