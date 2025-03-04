import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Stack
} from '@mui/material';
import {
  Star,
  StarBorder,
  MoreHoriz,
  People,
  Palette
} from '@mui/icons-material';

const BoardHeader = ({ title, onUpdateTitle, onUpdateBackground }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [starred, setStarred] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleTitleUpdate = () => {
    if (newTitle.trim() && newTitle !== title) {
      onUpdateTitle(newTitle);
    }
    setIsEditing(false);
  };

  const backgroundColors = [
    '#8B4C70', // Current purple
    '#0079bf', // Blue
    '#d29034', // Orange
    '#519839', // Green
    '#b04632', // Red
    '#89609e' // Alternative purple
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        color: '#B6C2CF'
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {isEditing ? (
          <TextField
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleUpdate()}
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                color: '#B6C2CF',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }
            }}
          />
        ) : (
          <Typography
            variant="h6"
            onClick={() => setIsEditing(true)}
            sx={{
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            {title}
          </Typography>
        )}
        <IconButton
          onClick={() => setStarred(!starred)}
          sx={{ color: starred ? '#f2d600' : '#B6C2CF' }}
        >
          {starred ? <Star /> : <StarBorder />}
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<People />}
          variant="contained"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
          }}
        >
          Share
        </Button>
        <IconButton
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ color: '#B6C2CF' }}
        >
          <MoreHoriz />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            backgroundColor: '#282E33',
            color: '#B6C2CF'
          }
        }}
      >
        <MenuItem>
          <Typography variant="subtitle2">Change Background</Typography>
        </MenuItem>
        <Box sx={{ p: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {backgroundColors.map((color) => (
            <Box
              key={color}
              onClick={() => {
                onUpdateBackground(color);
                setMenuAnchor(null);
              }}
              sx={{
                width: 40,
                height: 32,
                backgroundColor: color,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
            />
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default BoardHeader; 