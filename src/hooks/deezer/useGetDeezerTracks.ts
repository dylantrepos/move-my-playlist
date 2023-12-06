import { useEffect, useState } from "react";
import { DeezerPlaylistTracks } from "../../types/deezer/DeezerPlaylistTracks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDeezerPlaylistTracks } from "../../services/deezerApi";

export const useGetDeezerTracks = (playlistId: string): [DeezerPlaylistTracks | undefined, boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<DeezerPlaylistTracks | undefined>();
  
  const { isPending, data, refetch, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['deezer-playlist-tracks', playlistId], 
    queryFn: fetchDeezerPlaylistTracks,
    initialPageParam: `/deezer-api/playlist/${playlistId}/tracks`,
    getNextPageParam: (lastPage) => lastPage.next?.replace('https://api.deezer.com', '/deezer-api'),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isFetching && data) {
      if (hasNextPage) fetchNextPage();
      else if(!isPending) {
        setPlaylistTracks({
          total: data.pages[0].total,
          data: data.pages.reduce((acc, curr) => [...acc, ...curr.data], [])
        } as DeezerPlaylistTracks)
      }
    }
  }, [isFetching, isPending])

  useEffect(() => {
    setPlaylistTracks(undefined);
    refetch();
  }, [playlistId])

  return [playlistTracks, (!isPending && !isFetching)];
}