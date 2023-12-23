import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { useGetDeezerTracks } from "../../hooks/deezer/useGetDeezerTracks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedPlaylist, setSelectedTracks } from "../../reducers/deezerReducer";
import { TrackInputItem } from "../TrackItem";

import './styles/DeezerPlaylistTracksItem.scss';
import PlaylistLayout from "../../layout/PlaylistLayout";
import { ListContainer } from "../ListContainer";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { PlaylistSelectItem } from "../PlaylistSelectItem";

export const DeezerPlaylistsTracksItem = () => {
  const currTracksSelected = useSelector((state: RootState) => state.deezer.selectedTracks);
  const currPlaylistSelected = useSelector((state: RootState) => state.deezer.selectedPlaylist)
  const playlists = useSelector((state: RootState) => state.deezer.playlists)
  const [trackListData, hasLoaded] = useGetDeezerTracks(currPlaylistSelected?.id.toString() ?? '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currPlaylistSelected) navigate('/deezer-to-spotify/playlist');
  }, [])

  const handleSubmitPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/deezer-to-spotify/transfert');
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trackId = +e.target.value;
    const updatedTrackIdlist = currTracksSelected.includes(trackId)
      ? currTracksSelected.filter((track) => track !== trackId)
      : [...currTracksSelected, trackId];
      
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

  return currPlaylistSelected && (
    <PlaylistLayout title={'Choose the tracks'}>
      <div className='deezerPlaylistsTracksItem__select-container'>
          <PlaylistSelectItem 
            playlists={playlists}
            playlistId={currPlaylistSelected.id}
            handleChangePlaylist={handleChangePlaylist}
          />
          <button 
            className='button-primary'  
            disabled={currTracksSelected.length === 0}
            onClick={handleSubmitPlaylist}
          >
            Confirm
          </button>
          
        </div> 
      <ListContainer 
        title={currPlaylistSelected.title}
        withSelectAll={true}
      >
        { !hasLoaded || !trackListData
          ? <p>Loading tracks ...</p>
          : trackListData?.total === 0 
            ? <p>No tracks in this playlist.</p> 
            :
          <form
            className="deezerPlaylistsTracksItem__playlist-form"
            onSubmit={handleSubmitPlaylist}
          >
            {trackListData.data?.map((track: DeezerTrack) => (
              <TrackInputItem
                key={track.id} 
                id={track.id}
                cover={track.album.cover}
                trackTitle={track.title}
                albumTitle={track.album.title}
                artist={track.artist.name}
                checked={currTracksSelected.includes(track.id)}
                handleChange={handleCheckboxChange}
              />
            ))}
          </form> }
      </ListContainer>
    </PlaylistLayout>)
}
