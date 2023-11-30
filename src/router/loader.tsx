import { store } from "../store/store";
import { getCookieDeezerToken } from "../utils/utils";
import { redirect } from "react-router-dom";
import { setUserTokenDeezerData } from "../reducers/userDeezerReducer";
import { fetchUserDeezerData, fetchUserPlaylistDeezerData } from "../utils/fetchRequest";

export const homeLoader = () => {
  const tokenDeezerCookie = getCookieDeezerToken();
  const {token, user, playlist} = store.getState().userDeezer;
  console.log('homeloader : ', tokenDeezerCookie, token);
  console.log('homeloader plyalist: ', playlist);

  if (!tokenDeezerCookie) {
    return redirect('/');
  } else {
    if (!token) store.dispatch(setUserTokenDeezerData(tokenDeezerCookie));
    if (!user) fetchUserDeezerData(tokenDeezerCookie);
    // if (!playlist) fetchUserPlaylistDeezerData(tokenDeezerCookie);
    
    return null
  }
}