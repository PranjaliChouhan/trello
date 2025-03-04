import React from 'react';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import Board from './Board';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Board />
      </Box>
    </Box>
  );
};

export default Layout; 