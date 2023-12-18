import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { useGetDeezerTracks } from "../../hooks/deezer/useGetDeezerTracks";
import './styles/DeezerPlaylistTracksItem.scss';
import { Check } from "../../assets/icons/check";
import { useEffect, useState } from "react";

type Props = {
  playlist: DeezerPlaylist;
  checkAllTracks: boolean;
  tracklistIds: string[];
  setTracklistIds: (tracklist: string[]) => void;
}

export const DeezerPlaylistsTracksItem = ({ playlist, checkAllTracks, tracklistIds, setTracklistIds }: Props) => {
  const [trackListData, hasLoaded] = useGetDeezerTracks(playlist.id.toString());
  // const [trackIdList, setTrackIdList] = useState<string[]>([]);
  const [IsAllTrackChecked, setIsAllTracksChecked] = useState(false);

  const handleSubmitPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({trackIdList});

    // const playlist = trackIdList.map((track) => 
    //   trackListData?.data.find((trackData: DeezerTrack) => trackData.id === +track)) as DeezerTrack[];
    
    // dispatch(setDeezerPlaylist(playlist));

    console.log('Final records : ', playlist);
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedTrackIdlist = tracklistIds.includes(value)
      ? tracklistIds.filter((track) => track !== value)
      : [...tracklistIds, value];
      
    setTracklistIds(updatedTrackIdlist);
  };

  useEffect(() => {
    if (trackListData?.data) {
      if (IsAllTrackChecked) {
        setTracklistIds([]);
        setIsAllTracksChecked(false)
      } else {
        setTracklistIds(trackListData.data.map((track: DeezerTrack) => track.id.toString()));
        setIsAllTracksChecked(true)
      }
    }
  }, [checkAllTracks]);

  return !hasLoaded || !trackListData
    ? <p>Loading tracks ...</p>
    : trackListData?.total === 0 
      ? <p>No tracks in this playlist.</p> 
      :
    <form
      className="deezerPlaylistsTracksItem__playlist-form"
      onSubmit={handleSubmitPlaylist}
    >
      {trackListData.data?.map((track: DeezerTrack) => (
        <label 
          key={track.id} 
          className="deezerPlaylistsTracksItem__playlist-item"
        >
           <input 
            type="checkbox" 
            style={{
              margin: '0 15px'
            }} 
            value={track.id}
            checked={tracklistIds.includes(track.id.toString())}
            onChange={handleCheckboxChange}
          />
          <img 
            src={track.album.cover} 
            className="deezerPlaylistsTracksItem__playlist-item-image"
          />
          <p className="deezerPlaylistsTracksItem__playlist-item-title">
            {track.title}
          </p>
          <p className="deezerPlaylistsTracksItem__playlist-item-info">
            {track.artist.name}
          </p>
          <p className="deezerPlaylistsTracksItem__playlist-item-author">
            {track.album.title} 
          </p>
          <p className="deezerPlaylistsTracksItem__playlist-item-author">
            {track.album.title} 
          </p>
          <Check            
            classNames={`deezerPlaylistsTracksItem__playlist-item-check ${tracklistIds.includes(track.id.toString()) ? '-checked' : ''}`} 
          />
        </label>
      ))}
  </form> 
}
