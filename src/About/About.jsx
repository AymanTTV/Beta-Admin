import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// import { PermanentDrawerLeft } from '../Dashboard/PermanentDrawerLeft.jsx';
import { GetAllAbout, AddAbout, UpdateAbout } from './apiCrud.jsx';

export default function About() {
  const [drawerOpen, setDrawer] = useState(true);
  const [id, setId] = useState(null);
  const [faahfaahinYar, setFaahfaahinYar] = useState('');
  const [faahfaahin, setFaahfaahin] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    // Fetch About data when component mounts
    const fetchAbout = async () => {
      try {
        const response = await GetAllAbout();
        if (response.data.length > 0) {
          const aboutData = response.data[0];
          setId(aboutData.id);
          setFaahfaahinYar(aboutData.faahfaahinYar);
          setFaahfaahin(aboutData.faahfaahin);
        }
      } catch (error) {
        console.error('Error fetching About:', error);
      }
    };

    fetchAbout();
  }, []);

  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    try {
      const data = { id, faahfaahinYar, faahfaahin };

      if (faahfaahinYar || faahfaahin) {
        let response;
        
        if (!id) {
          // Generate a temporary unique ID for new entry
          const tempId = Date.now().toString();
          setId(tempId);
          response = await AddAbout({ ...data, id: tempId });
          setSnackbarMessage('About created successfully');
        } else {
          response = await UpdateAbout(id, data);
          setSnackbarMessage('About updated successfully');
        }

        if (response.data) {
          setSnackbarOpen(true);
          queryClient.invalidateQueries('about');
        }
      }
    } catch (error) {
      console.error('Error saving About:', error);
    }
  };

  return (
    <>
      {/* Left drawer */}
      

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          {/* Blue Alert */}
          <Alert severity="info" sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
            About BetaHouse
          </Alert>

          {/* Breadcrumbs */}
          {/* <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" underline="hover">
              Betahouse
            </Link>
            <Typography color="text.primary">About</Typography>
          </Breadcrumbs> */}
        </Box>

        <Box sx={{ p: 2 }}>
          {/* Save Button */}
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              Save
            </Button>
          </Box>

          {/* Label for faahfaahinYar */}
          <Typography variant="h6" gutterBottom>
            FaahfaahinYar
          </Typography>
          {/* Text Editor for faahfaahinYar */}
          <ReactQuill
            value={faahfaahinYar}
            onChange={setFaahfaahinYar}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean'],
              ],
            }}
            theme="snow"
          />

          {/* Label for faahfaahin */}
          <Typography variant="h6" gutterBottom>
            Faahfaahin
          </Typography>
          {/* Text Editor for faahfaahin */}
          <ReactQuill
            value={faahfaahin}
            onChange={setFaahfaahin}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean'],
              ],
            }}
            theme="snow"
          />
        </Box>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

// A company that Rents Houses
// We are BetaHouse Company the number one leading House Renting Company
