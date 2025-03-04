import React, { useState, useRef } from 'react';
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  Description as FileIcon,
} from '@mui/icons-material';

const AttachmentPopover = ({ open, onClose, onAttach }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [linkUrl, setLinkUrl] = useState('');
  const [displayText, setDisplayText] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload
      onAttach({
        type: 'file',
        file: file,
        name: file.name,
        displayText: displayText || file.name
      });
      onClose();
    }
  };

  const handleLinkAttach = () => {
    if (linkUrl) {
      onAttach({
        type: 'link',
        url: linkUrl,
        displayText: displayText || linkUrl
      });
      onClose();
    }
  };

  // Recently viewed items (mock data)
  const recentItems = [
    {
      id: 1,
      title: 'Kickoff meeting',
      author: 'Usama',
      date: 'Viewed February 21, 2025'
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#282E33',
          color: '#B6C2CF',
          borderRadius: 1,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Typography variant="h6">Attach</Typography>
        <IconButton onClick={onClose} sx={{ color: '#9FADBC' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* File upload section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Attach a file from your computer
          </Typography>
          <Typography variant="body2" sx={{ color: '#9FADBC', mb: 2 }}>
            You can also drag and drop files to upload them.
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            onClick={() => fileInputRef.current?.click()}
            fullWidth
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: '#B6C2CF',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            Choose a file
          </Button>
        </Box>

        {/* Link attachment section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Search or paste a link
          </Typography>
          <TextField
            fullWidth
            placeholder="Find recent links or paste a new link"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-input': {
                color: '#B6C2CF',
              },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
              },
            }}
          />
          <TextField
            fullWidth
            placeholder="Display text (optional)"
            value={displayText}
            onChange={(e) => setDisplayText(e.target.value)}
            sx={{
              '& .MuiInputBase-input': {
                color: '#B6C2CF',
              },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255,255,255,0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.1)',
                },
              },
            }}
          />
        </Box>

        {/* Tabs section */}
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: '#9FADBC',
                '&.Mui-selected': {
                  color: '#579DFF'
                }
              }
            }}
          >
            <Tab label="Trello" />
            <Tab label="Confluence" />
            <Tab label="Jira" />
          </Tabs>
        </Box>

        {/* Recently viewed section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Recently Viewed
          </Typography>
          <List>
            {recentItems.map((item) => (
              <ListItem 
                key={item.id}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#579DFF' }}>
                    <FileIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`${item.author} • ${item.date}`}
                  primaryTypographyProps={{
                    sx: { color: '#B6C2CF' }
                  }}
                  secondaryTypographyProps={{
                    sx: { color: '#9FADBC' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1
      }}>
        <Button 
          onClick={onClose}
          sx={{ color: '#9FADBC' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLinkAttach}
          disabled={!linkUrl}
          sx={{
            bgcolor: '#579DFF',
            '&:hover': {
              bgcolor: '#4C8FE2'
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(87, 157, 255, 0.5)'
            }
          }}
        >
          Insert
        </Button>
      </Box>
    </Dialog>
  );
};

export default AttachmentPopover; 