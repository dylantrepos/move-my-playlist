import axios, { AxiosError, AxiosResponse } from "axios";
import { DeezerAccessTokenResponse } from "../types/deezer/DeezerLogin";
import { store } from "../store/store";
import { SpotifyTrack } from "../types/spotify/SpotifyTrack";

/**
 * Get access token from Deezer API.
 */
export const fetchDeezerToken = async (code: string): Promise<DeezerAccessTokenResponse> => {
  const params: Record<string, string | null> = {
    "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
    "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
    "output": "json",
    code
  };

  const { data } = await axios.get(
    '/deezer-token', 
    { params }
  );

  return data;
};

/**
 * Get user profil from Deezer Api.
 */
export const fetchDeezerUserProfil = async () => {
  const token = store.getState().deezer.token?.accessToken ?? '';
  const user = store.getState().deezer.user;

  if (user) return user;

  const params: Record<string, string | null> = {
    "access_token": token,
  };

  const { data } = await axios.get(
    '/deezer-api/user/me', 
    { params }
  );
  
  return data;
}

/**
 * Get user's playlists from Deezer Api.
 */
export const fetchDeezerUserPlaylists = async () => {
  const token = store.getState().deezer.token?.accessToken ?? '';

  const params: Record<string, string | null> = {
    "access_token": token,
  };

  const { data } = await axios.get(
    '/deezer-api/user/me/playlists', 
    { params }
  );
  
  return data;
}


/**
 * Get playlist's tracks from Deezer Api.
 */

type FetchDeezerTracks = { pageParam: string }

export const fetchDeezerPlaylistTracks = async ({ pageParam }: FetchDeezerTracks ) => {
  const token = store.getState().deezer.token?.accessToken;
  const params = { 'access_token': token }
  const { data } = await axios.get(pageParam, { params })
  
  return data
}

/**
 * Get track's id from Deezer Api.
 */
export const fetchDeezerTrackId = async (track: SpotifyTrack): Promise<SpotifyTrack> => {
  if (!track.deezerUrl) return track;
  const token = store.getState().deezer.token?.accessToken;
  const params = { 'access_token': token };

  try {
      const response = await axios.get(track.deezerUrl, { params });

      console.log({response});
      return {
        ...track,
        deezerId: response.data.id,
      }
  } catch (error) {
      console.error(`Error for URL ${track.deezerUrl}: ${(error as AxiosError).message}`);
      return {
        ...track,
        deezerId: undefined,
      }
  }
};

/**
 * Get track's id for each spotify playlist track from Deezer Api.
 */
export const fetchAllDeezerTrackId = async (spotifyPlaylist: SpotifyTrack[]) => {
  if(spotifyPlaylist) {
    const promises = spotifyPlaylist
    .map(playlist => ({
      ...playlist,
      deezerUrl: `deezer-api/track/isrc:${playlist.external_ids.isrc}`
    }))
    .map(fetchDeezerTrackId);

    try {
        const results = await Promise.all(promises);

        console.log({ results });
        return results
    } catch (error) {
        console.error(`Error in Promise.all: ${(error as AxiosError).message}`);
        return null
    }
  }
};


/**
 * Create a playlist with Deezer Api.
 */
export const createDeezerPlaylist = async (playlistTitle: string): Promise<AxiosResponse> => {
  const url = `/deezer-api/user/me/playlists`
  const token = store.getState().deezer.token?.accessToken;
  const params = { 
    'access_token': token, 
    'request_method': 'POST',
    title: playlistTitle 
  };

  const data = await axios.get(url, { params })

  return data
}

/**
 * Add tracks to a playlist with Deezer Api.
 */
export const addTracksToDeezerPlaylist = async (playlistId: string, tracksId: string[]): Promise<AxiosResponse> => {
  const url = `/deezer-api/playlist/${playlistId}/tracks`
  const token = store.getState().deezer.token?.accessToken;
  const params = { 
    'access_token': token, 
    'request_method': 'POST',
    songs: tracksId.join(',') 
  };

  const data = await axios.get(url, { params })

  return data
}