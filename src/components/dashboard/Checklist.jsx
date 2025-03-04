import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Checkbox,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CheckBox as ChecklistIcon,
  MoreHoriz as MoreIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Checklist = ({ checklist, onUpdate, onDelete  }) => {
  const [newItem, setNewItem] = useState('');
  const [addingItem, setAddingItem] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const completedItems = checklist.items.filter(item => item.checked).length;
  const progress = (completedItems / checklist.items.length) * 100 || 0;

  const handleItemToggle = (itemId) => {
    const updatedItems = checklist.items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    onUpdate({ ...checklist, items: updatedItems });
  };

  const handleAddItem = () => {
    
    if (!newItem.trim()) return;
    const newItemObj = {
      id: Date.now(),
      text: newItem.trim(),
      checked: false
    };
    onUpdate({
      ...checklist,
      items: [...checklist.items, newItemObj]
    });
    setNewItem('');
    setAddingItem(false);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <ChecklistIcon sx={{ color: '#9FADBC', mr: 2, fontSize: 20 }} />
        <Typography 
          sx={{ 
            flex: 1,
            color: '#B6C2CF',
            fontSize: '16px',
            fontWeight: 500 
          }}
        >
          {checklist.title}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{ color: '#9FADBC' }}
        >
          <MoreIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        PaperProps={{
          sx: {
            bgcolor: '#282E33',
            color: '#B6C2CF',
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            onDelete(checklist.id);
            setMenuAnchor(null);
          }}
          sx={{
            color: '#EB5A46',
            '&:hover': {
              bgcolor: 'rgba(235, 90, 70, 0.1)',
            }
          }}
        >
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete checklist
        </MenuItem>
      </Menu>

      <Box sx={{ px: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography sx={{ 
            color: '#9FADBC',
            fontSize: '11px',
            mr: 1
          }}>
            {progress.toFixed(0)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              flex: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: progress === 100 ? '#4BCE97' : '#579DFF'
              },
              height: 8,
              borderRadius: 4
            }}
          />
        </Box>

        {checklist.items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mb: 1,
              '&:hover .delete-btn': {
                opacity: 1,
              }
            }}
          >
            <Checkbox
              checked={item.checked}
              onChange={() => handleItemToggle(item.id)}
              sx={{
                color: '#9FADBC',
                '&.Mui-checked': {
                  color: '#579DFF',
                }
              }}
            />
            <Typography
              sx={{
                flex: 1,
                color: '#B6C2CF',
                textDecoration: item.checked ? 'line-through' : 'none',
                opacity: item.checked ? 0.6 : 1,
                py: 1
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}

        {addingItem ? (
          <Box sx={{ ml: 4 }}>
            <TextField
              fullWidth
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add an item"
              autoFocus
              sx={{
                mb: 1,
                '& .MuiInputBase-root': {
                  color: '#B6C2CF',
                  bgcolor: '#22272B'
                }
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleAddItem}
                sx={{
                  bgcolor: '#579DFF',
                  '&:hover': {
                    bgcolor: '#85B8FF'
                  }
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => setAddingItem(false)}
                sx={{ color: '#9FADBC' }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            startIcon={<AddIcon />}
            onClick={() => setAddingItem(true)}
            sx={{
              color: '#9FADBC',
              textTransform: 'none',
              ml: 4,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Add an item
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Checklist; 