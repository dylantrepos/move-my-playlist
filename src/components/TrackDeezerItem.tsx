import { ReactNode } from "react";
import { TrackDeezer } from "../types/PlaylistTracksDeezer";
import { useGetTracks } from "../hooks/useGetTracks";
import { useSelector } from "react-redux";
import { AccessTokenResponse } from "../types/Login";
import { RootState } from "../store/store";
import { DEEZER_API_BASE, DEEZER_PLAYLIST, DEEZER_TRACKS } from "../env";

type TrackDeezerItemProps = {
  children?: ReactNode;
  playlistId: string;
};
export default function TrackDeezerItem({playlistId}: TrackDeezerItemProps) {
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  const deezerAuthURL = new URL(`${DEEZER_PLAYLIST}/${playlistId}${DEEZER_TRACKS}`, DEEZER_API_BASE);
  deezerAuthURL.searchParams.append('access_token', userDeezerToken?.access_token ?? '');

  const [trackListData] = useGetTracks(deezerAuthURL.toString());
  console.log('changed TrackDeezerItem : ', trackListData);

  return trackListData?.data ? <>
    <div>TrackDeezerItem</div>
    <h4>Total song : {trackListData?.total}</h4>
    <h3>Songs : </h3>
    <ul>
      { trackListData?.data?.length > 1 
        ? trackListData?.data?.map((track: TrackDeezer) => 
          <li key={track.id}>
            <b>{track.title}</b> - {track.artist?.name}
          </li>)
        : ''
      }
    </ul>
    </>
      : ''
}
