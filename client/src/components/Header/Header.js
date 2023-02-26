import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../actions/authActions'

function Header({details}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = (e) => {
    localStorage.removeItem('authorization.user')
    dispatch(clearAuth())
    navigate('/login')
  }
  return (
    <div className='header'>
      <div className='user-name'>
        <p>Hi {details.name}</p>
      </div>
      <div className='user-image'>
        <p style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p>
        <Avatar onClick={() => navigate('/profile')} alt="Profile picture" src={`${details.image ? details.image : '/Images/user.png'}`} />
      </div>
    </div>
  )
}

export default Header