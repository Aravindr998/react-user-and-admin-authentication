import { CLEAR_ADMIN_AUTH, SET_ADMIN_AUTH } from "../actionTypes/adminAuthTypes"

const initialState = {
  auth: JSON.parse(localStorage.getItem('authorization.admin')) ? JSON.parse(localStorage.getItem('authorization.admin')) : null
}

const adminAuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ADMIN_AUTH:
      return{
        auth: JSON.parse(localStorage.getItem('authorization.admin'))
      }
    case CLEAR_ADMIN_AUTH:
      return{
        auth: null
      }
    default: return state
  }
}

export default adminAuthReducer