import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";

export const SpotifyCreatePlaylist = () => {
  const deezerPlaylistTitle: string | undefined = useSelector((state: RootState) => state.deezer.playlistTitle);
  const deezerPlaylist: DeezerTrack[] | undefined = useSelector((state: RootState) => state.deezer.playlist);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (deezerPlaylistTitle) setInputValue(deezerPlaylistTitle);
  }, [deezerPlaylistTitle]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value: newPlaylistTitle} = e.target
    setInputValue(newPlaylistTitle);
  }
  
  return (<>
    <div>SpotifyCreatePlaylist</div>
    <div>Number of songs seletected : <span>{deezerPlaylist?.length ?? '0'}</span></div>
    <form>
      <input 
        type="text" 
        placeholder="Choose playlist"
        style={{background: '#f2f2f2', padding: '5px 10px', borderRadius: '5px', width: '250px'}}
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  </>
  )
}
