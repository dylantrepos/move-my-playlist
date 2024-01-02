import DeezerLogo from '../assets/images/deezer-sm.png';
import SpotifyLogo from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';
import './styles/SpotifyDeezerArrow.scss';

type Props = {
  className?: string;
  deezerToSpotify?: boolean
}

export const SpotifyDeezerArrow = ({ className, deezerToSpotify = true }: Props) => {
  return (
    <div className={`spotifyDeezerArrow__container ${className ?? ''}`}>
      <img src={deezerToSpotify ? DeezerLogo : SpotifyLogo} />
      <img src={Arrow} />
      <img src={deezerToSpotify ? SpotifyLogo : DeezerLogo} />
    </div>
  )
}
