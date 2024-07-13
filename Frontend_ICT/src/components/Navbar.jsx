import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static" color = "secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ICT Internship Portal
        </Typography>
        <Box>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Profile</Button>
          <Button color="inherit" sx={{ textTransform: 'none' }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
