import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import { ErrorItem } from '../components/ErrorItem';

export default function Home() {
  const userDeezerToken = useSelector((state: RootState) => state.deezer.token);
  const userDeezerData = useSelector((state: RootState) => state.deezer.user);
  const userDeezerError = useSelector((state: RootState) => state.deezer.error);

  return <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <div>TOKEN : { userDeezerToken?.accessToken ?? 'null' }</div>
      <button>Logged into Spotify</button>
      {
        userDeezerError 
        ? <ErrorItem error={userDeezerError} type={'Deezer'} />
        : <>
            <DeezerUserItem user={userDeezerData!} />
            <DeezerPlaylistsItem />
          </>
      } 
    </> 
}
