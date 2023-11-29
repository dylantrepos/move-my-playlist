import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PlaylistTracksDeezer } from "../types/PlaylistTracksDeezer";

const initialState: PlaylistTracksDeezer = {
  checksum: '',
  data: [],
  total: 0
}

export const useGetTracks = (url: string): [PlaylistTracksDeezer, boolean?, string?] => {
  const [playlistTracks, setPlaylistTracks] = useState(initialState);
  
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
    const fetchAllPlaylistTracks = async () => await fetchData(url);

    fetchAllPlaylistTracks();
  }, [url]);

  return [playlistTracks];
}