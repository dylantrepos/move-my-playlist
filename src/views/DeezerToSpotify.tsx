import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { DeezerUserItem } from '../components/deezer/DeezerUserItem';
import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import { ErrorItem } from '../components/ErrorItem';
import Chevron from '../assets/images/chevrons.png';
import './styles/DeezerToSpotify.scss';
import { useGetDeezerUserData } from '../hooks/deezer/useGetDeezerUserData';

export default function DeezerToSpotify() {
  const [user] = useGetDeezerUserData();  

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
    <div className='deezerToSpotify__playlist'>
      <div className="deezerToSpotify__playlist-title">Playlists de {user?.firstname}</div>
      <div className="deezerToSpotify__playlist-subtitle">
        <img src={Chevron} />
        <p>Added recently</p>
      </div>
      <div className="deezerToSpotify__playlist-container">
        <DeezerPlaylistsItem />
      </div>
    </div>
  </div> 
  )
}
