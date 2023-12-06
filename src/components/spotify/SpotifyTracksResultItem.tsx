import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";

type Props = {
  deezerTracksFound: DeezerTrack[];
  deezerTracksNotFound: DeezerTrack[];
}

export const SpotifyTracksResultItem = ({ deezerTracksFound, deezerTracksNotFound }: Props) => {

  return <>
    <DeezerTracksNotFoundItem deezerTracksNotFound={deezerTracksNotFound} />
    <DeezerTracksFoundItem deezerTracksFound={deezerTracksFound} />
  </>
}


const DeezerTracksFoundItem = ({ deezerTracksFound }: Pick<Props, 'deezerTracksFound'>) => {
  return deezerTracksFound.length > 0 ? 
  <div style={{marginTop: 20}}>
    <h6>Tracks found : </h6>
    {
      deezerTracksFound.map((track: DeezerTrack) => (
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
      <img src={track.album?.cover} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
          <div style={{display: "flex", flexDirection: "column"}}>
            <b style={{fontWeight: 500}}>{track.title}</b>
            <span>{track.artist?.name}</span>
          </div>
      </div>
      ))
    }
  </div> : ''
}

const DeezerTracksNotFoundItem = ({ deezerTracksNotFound }: Pick<Props, 'deezerTracksNotFound'>) => {
  return deezerTracksNotFound.length > 0 ? 
  <div style={{marginTop: 20}}>
    <h6>Tracks not found : </h6>
    { deezerTracksNotFound.map((track: DeezerTrack) => (
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
        <img src={track.album.cover} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <b style={{fontWeight: 500}}>{track.title}</b>
          <span>{track.artist?.name}</span>
        </div>
      </div>
    ))}
  </div> : ''
  }