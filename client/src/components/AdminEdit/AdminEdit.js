import React, { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserReset, saveUsers } from '../../actions/registerActions'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'

function AdminEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const imageRef = useRef()
  const { id } = useParams()
  const registerState = useSelector(state => state.register) 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const theme = createTheme()
  const submitHandler = (e) => {
    e.preventDefault()
     const user = {
      name,
      email,
      phone
     }
     const formData = new FormData()
     formData.append('name', name)
     formData.append('email', email)
     formData.append('phone', phone)
     if(imageRef.current.files.length > 0){
        console.log('image appended')
       formData.append('image', imageRef.current.files[0], imageRef.current.files[0]?.name)
     }
     axios.put(`/admin/user/${id}`, formData, {
      headers: {
        'x-auth-token': JSON.parse(localStorage.getItem('authorization.admin')),
        'Content-Type': 'multipart/form-data'
      }
     })
     .then(response => {
      console.log(response)
      if(response.data.success){
        navigate('/admin')
      }else{
        setError(response.data.error)
      }
     })
     .catch(error => {
      console.log(error)
     })
  }
  useEffect(() => {
    axios.get(`/admin/user/${id}`, {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.admin'))}})
    .then(response => {
      if(response.data.redirect){
        navigate('/admin')
      }else{
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setImage(response.data.image)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{marginTop: '7rem'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={image}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={submitHandler} >
            <p className='error' style={{marginBottom: '1rem'}}>{error}</p>
            <Grid container spacing={2}>
              <p className='error'>{registerState.error.error && registerState.error.error}</p>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => {setName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="text"
                  value={phone}
                  onChange={(e) => {setPhone(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Profile Picture
                  <input type="file" name="image" ref={imageRef} hidden accept="image/*" onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}/>
                </Button>                
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {registerState.loading ? 'Loading...' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AdminEdit