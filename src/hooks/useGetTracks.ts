import axios, { AxiosError } from "axios";
import { DEEZER_API_BASE, DEEZER_PLAYLIST, DEEZER_TRACKS } from "../env";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { AccessTokenResponse } from "../types/Login";
import { RootState } from "../store/store";
import { PlaylistTracksDeezer } from "../types/PlaylistTracksDeezer";

const initialState: PlaylistTracksDeezer = {
  checksum: '',
  data: [],
  total: 0
}

export const useGetTracks = (playlistId?: string): [PlaylistTracksDeezer, boolean?, string?] => {
  const [isLoading, setIsLoading] = useState(true);
  const [trackListData, setTrackListData] = useState<PlaylistTracksDeezer>(initialState);
  const [error, setError] = useState<string | null>(null);
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userDeezerToken?.access_token && playlistId !== '0') {
          const deezerAuthURL = new URL(`${DEEZER_PLAYLIST}/${playlistId}${DEEZER_TRACKS}`, DEEZER_API_BASE);
          deezerAuthURL.searchParams.append('access_token', userDeezerToken?.access_token);


          const checkPlaylistsTracksRequest = await axios.get(deezerAuthURL.toString());
          const checkUserPlaylistsResponse: PlaylistTracksDeezer = await checkPlaylistsTracksRequest.data;
          setTrackListData(checkUserPlaylistsResponse);
          console.log('checkUserPlaylistsResponse', checkUserPlaylistsResponse);

          const fetchPlaylistTracks = async (url: string) => {
            try {
              const response = await axios.get<PlaylistTracksDeezer>(url);
              const { data, next } = response.data;
        
              setTrackListData((prev) => ({
                ...prev,
                data: [...prev.data, ...data]
              }));
        
              if (next) {
                await fetchPlaylistTracks(next);
              }
            } catch (error) {
              console.error('Error fetching playlist tracks:', error);
            }
          };
          
          if (checkUserPlaylistsResponse.next) {
            fetchPlaylistTracks(checkUserPlaylistsResponse.next);
          }

          setIsLoading(false);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [playlistId, userDeezerToken]);

  return [trackListData, isLoading, error ?? ''];
}