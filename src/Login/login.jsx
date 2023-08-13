import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Box, Stack, Typography, Button, TextField, Alert } from '@mui/material';
import jscookie from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../ContextApi/UserContext';

export default function Login() {
  const usenav = useNavigate();
  useEffect(() => {
    if (jscookie.get('token')) {
      usenav('/dashboard'); // Correct route name
    }
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isLogin, setIsLogin } = useUserContext(); // Correct import statement

  const { mutateAsync, isError, isLoading, error } = useMutation({
    mutationFn: async (data) => {
      return await axios.post('http://localhost:4000/login', data);
    },

    onError: (er) => {
      console.log("er", er)
    }
  });

  const Login = async (data) => {
    mutateAsync(data).then((res) => {
      jscookie.set('token', res.data.AccessToken);

      if (res.status === 200) {
        setIsLogin(true);
        usenav('/dashboard');
      }
    });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f2f2', // Background color
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
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Box shadow
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Log in to Your Account
        </Typography>
        <Stack spacing={2}>
        {error && <Alert severity='error'>Incorrect Password or Email</Alert>}
          <TextField {...register("email")} size='small' label='Email' variant='outlined' />
          <TextField {...register("password")} size='small' label='Password' variant='outlined' type="password" />

          <Button type='submit' variant='contained' size='small'>
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
