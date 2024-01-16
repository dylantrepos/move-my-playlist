import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";
import { SpotifyUser } from "../types/spotify/SpotifyUser";
import { SpotifyPlaylist, SpotifyPlaylistTracks } from "../types/spotify/SpotifyPlaylist";
import { SpotifyAccessToken } from "../types/spotify/SpotifyLogin";

/**
 * Get access token from Spotify API.
 */
export const fetchSpotifyToken = async () => {
  const params: Record<string, string | null> = {
    'client_id': import.meta.env?.VITE_SPOTIFY_APP_ID ?? null,
    'client_secret': import.meta.env?.VITE_SPOTIFY_SECRET_KEY ?? null,
    'grant_type': 'client_credentials',
    'scope': 'playlist-read-private'
  };

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  const { data } = await axios.post(
    'spotify-token', 
    params,
    { headers }
  )

 return data as SpotifyAccessToken
};

/**
 * Get user info from Spotify Api.
 */
export const fetchSpotifyUser = async (): Promise<SpotifyUser> => {
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const { data } = await axios.get('/spotify-api', { headers });

  return data;
};

/**
 * Fetch all user playlist from Spotify Api.
 */
type FetchTracksData = { pageParam: string }

export const fetchSpotifyPlaylists = async ({ pageParam }: FetchTracksData) => {
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.get(pageParam, { headers })

  return data.data
}

/**
 * Get track's id from Spotify Api.
 */
export const fetchSpotifyTrackId = async (track: DeezerTrack): Promise<DeezerTrack> => {
  if (!track.spotifyUrl) return track;

  const token = store.getState().spotify.token['access_token'];
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
export const createSpotifyPlaylist = async (playlistTitle: string): Promise<SpotifyPlaylist> => {
  const url = `https://api.spotify.com/v1/me/playlists`
  const token = store.getState().spotify.token['access_token'];
  const body = { name: playlistTitle }
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.post(url, body, { headers })

  return data.data
}

/**
 * Create a playlist with Spotify Api.
 */
export const getSpotifySavedTracksInfo = async (): Promise<SpotifyPlaylistTracks> => {
  const url = `https://api.spotify.com/v1/me/tracks`
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.get(url, { headers })

  return data.data
}


/**
 * Delete a playlist with Spotify Api.
 */
export const deleteSpotifyPlaylist = async (playlistId: string): Promise<SpotifyPlaylist> => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.delete(url, { headers })

  return data.data
}

/**
 * Add tracks into playlist with Spotify Api.
 */
export const addTracksToSpotifyPlaylist = async (playlistId: string, tracks: string[]): Promise<AxiosResponse | AxiosError> => {
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
        { "uris": tracks, "position": 0 }, 
        { headers }
      );

      return response as AxiosResponse
  } catch (error) {
      console.error(`Error: ${(error as AxiosError).message}`);
      return error as AxiosError;
  }
}

/**
 * Get playlist's tracks from Deezer Api.
 */

type FetchSpotifyTracks = { pageParam: string }

export const fetchSpotifyPlaylistTracks = async ({ pageParam }: FetchSpotifyTracks ) => {
  const token = store.getState().spotify.token['access_token'];
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const { data } = await axios.get(pageParam, { headers })
  
  return data
}

/**
 * Check if access token is valid from Spotify API.
 */
export const checkValidSpotifyToken = async (token: string): Promise<boolean> => {
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  try {
    await axios.get(
      'https://api.spotify.com/v1/me/', 
      { headers }
    );
  
    return true;
  } catch (error) {
    return false;
  }

};