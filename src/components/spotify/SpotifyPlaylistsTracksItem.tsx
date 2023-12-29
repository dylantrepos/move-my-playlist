import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedPlaylist, setSelectedTracks, updateAllTrack } from "../../reducers/spotifyReducer";
import { TrackInputItem } from "../TrackItem";

import './styles/SpotifyPlaylistTracksItem.scss';
import { ListContainer } from "../ListContainer";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { PlaylistSelectItem } from "../PlaylistSelectItem";
import { Title } from "../Title";
import { useGetSpotifyTracks } from "../../hooks/spotify/useGetSpotifyTracks";
import { SpotifyTrack } from "../../types/spotify/SpotifyTrack";
import { ToggleItem } from "../ToggleItem";

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
      <div className='spotifyPlaylistsTracksItem__select-container'>
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
        title={selectedPlaylist.name}
        subtitle="Recently played"
        classNames="-spotify"
        toggleItem={
          <ToggleItem 
            selectedTracks={selectedTracks}
            selectedPlaylist={selectedPlaylist}
            updateAllTrack={(checkAllTracks: 'checkAll' | 'uncheckAll') => dispatch(updateAllTrack(checkAllTracks))}
          />
        }
      >
        { !hasLoaded || !trackListData
          ? <p>Loading tracks ...</p>
          : trackListData?.length === 0 
            ? <p>No tracks in this playlist.</p> 
            :
          <form
            className="spotifyPlaylistsTracksItem__playlist-form"
            onSubmit={handleSubmitPlaylist}
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
          </form> }
      </ListContainer>
    </>)
}
