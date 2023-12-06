import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { SpotifyUser } from "../../types/spotify/SpotifyUser";
import { fetchSpotifyUser } from "../../services/spotifyApi";
import { setSpotifyUser } from "../../reducers/spotifyReducer";

export const useGetSpotifyUserData = (): [SpotifyUser?] => {
  const [userData, setUserData] = useState<SpotifyUser>();
  const dispatch = useDispatch();

  const { isPending, data } = useQuery({ 
    queryKey: ['spotify-user'], 
    queryFn: () => fetchSpotifyUser(),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      dispatch(setSpotifyUser(data));
      setUserData(data);
    }
  }, [isPending]);

  return [userData];
}