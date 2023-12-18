import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { ErrorItem } from '../components/ErrorItem';
import { SpotifyUserItem } from '../components/spotify/SpotifyUserItem';
import { SpotifyPlaylistsItem } from '../components/spotify/SpotifyPlaylistsItem';
import { DeezerCreatePlaylistItem } from '../components/deezer/DeezerCreatePlaylistItem';

export default function SpotifyToDeezer() {
  const userDeezerError = useSelector((state: RootState) => state.deezer.error);

  return <>
      <div>Spotify To Deezer</div>
      <Link to={'/home'}>go back to home</Link>
      <div style={{display: 'flex', gap: '10px'}}>
        <div style={{width: '50%', padding: '0 20px', border: '#49d761 1px solid'}}>{
          userDeezerError 
          ? <ErrorItem error={userDeezerError} type={'Deezer'} />
          : <>
              <SpotifyUserItem />
              <SpotifyPlaylistsItem />
            </>
        }</div>
        <div style={{width: '50%', padding: '0 20px', border: '#a238ff 1px solid'}}>
          <DeezerUserItem />
          <DeezerCreatePlaylistItem />
        </div>
      </div>
    </> 
}
