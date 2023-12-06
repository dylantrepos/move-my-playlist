import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";

/**
 * Get track's id from Spotify Api.
 */
export const fetchSpotifyTrackId = async (track: DeezerTrack): Promise<DeezerTrack> => {
  if (!track.spotifyUrl) return track;

  const token = store.getState().spotify.token?.accessToken;
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  try {
      const response = await axios.get(track.spotifyUrl, { headers });

      return {
        ...track,
        spotifyId: response.data.tracks.items[0].id,
      }
  } catch (error) {
      console.error(`Error for URL ${track.spotifyUrl}: ${(error as AxiosError).message}`);
      return {
        ...track,
        spotifyId: undefined,
      }
  }
};

/**
 * Get track's id for each deezer playlist track from Spotify Api.
 */
export const fetchAllSpotifyTrackId = async (deezerPlaylist: DeezerTrack[]) => {
  if(deezerPlaylist) {
    const promises = deezerPlaylist
    .map(playlist => ({
      ...playlist,
      spotifyUrl: `https://api.spotify.com/v1/search?q=isrc%3A${playlist.isrc}&type=track`
    }))
    .map(fetchSpotifyTrackId);

    try {
        const results = await Promise.all(promises);

        return results
    } catch (error) {
        console.error(`Error in Promise.all: ${(error as AxiosError).message}`);
        return null
    }
  }
};

/**
 * Create a playlist with Spotify Api.
 */
export const createSpotifyPlaylist = async (playlistTitle: string): Promise<AxiosResponse> => {
  const url = `https://api.spotify.com/v1/me/playlists`
  const token = store.getState().spotify.token?.accessToken;
  const body = { name: playlistTitle }
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.post(url, body, { headers })

  return data
}

/**
 * Add tracks into playlist with Spotify Api.
 */
export const addTracksToSpotifyPlaylist = async (playlistId: string, tracks: string[]): Promise<void> => {
  const token = store.getState().spotify.token?.accessToken;
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
        { "uris": tracks, "position": 0 }, 
        { headers }
      );

      console.log({response});
  } catch (error) {
      console.error(`Error: ${(error as AxiosError).message}`);
  }
}

