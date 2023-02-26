import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPublicRoutes() {
  const authState = useSelector(state => state.adminAuth)
  return (
    !authState.auth ? <Outlet/> : <Navigate to='/admin'/>
  )
}

export default AdminPublicRoutes