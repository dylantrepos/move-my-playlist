import { Link } from 'react-router-dom';
import './styles/Header.scss';
import { useEffect, useRef, useState } from 'react';
import DeezerIcon from '../assets/images/deezer-sm.png';
import SpotifyIcon from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';

type Props = {
  withToggle?: boolean;
}

export const Header = ({
  withToggle = false
}: Props = {
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        className='header__title'
      >
        Move My Playlist
      </Link>
      {withToggle && <div className='header__dropdown' ref={dropdownRef}>
        <button 
          className='header__dropdown-toggle'
          onClick={toggleDropdown}
        >
          Options V
        </button>
        {dropdownOpen && (
          <div className='header__dropdown-menu'>
            <Link 
              to={'spotify-to-deezer/playlist'}
              className='header__dropdown-item'
            >
              <img src={SpotifyIcon}/>
              <img src={Arrow}/>
              <img src={DeezerIcon}/>
            </Link>
            <Link 
              to={'deezer-to-spotify/playlist'}
              className='header__dropdown-item'
            >
              <img src={DeezerIcon}/>
              <img src={Arrow}/>
              <img src={SpotifyIcon}/>
            </Link>
          </div>
        )}
      </div>}
    </header>
  )
}
