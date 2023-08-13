import React from 'react';
import { createRoot } from 'react-dom/client'; // Update the import statement for createRoot
import App from './App'; // Update the import statement for App
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './ContextApi/UserContext'; // Make sure to import UserContextProvider

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e6084',
      dark: '#0f0f0f',
      light: '#b5b1b1',
    },
    error: {
      main: '#E50F0C',
      warning: '#cf0c0c',
      dark: '#030202',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContextProvider>
            {/* Include the PermanentDrawerLeft component here */}
            <App />
          </UserContextProvider>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
