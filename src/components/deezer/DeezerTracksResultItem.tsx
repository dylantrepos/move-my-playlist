import { useSelector } from "react-redux";
import PlaylistLayout from "../../layout/PlaylistLayout";
import { RootState } from "../../store/store";
import { addTracksToSpotifyPlaylist, createSpotifyPlaylist, deleteSpotifyPlaylist } from "../../services/spotifyApi";
import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { TracksNotFoundItem } from "../TracksNotFoundItem";
import { getExistingTracksFromSpotify } from "../../utils/utils";
import './styles/DeezerTracksResultItem.scss';
import { Link } from "react-router-dom";

export const DeezerTracksResultItem = () => {
  const { selectedPlaylist, selectedTracks, playlistTracks } = useSelector((state: RootState) => state.deezer);
  const [tracksNotFound, setTracksNotFound] = useState<DeezerTrack[]>([]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      console.log('coucou : ', loaded);

      /**
       * ! TODO : Load twice here
       */
      
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
            await addTracksToSpotifyPlaylist(playlistId, tracksFound);
  
            // Delete playlist
            setTimeout(async () => {
              await deleteSpotifyPlaylist(playlistId);
            }, 3000)
          }
        }
      }

      implementedtrack();
    }
  }, [])


  return true && (
    <PlaylistLayout title={'Your playlist has been added !'}>
      <section className="deezerTracksResultItem">
        <p>Your playlist 'My Awesome Playlist' has been successfully added to your Spotify playlists. {tracksNotFound.length > 0 &&`Unfortunately, some tracks couldn't be found on Spotify, but you can check and add them manually if you'd like.`}</p>
        <Link to={'/'} className="button-primary">
          Transfert another playlist
        </Link>
      </section>
      { tracksNotFound.length > 0 && 
          <section className="deezerTracksResultItem__not-found">
            <h4 className="deezerTracksResultItem__not-found-title">Tracks not found</h4>
            
            <TracksNotFoundItem tracksNotFound={[...tracksNotFound]} />
          </section>
      }
    </PlaylistLayout>)
}

