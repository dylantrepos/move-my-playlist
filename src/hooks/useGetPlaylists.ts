import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PlaylistsDeezer } from "../types/UserDeezer";
import { setPlaylistDeezerData } from "../reducers/userDeezerReducer";
import { DEEZER_API_BASE } from "../env";
import { useDispatch, useSelector } from "react-redux";
import { AccessTokenResponse } from "../types/Login";
import { RootState } from "../store/store";

const initialState: PlaylistsDeezer = {
  data: [],
  total: 0
}


export const useGetPlaylist = (): [PlaylistsDeezer] => {
  const [playlists, setPlaylists] = useState(initialState);
  const dispatch = useDispatch();
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  const deezerAuthURL = new URL('/user/me/playlists', DEEZER_API_BASE);
  deezerAuthURL.searchParams.append("access_token", userDeezerToken?.access_token ?? '');

  console.log('url : ', deezerAuthURL.toString());
  
  useEffect(() => {
    const fetchAllPlaylists = async (): Promise<void> => {
      try {
        const { data }: AxiosResponse = await axios.get(deezerAuthURL.toString());
        console.log({data});

        dispatch(setPlaylistDeezerData(data.data));
        setPlaylists(data);
      } catch (error) {
        throw new Error('Error fetching data: ' + (error as AxiosError).message);
      }
    }

  fetchAllPlaylists();
  }, []);

  return [playlists];
}