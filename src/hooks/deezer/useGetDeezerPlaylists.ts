import { useEffect, useState } from "react";
import { DeezerPlaylists } from "../../types/deezer/DeezerPlaylist";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import axios from "axios";

const fetchPlaylists = async (token: string) => {
  const params: Record<string, string | null> = {
    "access_token": token,
  }

  const data = await axios.get('/deezer-api/user/me/playlists', { params })
  
  return data.data
}


export const useGetDeezerPlaylist = (): [DeezerPlaylists?] => {
  const [playlists, setPlaylists] = useState();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);

  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-playlist'], 
    queryFn: () => fetchPlaylists(userDeezerToken?.accessToken ?? ''),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      setPlaylists(data);
    }
  }, [isPending]);

  return [playlists];
}