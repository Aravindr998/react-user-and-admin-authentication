import axios from '../axios'
import { SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_RESET, SAVE_USER_SUCCESS } from '../actionTypes/registerTypes'

export const saveUserRequest = () => {
  return {
    type: SAVE_USER_REQUEST
  }
}

export const saveUserSuccess = (user) => {
  return {
    type: SAVE_USER_SUCCESS,
    payload: user
  }
}

export const saveUserFailure = (error) => {
  return {
    type: SAVE_USER_FAILURE,
    payload: error
  }
}

export const saveUserReset = () => {
  return {
    type: SAVE_USER_RESET,
  }
}

export const saveUsers = (user) => {
  return dispatch => {
    dispatch(saveUserRequest())
    axios.post('/register', user)
    .then(response => {
      if(response.data.success){
        dispatch(saveUserSuccess(response.data))
      }else{
        dispatch(saveUserFailure(response.data))
      }
    })
    .catch(error => {
      dispatch(saveUserFailure(error))
    })
  }
}