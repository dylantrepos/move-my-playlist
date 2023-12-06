import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { SpotifyPlaylist } from "../../types/spotify/SpotifyPlaylist";
import { createSpotifyPlaylist, fetchAllSpotifyTrackId, addTracksToSpotifyPlaylist } from "../../services/spotifyApi";
import { SpotifyTracksResultItem } from "./SpotifyTracksResultItem";



export const SpotifyCreatePlaylist = () => {
  const deezerPlaylistTitle: string | undefined = useSelector((state: RootState) => state.deezer.playlistTitle);
  const deezerPlaylist: DeezerTrack[] | undefined = useSelector((state: RootState) => state.deezer.playlist);
  const [inputValue, setInputValue] = useState('');
  const [deezerTracksNotFound, setDeezerTracksNotFound] = useState<DeezerTrack[]>([]);
  const [deezerTracksFound, setDeezerTracksFound] = useState<DeezerTrack[]>([]);

  useEffect(() => {
    if (deezerPlaylistTitle) setInputValue(deezerPlaylistTitle);
  }, [deezerPlaylistTitle]);
  
  const handlePlaylistTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const addSongToPlaylist = async (playlistId: string) => {
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

        await addTracksToSpotifyPlaylist(playlistId, tracksFound);
      }
    }

  }

  const handlePostForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const playlistCreated = await createSpotifyPlaylist(inputValue);

    if (playlistCreated.status === 201 && (deezerPlaylist || []).length > 0) {
      const newPlaylistId = (playlistCreated.data as SpotifyPlaylist).id;
      await addSongToPlaylist(newPlaylistId)
    }
  }
  
  return (deezerPlaylist || []).length > 0  ? <>
    <div>SpotifyCreatePlaylist</div>
    <div>Number of songs seletected : <span>{deezerPlaylist?.length ?? '0'}</span></div>
      <form onSubmit={handlePostForm}>
        <input 
          type="text" 
          placeholder="Choose playlist"
          style={{background: '#f2f2f2', padding: '5px 10px', borderRadius: '5px', width: '250px'}}
          value={inputValue}
          onChange={handlePlaylistTitleChange}
        />
        <button type="submit">Add playlist</button>
      </form>
    <SpotifyTracksResultItem 
      deezerTracksFound={deezerTracksFound}
      deezerTracksNotFound={deezerTracksNotFound}
    />
  </>
      : ''
}
