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
// import { PermanentDrawerLeft } from '../Dashboard/PermanentDrawerLeft.jsx';
import { GetAllClient, AddClient, UpdateClient, DeleteClient } from './apiCrud';



// react-query iyo useQuery iyo useMutation. Waxaad ku isticmaali 
// kartaa useQueryClient hook-ka si aad u gudbin kartid query-adaaga, oo ku 
// dhisan kartid useQueryClient ka const queryClient = useQueryClient();.
export default function Clients() {
  // State-ka aad ku jira
  const [drawerOpen, setDrawer] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // useQueryClient hook, oo u qaabilsan React Query
  const queryClient = useQueryClient();

  // Metoodooyinka Qaabilsan
  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setEditMode(false);
    setSelectedClient({});
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedClient({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (client) => {
    setEditMode(true);
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setDeleteDialogOpen(true);
      setSelectedClient({ _id: id });
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await DeleteClient(selectedClient._id);
      setSnackbarMessage('Client deleted successfully');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries('clients');
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      if (editMode) {
        await UpdateClient(selectedClient._id, data);
        setSnackbarMessage('Client updated successfully');
      } else {
        await AddClient(data);
        setSnackbarMessage('Client added successfully');
      }
      setSnackbarOpen(true);
      setModalOpen(false);
      setEditMode(false);
      setSelectedClient({});
      form.reset();
      queryClient.invalidateQueries('clients');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Query-ada u soo gudbin
  const { data, isLoading, isError } = useQuery('clients', GetAllClient);

  // Liiska macaamiisha (clients) oo laga helay data-ga API-ka
  const clients = data ? data.data : [];

  // useMutation hook, oo ka bixin React Query, oo noo sahlo mutation-ka
  const deleteClientMutation = useMutation((id) => DeleteClient(id), {
    onSuccess: () => {
      setSnackbarMessage('Client deleted successfully');
      setSnackbarOpen(true);
      queryClient.invalidateQueries('clients');
    },
  });

  return (
    <>
      {/* Marka laga reebo, habka drawer-ka */}
      
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <HomeIcon sx={{ fontSize: 24, marginRight: 1 }} />
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" underline="hover">
              Betahouse
            </Link>
            <Typography color="text.primary">Clients</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            List Clients
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : isError ? (
            <Typography>Error fetching clients...</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="clients table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client._id}>
                      <TableCell>{client._id}</TableCell>
                      <TableCell>{client.ClientName}</TableCell>
                      <TableCell>{client.Logo}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(client)}>
                          <EditIcon />
                        </IconButton>
                        {/* Qaybta onClick-ka ee delete-ka */}
                        <IconButton color="error" onClick={() => handleDelete(client._id)}>
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
            <Button variant="contained" onClick={handleModalOpen}>Add Client</Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="client-form-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
          <Typography id="client-form-title" variant="h5" gutterBottom>
            {editMode ? 'Edit Client' : 'Add Client'}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="ClientName"
              label="Client Name"
              defaultValue={selectedClient.ClientName || ''}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="Logo"
              label="Logo"
              defaultValue={selectedClient.Logo || ''}
              fullWidth
              required
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button type="button" onClick={handleModalClose} sx={{ mr: 1 }}>Cancel</Button>
              <Button type="submit" variant="contained">{editMode ? 'Save Changes' : 'Add Client'}</Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* Wargelin dhibcaha oo dhan ee soo saarida (Snackbar) */}
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
      {/* Qeybta Dialog-ka ee tasfiirka (delete confirmation) */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this client?
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
