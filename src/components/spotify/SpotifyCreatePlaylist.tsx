import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { SpotifyPlaylist } from "../../types/spotify/SpotifyPlaylist";
import { createSpotifyPlaylistRequest, fetchAllSpotifyTrackId, postSpotifyFromTracksId } from "../../utils/spotifyRequest";



export const SpotifyCreatePlaylist = () => {
  const deezerPlaylistTitle: string | undefined = useSelector((state: RootState) => state.deezer.playlistTitle);
  const deezerPlaylist: DeezerTrack[] | undefined = useSelector((state: RootState) => state.deezer.playlist);
  const [inputValue, setInputValue] = useState('');
  const [tracksNotFound, setTracksNotFound] = useState<DeezerTrack[]>([]);
  const [tracksFound, setTracksFound] = useState<DeezerTrack[]>([]);

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

      setTracksNotFound(tracksNotFound);
      
      if (tracksFound) {
        setTracksFound(spotifyTracksResults?.filter((id) => id.spotifyId));

        await postSpotifyFromTracksId(playlistId, tracksFound);
      }
    }

  }

  const handlePostForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const playlistCreated = await createSpotifyPlaylistRequest(inputValue);

    if (playlistCreated.status === 201) {
      const newPlaylistId = (playlistCreated.data as SpotifyPlaylist).id;
      await addSongToPlaylist(newPlaylistId)
    }
  }
  
  return (<>
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
    <div style={{marginTop: 20}}>
      <h6>Tracks not found : </h6>
    {
      tracksNotFound.map((track: DeezerTrack) => (
        <div 
        style={{
          display: "flex", 
          border: `1px solid #ff0b0b`, 
          borderRadius: '5px', 
          padding: '5px', 
          cursor: "pointer",
          background: '#f6e7e7',
          margin: '5px 0'
        }}
        key={`not-found-${track.id}`}
        >
      <img src={track.album.cover} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
          <div style={{display: "flex", flexDirection: "column"}}>
            <b style={{fontWeight: 500}}>{track.title}</b>
            <span>{track.artist?.name}</span>
          </div>
      </div>
      ))
    }
    </div>
    <div style={{marginTop: 20}}>
      <h6>Tracks found : </h6>
    {
      tracksFound.map((track: DeezerTrack) => (
        <div style={{
          display: "flex", 
          border: `1px solid #04db1f`, 
          borderRadius: '5px', 
          padding: '5px', 
          cursor: "pointer",
          background: '#e7f6ea',
          margin: '5px 0'
        }}
        key={`found-${track.id}`}
        >
      <img src={track.album?.cover} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
          <div style={{display: "flex", flexDirection: "column"}}>
            <b style={{fontWeight: 500}}>{track.title}</b>
            <span>{track.artist?.name}</span>
          </div>
      </div>
      ))
    }
    </div>
  </>
  )
}
