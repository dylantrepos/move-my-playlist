import { DeezerPlaylistsItem } from '../components/deezer/DeezerPlaylistsItem';
import './styles/DeezerToSpotify.scss';
import { DeezerPlaylist } from '../types/deezer/DeezerPlaylist';
import { ChangeEvent, useEffect, useState } from 'react';
import { DeezerPlaylistsTracksItem } from '../components/deezer/DeezerPlaylistsTracksItem';
import { useGetDeezerPlaylist } from '../hooks/deezer/useGetDeezerPlaylists';
import { useGetDeezerUserData } from '../hooks/deezer/useGetDeezerUserData';
import Chevron from '../assets/images/chevrons.png';
import { Check } from '../assets/icons/check';

export default function DeezerToSpotify() {
  const [currPlaylist, setCurrPlaylist] = useState<DeezerPlaylist>(); 
  const [userDeezerPlaylist] = useGetDeezerPlaylist();
  const [user] = useGetDeezerUserData(); 
  const [title, setTitle] = useState<string>();
  const [checkAllTracks, setCheckAllTracks] = useState<boolean>(false);
  const [tracklistIds, setTracklistIds] = useState<string[]>([]);

  const handleSelectPlaylist = (playlist: DeezerPlaylist) => {
    setCurrPlaylist(playlist);
  }
  
  const handleChangePlaylist = (e: ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    const selectedPlaylist = userDeezerPlaylist?.data.find(playlistData => playlistData.id === +playlistId);
    setCurrPlaylist(selectedPlaylist);
  }

  // Update header info
  useEffect(() => {
    if (currPlaylist) {
      const nbTracks = `${currPlaylist?.nb_tracks} track${(currPlaylist?.nb_tracks ?? 0) > 0 ? 's' : ''}`
      const newTitle = `${currPlaylist?.title} (${nbTracks})`
      setTitle(newTitle);
      setCheckAllTracks(false);
      setTracklistIds([]);
    } 
    else if (user) setTitle(`Playlists de ${user?.firstname}`);
  }, [currPlaylist, user])
  
  return user ? (
  <div className='deezerToSpotify__main-container'>
    <h1 className='deezerToSpotify__title'>
      { currPlaylist ? 'Choose the tracks' : 'Choose the playlist'}
    </h1>
    {currPlaylist 
      ? <div className='deezerToSpotify__playlist-select-container'>
          <select 
            onChange={handleChangePlaylist}
            value={currPlaylist.id ?? "placeholder"}
          >
            <option value="placeholder" disabled>Choose a playlist </option>
            {userDeezerPlaylist?.data?.map((playlist: DeezerPlaylist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.title}
              </option>
            ))}
          </select>
          <button 
            className='button-primary'  
            disabled={tracklistIds.length === 0}
          >
            Confirm
          </button>
          
        </div> 
    : ''}
    <div className='deezerToSpotify__playlist'>
      <div className="deezerToSpotify__header">
          <div className="deezerToSpotify__header-title">
            {title}
          </div>
          <img src={Chevron} />
          <p>Added recently</p>
          {currPlaylist 
            ? <button 
                className={`${checkAllTracks ? '-checked' :''}`}
                onClick={() => setCheckAllTracks(!checkAllTracks)}
              >{`${checkAllTracks ? 'Unselect' : 'Select'} all`}<Check            
              classNames={`deezerPlaylistsTracksItem__playlist-item-check ${checkAllTracks ? '-checked' : ''}`} 
            /></button> 
            : ''
          }
      </div>
      <div className="deezerPlaylistItem__playlist-item-container">
      { currPlaylist 
        ? <DeezerPlaylistsTracksItem 
            playlist={currPlaylist} 
            checkAllTracks={checkAllTracks}
            tracklistIds={tracklistIds}
            setTracklistIds={setTracklistIds}
          /> 
        : <DeezerPlaylistsItem 
            handleSelectPlaylist={handleSelectPlaylist}
          />
      }
      </div>
    </div>
  </div> 
  ) : ''
}
