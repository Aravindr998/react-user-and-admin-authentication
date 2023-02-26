import axios from "../axios"
import { ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_RESET, ADMIN_LOGIN_SUCCESS } from "../actionTypes/adminLoginTypes"

export const adminLoginRequest = () => {
  return {
    type: ADMIN_LOGIN_REQUEST
  }
}
export const adminLoginSuccess = (userToken) => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    payload: userToken
  }
}
export const adminLoginFailure = (error) => {
  return {
    type: ADMIN_LOGIN_FAILURE,
    payload: error
  }
}
export const adminLoginReset = () => {
  return {
    type: ADMIN_LOGIN_RESET
  }
}

export const adminLoginUser = (user) => {
  return (dispatch) => {
    dispatch(adminLoginRequest())
    axios.post('/admin/login', user)
    .then(response => {
      if(response.data.success){
        dispatch(adminLoginSuccess(response.data.token))
      }else{
        dispatch(adminLoginFailure(response.data))
      }
    })
    .catch(error => {
      dispatch(adminLoginFailure(error))
    })
  }
}