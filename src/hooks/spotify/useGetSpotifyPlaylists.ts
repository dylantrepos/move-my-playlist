import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { SpotifyPlaylist } from '../../types/spotify/SpotifyPlaylist';
import { fetchSpotifyPlaylists, getSpotifySavedTracksInfo } from "../../services/spotifyApi";

export const useGetSpotifyPlaylist = (): [SpotifyPlaylist[] | undefined, boolean] => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  
  const { isPending, data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['spotify-playlist'], 
    queryFn: fetchSpotifyPlaylists,
    initialPageParam: `/spotify-api/playlists?limit=10`,
    getNextPageParam: (lastPage) => lastPage.next?.replace(/https:\/\/api\.spotify\.com\/v1\/users\/[^/]+\//, '/spotify-api'),
    refetchOnWindowFocus: false
  })

  const { isFetching: isFetching2, data: data2, isPending: isPending2 } = useQuery({
    queryKey: ['spotify-playlist2'], 
    queryFn: getSpotifySavedTracksInfo,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (!isFetching && !isFetching2 && data && data2) {
      if (hasNextPage) fetchNextPage();
      else if(!isPending) {
        
        const playlists = data.pages.reduce((acc, curr) => [...acc, ...curr.items], []);

        const lovedTracksPlaylist = {
          ...playlists.at(-1),
          name: 'Liked Songs',
          id: 'Liked Songs',
          images: [
            {url: '', height: 0, width: 0}
          ],
          tracks: {
            total: data2.total
          }
        } 
        
        setPlaylists([...playlists, lovedTracksPlaylist]);
      }
    }
  }, [isFetching, isFetching2, isPending, isPending2])


  return [playlists, (!isPending && !isFetching)];
}