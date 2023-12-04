import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import { ErrorItem } from '../components/ErrorItem';
import { SpotifyUserItem } from '../components/spotify/SpotifyUserItem';

export default function Home() {
  const userDeezerError = useSelector((state: RootState) => state.deezer.error);

  return <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <div style={{display: 'flex'}}>
        <div style={{width: '50%'}}>{
          userDeezerError 
          ? <ErrorItem error={userDeezerError} type={'Deezer'} />
          : <>
              <DeezerUserItem />
              <DeezerPlaylistsItem />
            </>
        }</div>
        <div style={{width: '50%'}}>{
          <SpotifyUserItem />
        }</div>
      </div>
    </> 
}
