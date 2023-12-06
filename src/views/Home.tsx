import { Link } from 'react-router-dom';

export default function Home() {

  return <>
      <div>Home</div>
      <Link to={'/'}>go back to connection</Link>
      <div style={{display: 'flex', gap: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <Link
            to={'../deezer-to-spotify'}
            style={{
              background: 'black',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              color: 'white', 
            }}
          >
            Transfert Deezer playlist to Spotify
          </Link>
          <Link
            to={'../spotify-to-deezer'}
            style={{
              background: 'black',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              color: 'white', 
            }}
          >
            Transfert Spotify playlist to Deezer
          </Link>
        </div>
      </div>
    </> 
}
