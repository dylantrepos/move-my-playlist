import { useEffect, useState } from "react";
import { setDeezerUser } from "../../reducers/deezerReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SpotifyAccessToken } from "../../types/spotify/SpotifyLogin";
import { SpotifyUser } from "../../types/spotify/SpotifyUser";

const fetchUserData = async (token: string) => {
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${token}`,
  }

  const data = await axios.get('/spotify-api', { headers });
  
  return data.data
}

export const useGetSpotifyUserData = (): [SpotifyUser?] => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const userSpotifyToken: SpotifyAccessToken | undefined = useSelector((state: RootState) => state.spotify.token);

  const { isPending, data } = useQuery({ 
    queryKey: ['spotify-user'], 
    queryFn: () => fetchUserData(userSpotifyToken?.accessToken ?? ''),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setDeezerUser(data));
      setUserData(data);
    }
  }, [isPending]);

  return [userData];
}