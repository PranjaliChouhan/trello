import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Board from './Board';

const Dashboard = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      width: '100vw',
      flexDirection: { xs: 'column', sm: 'row' }
    }}>
      <Sidebar sx={{
        width: { xs: '100%', sm: '240px' },
        height: { xs: 'auto', sm: '100vh' },
        display: { xs: 'none', sm: 'block' }
      }} />
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        width: { xs: '100%', sm: 'calc(100% - 240px)' }
      }}>
        <TopBar />
        <Board />
      </Box>
    </Box>
  );
};

export default Dashboard; 