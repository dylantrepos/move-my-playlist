import axios from "axios";
import { useEffect, useState } from "react";
import { DeezerPlaylistTracks } from "../../types/deezer/DeezerPlaylistTracks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import { useInfiniteQuery } from "@tanstack/react-query";

type FetchTracksData = { pageParam: string }

const fetchTracksData = async ({ pageParam }: FetchTracksData ) => {

  const data = await axios.get(pageParam)
  
  return data.data
}

export const useGetDeezerTracks = (playlistId: string): [DeezerPlaylistTracks | undefined, boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<DeezerPlaylistTracks | undefined>();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);
  
  const { isPending, data, refetch, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['deezer-playlist-tracks', playlistId], 
    queryFn: fetchTracksData,
    initialPageParam: `/deezer-api/playlist/${playlistId}/tracks?access_token=${userDeezerToken?.accessToken}`,
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