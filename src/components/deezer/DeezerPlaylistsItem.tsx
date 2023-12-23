import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useDispatch } from 'react-redux';
import { setDeezerPlaylists, setSelectedPlaylist } from "../../reducers/deezerReducer";
import { useNavigate } from "react-router-dom";
import { PlaylistItem } from "../PlaylistItem";
import './styles/DeezerPlaylistItem.scss';
import { useGetDeezerUserData } from "../../hooks/deezer/useGetDeezerUserData";
import PlaylistLayout from "../../layout/PlaylistLayout";
import { ListContainer } from "../ListContainer";
import { useEffect } from "react";

export const DeezerPlaylistsItem = () => {
  const [user] = useGetDeezerUserData(); 
  const [userDeezerPlaylist] = useGetDeezerPlaylist();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectPlaylist = (playlist: DeezerPlaylist) => {
    dispatch(setSelectedPlaylist(playlist));
    navigate('/deezer-to-spotify/tracks');
  }

  useEffect(() => {
    if (userDeezerPlaylist) {
      dispatch(setDeezerPlaylists(userDeezerPlaylist));
    }
  }, [userDeezerPlaylist])


  return userDeezerPlaylist ? 
    <PlaylistLayout title={'Choose the playlist'}>
      <ListContainer 
        title={`Playlists de ${user?.firstname}`}
      >
        {userDeezerPlaylist?.map((playlist: DeezerPlaylist) => (
          <PlaylistItem
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
      </ListContainer>
    </PlaylistLayout>
  : ''
}
