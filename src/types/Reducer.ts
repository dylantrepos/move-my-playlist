import { UserDeezer } from "./UserDeezer"

export type Reducer = {
  type: 'SET_USER_DATA',
  payload: UserDeezer
}

export type ReducerInitState = {
  userData: null
}