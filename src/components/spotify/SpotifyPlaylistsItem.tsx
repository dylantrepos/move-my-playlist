import { useDispatch } from 'react-redux';
import { resetPlaylistAndTracks, setSpotifyPlaylists, setSelectedPlaylist } from "../../reducers/spotifyReducer";
import { useNavigate } from "react-router-dom";
import { PlaylistItem } from "../PlaylistItem";
import { ListContainer } from "../ListContainer";
import { useEffect } from "react";
import { Title } from "../Title";
import { useGetSpotifyUserData } from "../../hooks/spotify/useGetSpotifyUserData";
import { useGetSpotifyPlaylist } from "../../hooks/spotify/useGetSpotifyPlaylists";
import { SpotifyPlaylist } from "../../types/spotify/SpotifyPlaylist";
import { DeezerPlaylist } from '../../types/deezer/DeezerPlaylist';

export const SpotifyPlaylistsItem = () => {
  const [user] = useGetSpotifyUserData(); 
  const [userSpotifyPlaylist] = useGetSpotifyPlaylist();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectPlaylist = (playlist: SpotifyPlaylist | DeezerPlaylist) => {
    if ('collaborative' in playlist) {
      dispatch(setSelectedPlaylist(playlist as SpotifyPlaylist));
      navigate('/spotify-to-deezer/tracks');
    }
  }

  useEffect(() => {
    // Reset playlist & tracks on load
    dispatch(resetPlaylistAndTracks());

    if (userSpotifyPlaylist) {
      dispatch(setSpotifyPlaylists(userSpotifyPlaylist));
    }
  }, [userSpotifyPlaylist])


  return ( user && userSpotifyPlaylist ) && 
    <>
      <Title>Choose the playlist</Title>
      <ListContainer 
        title={`${user?.display_name}'s library`}
        subtitle="Recently played"
        classNames='-spotify'
      >
        {userSpotifyPlaylist?.map((playlist: SpotifyPlaylist) => (
          playlist.tracks.total > 0 && <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            cover={playlist.images.length > 0 ? playlist.images[0].url : ''}
            title={playlist.name}
            nbTracks={playlist.tracks.total}
            author={playlist.owner.display_name}
            handleClick={handleSelectPlaylist}
            type="spotify"
          />
        ))}
      </ListContainer>
    </>
}
