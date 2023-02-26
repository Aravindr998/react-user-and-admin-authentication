import { SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_RESET, SAVE_USER_SUCCESS } from "../actionTypes/registerTypes"

const initialState = {
  loading: false,
  success: false,
  error: {}
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: {}
      }
    case SAVE_USER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload
      }
    case SAVE_USER_RESET:
      return{
        loading: false,
        success: false,
        error: {}
      }
    default: return state
  }
}

export default registerReducer