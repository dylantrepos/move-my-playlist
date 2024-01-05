import { ChangeEvent } from "react";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";
import './styles/PlaylistSelectItem.scss';
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";

type Props = {
  playlists: DeezerPlaylist[] | SpotifyPlaylist[];
  playlistId: number | string;
  classNames?: string;
  handleChangePlaylist: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const PlaylistSelectItem = ({
  playlists,
  playlistId,
  classNames,
  handleChangePlaylist
}: Props) => {
  return (
    <select 
      className={`playlistSelectItem ${classNames}`}
      onChange={handleChangePlaylist}
      value={playlistId ?? "placeholder"}
    >
      <option value="placeholder" disabled>Choose a playlist </option>
      {playlists?.map((playlist: DeezerPlaylist | SpotifyPlaylist) => (
        ('nb_tracks' in playlist ? playlist.nb_tracks > 0 : playlist.tracks.total > 0) && 
        <option key={playlist.id} value={playlist.id}>
          {'nb_tracks' in playlist ? playlist.title : playlist.name}
        </option>
      ))}
    </select>
  )
}
