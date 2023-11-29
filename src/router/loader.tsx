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

  store.dispatch(setPlaylistDeezerData(userPlaylistsRequest.data));
}

export const homeLoader = () => {
  const tokenDeezerCookie = getCookieDeezerToken();
  const userDeezerToken = store.getState().userDeezer.token;
  const userDeezerData = store.getState().userDeezer.user;
  const userPlaylistDeezerData = store.getState().userDeezer.playlist;

  if (Object.keys(tokenDeezerCookie?.access_token ?? {}).length === 0) {
    return redirect('/');
  } else {
    if (!userDeezerToken) {
      store.dispatch(setUserTokenDeezerData(tokenDeezerCookie));
    }
    
    if (!userDeezerData) {
      fetchUserDeezerData(tokenDeezerCookie);
    }

    if (!userPlaylistDeezerData) {
      fetchUserPlaylistDeezerData(tokenDeezerCookie);
    }
    return null
  }

}