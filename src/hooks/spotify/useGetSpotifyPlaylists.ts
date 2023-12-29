import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SpotifyPlaylist } from '../../types/spotify/SpotifyPlaylist';
import { fetchSpotifyPlaylists } from "../../services/spotifyApi";

export const useGetSpotifyPlaylist = (): [SpotifyPlaylist[] | undefined, boolean] => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>();
  
  const { isPending, data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['spotify-playlist'], 
    queryFn: fetchSpotifyPlaylists,
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