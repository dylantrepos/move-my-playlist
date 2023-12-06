import axios from "axios";
import { DeezerAccessTokenResponse } from "../types/deezer/DeezerLogin";
import { store } from "../store/store";

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
