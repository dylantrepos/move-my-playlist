import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SpotifyAccessToken } from "../types/spotify/SpotifyLogin";
import { SpotifyUser } from "../types/spotify/SpotifyUser";
import { SpotifyTrack } from "../types/spotify/SpotifyTrack";

type State = {
  token: SpotifyAccessToken; 
  user?: SpotifyUser;
  playlistTitle?: string;
  playlist?: SpotifyTrack[];
  // error?: AxiosError;
}

const initialState: State = {
  token: {
    'access_token': '',
    'expires_in': 0,
    'refresh_token': '',
    'scope': '',
    'token_type': '',
  },
};

const spotifySlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<SpotifyAccessToken>) => {
      state.token = action.payload;
    },
    setSpotifyUser: (state, action: PayloadAction<SpotifyUser>) => {
      state.user = action.payload;
    },
    setSpotifyPlaylistTitle: (state, action: PayloadAction<string>) => {
      state.playlistTitle = action.payload;
    },
    setSpotifyPlaylist: (state, action: PayloadAction<SpotifyTrack[]>) => {
      state.playlist = action.payload;
    },
    // setDeezerError: (state, action: PayloadAction<AxiosError>) => {
    //   state.error = action.payload;
    // }
  }
})

export const { setSpotifyToken, setSpotifyUser, setSpotifyPlaylistTitle, setSpotifyPlaylist } = spotifySlice.actions;
export default spotifySlice.reducer;
