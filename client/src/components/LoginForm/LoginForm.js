import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginReset, loginUser } from '../../actions/loginActions'
import { setAuth } from '../../actions/authActions'

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginState = useSelector(state => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    console.log(user)
    dispatch(loginUser(user))
  }
  useEffect(() => {
    if(loginState.success){
      localStorage.setItem('authorization.user', JSON.stringify(loginState.token))
      dispatch(loginReset())
      dispatch(setAuth())
      navigate('/')
      console.log('login')
    }
  })
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={submitHandler}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <p className='error'>{loginState.error.error && loginState.error.error}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loginState.loading ? 'Loading...' : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate('/register')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm