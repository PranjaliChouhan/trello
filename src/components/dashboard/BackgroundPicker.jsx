import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const COLORS = [
  { id: 'purple', bg: '#8B4C70', name: 'Purple' },
  { id: 'blue', bg: '#0079BF', name: 'Blue' },
  { id: 'green', bg: '#519839', name: 'Green' },
  { id: 'orange', bg: '#D29034', name: 'Orange' },
  { id: 'red', bg: '#B04632', name: 'Red' },
  { id: 'pink', bg: '#CD5A91', name: 'Pink' },
  { id: 'lightGreen', bg: '#5AAC44', name: 'Light Green' },
  { id: 'lightBlue', bg: '#00AECC', name: 'Light Blue' },
  { id: 'grey', bg: '#838C91', name: 'Grey' }
];

const BackgroundPicker = ({ onBack, onColorSelect }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <IconButton 
          onClick={onBack}
          sx={{ color: '#B6C2CF', mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ 
          color: '#B6C2CF',
          fontSize: '16px',
          fontWeight: 500
        }}>
          Change background
        </Typography>
      </Box>

      <Typography sx={{ 
        color: '#9FADBC',
        fontSize: '12px',
        fontWeight: 500,
        mb: 2
      }}>
        Colors
      </Typography>

      <Grid container spacing={1}>
        {COLORS.map((color) => (
          <Grid item xs={4} key={color.id}>
            <Box
              onClick={() => onColorSelect(color.bg)}
              sx={{
                height: 96,
                backgroundColor: color.bg,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BackgroundPicker; 