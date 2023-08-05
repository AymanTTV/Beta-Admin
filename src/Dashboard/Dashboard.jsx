import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material'; // Make sure Typography is imported
import { PermanentDrawerLeft } from './PermanentDrawerLeft.jsx';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export const Dashboard = () => {
  const [drawerOpen, setDrawer] = useState(true); // Set 'drawerOpen' to true to have the menu open by default

  const toggleDrawer = () => {
    setDrawer(!drawerOpen);
  };

  return (
    <>
      <Box>
        <Stack direction={'row'}>
          {/* Side Menu */}
          <PermanentDrawerLeft drawerOpen={drawerOpen} drawerClose={toggleDrawer} />
          <Box sx={{ flexGrow: 1 }}>
            {/* content box */}
            <Box sx={{ width: '100%', marginTop: '64px' }}>
              {/* top header */}
              {/* Add any additional items for the AppBar */}
              {/* ... */}
              {/* top header end */}
              {/* content pages */}
              <Outlet />
              {/* end content */}
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};