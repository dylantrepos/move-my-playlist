import { Link } from "react-router-dom";
import './styles/Landing.scss';
import { SpotifyDeezerArrow } from "../components/SpotifyDeezerArrow";
import Gif from '../assets/images/deezer-to-spotify.gif';


export default function Landing() {

  return (
    <div className="home__main-container">
      <header className="home__header-container">
        <h1>Move My Playlist</h1>
      </header>

      <section className="home__description-container">
        <h2>Seamless Playlist Migration Between Deezer and Spotify</h2>
        <p>Are you tired of manually recreating your favorite playlists on different music platforms? Say goodbye to the hassle, and welcome to Move My Playlist – the ultimate solution for effortlessly transferring your music playlists between Deezer and Spotify!</p>
        <Link 
          to="login"
          className="primary-button home__started-button"
        >
          Get Started
        </Link>
      </section>

      <section className="home__steps-container">
        <h3>How It Works:</h3>
        <ol>
            <li>Connect Your Accounts: Link your Deezer and Spotify accounts securely with Move My Playlist.</li>
            <li>Select Your Playlists: Choose the playlists you want to transfer. You can select individual playlists or transfer them in batches.</li>
            <li>Sit Back and Relax: Our system takes care of the heavy lifting. Grab a cup of coffee, and your playlists will be ready on the other platform in no time.</li>
        </ol>
      </section>
      <section className="home__demonstration">
        <SpotifyDeezerArrow />
        <img src={Gif} className='home__gif'/>
      </section>
      {/* <footer>
        <p>Move My Playlist - Your Music, Your Way! 🎶</p>
      </footer> */}
    </div>
  )
}
