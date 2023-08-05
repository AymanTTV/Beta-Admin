import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Alert, Grid, Button, Stack, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getDownloadURL, deleteObject, uploadBytes, ref, listAll } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { storage, db } from './firebase';
import MediaCard from './MediaCard';

function ImagesFolder() {
  const { id, Type } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [imageNotFound, setImageNotFound] = useState(false);
  const [uploadAlertOpen, setUploadAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isUploadButtonClicked, setIsUploadButtonClicked] = useState(false);

  useEffect(() => {
    const storageRef = ref(storage, `houses/${id}/${Type}`);
    const imageUrls = [];
  
    // List all items (images) in the storage reference
    listAll(storageRef)
      .then((res) => {
        res.items.forEach(async (item) => {
          try {
            const url = await getDownloadURL(item);
            imageUrls.push(url);
            setImageUrls([...imageUrls]);
          } catch (error) {
            console.error('Error getting image URL:', error);
          }
        });
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          setImageNotFound(true);
        } else {
          console.error('Error listing images:', error);
        }
      });
  }, [id, Type]);
  
  const fetchImageUrls = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const urls = querySnapshot.docs.map((doc) => doc.data().imageUrl);
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    }
  };
  

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const uniqueId = new Date().getTime().toString();
    const storageRef = ref(storage, `houses/${id}/${Type}/${uniqueId}`);
  
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Image uploaded successfully', snapshot);
  
      const imageUrl = await getDownloadURL(snapshot.ref);
      const imageMetadata = {
        imageUrl,
        createdAt: new Date().toISOString(),
      };
  
      if (isUploadButtonClicked) {
        try {
          const docRef = await addDoc(collection(db, 'images'), imageMetadata);
          console.log('Image metadata added with ID: ', docRef.id);
  
          setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
  
          setUploadAlertOpen(false);
          setSnackbarMessage('Data inserted successfully.');
          setSnackbarOpen(true);
  
          // Clear the input file selection after successful upload
          event.target.value = null;
  
          // Refresh the component to reflect the new data
          setIsUploadButtonClicked(false);
          fetchImageUrls();
        } catch (error) {
          console.error('Error adding image metadata: ', error);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  
  const handleUploadButtonClick = () => {
    setIsUploadButtonClicked(true);
    setUploadAlertOpen(true);
  };
  
  
  
  const handleImageDelete = async () => {
    setDeleteAlertOpen(false);

    const storageRef = ref(storage, `houses/${id}/${Type}`);
    console.log('Deleting images at path:', storageRef.fullPath);

    try {
      await deleteObject(storageRef);
      console.log('Images deleted successfully');
      setImageUrls([]);
      setSnackbarMessage('Images deleted successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting images:', error);
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
          File ka lee open gareeso then refresh
         
        </Stack>
        <Divider sx={{ marginY: 2 }} />
      </Box>

      <Grid container spacing={2}>
      {imageUrls.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          No images found. Please upload images.
        </Typography>
      ) : (
        imageUrls.map((imageUrl, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <MediaCard
              imageUrl={imageUrl}
              handleImageDelete={() => setDeleteAlertOpen(true)}
            />
          </Grid>
        ))
      )}
    </Grid>

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default ImagesFolder;


 {/* <Button onClick={handleUploadButtonClick} color='primary'>
        Upload Image
          </Button> */}