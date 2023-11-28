import { createSlice } from "@reduxjs/toolkit";
import { PlaylistDeezer, UserDeezer } from "../types/UserDeezer";
import { AccessTokenResponse } from "../types/Login";

type State = {
  token?: AccessTokenResponse; 
  user?: UserDeezer;
  playlist?: PlaylistDeezer[];
}

const initialState: State = {};

const userDeezerSlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setUserTokenDeezerData: (state, action) => {
      state.token = action.payload
    },
    setUserDeezerData: (state, action) => {
      state.user = action.payload
    },
    setPlaylistDeezerData: (state, action) => {
      state.playlist = action.payload
    },
  }
})

export const { setUserTokenDeezerData, setUserDeezerData, setPlaylistDeezerData } = userDeezerSlice.actions;
export default userDeezerSlice.reducer;
