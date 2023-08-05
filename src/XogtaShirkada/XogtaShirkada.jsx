import React, { useState, useEffect } from 'react';
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

import {
  GetAllXogtaShirkada,
  AddXogtaShirkada,
  UpdateXogtaShirkada,
} from './apiCrud'; // Update the import path

export default function XogtaShirkada() {
  const [drawerOpen, setDrawer] = useState(true);
  const [xogtaShirkadaData, setXogtaShirkadaData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch Xogta Shirkada data when component mounts
    const fetchXogtaShirkada = async () => {
      try {
        const response = await GetAllXogtaShirkada();
        if (response.data.length > 0) {
          const xogtaShirkadaData = response.data[0];
          setXogtaShirkadaData(xogtaShirkadaData);
        }
      } catch (error) {
        console.error('Error fetching Xogta Shirkada:', error);
      }
    };

    fetchXogtaShirkada();
  }, []);

  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = async () => {
    try {
      if (!xogtaShirkadaData.id) {
        // Generate a temporary unique ID for new entry
        const tempId = Date.now();
        setXogtaShirkadaData((prevData) => ({ ...prevData, id: tempId }));
      }

      if (Object.keys(xogtaShirkadaData).length > 0) {
        if (!xogtaShirkadaData._id) {
          // If no _id exists, add a new entry
          await AddXogtaShirkada(xogtaShirkadaData);
          setSnackbarMessage('Xogta Shirkada added successfully');
        } else {
          // If _id exists, update the existing entry
          await UpdateXogtaShirkada(xogtaShirkadaData._id, xogtaShirkadaData);
          setSnackbarMessage('Xogta Shirkada updated successfully');
        }
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error saving Xogta Shirkada:', error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          {/* Blue Alert */}
          <Alert severity="info" sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
            XogtaShirkada BetaHouse
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

          {/* React Quill Text Editors */}
          <Typography variant="h6" gutterBottom>
            Location
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.location || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, location: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            Logo
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.logo || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, logo: content }))
            }
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

          {/* Add more text editors for other fields */}
          <Typography variant="h6" gutterBottom>
            Email
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.email || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, email: content }))
            }
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
          <Typography variant="h6" gutterBottom>
            Complain Email
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.complainEmail || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, complainEmail: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            Complain Phone
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.complainPhone || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, complainPhone: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            Facebook
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.facebook || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, facebook: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            TikTok
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.tiktok || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, tiktok: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            Twitter
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.twitter || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, twitter: content }))
            }
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

          <Typography variant="h6" gutterBottom>
            Instagram
          </Typography>
          <ReactQuill
            value={xogtaShirkadaData.instagram || ''}
            onChange={(content) =>
              setXogtaShirkadaData((prevData) => ({ ...prevData, instagram: content }))
            }
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
          {/* Repeat the above pattern for other fields */}

          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
