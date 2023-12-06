import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useGetSpotifyTracks } from "../../hooks/spotify/useGetSpotifyTracks";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { setSpotifyPlaylist } from '../../reducers/spotifyReducer';

type TrackSpotifyItemProps = {
  track: SpotifyTrack;
  isChecked: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TrackItem = ({track, isChecked, handleCheckboxChange}: TrackSpotifyItemProps) => {

  return (
    <label style={{
            display: "flex", 
            border: `1px solid ${isChecked ? 'rgb(113 141 255)' : '#c8c8c8'}`, 
            borderRadius: '5px', 
            padding: '5px 0', 
            cursor: "pointer",
            background: isChecked ? '#e7f4ff' : 'transparent',
            transition: 'all .2s ease'
          }}>
        <input 
          type="checkbox" 
          style={{
            margin: '0 15px'
          }} 
          value={track.id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <img src={track.album.images[0].url} style={{width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px'}}/>
        <div style={{display: "flex", flexDirection: "column"}}>
          <b style={{fontWeight: 500}}>{track.name}</b>
          <span>{track.artists.map(artist => artist.name).join(' - ')}</span>
        </div>
    </label>
  )
}

type PlaylistTrackDeezerItemProps = {
  playlistId: string;
};

export const SpotifyPlaylistTracksItem: React.FC<PlaylistTrackDeezerItemProps> = ({ playlistId }) => {
  const [trackListData, hasLoaded] = useGetSpotifyTracks(playlistId);
  const [trackIdList, setTrackIdList] = useState<string[]>([]);
  const [IsAllTrackChecked, setIsAllTracksChecked] = useState(false);
  const dispatch = useDispatch();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedTrackIdlist = trackIdList.includes(value)
      ? trackIdList.filter((track) => track !== value)
      : [...trackIdList, value];

    setTrackIdList(updatedTrackIdlist);
  };

  const handleCheckAllTracks = () => {
    if (trackListData?.items) {
      if (IsAllTrackChecked) {
        setTrackIdList([]);
        setIsAllTracksChecked(false)
      } else {
        setTrackIdList(trackListData.items.map((track: SpotifyTrack) => track.id.toString()));
        setIsAllTracksChecked(true)
      }
    }
  }

  const handleSubmitPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({trackIdList});

    const playlist = trackIdList.map((track) => 
      trackListData?.items.find((trackData: SpotifyTrack) => trackData.id === track)) as SpotifyTrack[];
    
    dispatch(setSpotifyPlaylist(playlist));

    console.log('Final records : ', playlist);
  }

  useEffect(() => {
    setTrackIdList([]);
    setIsAllTracksChecked(false);
  }, [playlistId])

  return !hasLoaded || !trackListData
    ? <p>Loading tracks ...</p>
    : trackListData?.total === 0 
      ? <p>No tracks in this playlist.</p> 
      : <>
          <h4>Total tracks : {trackListData?.total}</h4>
          <h3>Tracks : </h3>
          <form 
            style={{display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '50px', maxWidth: '500px'}}
            onSubmit={handleSubmitPlaylist}
          >
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCheckAllTracks}>{IsAllTrackChecked ? 'Uncheck' : 'Check'} All Records</button>
            { trackListData?.items?.map((track: SpotifyTrack) => 
                <TrackItem 
                  track={track} 
                  key={`${track.id}`} 
                  isChecked={trackIdList.includes(track.id.toString())}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )
            }
          </form>
        </>
}