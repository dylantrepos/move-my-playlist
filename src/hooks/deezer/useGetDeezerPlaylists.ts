import { useEffect, useState } from "react";
import { DeezerPlaylist } from "../../types/deezer/DeezerPlaylist";
import { useQuery } from "@tanstack/react-query";
import { fetchDeezerUserPlaylists } from "../../services/deezerApi";

export const useGetDeezerPlaylist = (): [DeezerPlaylist[], boolean] => {
  const [playlists, setPlaylists] = useState<DeezerPlaylist[]>([]);

  const { isPending, isFetching, data } = useQuery({ 
    queryKey: ['deezer-playlist'], 
    queryFn: () => fetchDeezerUserPlaylists(),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      setPlaylists(data?.data ?? []);
    }
  }, [isPending]);

  return [playlists, (!isPending && !isFetching)];
}