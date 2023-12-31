import { Link } from 'react-router-dom';
import './styles/Header.scss';
import { useEffect, useRef, useState } from 'react';
import DeezerIcon from '../assets/images/deezer-sm.png';
import SpotifyIcon from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';

export const Header = () => {
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
      <div className='header__dropdown' ref={dropdownRef}>
        <button onClick={toggleDropdown}>Options V</button>
        {dropdownOpen && (
          <div className='header__dropdown-menu'>
            <button onClick={() => console.log('Option 1 clicked')}>
              <img src={SpotifyIcon}/>
              <img src={Arrow}/>
              <img src={DeezerIcon}/>
            </button>
            <button onClick={() => console.log('Option 2 clicked')}>Option 2</button>
          </div>
        )}
      </div>
    </header>
  )
}
