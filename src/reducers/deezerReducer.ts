import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DeezerUser } from "../types/deezer/DeezerUser";
import { DeezerAccessToken } from "../types/deezer/DeezerLogin";
import { AxiosError } from "axios";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";

type State = {
  token?: DeezerAccessToken; 
  user?: DeezerUser;
  playlistTitle?: string;
  playlist?: DeezerTrack[];
  error?: AxiosError;
}

const initialState: State = {};

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
    setDeezerPlaylistTitle: (state, action: PayloadAction<string>) => {
      state.playlistTitle = action.payload;
    },
    setDeezerPlaylist: (state, action: PayloadAction<DeezerTrack[]>) => {
      state.playlist = action.payload;
    },
    setDeezerError: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    }
  }
})

export const { setDeezerToken, setDeezerUser, setDeezerPlaylistTitle, setDeezerPlaylist, setDeezerError } = deezerSlice.actions;
export default deezerSlice.reducer;
