import './styles/TracksNotFoundItem.scss';
import { DeezerTrack } from '../types/deezer/DeezerPlaylistTracks';
import { TrackItem } from './TrackItem';

type Props = {
  tracksNotFound: DeezerTrack[];
}

export const TracksNotFoundItem = ({
  tracksNotFound
}: Props) => {
  return (
    <div className='tracksNotFoundItem'>
      {tracksNotFound.map(track => (
        <TrackItem
          key={`not-found-${track.id}`}
          cover={track.album.cover}
          trackTitle={track.title}
          albumTitle={track.album.title}
          artist={track.artist.name} 
        />
      ))}
    </div>
  )
}
