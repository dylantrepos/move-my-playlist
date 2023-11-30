import { useEffect, useState } from "react";
import { PlaylistsDeezer } from "../types/UserDeezer";
import { setPlaylistDeezerData } from "../reducers/userDeezerReducer";
import { DEEZER_API_BASE } from "../env";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { AccessToken } from "../types/Login";
import axios from "axios";

const initialState: PlaylistsDeezer = {
  data: [],
  total: 0
}


export const useGetPlaylist = (): [PlaylistsDeezer] => {
  const [playlists, setPlaylists] = useState(initialState);
  const dispatch = useDispatch();
  const userDeezerToken: AccessToken | undefined = useSelector((state: RootState) => state.userDeezer.token);

  const deezerAuthURL = new URL('/user/me/playlists', DEEZER_API_BASE);
  deezerAuthURL.searchParams.append("access_token", userDeezerToken?.accessToken ?? '');

  const { isPending, data } = useQuery({ queryKey: ['deezer-playlist'], queryFn: async () => {
    const req = await axios(deezerAuthURL.toString());

    return req.data;
  }})

  useEffect(() => {
    
    if (!isPending && data?.data) {
      dispatch(setPlaylistDeezerData(data.data));
      setPlaylists(data);
    }
  }, [isPending]);

  return [playlists];
}