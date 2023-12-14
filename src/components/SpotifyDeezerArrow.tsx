import DeezerLogo from '../assets/images/deezer-sm.png';
import SpotifyLogo from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';
import './styles/SpotifyDeezerArrow.scss';

export const SpotifyDeezerArrow = () => {
  return (
    <div className='SpotifyDeezerArrow__container'>
      <img src={DeezerLogo} />
      <img src={Arrow} />
      <img src={SpotifyLogo} />
    </div>
  )
}
