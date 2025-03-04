import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import {
  Apps as AppsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear any stored authentication tokens/data
    localStorage.removeItem('token'); // Adjust based on your auth storage method
    
    // Close the menu
    handleClose();
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      
      sx={{ 
        bgcolor: '#1D2125',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ minHeight: 48 , display: 'flex' , justifyContent: 'space-between'}}>
        {/* <IconButton 
          size="small"
          sx={{ color: '#9FADBC' }}
        >
          <AppsIcon />
        </IconButton> */}

        <Box component="img" src="/trello-logo.svg" sx={{ height: 20, mx: 5 }} />

        <Box sx={{ flex: 1, display: 'flex', gap: 1 , display: { xs: 'none', sm: 'flex' } }}>
          <Button
            sx={{
              color: '#B6C2CF',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Workspaces
          </Button>
          <Button
            sx={{
              color: '#B6C2CF',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Recent
          </Button>
          <Button
            sx={{
              color: '#B6C2CF',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Starred
          </Button>
          <Button
            sx={{
              color: '#B6C2CF',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Templates
          </Button>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#579DFF',
            textTransform: 'none',
            '&:hover': { bgcolor: '#85B8FF' }
          }}
        >
          Create
        </Button>

        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#9FADBC', mr: 1 }} />,
            }}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              '& .MuiOutlinedInput-root': {
                color: '#B6C2CF',
                bgcolor: 'rgba(255,255,255,0.1)',
                '& fieldset': { border: 'none' },
              }
            }}
          />
          <IconButton sx={{ color: '#9FADBC' }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: '#9FADBC' }}>
            <HelpIcon />
          </IconButton>
          <Avatar 
            onClick={handleClick}
            sx={{ 
              width: 24, 
              height: 24,
              bgcolor: '#614B9E',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            UK
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                bgcolor: '#282E33',
                color: '#B6C2CF',
                minWidth: 200,
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem sx={{ py: 1 }}>
              <Typography variant="body2">user@example.com</Typography>
            </MenuItem>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
              <LogoutIcon sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar; 