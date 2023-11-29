import axios, { AxiosError } from "axios";
import { DEEZER_AUTH_BASE, DEEZER_TOKEN } from "../env";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setUserTokenDeezerData } from "../reducers/userDeezerReducer";

type Token = {
  "access_token": string;
  "expires": number;
}

const initialToken = {
  "access_token": '',
  "expires": 0,
}

const URL_PARAMS: Record<string, string | null> = {
  "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
  "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
  "output": "json",
}

export const useGenerateAccessToken = (code: string) => {
  const [token, setToken] = useState(initialToken);
  const dispatch = useDispatch();
  const urlParams: Record<string, string | null> = {
    ...URL_PARAMS,
    code
  }
  const deezerAuthURL = new URL(DEEZER_TOKEN, DEEZER_AUTH_BASE);

  for (const [key, value] of Object.entries(urlParams)) {
    if (value) deezerAuthURL.searchParams.append(key, value);
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessTokenRequest = await axios.get(deezerAuthURL.toString());
        const tokenData: Token = accessTokenRequest.data;

        dispatch(setUserTokenDeezerData(tokenData));
        setToken(tokenData);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return [token];
}