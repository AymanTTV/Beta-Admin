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
import { GetAllContact, AddContact, UpdateContact, DeleteContact } from './apiCrud'; // Make sure you have the appropriate imports
import { v4 as uuidv4 } from 'uuid';

// States 
export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleModalOpen = () => {
    setModalOpen(true);
    setEditMode(false);
    setSelectedContact({});
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedContact({});
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (contact) => {
    setEditMode(true);
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setDeleteDialogOpen(true);
      setSelectedContact({ _id: id });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await DeleteContact(selectedContact._id);
      setSnackbarMessage('Contact deleted successfully');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries('contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    try {
      if (!editMode) {
        // Generate a new unique ID
        const tempId = Date.now();
        data.id = tempId;
      }
  
      if (editMode) {
        await UpdateContact(selectedContact._id, data);
        setSnackbarMessage('Contact updated successfully');
      } else {
        await AddContact(data);
        setSnackbarMessage('Contact added successfully');
      }
      setSnackbarOpen(true);
      setModalOpen(false);
      setEditMode(false);
      setSelectedContact({});
      form.reset();
      queryClient.invalidateQueries('contacts');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  

  const { data, isLoading, isError } = useQuery('contacts', GetAllContact);

  const contacts = data ? data.data : [];

  const deleteContactMutation = useMutation((id) => DeleteContact(id), {
    onSuccess: () => {
      setSnackbarMessage('Contact deleted successfully');
      setSnackbarOpen(true);
      queryClient.invalidateQueries('contacts');
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
            <Typography color="text.primary">Contact</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Contact List
          </Typography>
          <Box sx={{ mt: 2 }}>
  {isLoading ? (
    <Typography>Loading...</Typography>
  ) : isError ? (
    <Typography>Error fetching contacts...</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact._id}</TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.message}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(contact)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(contact._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</Box>
<Box mt={2} display="flex" justifyContent="flex-end">
  <Button variant="contained" onClick={handleModalOpen}>
    Add Contact
  </Button>
</Box>

<Modal
  open={modalOpen}
  onClose={handleModalClose}
  aria-labelledby="contact-form-title"
>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 400 }}>
    <Typography id="contact-form-title" variant="h5" gutterBottom>
      {editMode ? 'Edit Contact' : 'Add Contact'}
    </Typography>
    <form onSubmit={handleFormSubmit}>
      <TextField
        name="name"
        label="Name"
        defaultValue={selectedContact.name || ''}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        name="phone"
        label="Phone"
        defaultValue={selectedContact.phone || ''}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        name="message"
        label="Message"
        defaultValue={selectedContact.message || ''}
        fullWidth
        required
        margin="normal"
        multiline
        rows={4}
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button type="button" onClick={handleModalClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {editMode ? 'Save Changes' : 'Add Contact'}
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
  <DialogTitle>Delete Contact</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this contact?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleDeleteConfirmed} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>
        </Box>
      </Box>
      {/* Rest of the modal, snackbar, and dialog components */}
    </>
  );
}
