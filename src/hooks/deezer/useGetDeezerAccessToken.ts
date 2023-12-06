import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setDeezerToken } from "../../reducers/deezerReducer";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import { useQuery } from "@tanstack/react-query";
import { fetchDeezerToken } from "../../services/deezerApi";

export const useGetDeezerAccessToken = (code: string): [DeezerAccessToken | undefined, boolean, Error | null] => {
  const [token, setToken] = useState<DeezerAccessToken>();
  const dispatch = useDispatch();
  
  // Refetch after 30 minutes (in milliseconds)
  const { isPending, data, error } = useQuery({ 
    queryKey: ['deezer-token'], 
    queryFn: () => fetchDeezerToken(code),
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