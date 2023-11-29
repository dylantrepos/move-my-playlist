import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfil from '../components/UserProfilItem';
import { RootState } from '../store/store';
import PlaylistDeezer from '../components/PlaylistDeezerItem';
import { AccessTokenResponse } from '../types/Login';

export default function Home() {
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  return userDeezerToken?.access_token ? 
    <>
      <div>Home</div>
      <div>TOKEN : { userDeezerToken?.access_token ?? 'null' }</div>
      <Link to={'/'}>go back to connection</Link>
      <UserProfil />
      <PlaylistDeezer />
    </> 
    : ''
}
