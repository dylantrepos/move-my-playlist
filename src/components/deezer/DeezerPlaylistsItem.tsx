import { useState } from "react";
import { DeezerPlaylistTracksItem } from "./DeezerPlaylistTracksItem";
import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useDispatch } from "react-redux";
import { setDeezerPlaylist, setDeezerPlaylistTitle } from "../../reducers/deezerReducer";
import './styles/DeezerPlaylistItem.scss';
import Chevron from '../../assets/images/chevrons.png';
import DeezerDetails from '../../assets/images/deezer-details.png'

export const DeezerPlaylistsItem: React.FC = () => {
  const [selectPlaylistId, setSelectPlaylistId] = useState<string>();
  const [userDeezerPlaylist] = useGetDeezerPlaylist();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    const playlistTitle = userDeezerPlaylist?.data.find(playlist => playlist.id === +playlistId)?.title ?? '';

    setSelectPlaylistId(playlistId);
    
    dispatch(setDeezerPlaylist([]));
    dispatch(setDeezerPlaylistTitle(playlistTitle))
  };

  return userDeezerPlaylist ? 
    <>
      <div className="deezerPlaylistItem__title">Playlists</div>
      <div className="deezerPlaylistItem__subtitle">
        <img src={Chevron} />
        <p>Added recently</p>
      </div>

      {/* <select 
        defaultValue={"placeholder"} 
        onChange={handleChange}
        style={{background: '#e1e1e1', borderRadius: '5px', padding: '10px'}}
      >
        <option value="placeholder" disabled>Choose a playlist here</option>
        {userDeezerPlaylist.data?.map((playlist: DeezerPlaylist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <div>
          {selectPlaylistId ? <DeezerPlaylistTracksItem playlistId={selectPlaylistId} /> : ''}
      </div> */}
      <div className="deezerPlaylistItem__playlist-container">
        {userDeezerPlaylist.data?.map((playlist: DeezerPlaylist) => (
          <button className="deezerPlaylistItem__playlist">
            <img 
              src={playlist.picture} 
              className="deezerPlaylistItem__playlist-image"
            />
            <p className="deezerPlaylistItem__playlist-title">{playlist.title}</p>
            <p className="deezerPlaylistItem__playlist-info">
            {playlist.nb_tracks} {`Track${playlist.nb_tracks > 1 ? 's' : ''}`}</p>
            <p className="deezerPlaylistItem__playlist-author">
            Created by {playlist.creator.name} </p>
            <img 
              src={DeezerDetails}
              className="deezerPlaylistItem__playlist-settings" 
            />
          </button>
        ))}
      </div>
    </>
  : ''
}
