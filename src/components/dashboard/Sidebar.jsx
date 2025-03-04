import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as BoardsIcon,
  People as MembersIcon,
  Settings as SettingsIcon,
  TableChart as TableIcon,
  CalendarToday as CalendarIcon,
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = React.useState(!isMobile);
  const [workspaceOpen, setWorkspaceOpen] = React.useState(true);
  const [viewsOpen, setViewsOpen] = React.useState(true);
  const [boardsOpen, setBoardsOpen] = React.useState(true);

  // Close sidebar by default on mobile when screen size changes
  React.useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: 'fixed',
            left: 10,
            top: 5,

            zIndex: 1200,
            color: '#9FADBC',
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        sx={{
          width: isOpen ? 240 : isMobile ? 0 : 64,
          paddingTop:isMobile ? '25px' : '0px',
          bgcolor: '#1D2125',
          height: '100vh',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          transition: 'width 0.2s',
          overflow: 'hidden',
          position: isMobile ? 'fixed' : 'relative',
          zIndex: 1100,
        }}
      >
        {/* Workspace Header */}
        <Box sx={{ p: 1 }}>
          <ListItem
            button
            onClick={() => !isMobile && setWorkspaceOpen(!workspaceOpen)}
            sx={{
              borderRadius: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              justifyContent: !isOpen && !isMobile ? 'center' : 'flex-start',
            }}
          >
            <Box sx={{ 
              width: 24, 
              height: 24, 
              bgcolor: '#614B9E', 
              borderRadius: 1,
              mr: isOpen ? 2 : 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '14px'
            }}>
              D
            </Box>
            {isOpen && (
              <>
                <ListItemText 
                  primary="Dragonlist.AI"
                  secondary="Premium"
                  sx={{
                    '& .MuiListItemText-primary': { color: '#B6C2CF' },
                    '& .MuiListItemText-secondary': { color: '#9FADBC' }
                  }}
                />
                {workspaceOpen ? <ExpandLess sx={{ color: '#9FADBC' }} /> : <ExpandMore sx={{ color: '#9FADBC' }} />}
              </>
            )}
          </ListItem>
        </Box>

        {/* Main Menu Items */}
        <List>
          {[
            { icon: <BoardsIcon />, text: 'Boards' },
            { icon: <MembersIcon />, text: 'Members' },
            { icon: <SettingsIcon />, text: 'Workspace settings' },
          ].map((item, index) => (
            <ListItem 
              button 
              key={index} 
              sx={{ 
                pl: 2,
                justifyContent: !isOpen && !isMobile ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ minWidth: isOpen ? 40 : 0, color: '#9FADBC' }}>
                {item.icon}
              </ListItemIcon>
              {isOpen && (
                <ListItemText 
                  primary={item.text}
                  sx={{ '& .MuiListItemText-primary': { color: '#B6C2CF' } }}
                />
              )}
            </ListItem>
          ))}
        </List>

        {/* Only show these sections when sidebar is open */}
        {isOpen && (
          <>
            {/* Workspace Views */}
            <Box sx={{ px: 2, py: 1 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#9FADBC',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                Workspace views
              </Typography>
              <List>
                <ListItem button dense>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TableIcon sx={{ color: '#9FADBC' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Table"
                    sx={{ '& .MuiListItemText-primary': { color: '#B6C2CF' } }}
                  />
                </ListItem>
                <ListItem button dense>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CalendarIcon sx={{ color: '#9FADBC' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Calendar"
                    sx={{ '& .MuiListItemText-primary': { color: '#B6C2CF' } }}
                  />
                </ListItem>
              </List>
            </Box>

            {/* Your Boards */}
            <Box sx={{ px: 2, py: 1 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#9FADBC',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                Your boards
              </Typography>
              <List>
                <ListItem 
                  button 
                  dense
                  selected
                  sx={{
                    borderRadius: 1,
                    bgcolor: '#A567A4 !important',
                    '&:hover': { bgcolor: '#A567A4' }
                  }}
                >
                  <ListItemText 
                    primary="Usama"
                    sx={{ '& .MuiListItemText-primary': { color: '#fff' } }}
                  />
                </ListItem>
              </List>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Sidebar; 