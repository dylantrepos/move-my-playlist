import { UserDeezer } from "./types/UserDeezer"

export const setUserData = (userData: UserDeezer) => {
  return {
    type: 'SET_USER_DATA',
    payload: userData
  }
}