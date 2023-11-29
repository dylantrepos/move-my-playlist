import axios from "axios";
import { store } from "../store/store";
import { getCookieDeezerToken } from "../utils/utils";
import { redirect } from "react-router-dom";
import { setPlaylistDeezerData, setUserDeezerData, setUserTokenDeezerData } from "../reducers/userDeezerReducer";
import { AccessTokenResponse } from "../types/Login";

const fetchUserDeezerData = async (tokenDeezerCookie: AccessTokenResponse) => {
  /**
   * TO DO : Try catch
   */
  const userDataRequest = await axios.get(`https://api.deezer.com/user/me?access_token=${tokenDeezerCookie.access_token}`);

  store.dispatch(setUserDeezerData(userDataRequest.data));
}

const fetchUserPlaylistDeezerData = async (tokenDeezerCookie: AccessTokenResponse) => {
  const userPlaylistsRequest = await axios.get(`https://api.deezer.com/user/me/playlists?access_token=${tokenDeezerCookie.access_token}`);

  store.dispatch(setPlaylistDeezerData(userPlaylistsRequest.data.data));
}

export const homeLoader = () => {
  const tokenDeezerCookie = getCookieDeezerToken();
  const {token, user, playlist} = store.getState().userDeezer;

  if (Object.keys(tokenDeezerCookie?.access_token ?? {}).length === 0) {
    return redirect('/');
  } else {
    if (!token) store.dispatch(setUserTokenDeezerData(tokenDeezerCookie));
    if (!user) fetchUserDeezerData(tokenDeezerCookie);
    if (!playlist) fetchUserPlaylistDeezerData(tokenDeezerCookie);
    
    return null
  }

}