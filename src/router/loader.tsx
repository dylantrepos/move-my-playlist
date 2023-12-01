import { store } from "../store/store";
import { getCookieDeezerToken } from "../utils/utils";
import { redirect } from "react-router-dom";
import { setUserTokenDeezerData } from "../reducers/userDeezerReducer";

export const homeLoader = () => {
  const tokenDeezerCookie = getCookieDeezerToken();
  const { token } = store.getState().userDeezer;

  // No valid deezer token in cookie
  if (!tokenDeezerCookie || Object.values(tokenDeezerCookie).length === 0) return redirect('/');
  
  // Save deezer token in store
  if (!token) store.dispatch(setUserTokenDeezerData(tokenDeezerCookie));
  
  return null
}