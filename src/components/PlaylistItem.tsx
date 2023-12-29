import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import DeezerDetails from '../assets/images/deezer-details.png'
import './styles/PlaylistItem.scss';
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";
import { Disc } from "../assets/icons/Disc";

type Props = {
  playlist: DeezerPlaylist | SpotifyPlaylist;
  cover: string;
  title: string;
  nbTracks: number;
  author: string;
  type: 'deezer' | 'spotify';
  handleClick: <T extends DeezerPlaylist | SpotifyPlaylist>(playlist: T) => void;
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
        {cover 
        ? <img 
            src={cover} 
            className="playlistItem__image"
          />
        : <div className="playlistItem__image">
            <Disc />
          </div>
        }
        
        <p className="playlistItem__title">
          {title}
        </p>
        <p className="playlistItem__info">
          {nbTracks} {`Track${nbTracks > 1 ? 's' : ''}`}
        </p>
        <p className="playlistItem__author">
          Created by {author} 
        </p>
        { type === 'deezer' && 
          <img 
            src={DeezerDetails}
            className="playlistItem__settings" 
          /> 
        }
      </button>
  )
}
