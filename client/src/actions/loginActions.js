import axios from "../axios"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS } from "../actionTypes/loginTypes"

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}
export const loginSuccess = (userToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userToken
  }
}
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}
export const loginReset = () => {
  return {
    type: LOGIN_RESET
  }
}

export const loginUser = (user) => {
  return (dispatch) => {
    dispatch(loginRequest())
    axios.post('/login', user)
    .then(response => {
      if(response.data.success){
        dispatch(loginSuccess(response.data.token))
      }else{
        dispatch(loginFailure(response.data))
      }
    })
    .catch(error => {
      dispatch(loginFailure(error))
    })
  }
}