import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.scss';
import { useEffect, useRef, useState } from 'react';
import Logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { setContext } from '../reducers/generalReducer';

type Props = {
  withToggle?: boolean;
}

export const Header = ({
  withToggle = false
}: Props = {
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (direction: string) => {
    setDropdownOpen(false);

    const {from, to} = JSON.parse(direction);
    dispatch(setContext({from, to}));
    navigate(`/${from}-to-${to}/playlist`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className='header__container'>
      <Link 
        to={'/'}
        className='header__logo'
      >
        <img className='header__logo-image' src={Logo} alt="logo" />
        <p  className='header__logo-title'>Move My Playlist</p>
      </Link>
      {withToggle && <div className='header__dropdown' ref={dropdownRef}>
        <div 
          className={`header__burger-menu ${dropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div 
          className={`header__classic-menu ${dropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          Transfert
        </div>
        {dropdownOpen && (
          <div className='header__dropdown-menu'>
            <div 
              onClick={() => handleNavigation(JSON.stringify({from: 'spotify', to: 'deezer'}))}
              className='header__dropdown-item'
            >
              Transfert Spotify playlist to Deezer
            </div>
            <div 
              onClick={() => handleNavigation(JSON.stringify({from: 'deezer', to: 'spotify'}))}
              className='header__dropdown-item'
            >
              Transfert Deezer playlist to Spotify
            </div>
          </div>
        )}
      </div>}
    </header>
  )
}
