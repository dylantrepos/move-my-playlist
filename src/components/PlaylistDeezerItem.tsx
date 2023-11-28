import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react";
import TrackDeezerItem from "./TrackDeezerItem";

export default function PlaylistDeezer() {
  const userDeezerPlaylist = useSelector((state: RootState) => state.userDeezer.playlist);
  const [selectPlaylistId, setSelectPlaylistId] = useState('0');

  useEffect(() => {
    console.log('userDeezerData : ', userDeezerPlaylist);
    if (userDeezerPlaylist && Object.keys(userDeezerPlaylist).length === 0){
      console.log('nnope');
    }
  }, [userDeezerPlaylist]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const playlistId = e.target.value;
    setSelectPlaylistId(playlistId)
  };
  

  return (
    <>
      <div>PlaylistDeezer</div>
      <select onChange={handleChange}>
        <option value="" selected disabled hidden>Choose a playlist here</option>
        {userDeezerPlaylist?.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
      <div>
          <TrackDeezerItem playlistId={selectPlaylistId} />
      </div>
    </>
  )
}
