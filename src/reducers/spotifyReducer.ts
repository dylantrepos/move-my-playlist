import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SpotifyAccessToken } from "../types/spotify/SpotifyLogin";
import { SpotifyUser } from "../types/spotify/SpotifyUser";
import { SpotifyTrack } from "../types/spotify/SpotifyTrack";
import { SpotifyPlaylist } from "../types/spotify/SpotifyPlaylist";
import { AxiosError } from "axios";

type State = {
  token: SpotifyAccessToken; 
  user?: SpotifyUser;
  playlist?: SpotifyTrack[];
  playlists: SpotifyPlaylist[];
  playlistTracks: SpotifyTrack[];
  selectedPlaylist?: SpotifyPlaylist;
  selectedTracks: number[];
  error?: AxiosError;
}

const initialState: State = {
  token: {
    'access_token': '',
    'expires_in': 0,
    'refresh_token': '',
    'scope': '',
    'token_type': '',
  },
  playlists: [],
  selectedTracks: [],
  playlistTracks: [],
};

const spotifySlice = createSlice({
  name: 'userSpotify',
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<SpotifyAccessToken>) => {
      state.token = action.payload;
    },
    setSpotifyUser: (state, action: PayloadAction<SpotifyUser>) => {
      state.user = action.payload;
    },
    setSpotifyPlaylist: (state, action: PayloadAction<SpotifyTrack[]>) => {
      state.playlist = action.payload;
    },
    setSpotifyPlaylists: (state, action: PayloadAction<SpotifyPlaylist[]>) => {
      state.playlists = action.payload;
    },
    setSpotifyPlaylistTracks: (state, action: PayloadAction<SpotifyTrack[]>) => {
      state.playlistTracks = action.payload;
    },
    setSpotifyError: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    },
    setSelectedTracks: (state, action: PayloadAction<number[]>) => {
      state.selectedTracks = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<SpotifyPlaylist>) => {
      state.selectedPlaylist = action.payload;
    },
    resetPlaylistAndTracks: (state) => {
      state.selectedPlaylist = undefined;
      state.selectedTracks = [];
    },
    updateAllTrack: (state, action: PayloadAction<'checkAll' | 'uncheckAll'>) => {
      state.selectedTracks = 
      action.payload === 'checkAll' 
        ? state.playlistTracks.map(playlist => playlist.id)
        : state.selectedTracks = [];
    }
  }
})

export default spotifySlice.reducer;

export const { 
  setSpotifyToken, 
  setSpotifyUser, 
  setSpotifyPlaylist, 
  setSpotifyPlaylists,
  setSpotifyPlaylistTracks,
  setSpotifyError, 
  setSelectedTracks,
  setSelectedPlaylist,
  resetPlaylistAndTracks,
  updateAllTrack,
} = spotifySlice.actions;

