import React, { useState } from 'react';
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Close as CloseIcon,
  FileUpload as UploadIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const CoverPopover = ({ open, onClose, onSelectCover }) => {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Predefined colors matching Trello's palette
  const colors = [
    '#4BCE97', // green
    '#F5CD47', // yellow
    '#FEA362', // orange
    '#F87168', // red
    '#9F8FEF', // purple
    '#579DFF', // blue
    '#60C6D2', // turquoise
    '#94C748', // lime
    '#E774BB', // pink
    '#8590A2', // grey
  ];

  // Mock Unsplash photos
  const unsplashPhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1', thumbnail: 'path/to/thumb1' },
    { id: 2, url: 'https://images.unsplash.com/photo-2', thumbnail: 'path/to/thumb2' },
    { id: 3, url: 'https://images.unsplash.com/photo-3', thumbnail: 'path/to/thumb3' },
    { id: 4, url: 'https://images.unsplash.com/photo-4', thumbnail: 'path/to/thumb4' },
    { id: 5, url: 'https://images.unsplash.com/photo-5', thumbnail: 'path/to/thumb5' },
    { id: 6, url: 'https://images.unsplash.com/photo-6', thumbnail: 'path/to/thumb6' },
  ];

  const handleColorSelect = (color) => {
    onSelectCover({ type: 'color', value: color });
    onClose();
  };

  const handlePhotoSelect = (photo) => {
    onSelectCover({ type: 'photo', value: photo.url });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
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
        <Typography variant="h6">Cover</Typography>
        <IconButton onClick={onClose} sx={{ color: '#9FADBC' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Size options */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Size</Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                height: 80,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: 120,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
              }}
            />
          </Grid>
        </Grid>

        {/* Colors section */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Colors</Typography>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {colors.map((color) => (
            <Grid item key={color} xs={2}>
              <Box
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  bgcolor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Colorblind mode toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={colorBlindMode}
              onChange={(e) => setColorBlindMode(e.target.checked)}
              sx={{
                '& .MuiSwitch-track': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                '& .MuiSwitch-thumb': {
                  bgcolor: colorBlindMode ? '#579DFF' : '#9FADBC',
                },
              }}
            />
          }
          label="Enable colorblind friendly mode"
          sx={{ mb: 2, color: '#9FADBC' }}
        />

        {/* Attachments section */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Attachments</Typography>
        <Button
          fullWidth
          startIcon={<UploadIcon />}
          sx={{
            color: '#B6C2CF',
            bgcolor: 'rgba(255,255,255,0.1)',
            justifyContent: 'flex-start',
            mb: 2,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.15)',
            },
          }}
        >
          Upload a cover image
        </Button>
        <Typography variant="caption" sx={{ color: '#9FADBC', display: 'block', mb: 2 }}>
          Tip: Drag an image on to the card to upload it.
        </Typography>

        {/* Photos from Unsplash */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Photos from Unsplash</Typography>
        <TextField
          fullWidth
          placeholder="Search for photos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: '#9FADBC', mr: 1 }} />,
          }}
        />

        <Grid container spacing={1}>
          {unsplashPhotos.map((photo) => (
            <Grid item xs={4} key={photo.id}>
              <Box
                onClick={() => handlePhotoSelect(photo)}
                sx={{
                  width: '100%',
                  paddingTop: '75%',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  cursor: 'pointer',
                  backgroundImage: `url(${photo.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" sx={{ color: '#9FADBC', display: 'block', mt: 2 }}>
          By using images from Unsplash, you agree to their{' '}
          <Button
            sx={{
              color: '#579DFF',
              p: 0,
              minWidth: 'auto',
              textTransform: 'none',
              verticalAlign: 'baseline',
            }}
          >
            license
          </Button>
          {' '}and{' '}
          <Button
            sx={{
              color: '#579DFF',
              p: 0,
              minWidth: 'auto',
              textTransform: 'none',
              verticalAlign: 'baseline',
            }}
          >
            Terms of Service
          </Button>
        </Typography>
      </Box>
    </Dialog>
  );
};

export default CoverPopover; 