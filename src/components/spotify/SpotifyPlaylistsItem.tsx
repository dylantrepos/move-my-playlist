// import { useState } from "react";
// import { DeezerPlaylistTracksItem } from "./DeezerPlaylistTracksItem";
// import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
// import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
// import { useDispatch } from "react-redux";
// import { setDeezerPlaylistTitle } from "../../reducers/deezerReducer";
import { useGetSpotifyPlaylist } from "../../hooks/spotify/useGetSpotifyPlaylists";
import { SpotifyPlaylistItems } from "../../types/spotify/SpotifyPlaylist";

export const SpotifyPlaylistsItem: React.FC = () => {
  // const [selectPlaylistId, setSelectPlaylistId] = useState('0');
  const [userSpotifyPlaylist] = useGetSpotifyPlaylist();
  // const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const playlistId = e.target.value;
    // const playlistTitle = userDeezerPlaylist?.data.find(playlist => playlist.id === +playlistId)?.title ?? '';
    // setSelectPlaylistId(playlistId)
    // dispatch(setDeezerPlaylistTitle(playlistTitle))
  };

  return userSpotifyPlaylist ? 
    <>
      <div style={{margin: ' 20px 0 10px'}}>Or choose an existing playlist</div>
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
      </select>
      {/* <div>
          {selectPlaylistId !== '0' ? <DeezerPlaylistTracksItem playlistId={selectPlaylistId} /> : ''}
      </div> */}
    </>
  : ''
}
