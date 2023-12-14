import { Link } from 'react-router-dom';
import './styles/Header.scss';

export const Header = () => {

  return (
    <header className='header__container'>
      <Link 
        to={'/'}
        className='header__title'
      >
        Move My Playlist
      </Link>
    </header>
  )
}
