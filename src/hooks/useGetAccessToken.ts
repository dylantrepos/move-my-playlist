import axios from "axios";
import { DEEZER_AUTH_BASE } from "../env";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setUserTokenDeezerData } from "../reducers/userDeezerReducer";
import { AccessToken } from "../types/Login";
import { useQuery } from "@tanstack/react-query";

const fetchToken = async (url: string) => (await axios(url)).data;

export const useGenerateAccessToken = (code: string): [AccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<AccessToken>();
  const dispatch = useDispatch();

  const urlParams: Record<string, string | null> = {
    "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
    "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
    "output": "json",
    code
  }
  const deezerAuthURL = new URL('/oauth/access_token.php', DEEZER_AUTH_BASE);

  for (const [key, value] of Object.entries(urlParams)) {
    if (value) deezerAuthURL.searchParams.append(key, value);
  }
  
  // Refetch after 30 minutes (in milliseconds)
  const { isPending, data, error } = useQuery({ 
    queryKey: ['deezer-token'], 
    queryFn: () => fetchToken(deezerAuthURL.toString()),
    staleTime: 18000000,
  })

  useEffect(() => {
    if (!isPending && data) {
      const newToken = {
        accessToken: data['access_token'],
        expires: data.expires
      }
      dispatch(setUserTokenDeezerData(newToken));
      setToken(newToken);
    }
  }, [isPending]);

  return [token, isPending, error];
}