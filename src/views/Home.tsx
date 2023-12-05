import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import { ErrorItem } from '../components/ErrorItem';
import { SpotifyUserItem } from '../components/spotify/SpotifyUserItem';
import { SpotifyCreatePlaylist } from '../components/spotify/SpotifyCreatePlaylist';
import { SpotifyPlaylistsItem } from '../components/spotify/SpotifyPlaylistsItem';

export default function Home() {
  const userDeezerError = useSelector((state: RootState) => state.deezer.error);

  return <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <div style={{display: 'flex', gap: '10px'}}>
        <div style={{width: '50%', padding: '0 20px', border: '#a238ff 1px solid'}}>{
          userDeezerError 
          ? <ErrorItem error={userDeezerError} type={'Deezer'} />
          : <>
              <DeezerUserItem />
              <DeezerPlaylistsItem />
            </>
        }</div>
        <div style={{width: '50%', padding: '0 20px', border: '#49d761 1px solid'}}>
          <SpotifyUserItem />
          {/* <SpotifyPlaylistsItem /> */}
          <SpotifyCreatePlaylist />
        </div>
      </div>
    </> 
}
