import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Breadcrumbs,
  Link,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Chip,
} from '@mui/material';
import {
  // ... (other imports)
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import ImagesFolder from './ImagesFolder';
import { Delete as DeleteIcon, Edit as EditIcon, Home as HomeIcon } from '@mui/icons-material';


import {
  GetAllGuriyaha,
  AddGuriyaha,
  UpdateGuriyaha,
  DeleteGuriyaha,
} from './apiCrud';

export default function Home() {
  
  const [drawerOpen, setDrawer] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGuriyaha, setSelectedGuriyaha] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [moreInfoDialogOpen, setMoreInfoDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleMoreInfoOpen = (guriyaha) => {
    setSelectedGuriyaha(guriyaha);
    setMoreInfoDialogOpen(true);
  };

  const handleMoreInfoClose = () => {
    setSelectedGuriyaha({});
    setMoreInfoDialogOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setEditMode(false);
    setSelectedGuriyaha({});
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedGuriyaha({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (guriyaha) => {
    setEditMode(true);
    setSelectedGuriyaha(guriyaha);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteDialogOpen(true);
    setSelectedGuriyaha({ _id: id });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await DeleteGuriyaha(selectedGuriyaha._id);
      setSnackbarMessage('Guriyaha deleted successfully');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries('guriyaha');
    } catch (error) {
      console.error('Error deleting guriyaha:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (editMode) {
        await UpdateGuriyaha(selectedGuriyaha._id, data);
        setSnackbarMessage('Guriyaha updated successfully');
      } else {
        await AddGuriyaha(data);
        setSnackbarMessage('Guriyaha added successfully');
      }
      setSnackbarOpen(true);
      setModalOpen(false);
      setEditMode(false);
      setSelectedGuriyaha({});
      form.reset();
      queryClient.invalidateQueries('guriyaha');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const { data, isLoading, isError } = useQuery('guriyaha', GetAllGuriyaha);
  const guriyahaList = data ? data.data : [];

  const deleteGuriyahaMutation = useMutation((id) => DeleteGuriyaha(id), {
    onSuccess: () => {
      setSnackbarMessage('Guriyaha deleted successfully');
      setSnackbarOpen(true);
      queryClient.invalidateQueries('guriyaha');
    },
  });

  return (
    <>
      
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <HomeIcon sx={{ fontSize: 24, marginRight: 1 }} />
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" underline="hover">
              Betahouse
            </Link>
            
            <Typography color="text.primary">Home</Typography>
          </Breadcrumbs>
          
        </Box>
        <Box sx={{ p: 2 }}>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography>Error fetching guriyaha...</Typography>
          ) : (
            <TableContainer component={Paper}>

              <Table sx={{ minWidth: 650 }} aria-label="guriyaha table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell>Images </TableCell>
                    <TableCell>Type </TableCell>
                    {/* <TableCell>Area</TableCell> */}
                    <TableCell>Address</TableCell>
                    {/* <TableCell>Age</TableCell> */}
                    <TableCell>Rent</TableCell>
                    {/* <TableCell>Deposit</TableCell>
                    <TableCell>Parking</TableCell>*/}
                    <TableCell>Available</TableCell>
                     {/*<TableCell>Rooms</TableCell>
                    <TableCell>Musqulaha</TableCell >
                    <TableCell>Master Room</TableCell>
                    <TableCell>Faahfaahin</TableCell>
                    <TableCell>Image Preview</TableCell>
                    <TableCell>User</TableCell> */}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guriyahaList.map((guriyaha) => (
                    <TableRow key={guriyaha._id}>
                      {/* <TableCell>{guriyaha._id}</TableCell> */}
                      <TableCell>
                          {/* <Link to={`/dashboard/images/${guriyaha._id}/${guriyaha.type}`}><Chip size='small' label='Images Folder' variant='outlined'></Chip></Link>               */}
                          <Button href={`images/${guriyaha._id}/${guriyaha.type}`}>ImagesFolder</Button>     
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {guriyaha.type}
                          <IconButton
                            color="default"
                            size="small"
                            sx={{
                              backgroundColor: '#edf4fa',
                              borderRadius: '4px',
                              marginLeft: '8px'
                            }}
                            onClick={() => handleMoreInfoOpen(guriyaha)}
                          >
                            See More
                          </IconButton>
                        </Typography>
                      </TableCell>

                      {/* <TableCell>{guriyaha.area}</TableCell> */}
                      <TableCell>{guriyaha.address}</TableCell>
                      {/* <TableCell>{guriyaha.age}</TableCell> */}
                      <TableCell>{guriyaha.rent}</TableCell>
                      {/* <TableCell>{guriyaha.deposit}</TableCell>
                      <TableCell>{guriyaha.parking}</TableCell> */}
                      <TableCell>{guriyaha.isAvailable}</TableCell>
                       {/* <TableCell>{guriyaha.rooms}</TableCell> */}
                      {/* <TableCell>{guriyaha.musqulaha}</TableCell> */}
                      {/* <TableCell>{guriyaha.masterRoom}</TableCell> */}
                      {/* <TableCell>{guriyaha.faahfaahin}</TableCell> */}
                      {/* <TableCell>{guriyaha.imagePreview}</TableCell> */}
                      {/* <TableCell>{guriyaha.user}</TableCell>  */}
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(guriyaha)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(guriyaha._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleModalOpen}>
              Add Guriyaha
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="guriyaha-form-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography id="guriyaha-form-title" variant="h5" gutterBottom>
            {editMode ? 'Edit Guriyaha' : 'Add Guriyaha'}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Box display="grid" gridGap={16} gridTemplateColumns="repeat(2, 1fr)">
              <TextField
                name="type"
                label="Type"
                defaultValue={selectedGuriyaha.type || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="area"
                label="Area"
                defaultValue={selectedGuriyaha.area || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="address"
                label="Address"
                defaultValue={selectedGuriyaha.address || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="age"
                label="Age"
                defaultValue={selectedGuriyaha.age || ''}
                type="number"
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="rent"
                label="Rent"
                defaultValue={selectedGuriyaha.rent || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="deposit"
                label="Deposit"
                defaultValue={selectedGuriyaha.deposit || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="parking"
                label="Parking"
                defaultValue={selectedGuriyaha.parking || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="isAvailable"
                label="Available"
                defaultValue={selectedGuriyaha.isAvailable || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="rooms"
                label="Rooms"
                defaultValue={selectedGuriyaha.rooms || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="musqulaha"
                label="Musqulaha"
                defaultValue={selectedGuriyaha.musqulaha || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="masterRoom"
                label="Master Room"
                defaultValue={selectedGuriyaha.masterRoom || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="faahfaahin"
                label="Faahfaahin"
                defaultValue={selectedGuriyaha.faahfaahin || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="imagePreview"
                label="Image Preview"
                defaultValue={selectedGuriyaha.imagePreview || ''}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                name="user"
                label="User"
                defaultValue={selectedGuriyaha.user || ''}
                fullWidth
                required
                margin="normal"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="button" onClick={handleModalClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {editMode ? 'Save Changes' : 'Add Guriyaha'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Guriyaha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Guriyaha?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
  open={moreInfoDialogOpen}
  onClose={handleMoreInfoClose}
  aria-labelledby="more-info-dialog-title"
>
  <DialogTitle id="more-info-dialog-title">More Home Information</DialogTitle>
  <DialogContent>
    {/* Add more information about the selected guriyaha here */}
    {/* For example: */}
    <DialogContentText>
      <strong>Area:</strong> {selectedGuriyaha.area} <br />
      <strong>Age:</strong> {selectedGuriyaha.age} <br />
      <strong>Deposit:</strong> {selectedGuriyaha.deposit} <br />
      <strong>Parking:</strong> {selectedGuriyaha.parking} <br />
      <strong>Rooms:</strong> {selectedGuriyaha.rooms} <br />
      <strong>Musqulaha:</strong> {selectedGuriyaha.musqulaha} <br />
      <strong>Master Room:</strong> {selectedGuriyaha.masterRoom} <br />
      {/* Add more fields here */}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleMoreInfoClose} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
}
