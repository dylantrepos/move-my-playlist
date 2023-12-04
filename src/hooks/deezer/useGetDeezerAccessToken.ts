import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setDeezerToken } from "../../reducers/deezerReducer";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import { useQuery } from "@tanstack/react-query";

const fetchToken = async (code: string) => {
  const params: Record<string, string | null> = {
    "app_id": import.meta.env?.VITE_DEEZER_APP_ID ?? null,
    "secret": import.meta.env?.VITE_DEEZER_SECRET_KEY ?? null,
    "output": "json",
    code
  }

  const data = await axios.get(
    '/deezer-token', 
    { params }
  );

  return data.data
};

export const useGetDeezerAccessToken = (code: string): [DeezerAccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<DeezerAccessToken>();
  const dispatch = useDispatch();
  
  // Refetch after 30 minutes (in milliseconds)
  const { isPending, data, error } = useQuery({ 
    queryKey: ['deezer-token'], 
    queryFn: () => fetchToken(code),
  })

  useEffect(() => {
    if (!isPending && data) {
      const newToken = {
        accessToken: data['access_token'],
        expires: data.expires
      }
      console.log({newToken});
      dispatch(setDeezerToken(newToken));
      setToken(newToken);
    }
  }, [isPending]);

  return [token, isPending, error];
}