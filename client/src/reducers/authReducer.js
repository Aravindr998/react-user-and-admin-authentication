import { SET_AUTH, CLEAR_AUTH } from "../actionTypes/authTypes"

const initialState = {
  auth: JSON.parse(localStorage.getItem('authorization.user')) ? JSON.parse(localStorage.getItem('authorization.user')) : null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_AUTH:
      return{
        auth: JSON.parse(localStorage.getItem('authorization.user'))
      }
    case CLEAR_AUTH:
      return{
        auth: null
      }
    default: return state
  }
}

export default authReducer