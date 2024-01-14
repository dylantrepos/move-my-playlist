import { configureStore } from "@reduxjs/toolkit";
import deezer from "../reducers/deezerReducer";
import spotify from "../reducers/spotifyReducer";
import general from "../reducers/generalReducer";

export const store = configureStore({
  reducer: {
    deezer,
    spotify,
    general
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


