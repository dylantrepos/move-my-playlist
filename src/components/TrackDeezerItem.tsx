import { ReactNode } from "react";
import { TrackDeezer } from "../types/PlaylistTracksDeezer";
import { useGetTracks } from "../hooks/useGetTracks";

type TrackDeezerItemProps = {
  children?: ReactNode;
  playlistId: string;
};
export default function TrackDeezerItem({playlistId}: TrackDeezerItemProps) {

  const [trackListData] = useGetTracks(playlistId);
  console.log('changed TrackDeezerItem : ', playlistId);

  return trackListData?.data ? <>
    <div>TrackDeezerItem</div>
    <h4>Total song : {trackListData?.total}</h4>
    <h3>Songs : </h3>
    <ul>
      {
        trackListData?.data?.map((track: TrackDeezer) => 
    <li key={track.id}>
      <b>{track.title}</b> - {track.artist.name}
    </li>
        )
      }
    </ul>
    </>
      : ''
}
