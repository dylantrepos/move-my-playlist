import { useState } from "react";
import { PlaylistTracksDeezerItem } from "./PlaylistsTracksDeezerItem";
import { useGetPlaylist } from "../hooks/useGetPlaylists";
import { PlaylistDeezer } from "../types/UserDeezer";

export const PlaylistDeezerItem: React.FC = () => {
  const [selectPlaylistId, setSelectPlaylistId] = useState('0');
  const [userDeezerPlaylist] = useGetPlaylist();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    setSelectPlaylistId(playlistId)
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
        {userDeezerPlaylist.data?.map((playlist: PlaylistDeezer) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <div>
          {selectPlaylistId !== '0' ? <PlaylistTracksDeezerItem playlistId={selectPlaylistId} /> : ''}
      </div>
    </>
  : ''
}
