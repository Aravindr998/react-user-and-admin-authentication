import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './AdminHeader.css'
import { clearAdminAuth } from '../../actions/adminAuthActions'

function AdminHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = (e) => {
    localStorage.removeItem('authorization.admin')
    dispatch(clearAdminAuth())
    navigate('/admin/login')
  }
  return (
    <div className='admin-header'>
      <div className='user-name'>
        <p>Admin</p>
      </div>
      <div className='user-image'>
        <p style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</p>
      </div>
    </div>
  )
}

export default AdminHeader