import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const defaultColors = [
  { color: '#61BD4F', name: 'Green' },
  { color: '#F2D600', name: 'Yellow' },
  { color: '#FF9F1A', name: 'Orange' },
  { color: '#EB5A46', name: 'Red' },
  { color: '#C377E0', name: 'Purple' },
  { color: '#0079BF', name: 'Blue' }
];

const Labels = ({ anchorEl, open, onClose, selectedLabels, onLabelsUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLabel, setEditingLabel] = useState(null);
  const [newLabelText, setNewLabelText] = useState('');
  const [isAddingNewLabel, setIsAddingNewLabel] = useState(false);
  const [newLabelColor, setNewLabelColor] = useState(defaultColors[0].color);

  const handleToggleLabel = (label) => {
    const isSelected = selectedLabels.some(l => l.id === label.id);
    if (isSelected) {
      onLabelsUpdate(selectedLabels.filter(l => l.id !== label.id));
    } else {
      onLabelsUpdate([...selectedLabels, label]);
    }
  };

  const handleEditLabel = (label) => {
    setEditingLabel(label);
    setNewLabelText(label.text || '');
  };

  const handleSaveLabel = () => {
    if (editingLabel) {
      onLabelsUpdate(
        selectedLabels.map(label =>
          label.id === editingLabel.id
            ? { ...label, text: newLabelText }
            : label
        )
      );
      setEditingLabel(null);
      setNewLabelText('');
    }
  };

  const handleDeleteLabel = (labelToDelete) => {
    onLabelsUpdate(selectedLabels.filter(label => label.id !== labelToDelete.id));
  };

  const handleAddNewLabel = () => {
    if (newLabelText.trim()) {
      const newLabel = {
        id: `label-${Date.now()}`,
        color: newLabelColor,
        text: newLabelText
      };
      onLabelsUpdate([...selectedLabels, newLabel]);
      setNewLabelText('');
      setIsAddingNewLabel(false);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          width: 304,
          p: 2,
          bgcolor: '#282E33'
        }
      }}
    >
      <Box sx={{ mb: 2 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ 
          color: '#B6C2CF',
          fontSize: '14px',
          fontWeight: 500,
          mb: 1
        }}>
          Labels
        </Typography>

        <CloseIcon onClick={onClose}  cursor="pointer" sx={{ mt: -3 , color: '#B6C2CF'}}/>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Search labels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiInputBase-input': {
              color: '#B6C2CF',
              bgcolor: '#22272B',
            }
          }}
        />
      </Box>

      <Stack spacing={1}>
        {/* Existing Labels */}
        {selectedLabels
          .filter(label => 
            label.text?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((label) => (
            <Box
              key={label.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                cursor: 'pointer',
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <Box
                onClick={() => handleToggleLabel(label)}
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 32,
                    bgcolor: label.color,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckIcon sx={{ color: '#fff' }} />
                </Box>
                {editingLabel?.id === label.id ? (
                  <TextField
                    size="small"
                    value={newLabelText}
                    onChange={(e) => setNewLabelText(e.target.value)}
                    autoFocus
                    sx={{
                      '& .MuiInputBase-input': {
                        color: '#B6C2CF',
                        p: '2px 4px'
                      }
                    }}
                  />
                ) : (
                  <Typography sx={{ color: '#B6C2CF' }}>
                    {label.text}
                  </Typography>
                )}
              </Box>
              {editingLabel?.id === label.id ? (
                <IconButton
                  size="small"
                  onClick={handleSaveLabel}
                  sx={{ color: '#9FADBC' }}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    size="small"
                    onClick={() => handleEditLabel(label)}
                    sx={{ color: '#9FADBC' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteLabel(label)}
                    sx={{ color: '#9FADBC' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ))}

        {/* Add New Label Section */}
        {isAddingNewLabel ? (
          <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={newLabelText}
              onChange={(e) => setNewLabelText(e.target.value)}
              placeholder="Enter label text..."
              autoFocus
              sx={{
                mb: 1,
                '& .MuiInputBase-input': {
                  color: '#B6C2CF'
                }
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              {defaultColors.map(({ color }) => (
                <Box
                  key={color}
                  onClick={() => setNewLabelColor(color)}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: color,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: newLabelColor === color ? '2px solid white' : 'none'
                  }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleAddNewLabel}
                sx={{
                  bgcolor: '#579DFF',
                  '&:hover': { bgcolor: '#85B8FF' }
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => setIsAddingNewLabel(false)}
                sx={{ color: '#9FADBC' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            startIcon={<AddIcon />}
            onClick={() => setIsAddingNewLabel(true)}
            sx={{
              color: '#B6C2CF',
              justifyContent: 'flex-start',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Create new label
          </Button>
        )}
      </Stack>
    </Popover>
  );
};

export default Labels; 