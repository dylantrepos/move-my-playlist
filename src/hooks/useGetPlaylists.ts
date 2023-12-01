import { useEffect, useState } from "react";
import { PlaylistsDeezer } from "../types/UserDeezer";
import { DEEZER_API_BASE } from "../env";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { AccessToken } from "../types/Login";
import axios from "axios";

const fetchPlaylists = async (url: string) => (await axios(url)).data;

export const useGetPlaylist = (): [PlaylistsDeezer?] => {
  const [playlists, setPlaylists] = useState();
  const userDeezerToken: AccessToken | undefined = useSelector((state: RootState) => state.userDeezer.token);

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