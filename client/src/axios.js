import axios from "axios"

let token = JSON.parse(localStorage.getItem('authorization.user'))

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': `${token ? token : ''}`
  }
})

export default instance