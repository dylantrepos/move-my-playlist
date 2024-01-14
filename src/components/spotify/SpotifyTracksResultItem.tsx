import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getExistingTracksFromDeezer } from "../../utils/utils";
import './styles/SpotifyTracksResultItem.scss';
import { Link, useNavigate } from "react-router-dom";
import { TitleItem } from "../TitleItem";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { addTracksToDeezerPlaylist, createDeezerPlaylist } from "../../services/deezerApi";
import { ListContainer } from "../ListContainer";
import { TrackItem } from "../TrackItem";
import { LoadingItem } from "../LoadingItem";
import { ResultLayout } from "../../layouts/ResultLayout";

export const SpotifyTracksResultItem = () => {
  const { selectedPlaylist, selectedTracks, playlistTracks } = useSelector((state: RootState) => state.spotify);
  const [tracksNotFound, setTracksNotFound] = useState<SpotifyTrack[]>([]);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPlaylist) navigate('/spotify-to-deezer/playlist');
  }, [])

  useEffect(() => {
      const implementedtrack = async () => {
        // Create playlist
        if (selectedPlaylist?.name) {
          const { id: playlistId } = await createDeezerPlaylist(selectedPlaylist.name);
          
          if ( playlistId ) {
            // Check existing tracks
            const tracksChoiced = playlistTracks.filter(playlist => selectedTracks.includes(playlist.id));
            const {tracksFound, tracksNotFound} = await getExistingTracksFromDeezer(tracksChoiced);
            
            setTracksNotFound(tracksNotFound);

            // Implement tracks
            await addTracksToDeezerPlaylist(playlistId.toString(), tracksFound);

            setHasBeenAdded(true);
          }
        }
      }

      implementedtrack();
  }, [])


  return (
    <ResultLayout 
      hasBeenAdded={hasBeenAdded}
      tracksNotFound={tracksNotFound}
      playlistTitle={selectedPlaylist?.name ?? ''}
    >
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
    </ResultLayout>
  )
  
  hasBeenAdded ? (
    <>
      <div className={`spotifyTracksResultItem ${tracksNotFound.length > 0 ? '-not-found' : ''}`}>
        <div className="spotifyTracksResultItem__title-container">

          <TitleItem classNames="spotifyTracksResultItem__title">Your playlist has been added !</TitleItem>
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