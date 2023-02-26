import { combineReducers } from "redux"
import adminAuthReducer from "./adminAuthReducer"
import adminLoginReducer from "./adminLoginReducer"
import authReducer from "./authReducer"
import loginReducer from "./loginReducer"
import registerReducer from './registerReducer'

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  auth: authReducer,
  adminAuth: adminAuthReducer,
  adminLogin: adminLoginReducer,
})

export default rootReducer