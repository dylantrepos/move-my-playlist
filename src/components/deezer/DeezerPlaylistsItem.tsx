import { useGetDeezerPlaylist } from "../../hooks/deezer/useGetDeezerPlaylists";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DeezerDetails from '../../assets/images/deezer-details.png'
import './styles/DeezerPlaylistItem.scss';

type Props = {
  handleSelectPlaylist: (playlist: DeezerPlaylist) => void;
}

export const DeezerPlaylistsItem = ({ handleSelectPlaylist }: Props) => {
  const [userDeezerPlaylist] = useGetDeezerPlaylist();
  const { accessToken } = useSelector((state: RootState) => state.deezer.token);

  return userDeezerPlaylist ? 
    <>
      {userDeezerPlaylist.data?.map((playlist: DeezerPlaylist) => (
        <button 
          key={playlist.id} 
          className="deezerPlaylistItem__playlist-item"
          onClick={() => handleSelectPlaylist(playlist)}
        >
          <img 
            src={`${playlist.picture}?access_token=${accessToken}`} 
            className="deezerPlaylistItem__playlist-item-image"
          />
          <p className="deezerPlaylistItem__playlist-item-title">{playlist.title}</p>
          <p className="deezerPlaylistItem__playlist-item-info">
          {playlist.nb_tracks} {`Track${playlist.nb_tracks > 1 ? 's' : ''}`}</p>
          <p className="deezerPlaylistItem__playlist-item-author">
          Created by {playlist.creator.name} </p>
          <img 
            src={DeezerDetails}
            className="deezerPlaylistItem__playlist-item-settings" 
          />
        </button>
      ))}
    </>
  : ''
}
