import { ChangeEvent } from "react";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import './styles/PlaylistSelectItem.scss';
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";

type Props = {
  playlists: DeezerPlaylist[] | SpotifyPlaylist[];
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
      {playlists?.map((playlist: DeezerPlaylist | SpotifyPlaylist) => (
        <option key={playlist.id} value={playlist.id}>
          {'nb_tracks' in playlist ? playlist.title : playlist.name}
        </option>
      ))}
    </select>
  )
}
