import { useEffect, useState } from "react";
import { DeezerTrack } from "../../types/deezer/DeezerPlaylistTracks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDeezerPlaylistTracks } from "../../services/deezerApi";
import { useDispatch } from "react-redux";
import { setDeezerPlaylistTracks } from "../../reducers/deezerReducer";

export const useGetDeezerTracks = (playlistId: string): [DeezerTrack[], boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<DeezerTrack[]>([]);
  const dispatch = useDispatch();
  
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
        const tracks: DeezerTrack[] = data.pages.reduce((acc, curr) => [...acc, ...curr.data], []);
        
        dispatch(setDeezerPlaylistTracks(tracks));
        setPlaylistTracks(tracks)
      }
    }
  }, [isFetching, isPending])

  useEffect(() => {
    setPlaylistTracks([]);
    refetch();
  }, [playlistId])

  return [playlistTracks, (!isPending && !isFetching)];
}