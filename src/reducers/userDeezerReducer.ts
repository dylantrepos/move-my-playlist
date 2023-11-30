import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlaylistDeezer, UserDeezer } from "../types/UserDeezer";
import { AccessToken } from "../types/Login";
import { AxiosError } from "axios";

type State = {
  token?: AccessToken; 
  user?: UserDeezer;
  playlist?: PlaylistDeezer[];
  error?: AxiosError;
}

const initialState: State = {};

const userDeezerSlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setUserTokenDeezerData: (state, action: PayloadAction<AccessToken>) => {
      state.token = action.payload;
    },
    setUserDeezerData: (state, action: PayloadAction<UserDeezer>) => {
      state.user = action.payload;
    },
    setPlaylistDeezerData: (state, action: PayloadAction<PlaylistDeezer[]>) => {
      state.playlist = action.payload;
    },
    setErrorDeezerData: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    }
  }
})

export const { setUserTokenDeezerData, setUserDeezerData, setPlaylistDeezerData, setErrorDeezerData } = userDeezerSlice.actions;
export default userDeezerSlice.reducer;
