import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import DeezerDetails from '../assets/images/deezer-details.png'
import './styles/PlaylistItem.scss';

type Props = {
  playlist: DeezerPlaylist;
  cover: string;
  title: string;
  nbTracks: number;
  author: string;
  type: 'deezer' | 'spotify';
  handleClick: (playlist: DeezerPlaylist) => void;
}

export const PlaylistItem = ({
  playlist, 
  cover,
  title,
  nbTracks,
  author,
  type,
  handleClick
}: Props) => {
  return (
      <button 
        key={playlist.id} 
        className="playlistItem"
        onClick={() => handleClick(playlist)}
      >
        <img 
          src={cover} 
          className="playlistItem__image"
        />
        <p className="playlistItem__title">
          {title}
        </p>
        <p className="playlistItem__info">
          {nbTracks} {`Track${nbTracks > 1 ? 's' : ''}`}
        </p>
        <p className="playlistItem__author">
          Created by {author} 
        </p>
        { type === 'deezer' ? 
          <img 
          src={DeezerDetails}
          className="playlistItem__settings" 
          /> 
        : '' }
      </button>
  )
}
