import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Check } from "../assets/icons/Check";
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import { AnyAction } from "redux";

type Props = {
  selectedTracks: number[] | string[];
  selectedPlaylist: DeezerPlaylist | SpotifyPlaylist;
  updateAllTrack: (type: 'checkAll' | 'uncheckAll') => AnyAction;
}

export const ToggleItem = ({
  selectedTracks,
  selectedPlaylist,
  updateAllTrack
}: Props) => {
  const [checkAllTracks, setCheckAllTracks] = useState(false);

  const dispatch = useDispatch();

  const handleCheckAllTracks = () => {
    dispatch(updateAllTrack(checkAllTracks ? 'uncheckAll' : 'checkAll'));
    setCheckAllTracks(!checkAllTracks);
  }

  useEffect(() => {
    if (selectedTracks.length === 0) setCheckAllTracks(false);
    else {
      'nb_tracks' in selectedPlaylist 
        ? setCheckAllTracks(selectedTracks.length === selectedPlaylist?.nb_tracks)
        : setCheckAllTracks(selectedTracks.length === selectedPlaylist.tracks.total);
    }
  }, [selectedTracks, selectedPlaylist])

  return (
    <button 
      className={`${checkAllTracks ? '-checked' :''}`}
      onClick={() => handleCheckAllTracks()}
    >
      {`${checkAllTracks ? 'Unselect' : 'Select'} all`}
      <Check classNames={`${checkAllTracks && '-checked'}`} /> 
    </button> 
  )
}
