import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTracksToSpotifyPlaylist, createSpotifyPlaylist } from "../../services/spotifyApi";
import { useEffect, useRef, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { getExistingTracksFromSpotify } from "../../utils/utils";
import './styles/DeezerTracksResultItem.scss';
import { useNavigate } from "react-router-dom";
import { TrackItem } from "../TrackItem";
import { ResultLayout } from "../../layouts/ResultLayout";

export const DeezerTracksResultItem = () => {
  const { selectedPlaylist, selectedTracks, playlistTracks } = useSelector((state: RootState) => state.deezer);
  const [tracksNotFound, setTracksNotFound] = useState<DeezerTrack[]>([]);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const hasLoaded = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPlaylist) navigate('/deezer-to-spotify/playlist');
  }, [])

  useEffect(() => {
    if (!hasLoaded.current) {
      const implementedtrack = async () => {
        // Create playlist
        if (selectedPlaylist?.title) {
          const { id: playlistId } = await createSpotifyPlaylist(selectedPlaylist.title);
          
          if ( playlistId ) {
            // Check existing tracks
            const tracksChoiced = playlistTracks.filter(playlist => selectedTracks.includes(playlist.id));
            const {tracksFound, tracksNotFound} = await getExistingTracksFromSpotify(tracksChoiced);

            setTracksNotFound(tracksNotFound);

            // Implement tracks
            await addTracksToSpotifyPlaylist(playlistId.toString(), tracksFound);

            setHasBeenAdded(true);
          }
        }
      }

      implementedtrack();
    }

    return () => {hasLoaded.current = true};
  }, [])

  return (
    <ResultLayout
      hasBeenAdded={hasBeenAdded}
      tracksNotFound={tracksNotFound}
      playlistTitle={selectedPlaylist?.title ?? ''}
    >
      {
        tracksNotFound.map(track => (
          <TrackItem
            key={`not-found-${track.id}`}
            cover={track.album.cover}
            trackTitle={track.title}
            albumTitle={track.album.title}
            artist={track.artist.name} 
          />
        ))
      }
    </ResultLayout>
  )
}