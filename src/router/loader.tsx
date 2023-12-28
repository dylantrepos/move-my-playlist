import { store } from "../store/store";
import { checkCookiesTokenExist, getDeezerCookieToken, getSpotifyCookieToken } from "../utils/cookie";
import { redirect } from "react-router-dom";
import { setDeezerPlaylist, setDeezerToken } from "../reducers/deezerReducer";
import { setSpotifyPlaylist, setSpotifyPlaylistTitle, setSpotifyToken } from "../reducers/spotifyReducer";


export const loginLoader = () => {
  const deezerCookieToken = getDeezerCookieToken();
  const spotifyCookieToken = getSpotifyCookieToken();
  const { token: deezerToken } = store.getState().deezer;
  const { token: spotifyToken } = store.getState().spotify;

  console.log({deezerCookieToken, spotifyCookieToken});

  // No valid deezer token in cookie
  if (!deezerCookieToken || Object.values(deezerCookieToken).length === 0) return redirect('/');
  if (!spotifyCookieToken || Object.values(spotifyCookieToken).length === 0) return redirect('/');
  
  // Save deezer token in store
  if (deezerToken.accessToken.length === 0) store.dispatch(setDeezerToken(deezerCookieToken));
  if (!spotifyToken) store.dispatch(setSpotifyToken(spotifyCookieToken));

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