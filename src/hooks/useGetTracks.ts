import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PlaylistTracksDeezer } from "../types/PlaylistTracksDeezer";
import { DEEZER_API_BASE } from "../env";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AccessToken } from "../types/Login";

const initialState: PlaylistTracksDeezer = {
  checksum: '',
  data: [],
  total: 0,
  loaded: false,
}

let tracks = { ...initialState };

const fetchData = async (url: string): Promise<PlaylistTracksDeezer> => {
  try {
    const fetchPlaylistTracksRequest: AxiosResponse = await axios.get(url);
    const playlistTracks: PlaylistTracksDeezer = fetchPlaylistTracksRequest.data;

    if (playlistTracks.data) {
      tracks = { 
        ...playlistTracks, 
        data: [...tracks.data, ...playlistTracks.data]
      }

      if (playlistTracks.next) await fetchData(playlistTracks.next);
      else tracks.loaded = true
    }

    return tracks;

  } catch (error) {
    throw new Error('Error fetching data: ' + (error as AxiosError).message);
  }
}

export const useGetTracks = (playlistId: string): [PlaylistTracksDeezer, boolean?, string?] => {
  const [playlistTracks, setPlaylistTracks] = useState(initialState);
  const userDeezerToken: AccessToken | undefined = useSelector((state: RootState) => state.userDeezer.token);

  const deezerAuthURL = new URL(`playlist/${playlistId}/tracks`, DEEZER_API_BASE);
  deezerAuthURL.searchParams.append('access_token', userDeezerToken?.accessToken ?? '');
  
  
  useEffect(() => {
    setPlaylistTracks(initialState);
    tracks = { ...initialState };

    const fetchAllPlaylistTracks = async () => { 
      const tracksData = await fetchData(deezerAuthURL.toString());

      setPlaylistTracks(tracksData);
    }

    fetchAllPlaylistTracks();

  }, [playlistId]);

  return [playlistTracks];
}