import { ChangeEvent } from "react";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import './styles/PlaylistSelectItem.scss';

type Props = {
  playlists: DeezerPlaylist[];
  playlistId: number;
  handleChangePlaylist: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const PlaylistSelectItem = ({
  playlists,
  playlistId,
  handleChangePlaylist
}: Props) => {
  return (
    <select 
      className="playlistSelectItem"
      onChange={handleChangePlaylist}
      value={playlistId ?? "placeholder"}
    >
      <option value="placeholder" disabled>Choose a playlist </option>
      {playlists?.map((playlist: DeezerPlaylist) => (
        <option key={playlist.id} value={playlist.id}>
          {playlist.title}
        </option>
      ))}
    </select>
  )
}
