import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { useNavigate } from 'react-router-dom'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import axios from '../../axios'
import { Avatar, Button, TextField } from '@mui/material'

function AdminHome() {
  const navigate = useNavigate()
  const [details, setDetails] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get('/admin/users', {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.admin'))}})
    .then(response => {
      setDetails(response.data.users)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  const deleteHandler = (id) => {
    const data = {
      id
    }
    axios.patch('/admin/users/delete', data, {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.admin'))}})
    .then(response => {
      if(response.data.success){
        setDetails(prevState => {
          return prevState.filter(user => user._id != id)
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  const searchHandler = (e) => {
    const data = {
      search
    }
    axios.post('/admin/search', data, {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.admin'))}})
    .then(response => setDetails(response.data))
    .catch(error => console.log(error))
  }
  const users = details.map((user) => (
    <tr key={user._id}>
      <td>
        <div className='d-flex align-items-center'>
          <Avatar alt="User image" src={user?.image} />
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{user.name}</p>
            <p className='text-muted mb-0'>{user._id}</p>
          </div>
        </div>
      </td>
      <td>
        <p className='fw-normal mb-1'>{user.phone}</p>
      </td>
      <td>{user.email}</td>
      <td>
        <Button variant="outlined" onClick={() => navigate(`/admin/edit/${user._id}`)}>Edit</Button>
        <Button sx={{marginLeft:'0.5rem'}} color='error' variant="outlined" onClick={() => deleteHandler(user._id)}>Delete</Button>
      </td>
    </tr>
  ))
  
  return (
    <div className='admin-home-page card'>
      <div className='d-flex align-items-center justify-content-end'>
        <TextField id="outlined-basic" label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" sx={{height: '3.5rem', marginLeft: '0.5rem'}} color='error' onClick={searchHandler}>Search</Button>
      </div>
      <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users}
      </MDBTableBody>
    </MDBTable>
    </div>
  )
}

export default AdminHome