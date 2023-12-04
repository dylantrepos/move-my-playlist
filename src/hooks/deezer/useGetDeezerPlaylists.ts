import { useEffect, useState } from "react";
import { DeezerPlaylists } from "../../types/deezer/DeezerPlaylist";
import { DEEZER_API_BASE } from "../../env";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import axios from "axios";

const fetchPlaylists = async (url: string) => (await axios(url)).data;

export const useGetDeezerPlaylist = (): [DeezerPlaylists?] => {
  const [playlists, setPlaylists] = useState();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);

  const deezerAuthURL = new URL('/user/me/playlists', DEEZER_API_BASE);
  deezerAuthURL.searchParams.append("access_token", userDeezerToken?.accessToken ?? '');

  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-playlist'], 
    queryFn: () => fetchPlaylists(deezerAuthURL.toString()),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      console.log({data});
      console.log({deezerAuthURL: deezerAuthURL.toString()});
      setPlaylists(data);
    }
  }, [isPending]);

  return [playlists];
}