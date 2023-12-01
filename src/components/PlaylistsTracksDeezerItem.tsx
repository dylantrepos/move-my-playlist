import { TrackDeezer } from "../types/PlaylistTracksDeezer";
import { useGetTracks } from "../hooks/useGetTracks";

type TrackDeezerItemProps = {
  track: TrackDeezer;
};

const TrackItem = ({track}: TrackDeezerItemProps) => {

  return (
    <label style={{display: "flex", border: '1px solid #c8c8c8', borderRadius: '5px', padding: '5px 0', cursor: "pointer"}}>
        <input type="checkbox" style={{margin: '0 15px'}}/>
        <img src={track.album.cover} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <b style={{fontWeight: 500}}>{track.title}</b>
          <span>{track.artist?.name}</span>
        </div>
    </label>
  )
}

type PlaylistTrackDeezerItemProps = {
  playlistId: string;
};

export const PlaylistTracksDeezerItem: React.FC<PlaylistTrackDeezerItemProps> = ({ playlistId }) => {
  const [trackListData, hasLoaded] = useGetTracks(playlistId);

  return !hasLoaded || !trackListData
    ? <p>Loading tracks ...</p>
    : trackListData?.total === 0 
      ? <p>No tracks in this playlist.</p> 
      : <>
          <div>TrackDeezerItem</div>
          <h4>Total song : {trackListData?.total}</h4>
          <h3>Songs : </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '50px', maxWidth: '600px'}}>
            { trackListData?.data?.map((track: TrackDeezer) => 
                <TrackItem track={track} key={`${track.id}`} />
              )
            }
          </div>
        </>
}