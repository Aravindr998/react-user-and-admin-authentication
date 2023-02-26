import { ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_RESET, ADMIN_LOGIN_SUCCESS } from "../actionTypes/adminLoginTypes"

const initialState = {
  loading: false,
  success: false,
  error: {},
  token: ''
}

const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case ADMIN_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        error: {},
        token: action.payload
      }
    case ADMIN_LOGIN_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
        token: ''
      }
    case ADMIN_LOGIN_RESET: 
      return {
        loading: false,
        success: false,
        error: {},
        token: ''
      }
    default: return state
  }
}

export default adminLoginReducer