import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTracksToSpotifyPlaylist, createSpotifyPlaylist } from "../../services/spotifyApi";
import { useEffect, useRef, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { getExistingTracksFromSpotify } from "../../utils/utils";
import './styles/DeezerTracksResultItem.scss';
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../Title";
import { ListContainer } from "../ListContainer";
import { TrackItem } from "../TrackItem";

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
            console.log({tracksFound, tracksNotFound});
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


  return hasBeenAdded ? (
    <>
      <div className={`deezerTracksResultItem ${tracksNotFound.length > 0 ? '-not-found' : ''}`}>
        <div className="deezerTracksResultItem__title-container">
          <Title classNames="deezerTracksResultItem__title">
            Your playlist has been added !
          </Title>
          <p className="deezerTracksResultItem__description">Your playlist <span className="deezerTracksResultItem__playlist-title">{selectedPlaylist?.title}</span> has been successfully added to your Spotify playlists. {tracksNotFound.length > 0 &&`Unfortunately, some tracks couldn't be found on Spotify, but you can check and add them manually if you'd like.`}</p>
          <Link to={'/deezer-to-spotify/playlist'} className="button-primary deezerTracksResultItem__button">
            Transfert another playlist
          </Link>
        </div>
      { tracksNotFound.length > 0 && 
          <ListContainer
            title="Tracks not found"
            classNames="deezerTracksResultItem__not-found"
          > {
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
        </ListContainer>
      }
      </div>
    </>)
    : <LoadingPlaylistImport /> 
}

const LoadingPlaylistImport = () => {
  return (
    <div className="deezerTracksResultItem__loading">
      <Title>Importing your new playlist</Title>
      <p className="deezerTracksResultItem__loading-text">please wait...</p>
    </div> 
  )
}