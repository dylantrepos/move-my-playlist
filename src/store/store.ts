import { configureStore } from "@reduxjs/toolkit";
import userDeezerReducer from "../reducers/userDeezerReducer";

export const store = configureStore({
  reducer: {
    userDeezer: userDeezerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


