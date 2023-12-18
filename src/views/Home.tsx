import { ChangeEvent, FormEvent, useState } from 'react';
import './styles/Home.scss';
import DeezerIcon from '../assets/images/deezer-sm.png';
import SpotifyIcon from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [choice, setChoice] = useState<string>();
  const navigate = useNavigate();

  const handleChangeHomeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('radio : ', e.target.value);
    setChoice(e.target.value);
  }

  const handlePostHomeForm = (e: FormEvent) => {
    e.preventDefault();
    navigate(choice === 'deezerToSpotify' ? '/deezer-to-spotify' : '/spotify-to-deezer');
  }

  return (
    <div className="home__main-container">
      <h1 className="home__title">
        Choose the way to go
      </h1>
      <form 
        className="home__form"
        onSubmit={handlePostHomeForm}
      >
        <label htmlFor='deezerToSpotify'>
          <input 
            type="radio" 
            name="homeradio" 
            id="deezerToSpotify" 
            value="deezerToSpotify" 
            onChange={handleChangeHomeRadio}
            checked={choice === 'deezerToSpotify'}
          />
          <span className='home__deezer-spotify-arrow'>  
            <img src={DeezerIcon}/>
            <img src={Arrow}/>
            <img src={SpotifyIcon}/>
            <p>Transfert Deezer playlist to Spotify</p>
          </span>
          
        </label>
        <label htmlFor='spotifyToDeezer'>
          <input 
            type="radio" 
            name="homeradio" 
            value="spotifyToDeezer" 
            id="spotifyToDeezer" 
            onChange={handleChangeHomeRadio}
            checked={choice === 'spotifyToDeezer'}
            />
         <span className='home__deezer-spotify-arrow'>  
            <img src={SpotifyIcon}/>
            <img src={Arrow}/>
            <img src={DeezerIcon}/>
            <p>Transfert Spotify playlist to Deezer</p>
          </span>
        </label>
        <button 
          className={`button-primary home__submit-button ${choice ? '-active' : ''}`}
          type='submit'
          disabled={!choice}
        >
          Confirm
        </button>
      </form>
      {/* <div>
        <div>
          <Link to={'../deezer-to-spotify'}>
            Transfert Deezer playlist to Spotify
          </Link>
          <Link to={'../spotify-to-deezer'}>
            Transfert Spotify playlist to Deezer
          </Link>
        </div>
      </div> */}
    </div> 
  )
}
