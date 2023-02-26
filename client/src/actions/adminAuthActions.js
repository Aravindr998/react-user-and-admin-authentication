import { CLEAR_ADMIN_AUTH, SET_ADMIN_AUTH } from "../actionTypes/adminAuthTypes"

export const setAdminAuth = () => {
  return{
    type: SET_ADMIN_AUTH
  }
}

export const clearAdminAuth = () => {
  return{
    type: CLEAR_ADMIN_AUTH
  }
}