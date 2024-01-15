import { checkValidDeezerToken } from "../services/deezerApi";
import { checkValidSpotifyToken } from '../services/spotifyApi';
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

export const getCookieDeezerToken = async (): Promise<DeezerAccessToken | undefined> => {
  try {
    const cookie = JSON.parse(getCookieString('deezer-token') || '{}');
    if (cookie['access_token']) {
      const checkTokenDeezer = await checkValidDeezerToken(cookie['access_token']);

      if (checkTokenDeezer) return cookie;
      else removeCookie('deezer-token');
    } 
  } catch (err) {
      removeCookie('deezer-token');
      console.error(err);
  }
}

export const getCookieSpotifyToken = async (): Promise<SpotifyAccessToken | undefined> => {
  try {
      const cookie = JSON.parse(getCookieString('spotify-token') || '{}');
      
      if (cookie['access_token']) {
        const checkTokenSpotify = await checkValidSpotifyToken(cookie['access_token']);

        if (checkTokenSpotify) return cookie;
        else removeCookie('spotify-token');
      }
  } catch (err) {
      removeCookie('spotify-token');
      console.error(err);
  }
}

export const checkCookiesTokenExist = async (): Promise<boolean> => {
  const deezerToken = await getCookieDeezerToken() ?? false;
  const spotifyToken = await getCookieSpotifyToken() ?? false;

  return !!deezerToken && !!spotifyToken;
}
