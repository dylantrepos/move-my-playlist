import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { useGetDeezerTracks } from "../../hooks/deezer/useGetDeezerTracks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedPlaylist, setSelectedTracks } from "../../reducers/deezerReducer";
import { TrackInputItem } from "../TrackItem";

import './styles/DeezerPlaylistTracksItem.scss';
import { ListContainer } from "../ListContainer";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { PlaylistSelectItem } from "../PlaylistSelectItem";
import { Title } from "../Title";

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

  return selectedPlaylist && (
    <>
      <Title>Choose the tracks</Title>
      <div className='deezerPlaylistsTracksItem__select-container'>
          <PlaylistSelectItem 
            playlists={playlists}
            playlistId={selectedPlaylist.id}
            handleChangePlaylist={handleChangePlaylist}
          />
          <button 
            className='button-primary'  
            disabled={selectedTracks.length === 0}
            onClick={handleSubmitPlaylist}
          >
            Confirm
          </button>
          
        </div> 
      <ListContainer 
        title={selectedPlaylist.title}
        subtitle="Added recently"
        withSelectAll={true}
      >
        { !hasLoaded || !trackListData
          ? <p>Loading tracks ...</p>
          : trackListData?.length === 0 
            ? <p>No tracks in this playlist.</p> 
            :
          <form
            className="deezerPlaylistsTracksItem__playlist-form"
            onSubmit={handleSubmitPlaylist}
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
          </form> }
      </ListContainer>
    </>)
}
