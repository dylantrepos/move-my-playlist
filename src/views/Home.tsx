import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfil from '../components/UserProfilItem';
import { RootState } from '../store/store';
import PlaylistDeezer from '../components/PlaylistDeezerItem';
import { AccessTokenResponse } from '../types/Login';


export default function Home() {
  const userDeezerData = useSelector((state: RootState) => state.userDeezer);
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (Object.keys(userDeezerData).length === 0) {
      // Populate retreive with token saved
      // Save token in cookie ? 
    }
  }, [userDeezerData]);

  return (
    <>
      <div>Home</div>
      <div>TOKEN : { userDeezerToken?.access_token ?? 'null' }</div>
      <Link to={'/'}>go back to connection</Link>
      <UserProfil />
      <PlaylistDeezer />
    </>
  )
}
