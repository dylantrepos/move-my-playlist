import { useState } from "react";
import { DeezerPlaylistTracksItem } from "./DeezerPlaylistTracksItem";
import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useDispatch } from "react-redux";
import { setDeezerPlaylist, setDeezerPlaylistTitle } from "../../reducers/deezerReducer";

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
      <div style={{margin: ' 20px 0 10px'}}>To begin, choose the playlist you want to move</div>
      <select 
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
      </div>
    </>
  : ''
}
