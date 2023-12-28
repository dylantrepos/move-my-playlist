import { store } from "../store/store";
import { checkCookiesTokenExist, getCookieDeezerToken, getCookieSpotifyToken } from "../utils/cookie";
import { redirect } from "react-router-dom";
import { setDeezerPlaylist, setDeezerToken } from "../reducers/deezerReducer";
import { setSpotifyPlaylist, setSpotifyPlaylistTitle, setSpotifyToken } from "../reducers/spotifyReducer";


export const loginLoader = async () => {
  const deezerCookieToken = await getCookieDeezerToken();
  const spotifyCookieToken = await getCookieSpotifyToken();

  // No valid deezer || spotify token in cookie
  if (!(deezerCookieToken && spotifyCookieToken)) return redirect('/');
  
  const { token: deezerToken } = store.getState().deezer;
  const { token: spotifyToken } = store.getState().spotify;

  // Save deezer token in store
  if (!deezerToken['access_token']) store.dispatch(setDeezerToken(deezerCookieToken));
  if (!spotifyToken['access_token']) store.dispatch(setSpotifyToken(spotifyCookieToken));

  // Reset store playlists & playlists titles
  store.dispatch(setSpotifyPlaylist([]));
  store.dispatch(setDeezerPlaylist([]));

  store.dispatch(setSpotifyPlaylistTitle(''));
  
  return null
}


export const redirectLoader = async (to: string) => {
  const tokensExist = await checkCookiesTokenExist();

  return tokensExist ? redirect(to) : null 
} 