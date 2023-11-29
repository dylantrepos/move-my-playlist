import { useState } from "react";
import TrackDeezerItem from "./TrackDeezerItem";
import { useGetPlaylist } from "../hooks/useGetPlaylists";
import { PlaylistDeezer } from "../types/UserDeezer";

export default function PlaylistDeezerItem() {
  const [selectPlaylistId, setSelectPlaylistId] = useState('0');
  const [userDeezerPlaylist] = useGetPlaylist();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    setSelectPlaylistId(playlistId)
  };

  return userDeezerPlaylist.data ? 
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
          <TrackDeezerItem playlistId={selectPlaylistId} />
      </div>
    </>
  : ''
}
