import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useDispatch } from 'react-redux';
import { resetPlaylistAndTracks, setDeezerPlaylists, setSelectedPlaylist } from "../../reducers/deezerReducer";
import { useNavigate } from "react-router-dom";
import { PlaylistItem } from "../PlaylistItem";
import { useGetDeezerUserData } from "../../hooks/deezer/useGetDeezerUserData";
import { useEffect } from "react";
import { SpotifyPlaylist } from "../../types/spotify/SpotifyPlaylist";
import './styles/DeezerPlaylistsItem.scss';
import { PlaylistLayout } from "../../layouts/PlaylistLayout";

export const DeezerPlaylistsItem = () => {
  const [user] = useGetDeezerUserData(); 
  const [userDeezerPlaylist] = useGetDeezerPlaylist();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectPlaylist = (playlist: DeezerPlaylist | SpotifyPlaylist) => {
    if ('duration' in playlist) {
      dispatch(setSelectedPlaylist(playlist as DeezerPlaylist));
      navigate('/deezer-to-spotify/tracks');
    }
  }

  useEffect(() => {
    // Reset playlist & tracks on load
    dispatch(resetPlaylistAndTracks());

    if (userDeezerPlaylist) {
      dispatch(setDeezerPlaylists(userDeezerPlaylist));
    }
  }, [userDeezerPlaylist])


  return ( user && userDeezerPlaylist ) && 
      <PlaylistLayout
        name={user.firstname.length > 0 ? user.firstname : user?.name ?? 'User'}
      >
        {userDeezerPlaylist?.map((playlist: DeezerPlaylist) => (
            playlist.nb_tracks > 0 &&  <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              cover={playlist.picture}
              title={playlist.title}
              nbTracks={playlist.nb_tracks}
              author={playlist.creator.name}
              handleClick={handleSelectPlaylist}
              type="deezer"
            />
          ))}
      </PlaylistLayout>
}
