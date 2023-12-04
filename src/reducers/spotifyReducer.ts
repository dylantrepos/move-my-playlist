import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SpotifyAccessToken } from "../types/spotify/SpotifyLogin";

type State = {
  token?: SpotifyAccessToken; 
  // user?: UserDeezer;
  // playlist?: TrackDeezer[];
  // error?: AxiosError;
}

const initialState: State = {};

const spotifySlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setSpotifyToken: (state, action: PayloadAction<SpotifyAccessToken>) => {
      state.token = action.payload;
    },
    // setDeezerUser: (state, action: PayloadAction<UserDeezer>) => {
    //   state.user = action.payload;
    // },
    // setDeezerPlaylist: (state, action: PayloadAction<TrackDeezer[]>) => {
    //   state.playlist = action.payload;
    // },
    // setDeezerError: (state, action: PayloadAction<AxiosError>) => {
    //   state.error = action.payload;
    // }
  }
})

export const { setSpotifyToken } = spotifySlice.actions;
export default spotifySlice.reducer;
