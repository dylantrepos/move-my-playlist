import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { getExistingTracksFromDeezer } from "../../utils/utils";
import './styles/SpotifyTracksResultItem.scss';
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { addTracksToDeezerPlaylist, createDeezerPlaylist } from "../../services/deezerApi";
import { ListContainer } from "../ListContainer";
import { TrackItem } from "../TrackItem";
import { LoadingItem } from "../LoadingItem";

export const SpotifyTracksResultItem = () => {
  const { selectedPlaylist, selectedTracks, playlistTracks } = useSelector((state: RootState) => state.spotify);
  const [tracksNotFound, setTracksNotFound] = useState<SpotifyTrack[]>([]);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const hasLoaded = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPlaylist) navigate('/spotify-to-deezer/playlist');
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
          }
        }
      }

      implementedtrack();
    }

    return () => {hasLoaded.current = true};
  }, [])


  return hasBeenAdded ? (
    <>
      <div className={`spotifyTracksResultItem ${tracksNotFound.length > 0 ? '-not-found' : ''}`}>
        <div className="spotifyTracksResultItem__title-container">

          <Title classNames="spotifyTracksResultItem__title">Your playlist has been added !</Title>
          <p>Your playlist <span className="spotifyTracksResultItem__playlist-title">{selectedPlaylist?.name}</span> has been successfully added to your Deezer playlists. {tracksNotFound.length > 0 &&`Unfortunately, some tracks couldn't be found on Deezer, but you can check and add them manually if you'd like.`}</p>
          <Link to={'/spotify-to-deezer/playlist'} className="button-primary">
            Transfert another playlist
          </Link>
        </div>
        { tracksNotFound.length > 0 && 
            <ListContainer
              title="Tracks not found"
              classNames="spotifyTracksResultItem__not-found"
            > {
              tracksNotFound.map(track => (
                <TrackItem
                  key={`not-found-${track.id}`}
                  cover={track.album.images[0].url}
                  trackTitle={track.name}
                  albumTitle={track.album.name}
                  artist={track.artists.map(artist => artist.name).join(', ')} 
                />
              ))
            }
          </ListContainer>
        }
      </div>
    </>)
    : <LoadingItem title="Importing your new playlist" /> 
}