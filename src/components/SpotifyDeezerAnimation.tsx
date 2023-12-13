import Gif from '../assets/images/deezer-to-spotify.gif';
import './styles/SpotifyDeezerAnimation.scss';

export const SpotifyDeezerAnimation = () => {

  return (
    <div className='animation__container'>
      <img src={Gif} className='animation__logo'/>
    </div>
  )
}