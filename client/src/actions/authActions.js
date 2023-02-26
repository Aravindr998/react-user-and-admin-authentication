import { CLEAR_AUTH, SET_AUTH } from "../actionTypes/authTypes"

export const setAuth = () => {
  return{
    type: SET_AUTH
  }
}

export const clearAuth = () => {
  return{
    type: CLEAR_AUTH
  }
}
