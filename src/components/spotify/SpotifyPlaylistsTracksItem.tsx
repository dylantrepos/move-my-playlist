import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedPlaylist, setSelectedTracks, updateAllTrack } from "../../reducers/spotifyReducer";
import { TrackInputItem } from "../TrackItem";

import './styles/SpotifyPlaylistTracksItem.scss';
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { useGetSpotifyTracks } from "../../hooks/spotify/useGetSpotifyTracks";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { PlaylistTracksLayout } from "../../layouts/PlaylistTracksLayout";

export const SpotifyPlaylistsTracksItem = () => {
  const {selectedTracks, selectedPlaylist, playlists} = useSelector((state: RootState) => state.spotify);
  const [trackListData, hasLoaded] = useGetSpotifyTracks(selectedPlaylist?.id.toString() ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedPlaylist) navigate('/spotify-to-deezer/playlist');
  }, [])


  const handleSubmitPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/spotify-to-deezer/transfert');
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trackId = e.target.value;
    
    const updatedTrackIdlist = selectedTracks.includes(trackId)
    ? selectedTracks.filter((track) => track !== trackId)
    : [...selectedTracks, trackId];

    dispatch(setSelectedTracks(updatedTrackIdlist));
  };

  const handleChangePlaylist = (e: ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    const selectedPlaylist = playlists.find(playlist => playlist.id.toString() === playlistId);

    console.log(playlistId);

    if (selectedPlaylist) {
      dispatch(setSelectedPlaylist(selectedPlaylist))
      dispatch(setSelectedTracks([]));
    }
  }

  return selectedPlaylist && 
    <PlaylistTracksLayout
      title="Choose the tracks"
      listTitle={selectedPlaylist.name}
      listSubtitle="Recently played"
      playlists={playlists}
      hasLoaded={hasLoaded}
      selectedTracks={selectedTracks}
      selectedPlaylist={selectedPlaylist}
      trackListData={trackListData || []}
      handleSubmitPlaylist={handleSubmitPlaylist}
      handleChangePlaylist={handleChangePlaylist}
      updateAllTracks={(checkAllTracks: 'checkAll' | 'uncheckAll') => dispatch(updateAllTrack(checkAllTracks))}
      listClassNames="-spotify"
    >
      {trackListData?.map((track: SpotifyTrack) => (
        <TrackInputItem
          key={track.id} 
          id={track.id}
          cover={track.album.images[0].url ?? ''}
          trackTitle={track.name}
          albumTitle={track.album.name}
          artist={track.artists.map(artist => artist.name).join(', ')}
          checked={selectedTracks.includes(track.id)}
          handleChange={handleCheckboxChange}
        />
      ))}
    </PlaylistTracksLayout>
  
}
