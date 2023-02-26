import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Home.css'
import { useNavigate } from 'react-router-dom';

function Home({details}) {
  const navigate = useNavigate()
  return (
    <div className='home-page'>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Welcome to Home Page
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {details.name}
        </Typography>
        <Typography variant="body2">
          Click the below link to go 
          <br />
          {'to profile page'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('/profile')}>PROFILE</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default Home