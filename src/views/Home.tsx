import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserProfilItem } from '../components/UserProfilItem';
import { PlaylistDeezerItem } from '../components/PlaylistsDeezerItem';
import { ErrorItem } from '../components/ErrorItem';

export default function Home() {
  const userDeezerToken = useSelector((state: RootState) => state.userDeezer.token);
  const userDeezerData = useSelector((state: RootState) => state.userDeezer.user);
  // const userDeezerPlaylist = useSelector((state: RootState) => state.userDeezer.playlist);
  const userDeezerError = useSelector((state: RootState) => state.userDeezer.error);

  // console.log(userDeezerToken);
  // console.log(userDeezerToken?.access_token);

  return <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <div>TOKEN : { userDeezerToken?.accessToken ?? 'null' }</div>
      {
        userDeezerError 
        ? <ErrorItem error={userDeezerError} type={'Deezer'} />
        : <>
            <UserProfilItem user={userDeezerData!} />
            <PlaylistDeezerItem />
          </>
      } 
    </> 
}
