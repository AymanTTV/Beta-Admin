import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import jscookie from 'js-cookie';
import axios from 'axios';
import { useUserContext } from '../ContextApi/UserContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { setIsLogin, setEmail } = useUserContext();

  useEffect(() => {
    if (!jscookie.get('token')) {
      navigate('/');
    }
  }, [navigate]);

  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn't exist.
            </Typography>
            <Link to="/dashboard">
              <Button variant="contained">Back Home</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
