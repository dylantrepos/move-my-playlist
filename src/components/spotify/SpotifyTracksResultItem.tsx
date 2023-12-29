import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTracksToSpotifyPlaylist, createSpotifyPlaylist, deleteSpotifyPlaylist } from "../../services/spotifyApi";
import { useEffect, useRef, useState } from "react";
import { TracksNotFoundItem } from "../TracksNotFoundItem";
import { getExistingTracksFromDeezer, getExistingTracksFromSpotify } from "../../utils/utils";
import './styles/SpotifyTracksResultItem.scss';
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { addTracksToDeezerPlaylist, createDeezerPlaylist, deleteDeezerPlaylist, fetchAllDeezerTrackId } from "../../services/deezerApi";

export const SpotifyTracksResultItem = () => {
  const { selectedPlaylist, selectedTracks, playlistTracks } = useSelector((state: RootState) => state.spotify);
  const [tracksNotFound, setTracksNotFound] = useState<SpotifyTrack[]>([]);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const hasLoaded = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!selectedPlaylist) navigate('/spotify-to-deezer/playlist');
  }, [])

  useEffect(() => {
    if (!hasLoaded.current) {
      const implementedtrack = async () => {
        // Create playlist
        if (selectedPlaylist?.name) {
          const { id: playlistId } = await createDeezerPlaylist(selectedPlaylist.name);
          
          if ( playlistId ) {
            // Check existing tracks
            const tracksChoiced = playlistTracks.filter(playlist => selectedTracks.includes(playlist.id));
            const {tracksFound, tracksNotFound} = await getExistingTracksFromDeezer(tracksChoiced);
            // const tracksId = await fetchAllDeezerTrackId(tracksChoiced);
            // console.log({tracksId});
            console.log({tracksFound, tracksNotFound});
            setTracksNotFound(tracksNotFound);

            // Implement tracks
            await addTracksToDeezerPlaylist(playlistId.toString(), tracksFound);

            setHasBeenAdded(true);
  
            // Delete playlist
            setTimeout(async () => {
              await deleteDeezerPlaylist(playlistId.toString());
            }, 5000)
          }
        }
      }

      implementedtrack();
    }

    return () => {hasLoaded.current = true};
  }, [])


  return hasBeenAdded ? (
    <>
      <div className="deezerTracksResultItem">
        <Title>Your playlist has been added !</Title>
        <p>Your playlist <span className="deezerTracksResultItem__playlist-title">{selectedPlaylist?.name}</span> has been successfully added to your Spotify playlists. {tracksNotFound.length > 0 &&`Unfortunately, some tracks couldn't be found on Spotify, but you can check and add them manually if you'd like.`}</p>
        <Link to={'/spotify-to-deezer/playlist'} className="button-primary">
          Transfert another playlist
        </Link>
      </div>
      { tracksNotFound.length > 0 && 
          <div className="deezerTracksResultItem__not-found">
            <h4 className="deezerTracksResultItem__not-found-title">Tracks not found</h4>
            
            <TracksNotFoundItem tracksNotFound={[...tracksNotFound, ...tracksNotFound]} />
          </div>
      }
    </>)
    : <LoadingPlaylistImport /> 
}

const LoadingPlaylistImport = () => {
  return (
    <div className="deezerTracksResultItem">
      <Title>Importing your new playlist</Title>
      <div className="deezerTracksResultItem__loading-playlist">
        <p>please wait...</p>
      </div>
    </div> 
  )
}