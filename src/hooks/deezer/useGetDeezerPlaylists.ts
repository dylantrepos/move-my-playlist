import { useEffect, useState } from "react";
import { DeezerPlaylists } from "../../types/deezer/DeezerPlaylist";
import { useQuery } from "@tanstack/react-query";
import { fetchDeezerUserPlaylists } from "../../services/deezerApi";

export const useGetDeezerPlaylist = (): [DeezerPlaylists?] => {
  const [playlists, setPlaylists] = useState();

  const { isPending, data } = useQuery({ 
    queryKey: ['deezer-playlist'], 
    queryFn: () => fetchDeezerUserPlaylists(),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isPending && data) {
      setPlaylists(data);
    }
  }, [isPending]);

  return [playlists];
}