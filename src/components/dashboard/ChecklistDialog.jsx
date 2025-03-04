import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem
} from '@mui/material';

const ChecklistDialog = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState('Checklist');
  const [copyFrom, setCopyFrom] = useState('');

  const handleAdd = () => {
    onAdd(title);
    setTitle('Checklist');
    setCopyFrom('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#282E33',
          color: '#B6C2CF',
          width: '400px'
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontSize: '14px',
        fontWeight: 500
      }}>
        Add checklist
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography sx={{ mb: 1, fontSize: '12px', fontWeight: 500 }}>
          Title
        </Typography>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          sx={{
            mb: 2,
            '& .MuiInputBase-root': {
              color: '#B6C2CF',
              bgcolor: '#22272B'
            }
          }}
        />

        <Typography sx={{ mb: 1, fontSize: '12px', fontWeight: 500 }}>
          Copy items from...
        </Typography>
        <Select
          fullWidth
          value={copyFrom}
          onChange={(e) => setCopyFrom(e.target.value)}
          sx={{
            color: '#B6C2CF',
            bgcolor: '#22272B',
            '& .MuiSelect-icon': {
              color: '#9FADBC'
            }
          }}
        >
          <MenuItem value="">
            <em>(none)</em>
          </MenuItem>
        </Select>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button 
          onClick={onClose}
          sx={{ color: '#9FADBC' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            bgcolor: '#579DFF',
            '&:hover': {
              bgcolor: '#85B8FF'
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChecklistDialog; 