import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BusinessIcon from '@mui/icons-material/Business';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HouseIcon from '@mui/icons-material/House';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { Info } from '@mui/icons-material';



export const drawerWidth = 240;

export const PermanentDrawerLeft = ({ drawerOpen, drawerClose }) => {
  useEffect(() => {
    // Adjust the AppBar width when 'drawerOpen' state changes
    const appBar = document.getElementById('app-bar');
    if (appBar) {
      appBar.style.ml = drawerOpen ? `${drawerWidth}px` : 0;
    }
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
  id="app-bar" // Give the AppBar an id to be referenced in useEffect
  position="fixed"
  sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: drawerOpen ? `${drawerWidth}px` : 0, bgcolor: 'green' }}
>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={drawerClose} // Call 'drawerClose' function when the IconButton is clicked
      edge="start"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    {/* Display user's name */}
    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'right' }}>
      User: Aymanttv
    </Typography>
  </Toolbar>
</AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        onClose={drawerClose}
      >
        {/* Box for the logo/icon and typography at the top of the sidebar */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Insert your logo/icon image or MUI icon component here */}
          {/* Example: <HomeIcon sx={{ fontSize: 32, marginRight: 1 }} /> */}
          <AddHomeWorkIcon sx={{color:"green",height:30, fontSize:50 }} />
          <Typography variant="h6" noWrap component="div">
            BetaHouse
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItemButton component={Link} to="/Home">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          
          {/* <ListItemButton component={Link} to="/Images">
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Images" />
          </ListItemButton> */}
          <ListItemButton component={Link} to="/Services">
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Clients">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItemButton>
          <ListItemButton component={Link} to="/About">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
          <ListItemButton component={Link} to="/XogtaShirkada">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="XogtaShirkada" />
          </ListItemButton>
          <ListItemButton component={Link} to="/contact">
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
          
        </List>
      </Drawer>
    </Box>
  );
};
