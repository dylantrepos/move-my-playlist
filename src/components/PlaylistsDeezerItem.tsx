import { useState } from "react";
import { PlaylistTracksDeezerItem } from "./PlaylistsTracksDeezerItem";
import { useGetPlaylist } from "../hooks/useGetPlaylists";
import { PlaylistDeezer } from "../types/UserDeezer";

export const PlaylistDeezerItem: React.FC = () => {
  const [selectPlaylistId, setSelectPlaylistId] = useState('0');
  const [userDeezerPlaylist] = useGetPlaylist();

  console.log('PlaylistDeezerItem: ', userDeezerPlaylist);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    setSelectPlaylistId(playlistId)
  };

  return userDeezerPlaylist.data.length > 0 ? 
    <>
      <div>PlaylistDeezer</div>
      <select defaultValue={"placeholder"} onChange={handleChange}>
        <option value="placeholder" disabled>Choose here</option>
        {userDeezerPlaylist.data?.map((playlist: PlaylistDeezer) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <div>
          <PlaylistTracksDeezerItem playlistId={selectPlaylistId} />
      </div>
    </>
  : ''
}
