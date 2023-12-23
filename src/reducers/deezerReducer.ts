import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DeezerUser } from "../types/deezer/DeezerUser";
import { DeezerAccessToken } from "../types/deezer/DeezerLogin";
import { AxiosError } from "axios";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";
import { DeezerPlaylist } from "../types/deezer/DeezerPlaylist";

type State = {
  token: DeezerAccessToken; 
  user?: DeezerUser;
  playlist?: DeezerTrack[];
  playlists: DeezerPlaylist[];
  playlistTracks: DeezerTrack[];
  selectedPlaylist?: DeezerPlaylist;
  selectedTracks: number[];
  error?: AxiosError;
}

const initialState: State = {
  token: {
    accessToken: '',
    expires: 0
  },
  playlists: [],
  selectedTracks: [],
  playlistTracks: [],
};

const deezerSlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setDeezerToken: (state, action: PayloadAction<DeezerAccessToken>) => {
      state.token = action.payload;
    },
    setDeezerUser: (state, action: PayloadAction<DeezerUser>) => {
      state.user = action.payload;
    },
    setDeezerPlaylist: (state, action: PayloadAction<DeezerTrack[]>) => {
      state.playlist = action.payload;
    },
    setDeezerPlaylists: (state, action: PayloadAction<DeezerPlaylist[]>) => {
      state.playlists = action.payload;
    },
    setDeezerPlaylistTracks: (state, action: PayloadAction<DeezerTrack[]>) => {
      state.playlistTracks = action.payload;
    },
    setDeezerError: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    },
    setSelectedTracks: (state, action: PayloadAction<number[]>) => {
      state.selectedTracks = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<DeezerPlaylist>) => {
      state.selectedPlaylist = action.payload;
    },
    addAllTrack: (state) => {
      state.selectedTracks = state.playlistTracks.map(playlist => playlist.id);
    }
  }
})

export default deezerSlice.reducer;

export const { 
  setDeezerToken, 
  setDeezerUser, 
  setDeezerPlaylist, 
  setDeezerPlaylists,
  setDeezerPlaylistTracks,
  setDeezerError, 
  setSelectedTracks,
  setSelectedPlaylist,
  addAllTrack,
} = deezerSlice.actions;

