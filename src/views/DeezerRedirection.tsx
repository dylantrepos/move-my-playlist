import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { AccessToken } from '../types/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylistDeezerData, setUserDeezerData, setUserTokenDeezerData } from '../reducers/userDeezerReducer';
import { RootState } from '../store/store';
import { useNavigate } from "react-router-dom";
import { useGenerateAccessToken } from '../hooks/useGetAccessToken';

export default function DeezerRedirection() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') ?? '';
  const userDeezerData = useSelector((state: RootState) => state.userDeezer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accessToken, isLoading] = useGenerateAccessToken(code);
  
  console.log('change ! ', isLoading);

  useEffect(() => {
    if (!isLoading) {
      (async () => {
          // Get Deezer user data
          const checkUserDataRequest = await axios.get(`https://api.deezer.com/user/me?access_token=${accessToken.access_token}`);
          const checkUserDataResponse = await checkUserDataRequest.data;
          
          // Get Deezer user playlists
          const checkUserPlaylistsRequest = await axios.get(`https://api.deezer.com/user/me/playlists?access_token=${accessToken.access_token}`);
          const checkUserPlaylistsResponse = await checkUserPlaylistsRequest.data;
  
          // User added in store
          if (checkUserDataResponse 
              && !Object.keys(checkUserDataResponse).includes('error')) {
            dispatch(setUserTokenDeezerData(accessToken));
            dispatch(setUserDeezerData(checkUserDataResponse));
            dispatch(setPlaylistDeezerData(checkUserPlaylistsResponse.data));
      
            console.log('data user ! ', userDeezerData);
            console.log('playlist ! ', checkUserPlaylistsResponse);
            setTimeout(() => navigate('/home'), 500);
          }
        })()
    }
  }, [isLoading])

  return (<>
      <div>Redirection...</div>
      <Link to={'/'}>go back to connection</Link>
      <p><b>Key :</b> {code}</p>
      {
        !isLoading 
          ? <p><b>Key :</b> {JSON.stringify(accessToken)}</p> 
          : ''
      }
    </>
  )
}
