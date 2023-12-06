import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";

type Props = {
  spotifyTracksFound: SpotifyTrack[];
  spotifyTracksNotFound: SpotifyTrack[];
}

export const DeezerTracksResultItem = ({ spotifyTracksFound, spotifyTracksNotFound }: Props) => {

  return <>
    <SpotifyTracksNotFoundItem spotifyTracksNotFound={spotifyTracksNotFound} />
    <SpotifyTracksFoundItem spotifyTracksFound={spotifyTracksFound} />
  </>
}


const SpotifyTracksFoundItem = ({ spotifyTracksFound }: Pick<Props, 'spotifyTracksFound'>) => {
  return spotifyTracksFound.length > 0 ? 
  <div style={{marginTop: 20}}>
    <h6>Tracks found : </h6>
    {
      spotifyTracksFound.map((track: SpotifyTrack) => (
        <div style={{
          display: "flex", 
          border: `1px solid #04db1f`, 
          borderRadius: '5px', 
          padding: '5px', 
          cursor: "pointer",
          background: '#e7f6ea',
          margin: '5px 0'
        }}
        key={`found-${track.id}`}
        >
      <img src={track.album.images[0].url} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <b style={{fontWeight: 500}}>{track.name}</b>
          <span>{track.artists.map(artist => artist.name).join(' - ')}</span>
        </div>
      </div>
      ))
    }
  </div> : ''
}

const SpotifyTracksNotFoundItem = ({ spotifyTracksNotFound }: Pick<Props, 'spotifyTracksNotFound'>) => {
  return spotifyTracksNotFound.length > 0 ? 
  <div style={{marginTop: 20}}>
    <h6>Tracks not found : </h6>
    { spotifyTracksNotFound.map((track: SpotifyTrack) => (
      <div 
        style={{
          display: "flex", 
          border: `1px solid #ff0b0b`, 
          borderRadius: '5px', 
          padding: '5px', 
          cursor: "pointer",
          background: '#f6e7e7',
          margin: '5px 0'
        }}
        key={`not-found-${track.id}`}
      >
        <img src={track.album.images[0].url} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <b style={{fontWeight: 500}}>{track.name}</b>
          <span>{track.artists.map(artist => artist.name).join(' - ')}</span>
        </div>
      </div>
    ))}
  </div> : ''
  }
  