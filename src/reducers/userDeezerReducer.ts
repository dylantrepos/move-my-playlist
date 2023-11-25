import { createSlice } from "@reduxjs/toolkit";
import { UserDeezer } from "../types/UserDeezer";

type State = {
  user?: UserDeezer;
}

const initialState: State = {};

const userDeezerSlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setUserDeezerData: (state, action) => {
      state.user = action.payload
    },
  }
})

export const { setUserDeezerData } = userDeezerSlice.actions;
export default userDeezerSlice.reducer;
