import { store } from "../store/store";
import { getDeezerCookieToken, getSpotifyCookieToken } from "../utils/utils";
import { redirect } from "react-router-dom";
import { setDeezerToken } from "../reducers/deezerReducer";
import { setSpotifyToken } from "../reducers/spotifyReducer";

export const loginLoader = () => {
  const deezerCookieToken = getDeezerCookieToken();
  const spotifyCookieToken = getSpotifyCookieToken();
  const { token: deezerToken } = store.getState().deezer;
  const { token: spotifyToken } = store.getState().spotify;

  // No valid deezer token in cookie
  if (!deezerCookieToken || Object.values(deezerCookieToken).length === 0) return redirect('/');
  if (!spotifyCookieToken || Object.values(spotifyCookieToken).length === 0) return redirect('/');
  
  // Save deezer token in store
  if (!deezerToken) store.dispatch(setDeezerToken(deezerCookieToken));
  if (!spotifyToken) store.dispatch(setSpotifyToken(spotifyCookieToken));
  
  return null
}
