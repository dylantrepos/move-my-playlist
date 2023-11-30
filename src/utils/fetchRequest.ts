import axios, { AxiosError } from "axios";
import { setErrorDeezerData, setPlaylistDeezerData, setUserDeezerData, setUserTokenDeezerData } from "../reducers/userDeezerReducer";
import { store } from "../store/store";
import { DEEZER_AUTH_BASE } from "../env";
import { AccessToken } from "../types/Login";

type CallbackType = 
    typeof setUserDeezerData 
  | typeof setPlaylistDeezerData 
  | typeof setUserTokenDeezerData;

const fetchRequestDeezerData = async (url: string, setCallback: CallbackType): Promise<void> => {
  console.log('fetchRequestDeezerData');
  try {
    const dataRequest = await axios.get(url);
    
    if (dataRequest.data.error) {
      store.dispatch(setErrorDeezerData(dataRequest.data.error));
      
      throw new Error(dataRequest.data.error.message);
    } else {
      store.dispatch(setCallback(dataRequest.data));
    }
  } catch (e) {
    throw new Error('Deezer API -> ' + (e as AxiosError).message);
  }
}

/**
 ** DEEZER TOKEN 
 **/
const URL_PARAMS: Record<string, string | null> = {
  "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
  "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
  "output": "json",
}

export const fetchUserDeezerToken = async (code: string) => {
  const urlParams: Record<string, string | null> = {
    ...URL_PARAMS,
    code
  }

  const deezerAuthURL = new URL('/oauth/access_token.php', DEEZER_AUTH_BASE);

  for (const [key, value] of Object.entries(urlParams)) {
    if (value) deezerAuthURL.searchParams.append(key, value);
  }

  await fetchRequestDeezerData(deezerAuthURL.toString(), setUserTokenDeezerData);
}

/**
 * ! useQuery outisde use callback here
 */

/**
 **  DEEZER USER
 **/
export const fetchUserDeezerData = (tokenDeezerCookie: AccessToken) => {
  console.log('fetchUserDeezerData');
  const userDataRequestURL = `https://api.deezer.com/user/me?access_token=${tokenDeezerCookie.accessToken}`;
  fetchRequestDeezerData(userDataRequestURL, setUserDeezerData);
}


/**
 ** DEEZER PLAYLIST
 **/
export const fetchUserPlaylistDeezerData = (tokenDeezerCookie: AccessToken) => {
  console.log('fetchUserPlaylistDeezerData');
  const userPlaylistsRequestURL = `https://api.deezer.com/user/me/playlists?access_token=${tokenDeezerCookie.accessToken}`;
  fetchRequestDeezerData(userPlaylistsRequestURL, setPlaylistDeezerData);
}