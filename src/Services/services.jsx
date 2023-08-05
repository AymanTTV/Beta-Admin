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
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Home as HomeIcon } from '@mui/icons-material';
import { PermanentDrawerLeft } from '../Dashboard/PermanentDrawerLeft.jsx';
import { GetAllService, AddService, UpdateService, DeleteService } from './apiCrud';

export default function Services() {
  // State to manage UI components
  const [drawerOpen, setDrawer] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // useQueryClient hook to access the React Query queryClient
  const queryClient = useQueryClient();

  // UI Component Handlers
  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setEditMode(false);
    setSelectedService({});
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedService({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setDeleteDialogOpen(true);
      setSelectedService({ _id: id });
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await DeleteService(selectedService._id);
      setSnackbarMessage('Service deleted successfully');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries('services');
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (editMode) {
        await UpdateService(selectedService._id, data);
        setSnackbarMessage('Service updated successfully');
      } else {
        await AddService(data);
        setSnackbarMessage('Service added successfully');
      }
      setSnackbarOpen(true);
      setModalOpen(false);
      setEditMode(false);
      setSelectedService({});
      form.reset();
      queryClient.invalidateQueries('services');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Query data
  const { data, isLoading, isError } = useQuery('services', GetAllService);

  // Array of services received from the API data
  const services = data ? data.data : [];

  // useMutation hook to handle mutations, such as delete
  const deleteServiceMutation = useMutation((id) => DeleteService(id), {
    onSuccess: () => {
      setSnackbarMessage('Service deleted successfully');
      setSnackbarOpen(true);
      queryClient.invalidateQueries('services');
    },
  });

  return (
    <>
      {/* Drawer component */}
      
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <HomeIcon sx={{ fontSize: 24, marginRight: 1 }} />
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" underline="hover">
              Betahouse
            </Link>
            <Typography color="text.primary">Services</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            List Services
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography>Error fetching services...</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="services table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Icon</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>{service._id}</TableCell>
                      <TableCell>{service.Title}</TableCell>
                      <TableCell>{service.Icon}</TableCell>
                      <TableCell>{service.Description}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(service)}>
                          <EditIcon />
                        </IconButton>
                        {/* Delete action onClick */}
                        <IconButton color="error" onClick={() => handleDelete(service._id)}>
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
            <Button variant="contained" onClick={handleModalOpen}>Add Service</Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="service-form-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
          <Typography id="service-form-title" variant="h5" gutterBottom>
            {editMode ? 'Edit Service' : 'Add Service'}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="Title"
              label="Title"
              defaultValue={selectedService.Title || ''}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="Icon"
              label="Icon"
              defaultValue={selectedService.Icon || ''}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="Description"
              label="Description"
              defaultValue={selectedService.Description || ''}
              fullWidth
              required
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="button" onClick={handleModalClose} sx={{ mr: 1 }}>Cancel</Button>
              <Button type="submit" variant="contained">{editMode ? 'Save Changes' : 'Add Service'}</Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* Snackbar for displaying messages */}
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
      {/* Delete confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this service?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
