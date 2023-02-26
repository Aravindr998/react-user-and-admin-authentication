import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../actions/authActions'

function HomePage() {
  const [details, setDetails] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/userdetails', {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.user'))}})
    .then((response) => {
      setDetails(response.data)
    })
    .catch(error => {
      dispatch(clearAuth())
      navigate('/login')
      console.log('homepage')
    })
  }, [])
  
  return (
    <React.Fragment>
      <Header details ={details} />
      <Home details ={details}/>
    </React.Fragment>
  )
}

export default HomePage