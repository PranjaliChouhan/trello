import React, { useState, useEffect } from 'react';
import {
  Popover,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationPopover = ({ anchorEl, onClose, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // You'll need to replace this with your actual Google Maps API key
  const GOOGLE_MAPS_API_KEY = 'AIzaSyApyMqZUOZ65Z6J5TCHTs-QPNE83KrKgAw';

  const defaultCenter = {
    lat: 31.4504, // Vehari coordinates
    lng: 73.1833,
  };

  // Simulated location suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      // This is a mock implementation. In a real app, you would call the Google Places API
      const mockSuggestions = [
        {
          name: 'Vehari, Pakistan',
          address: 'Vehari, Punjab, Pakistan',
          lat: 30.0445,
          lng: 72.3468
        },
        {
          name: 'VEHARI CHOWK Multan, Pakistan',
          address: 'Vehari Chowk, Multan, Pakistan',
          lat: 30.1575,
          lng: 71.5249
        },
        {
          name: 'Vehari Chowk Metrobus Station',
          address: 'Metro Bus Track, Tughlaq Town, Multan, Pakistan',
          lat: 30.1575,
          lng: 71.5249
        },
        {
          name: 'Vehari Tehsil, Pakistan',
          address: 'Vehari Tehsil, Punjab, Pakistan',
          lat: 30.0445,
          lng: 72.3468
        },
        {
          name: 'Vehari Road, Multan, Pakistan',
          address: 'Vehari Road, Multan, Pakistan',
          lat: 30.1575,
          lng: 71.5249
        }
      ].filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          width: 400,
          bgcolor: '#282E33',
          color: '#B6C2CF',
          p: 2,
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2">
          Change location
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#9FADBC' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        autoFocus
        placeholder="Search locations..."
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
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#579DFF',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9FADBC' }} />
            </InputAdornment>
          ),
        }}
      />

      <List sx={{ 
        maxHeight: 400, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
        },
      }}>
        {suggestions.map((location, index) => (
          <ListItem
            key={index}
            onClick={() => handleLocationClick(location)}
            sx={{
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemText
              primary={location.name}
              secondary={location.address}
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

      <Box sx={{ height: 300, mt: 2 }}>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={defaultCenter}
            zoom={13}
            onClick={(e) => {
              setSelectedLocation({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                name: 'Selected Location',
                address: 'Custom location'
              });
            }}
            options={{
              styles: [
                {
                  featureType: 'all',
                  elementType: 'all',
                  stylers: [{ invert_lightness: true }, { saturation: 10 }, { lightness: 30 }, { gamma: 0.5 }, { hue: '#435158' }]
                }
              ]
            }}
          >
            {selectedLocation && (
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </Box>
    </Popover>
  );
};

export default LocationPopover; 