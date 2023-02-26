import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS } from "../actionTypes/loginTypes"

const initialState = {
  loading: false,
  success: false,
  error: {},
  token: ''
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        error: {},
        token: action.payload
      }
    case LOGIN_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
        token: ''
      }
    case LOGIN_RESET: 
      return {
        loading: false,
        success: false,
        error: {},
        token: ''
      }
    default: return state
  }
}

export default loginReducer