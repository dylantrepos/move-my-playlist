import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ContextPlatform } from "../types/general";

type Name = {
  deezer: string;
  spotify: string;
}

type State = {
  from: ContextPlatform;
  to: ContextPlatform;
  name: Name;
}

const initialState: State = {
  from: 'deezer',
  to: 'spotify',
  name: {
    deezer: '',
    spotify: '',
  },
};

const generalSlice = createSlice({
  name: 'userDeezer',
  initialState,
  reducers: {
    setContext: (state, action: PayloadAction<{from: ContextPlatform, to: ContextPlatform}>) => {
      const { from, to } = action.payload;
      state.from = from;
      state.to = to;
    },
    setName: (state, action: PayloadAction<{platform: ContextPlatform, name: string}>) => {
      const { platform, name } = action.payload;
      state.name[platform] = name;
    },
  }
})

export default generalSlice.reducer;

export const { 
  setContext, 
  setName,
} = generalSlice.actions;

