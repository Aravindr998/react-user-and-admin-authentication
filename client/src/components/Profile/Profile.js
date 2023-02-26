import React, { useEffect, useRef, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from '../../axios'
import "./Profile.css"
import { Alert, Snackbar } from "@mui/material"

function Profile({details, imageAdded}) {
  const imgURL = details.image || "/Images/user.png"
  const [open, setOpen] = React.useState(false)
  const [image, setImage] = useState(imgURL)
  const [error, setError] = useState(false)
  const fileRef = useRef()
  const theme = createTheme()
  useEffect(() => {
    setImage(details.image)
  }, [details.image])
  const submitHandler = (e) => {
    console.log('submitted')
    e.preventDefault()
    const file = fileRef.current.files[0]
    console.log(file)
    const formData = new FormData()
    if(!file){
      return setError(true)
    }else{
      setError(false)
    }
    formData.append('image', file,file?.name)
    const data = formData
    axios.patch('/update', data, {headers: {'x-auth-token': JSON.parse(localStorage.getItem('authorization.user')), 'Content-Type': 'multipart/form-data'}})
    .then(response => {
      console.log(response)
      if(response.data.error){
        setError(true)
      }else{
        imageAdded(response.data.url)
        fileRef.current.value = ''
        setError(false)
        setOpen(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  return (
    <div className="profile-page">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={image}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} encType='multipart/form-data' onSubmit={submitHandler} >
              <p className="error">{error && 'Please select a file'}</p>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p>{details.name}</p>
                </Grid>
                <Grid item xs={12}>
                  <p>{details.email}</p>
                </Grid>
                <Grid item xs={12}>
                  <p>{details.phone}</p>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input type="file" name="image" hidden accept="image/*" ref={fileRef} onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}/>
                  </Button>                
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Image uploaded successfully
        </Alert>
      </Snackbar>
      </ThemeProvider>
    </div>
  )
}

export default Profile
