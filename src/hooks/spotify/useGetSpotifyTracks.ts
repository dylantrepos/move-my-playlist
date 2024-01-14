import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSpotifyPlaylistTracks } from "../../services/spotifyApi";
import { SpotifyTrack, SpotifyTrackUserInfo } from "../../types/spotify/SpotifyTrack";
import { setSpotifyPlaylistTracks } from "../../reducers/spotifyReducer";
import { useDispatch } from "react-redux";

export const useGetSpotifyTracks = (playlistId: string): [SpotifyTrack[] | undefined, boolean] => {
  const [playlistTracks, setPlaylistTracks] = useState<SpotifyTrack[] | undefined>();
  const dispatch = useDispatch();

  const searchUrl = playlistId === 'Liked Songs' 
    ? 'https://api.spotify.com/v1/me/tracks'
    : `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0`
  
  const { isPending, data, refetch, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({ 
    queryKey: ['spotify-playlist-tracks', playlistId], 
    queryFn: fetchSpotifyPlaylistTracks,
    initialPageParam: searchUrl,
    getNextPageParam: (lastPage) => lastPage.next,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!isFetching && data) {
      if (hasNextPage) fetchNextPage();
      else if(!isPending) {
        const tracks: SpotifyTrack[] = data.pages.reduce((acc, curr) => [...acc, ...curr.items], []).map(((trackInfo: SpotifyTrackUserInfo) => trackInfo.track));
        dispatch(setSpotifyPlaylistTracks(tracks));
        setPlaylistTracks(tracks);
      }
    }
  }, [isFetching, isPending])

  useEffect(() => {
    setPlaylistTracks(undefined);
    refetch();
  }, [playlistId])

  return [playlistTracks, (!isPending && !isFetching)];
}