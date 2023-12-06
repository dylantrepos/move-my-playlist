import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { addTracksToDeezerPlaylist, createDeezerPlaylist, fetchAllDeezerTrackId } from "../../services/deezerApi";
import { DeezerTracksResultItem } from "./DeezerTracksResultItem";


export const DeezerCreatePlaylistItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [spotifyTracksNotFound, setSpotifyTracksNotFound] = useState<SpotifyTrack[]>([]);
  const [spotifyTracksFound, setSpotifyTracksFound] = useState<SpotifyTrack[]>([]);
  const [playlistCreated, setPlaylistCreated] = useState(false);

  const spotifyPlaylistTitle: string | undefined = useSelector((state: RootState) => state.spotify.playlistTitle);
  const spotifyPlaylist: SpotifyTrack[] | undefined = useSelector((state: RootState) => state.spotify.playlist);


  useEffect(() => {
    if (spotifyPlaylistTitle) setInputValue(spotifyPlaylistTitle);
  }, [spotifyPlaylistTitle]);
  
  useEffect(() => {
    handleCheckTracksFound();
    setPlaylistCreated(false);
    console.log({spotifyPlaylist});
  }, [spotifyPlaylist]);


  const handlePostForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const playlistCreated = await createDeezerPlaylist(inputValue);

    console.log({playlistCreated});
    if (
        playlistCreated.data.id && 
        (spotifyPlaylist || []).length > 0 && 
        spotifyTracksFound
    ) {
      const spotifyPlaylistId = playlistCreated.data.id;

      const tracksFound = spotifyTracksFound
        .filter((track) => track.deezerId)
        .map((track) => track.deezerId ?? '');

      const playlistCreatedResponse = await addTracksToDeezerPlaylist(spotifyPlaylistId, tracksFound);

      console.log({playlistCreatedResponse});

      setPlaylistCreated(playlistCreatedResponse?.status === 201);

    }
  }

  const handleCheckTracksFound = async () => {
    if (!spotifyPlaylist) return;

    const deezerTraksResults = await fetchAllDeezerTrackId(spotifyPlaylist);

    if (deezerTraksResults) {
      const tracksFound = deezerTraksResults
        .filter((track) => track?.deezerId)
      const tracksNotFound = deezerTraksResults.filter((track) => !track?.deezerId)

      setSpotifyTracksNotFound(tracksNotFound);
      
      if (tracksFound) {
        setSpotifyTracksFound(deezerTraksResults?.filter((id) => id.deezerId));
      }
    }
  }
  
  return (spotifyPlaylist || []).length > 0  ? <>
    <div>DeezerCreatePlaylist</div>
    <div>Number of songs seletected : <span>{spotifyPlaylist?.length ?? '0'}</span></div>
      
    {playlistCreated 
      ? <h3 
          style={{ color: 'green', fontWeight: 500}}
        >
          Playlist "{spotifyPlaylistTitle}" successfully created !
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
    <DeezerTracksResultItem
      spotifyTracksFound={spotifyTracksFound}
      spotifyTracksNotFound={spotifyTracksNotFound}
    />
  </>
      : ''
}
