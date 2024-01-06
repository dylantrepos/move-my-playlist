import './styles/TracksNotFoundItem.scss';
import { DeezerTrack } from '../types/deezer/DeezerPlaylistTracks';
import { TrackItem } from './TrackItem';
import { SpotifyTrack } from '../types/spotify/SpotifyTrack';

type Props = {
  tracksNotFound: DeezerTrack[] | SpotifyTrack[];
}

export const TracksNotFoundItem = ({
  tracksNotFound
}: Props) => {
  return (
    <>
      {tracksNotFound.map(track => (
        <TrackItem
          key={`not-found-${track.id}`}
          cover={'isrc' in track ? track.album.cover : track.album.images[0].url ?? ''}
          trackTitle={'isrc' in track ? track.title : track.name }
          albumTitle={'isrc' in track ? track.album.title : track.album.name}
          artist={'isrc' in track ? track.artist.name : track.artists.map(artist => artist.name).join(', ')} 
        />
      ))}
    </>
  )
}

