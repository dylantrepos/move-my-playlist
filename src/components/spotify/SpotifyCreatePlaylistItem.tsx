import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { createSpotifyPlaylist, fetchAllSpotifyTrackId, addTracksToSpotifyPlaylist } from "../../services/spotifyApi";
import { SpotifyTracksResultItem } from "./SpotifyTracksResultItem";
import { AxiosResponse } from "axios";

export const SpotifyCreatePlaylistItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [deezerTracksNotFound, setDeezerTracksNotFound] = useState<DeezerTrack[]>([]);
  const [deezerTracksFound, setDeezerTracksFound] = useState<DeezerTrack[]>([]);
  const [playlistCreated, setPlaylistCreated] = useState(false);

  const deezerPlaylistTitle: string | undefined = useSelector((state: RootState) => state.deezer.playlistTitle);
  const deezerPlaylist: DeezerTrack[] | undefined = useSelector((state: RootState) => state.deezer.playlist);


  useEffect(() => {
    if (deezerPlaylistTitle) setInputValue(deezerPlaylistTitle);
  }, [deezerPlaylistTitle]);
  
  useEffect(() => {
    handleCheckTracksFound();
    setPlaylistCreated(false);
  }, [deezerPlaylist]);


  const handlePostForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const playlistCreatedResponse = await createSpotifyPlaylist(inputValue);

    if (
        playlistCreatedResponse.data.id && 
        (deezerPlaylist || []).length > 0 && 
        deezerTracksFound
    ) {
      const spotifyPlaylistId = playlistCreatedResponse.data.id;
      const tracksFound = deezerTracksFound
        .filter((track) => track?.spotifyId)
        .map((track) => `spotify:track:${track.spotifyId}`);
  
      const addTracksToPlaylistResponse = await addTracksToSpotifyPlaylist(spotifyPlaylistId, tracksFound);


      setPlaylistCreated((addTracksToPlaylistResponse as AxiosResponse).data['snapshot_id'] ?? false);
    }
  }

  const handleCheckTracksFound = async () => {
    if (!deezerPlaylist) return;

    const spotifyTracksResults = await fetchAllSpotifyTrackId(deezerPlaylist);

    if (spotifyTracksResults) {
      const tracksFound = spotifyTracksResults
        .filter((track) => track?.spotifyId)
        .map((track) => `spotify:track:${track.spotifyId}`);
      const tracksNotFound = spotifyTracksResults.filter((track) => !track?.spotifyId)

      setDeezerTracksNotFound(tracksNotFound);
      
      if (tracksFound) {
        setDeezerTracksFound(spotifyTracksResults?.filter((id) => id.spotifyId));
      }
    }
  }
  
  return (deezerPlaylist || []).length > 0  ? <>
    <div>SpotifyCreatePlaylist</div>
    <div>Number of songs seletected : <span>{deezerPlaylist?.length ?? '0'}</span></div>
      
    {playlistCreated 
      ? <h3 
          style={{ color: 'green', fontWeight: 500}}
        >
          Playlist "{deezerPlaylistTitle}" successfully created !
        </h3> 
      : <form onSubmit={handlePostForm}>
          <input 
            type="text" 
            placeholder="Choose playlist"
            style={{background: '#f2f2f2', padding: '5px 10px', borderRadius: '5px', width: '250px'}}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit"
            disabled={playlistCreated}
          >Add playlist</button>
        </form>
    }
    <SpotifyTracksResultItem 
      deezerTracksFound={deezerTracksFound}
      deezerTracksNotFound={deezerTracksNotFound}
    />
  </>
      : ''
}