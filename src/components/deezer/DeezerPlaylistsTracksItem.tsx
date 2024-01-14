import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { useGetDeezerTracks } from "../../hooks/deezer/useGetDeezerTracks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedPlaylist, setSelectedTracks, updateAllTrack } from "../../reducers/deezerReducer";
import { TrackInputItem } from "../TrackItem";

import './styles/DeezerPlaylistTracksItem.scss';
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { PlaylistTracksLayout } from "../../layouts/PlaylistTracksLayout";

export const DeezerPlaylistsTracksItem = () => {
  const {selectedTracks, selectedPlaylist, playlists} = useSelector((state: RootState) => state.deezer);
  const [trackListData, hasLoaded] = useGetDeezerTracks(selectedPlaylist?.id.toString() ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedPlaylist) navigate('/deezer-to-spotify/playlist');
  }, [])


  const handleSubmitPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/deezer-to-spotify/transfert');
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trackId = +e.target.value;
    const updatedTrackIdlist = selectedTracks.includes(trackId)
      ? selectedTracks.filter((track) => track !== trackId)
      : [...selectedTracks, trackId];
      
    dispatch(setSelectedTracks(updatedTrackIdlist));
  };

  const handleChangePlaylist = (e: ChangeEvent<HTMLSelectElement>) => {
    const playlistId = +e.target.value;
    const selectedPlaylist = playlists.find(playlist => playlist.id === playlistId);

    if (selectedPlaylist) {
      dispatch(setSelectedPlaylist(selectedPlaylist))
      dispatch(setSelectedTracks([]));
    }
  }

  return selectedPlaylist && 
    <PlaylistTracksLayout
      title="Choose the tracks"
      listTitle={selectedPlaylist.title}
      listSubtitle="Recently played"
      playlists={playlists}
      hasLoaded={hasLoaded}
      selectedTracks={selectedTracks}
      selectedPlaylist={selectedPlaylist}
      trackListData={trackListData || []}
      handleSubmitPlaylist={handleSubmitPlaylist}
      handleChangePlaylist={handleChangePlaylist}
      updateAllTracks={(checkAllTracks: 'checkAll' | 'uncheckAll') => dispatch(updateAllTrack(checkAllTracks))}
      listClassNames="-deezer"
    >
      {trackListData?.map((track: DeezerTrack) => (
              <TrackInputItem
                key={track.id} 
                id={track.id}
                cover={track.album.cover}
                trackTitle={track.title}
                albumTitle={track.album.title}
                artist={track.artist.name}
                checked={selectedTracks.includes(track.id)}
                handleChange={handleCheckboxChange}
              />
            ))}
    </PlaylistTracksLayout>
    
}
