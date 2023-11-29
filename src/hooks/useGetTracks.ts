import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PlaylistTracksDeezer } from "../types/PlaylistTracksDeezer";
import { DEEZER_API_BASE } from "../env";
import { AccessTokenResponse } from "../types/Login";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const initialState: PlaylistTracksDeezer = {
  checksum: '',
  data: [],
  total: 0
}

export const useGetTracks = (playlistId: string): [PlaylistTracksDeezer, boolean?, string?] => {
  const [playlistTracks, setPlaylistTracks] = useState(initialState);
  const userDeezerToken: AccessTokenResponse | undefined = useSelector((state: RootState) => state.userDeezer.token);

  const deezerAuthURL = new URL(`playlist/${playlistId}/tracks`, DEEZER_API_BASE);
  deezerAuthURL.searchParams.append('access_token', userDeezerToken?.access_token ?? '');
  
  const fetchData = async (url: string): Promise<void> => {
    try {
      const fetchPlaylistTracksRequest: AxiosResponse = await axios.get(url);
      const playlistTracks: PlaylistTracksDeezer = fetchPlaylistTracksRequest.data;

      if (playlistTracks.data) {
        setPlaylistTracks((oldPlaylistTrack) => ({
            ...oldPlaylistTrack,
            ...playlistTracks,
            data: [...oldPlaylistTrack.data, ...playlistTracks.data]
        }))
  
        if (playlistTracks.next) await fetchData(playlistTracks.next);
      }

    } catch (error) {
      throw new Error('Error fetching data: ' + (error as AxiosError).message);
    }
  }
  
  useEffect(() => {
    setPlaylistTracks(initialState);
    const fetchAllPlaylistTracks = async () => await fetchData(deezerAuthURL.toString());

    fetchAllPlaylistTracks();
  }, [playlistId]);

  return [playlistTracks];
}