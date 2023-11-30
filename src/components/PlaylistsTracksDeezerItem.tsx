import { TrackDeezer } from "../types/PlaylistTracksDeezer";
import { useGetTracks } from "../hooks/useGetTracks";

type PlaylistTrackDeezerItemProps = {
  playlistId: string;
};

export const PlaylistTracksDeezerItem: React.FC<PlaylistTrackDeezerItemProps> = ({ playlistId }) => {
  const [trackListData] = useGetTracks(playlistId);

  console.log({trackListData});

  return trackListData.loaded 
    ? <>
        <div>TrackDeezerItem</div>
        <h4>Total song : {trackListData?.total}</h4>
        <h3>Songs : </h3>
        <ul>
          { trackListData?.data?.length > 1 
            ? trackListData?.data?.map((track: TrackDeezer) => 
              <TrackItem track={track} key={track.id} />)
            : ''
          }
        </ul>
      </>
      : 'Loading...'
}

type TrackDeezerItemProps = {
  track: TrackDeezer;
};

const TrackItem = ({track}: TrackDeezerItemProps) => {

  return <li>
            <b>{track.title}</b> - {track.artist?.name}
        </li>
}