import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Alert, Button, Stack, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getDownloadURL, deleteObject, uploadBytes, ref } from 'firebase/storage'; // Corrected import
import { storage, db } from './firebase'; // Import Firebase Storage and Firestore instances
import MediaCard from './MediaCard';

const ImagesFolder = () => {
  const { id, Type } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadAlertOpen, setUploadAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Construct the Firestore document path based on your structure
    const docPath = `/${id}/${Type}/`;

    // Fetch the image metadata from Firestore
    const fetchImageMetadata = async () => {
      try {
        const snapshot = await db.collection(docPath).get();
        const urls = [];
        snapshot.forEach((doc) => {
          urls.push(doc.data().imageUrl);
        });
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching image metadata:', error);
      }
    };

    fetchImageMetadata();
  }, [id, Type]);


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const uniqueId = new Date().getTime().toString(); // Generate a unique ID based on timestamp
    const storageRef = ref(storage, `houses/${id}/${Type}/${uniqueId}`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Monitor upload progress if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      async () => {
        console.log('Image uploaded successfully');
        setUploadAlertOpen(false); // Close upload dialog
        setSnackbarMessage('Image uploaded successfully.');
        setSnackbarOpen(true); // Show snackbar alert

        // Save image metadata in Firestore (You can customize this based on your needs)
        const imageMetadata = {
          imageUrl: await getDownloadURL(storageRef), // Get the URL of the uploaded image
          createdAt: new Date().toISOString(),
        };

        await db.collection('images').add(imageMetadata);

        setImageUrl(imageMetadata.imageUrl);
      }
    );
  };

  const handleImageDelete = async () => {
    setDeleteAlertOpen(false); // Close delete confirmation dialog
    const storageRef = ref(storage, `houses/${id}/${Type}`);

    try {
      await deleteObject(storageRef);
      console.log('Image deleted successfully');
      setImageUrl('');
      setSnackbarMessage('Image deleted successfully.');
      setSnackbarOpen(true); // Show snackbar alert
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box>
        <Alert severity='info'>
          Type: {Type}, ID: {id}
        </Alert>
        <Stack direction={'row'} spacing={2} sx={{ marginTop: 2 }}>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
          <Button variant='contained' size='small' onClick={handleImageUpload}>
            Upload
          </Button>
        </Stack>
        <Divider sx={{ marginY: 2 }} />
      </Box>
  
      {/* Display the list of MediaCard components */}
      {imageUrls.length === 0 ? (
        <Typography variant='body2' color='text.secondary' sx={{ marginTop: 2 }}>
          No images found. Please upload images.
        </Typography>
      ) : (
        imageUrls.map((imageUrl, index) => (
          <MediaCard
            key={index} // Make sure to provide a unique key for each MediaCard
            imageUrl={imageUrl}
            handleImageDelete={() => setDeleteAlertOpen(true)}
          />
        ))
      )}
  
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
  
      <Dialog open={deleteAlertOpen} onClose={() => setDeleteAlertOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this image?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAlertOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleImageDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
  
}

export default ImagesFolder;
