import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSpotifyPlaylistTracks } from "../../services/spotifyApi";
import { SpotifyTrackUserInfo } from "../../types/spotify/SpotifyTrack";
import { SpotifyPlaylistTracks } from "../../types/spotify/SpotifyPlaylist";

export const useGetSpotifyTracks = (playlistId: string): [SpotifyPlaylistTracks | undefined, boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<SpotifyPlaylistTracks | undefined>();

  console.log({playlistId});

  const searchUrl = playlistId === 'Your Music' 
    ? 'https://api.spotify.com/v1/me/tracks'
    : `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0`
  
  const { isPending, data, refetch, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['spotify-playlist-tracks', playlistId], 
    queryFn: fetchSpotifyPlaylistTracks,
    initialPageParam: searchUrl,
    getNextPageParam: (lastPage) => lastPage.next,
    // getNextPageParam: (lastPage) => lastPage.next?.replace('https://api.spotify.com', '/spotify-api'),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isFetching && data) {
      if (hasNextPage) fetchNextPage();
      else if(!isPending) {
        console.log({data});
        setPlaylistTracks({
          total: data.pages[0].total,
          items: data.pages.reduce((acc, curr) => [...acc, ...curr.items], []).map(((trackInfo: SpotifyTrackUserInfo) => trackInfo.track))
        } as SpotifyPlaylistTracks)
      }
    }
  }, [isFetching, isPending])

  useEffect(() => {
    setPlaylistTracks(undefined);
    refetch();
  }, [playlistId])

  return [playlistTracks, (!isPending && !isFetching)];
}