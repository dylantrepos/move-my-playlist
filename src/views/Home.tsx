import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AccessTokenResponse } from '../types/Login';
import UserProfilItem from '../components/UserProfilItem';
import PlaylistDeezerItem from '../components/PlaylistDeezerItem';

export default function Home() {
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  return userDeezerToken?.access_token ? 
    <>
      <div>Home</div>
      <div>TOKEN : { userDeezerToken?.access_token ?? 'null' }</div>
      <Link to={'/'}>go back to connection</Link>
      <UserProfilItem />
      <PlaylistDeezerItem />
    </> 
    : ''
}
