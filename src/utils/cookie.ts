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

export const getDeezerCookieToken = () => JSON.parse(getCookieString('deezer-token') || '{}');
export const getSpotifyCookieToken = () => JSON.parse(getCookieString('spotify-token') || '{}');

export const removeCookie = (cname: string) => {
document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
};

