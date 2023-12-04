import { configureStore } from "@reduxjs/toolkit";
import deezer from "../reducers/deezerReducer";
import spotify from "../reducers/spotifyReducer";

export const store = configureStore({
  reducer: {
    deezer,
    spotify
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


