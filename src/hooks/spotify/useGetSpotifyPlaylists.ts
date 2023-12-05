import { useEffect, useState } from "react";
import { store } from "../../store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { SpotifyPlaylistItems } from '../../types/spotify/SpotifyPlaylist';

type FetchTracksData = { pageParam: string }

const fetchPlaylists = async ({ pageParam }: FetchTracksData) => {
  const token = store.getState().spotify.token?.accessToken;
  const headers: Record<string, string | null> = {
    "Authorization": `Bearer ${ token }`,
  }

  const data = await axios.get(pageParam, { headers })

  return data.data
}

export const useGetSpotifyPlaylist = (): [SpotifyPlaylistItems[] | undefined, boolean] => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylistItems[]>();
  
  const { isPending, data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['spotify-playlist'], 
    queryFn: fetchPlaylists,
    initialPageParam: `/spotify-api/playlists?limit=10`,
    getNextPageParam: (lastPage) => lastPage.next?.replace('https://api.spotify.com/v1/users/dylan.trepos/', '/spotify-api'),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isFetching && data) {
      if (hasNextPage) fetchNextPage();
      else if(!isPending) {
        setPlaylists(
          data.pages.reduce((acc, curr) => [...acc, ...curr.items], [])
       )
      }
    }
  }, [isFetching, isPending])


  return [playlists, (!isPending && !isFetching)];
}