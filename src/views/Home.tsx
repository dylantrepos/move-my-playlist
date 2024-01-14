import { ChangeEvent, FormEvent, useState } from 'react';
import './styles/Home.scss';
import DeezerIcon from '../assets/images/deezer-sm.png';
import SpotifyIcon from '../assets/images/spotify-sm.png';
import Arrow from '../assets/images/arrow.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setContext } from '../reducers/generalReducer';
import { ContextTransfert } from '../types/general';

export default function Home() {
  const [choice, setChoice] = useState<ContextTransfert>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeHomeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setChoice(JSON.parse(e.target.value));
  }

  const handlePostHomeForm = (e: FormEvent) => {
    e.preventDefault();
    if (choice) {
      const {from, to} = choice;
      dispatch(setContext({from, to}));
  
      navigate(`/${from}-to-${to}/playlist`);
    }
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
            value={JSON.stringify({from: 'deezer', to: 'spotify'})}
            onChange={handleChangeHomeRadio}
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
            value={JSON.stringify({from: 'spotify', to: 'deezer'})}
            id="spotifyToDeezer" 
            onChange={handleChangeHomeRadio}
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
    </div> 
  )
}
