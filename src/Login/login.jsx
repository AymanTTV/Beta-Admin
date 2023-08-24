import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Box, Stack, Typography, Button, TextField, Alert } from '@mui/material';
import jscookie from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../ContextApi/UserContext';

export default function Login() {
  const usenav = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (jscookie.get('token')) {
      usenav('/dashboard');
    }
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isLogin, setIsLogin, setEmail } = useUserContext();

  const { mutateAsync, isError, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      return await axios.post('https://betahouse-backend-livid.vercel.app/login', data);
    },

    onError: (er) => {
      console.log("er", er)
    }
  });

  const Login = async (data) => {
    if (!data.email || !data.password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }
  
    try {
      const res = await mutateAsync(data);
  
      if (res.status === 200) {
        setEmail(res.data.email);
        jscookie.set('token', res.data.token);
        setIsLogin(true);
        usenav('/dashboard');
      } else {
        setErrorMessage('Incorrect Password or Email');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect Password or Email');
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(Login)}
        sx={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'white',
          p: 6,
          borderRadius: 4,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Log in to Your Account
        </Typography>
        <Stack spacing={2}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <TextField {...register("email")} size='small' label='Email' variant='outlined' />
          <TextField {...register("password")} size='small' label='Password' variant='outlined' type="password" />

          <Button
            type='submit'
            variant='contained'
            size='small'
            sx={{
              backgroundColor: '#00df9a',
              color: 'gray-300',
              '&:hover': {
                backgroundColor: '#00a47b',
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
