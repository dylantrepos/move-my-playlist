import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.scss';
import { useEffect, useRef, useState } from 'react';

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavigation = (to: 'spotify' | 'deezer') => {
    setDropdownOpen(false);
    if (to === 'spotify') {
      navigate('/spotify-to-deezer/playlist')
    } else {
      navigate('/deezer-to-spotify/playlist')
    }
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
        className='header__title'
      >
        Move My Playlist
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
              onClick={() => handleNavigation('spotify')}
              className='header__dropdown-item'
            >
              Transfert Spotify playlist to Deezer
            </div>
            <div 
              onClick={() => handleNavigation('deezer')}
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
