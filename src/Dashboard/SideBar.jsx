import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Phone';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { useUserContext } from '../ContextApi/UserContext';

export const SideBar = ({ open, handleDrawerClose }) => {
  const { isLogin, LogOut } = useUserContext();

  const handleMenuItemClick = () => {
    handleDrawerClose();
  };

  return (
    <List>
      <ListItemButton component={Link} to="/Home" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/Services" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Services" />
      </ListItemButton>
      <ListItemButton component={Link} to="/Clients" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItemButton>
      <ListItemButton component={Link} to="/About" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
      <ListItemButton component={Link} to="/XogtaShirkada" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="XogtaShirkada" />
      </ListItemButton>
      <ListItemButton component={Link} to="/contact" onClick={handleMenuItemClick}>
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItemButton>
      {isLogin && (
        <ListItemButton onClick={LogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      )}
    </List>
  );
};
