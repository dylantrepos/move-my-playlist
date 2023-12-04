import axios from "axios";
import { useEffect, useState } from "react";
import { DeezerPlaylistTracks } from "../../types/deezer/DeezerPlaylistTracks";
import { DEEZER_API_BASE } from "../../env";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DeezerAccessToken } from "../../types/deezer/DeezerLogin";
import { useInfiniteQuery } from "@tanstack/react-query";

type FetchTracksData = { pageParam: string }

const fetchTracksData = async ({ pageParam }: FetchTracksData) => (await axios(pageParam)).data;

const getURL = (playlistId: string, token: string = '') => {
  const deezerAuthURL = new URL(`playlist/${playlistId}/tracks`, DEEZER_API_BASE);
  deezerAuthURL.searchParams.append('access_token', token);

  return deezerAuthURL.toString();
}

export const useGetDeezerTracks = (playlistId: string): [DeezerPlaylistTracks | undefined, boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<DeezerPlaylistTracks | undefined>();
  const userDeezerToken: DeezerAccessToken | undefined = useSelector((state: RootState) => state.deezer.token);
  
  const { isPending, data, refetch, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['deezer-playlist-tracks', playlistId], 
    queryFn: fetchTracksData,
    initialPageParam: getURL(playlistId, userDeezerToken?.accessToken),
    getNextPageParam: (lastPage) => lastPage.next,
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