import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import { ErrorItem } from '../components/ErrorItem';
import './styles/DeezerToSpotify.scss';

export default function DeezerToSpotify() {
  const userDeezerError = useSelector((state: RootState) => state.deezer.error);

  return (
  <div className='deezerToSpotify__main-container'>
    <h1 className='deezerToSpotify__title'>Choose the playlist</h1>
    {/* <div style={{display: 'flex', gap: '10px'}}>
      <div style={{width: '50%', padding: '0 20px', border: '#a238ff 1px solid'}}>{
        userDeezerError 
        ? <ErrorItem error={userDeezerError} type={'Deezer'} />
        : <>
            <DeezerUserItem />
            <DeezerPlaylistsItem />
          </>
      }</div>
    </div> */}
    <div className='deezerToSpotify__playlist-container'>
      <DeezerPlaylistsItem />
    </div>
  </div> 
  )
}
