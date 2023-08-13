import React from 'react';
import { createRoot } from 'react-dom/client'; // Update the import statement for createRoot
import App from './App'; // Update the import statement for App
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PermanentDrawerLeft } from './Dashboard/PermanentDrawerLeft.jsx'; 
// Update the import statement for PermanentDrawerLeft component

import {UserContextProvider} from './ContextApi/UserContext'

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e6084',
      dark: '#0f0f0f',
      light: "#b5b1b1"
    },
    error: {
      main: "#E50F0C",
      warning: "#cf0c0c",
      dark: '#030202',
    }
  },
});

createRoot(document.getElementById('root')).render( // Update the method call to createRoot
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
           {/* Replace this line with the PermanentDrawerLeft component */}
          <UserContextProvider>
          <App />
          </UserContextProvider>
          
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
