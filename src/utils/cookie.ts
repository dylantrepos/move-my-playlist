import { checkValidDeezerToken } from "../services/deezerApi";
import { checkValidSpotifyToken } from "../services/spotifyApi";
import { DeezerAccessToken } from "../types/deezer/DeezerLogin";
import { SpotifyAccessToken } from "../types/spotify/SpotifyLogin";

export const addCookie = (cname: string, cvalue: string, exdays = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (exdays*24*60*60*1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookieString = (cname: string): string | null => 
  document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cname}=`))
  ?.split("=")[1] ?? null;

export const setDeezerCookieToken = (token: string, expiration: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (expiration * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `deezer-token=${token};${expires};path=/`;
};

export const setSpotifyCookieToken = (token: string, expiration: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (expiration * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `spotify-token=${token};${expires};path=/`;
};

export const getDeezerCookieToken = (): DeezerAccessToken => JSON.parse(getCookieString('deezer-token') || '{}');
export const getSpotifyCookieToken = (): SpotifyAccessToken => JSON.parse(getCookieString('spotify-token') || '{}');

export const removeCookie = (cname: string) => {
document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
};

export const checkCookiesTokenExist = async (): Promise<boolean> => {
  const deezerCookieToken = getDeezerCookieToken();
  const spotifyCookieToken = getSpotifyCookieToken();
  
  const isLogged = {
    deezer: false,
    spotify: false,
  };

  if (deezerCookieToken.accessToken && spotifyCookieToken.accessToken) {
    try {
      const checkTokenDeezer = await checkValidDeezerToken(deezerCookieToken.accessToken);
      const checkTokenSpotify = await checkValidSpotifyToken(spotifyCookieToken.accessToken);
      
      if (!checkTokenDeezer?.error) isLogged.deezer = true;
      if (!checkTokenSpotify?.error) isLogged.spotify = true;
    } catch (err) {
      console.error(err);
    }
  }

  return Object.values(isLogged).every(logged => logged);
}
