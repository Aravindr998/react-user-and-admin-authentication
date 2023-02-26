import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Profile from '../components/Profile/Profile'
import axios from '../axios'

function ProfilePage() {
  const [details, setDetails] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  const addImage = (filePath) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        image: filePath
      }
    })
  }
  return (
    <React.Fragment>
      <Header details={details}/>
      <Profile details={details} imageAdded = {addImage}/>
    </React.Fragment>
  )
}

export default ProfilePage