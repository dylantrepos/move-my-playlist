import { useDispatch } from "react-redux";
import { useState } from "react";
import { useGetSpotifyPlaylist } from "../../hooks/spotify/useGetSpotifyPlaylists";
import { SpotifyPlaylistItems } from "../../types/spotify/SpotifyPlaylist";
import { SpotifyPlaylistTracksItem } from "./SpotifyPlaylistTracksItem";
import { setSpotifyPlaylist, setSpotifyPlaylistTitle } from "../../reducers/spotifyReducer";

export const SpotifyPlaylistsItem: React.FC = () => {
  const [selectPlaylistId, setSelectPlaylistId] = useState<string>();
  const [userSpotifyPlaylist] = useGetSpotifyPlaylist();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    const playlistTitle = playlistId !== 'Your Music' ? userSpotifyPlaylist?.find(playlist => playlist.id === playlistId)?.name ?? '' : 'Your Music';
    setSelectPlaylistId(playlistId)

    dispatch(setSpotifyPlaylist([]));
    dispatch(setSpotifyPlaylistTitle(playlistTitle))
  };

  return userSpotifyPlaylist ? 
    <>
      <div style={{margin: ' 20px 0 10px'}}>To begin, choose the playlist you want to move</div>
      <select 
        defaultValue={"placeholder"} 
        onChange={handleChange}
        style={{background: '#e1e1e1', borderRadius: '5px', padding: '10px'}}
      >
        <option value="placeholder" disabled>Choose a playlist here</option>
        {userSpotifyPlaylist?.map((playlist: SpotifyPlaylistItems) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
        <option value={"Your Music"}>
          Your Music
        </option>
      </select>
      <div>
          {selectPlaylistId ? <SpotifyPlaylistTracksItem playlistId={selectPlaylistId} /> : ''}
      </div>
    </>
  : ''
}
