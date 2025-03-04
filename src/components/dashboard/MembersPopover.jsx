import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Sample board members - Replace with your actual data source
const boardMembers = [
  { id: '1', name: 'Usama Kaleem', initials: 'UK', color: '#614B9E' },
  { id: '2', name: 'John Doe', initials: 'JD', color: '#4F8AD1' },
  { id: '3', name: 'Alice Smith', initials: 'AS', color: '#61BD4F' },
  { id: '4', name: 'Bob Wilson', initials: 'BW', color: '#EB5A46' }
];

const MembersPopover = ({ anchorEl, open, onClose, selectedMembers, onMemberUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleMember = (member) => {
    const isSelected = selectedMembers?.some(m => m.id === member.id);
    if (isSelected) {
      onMemberUpdate(selectedMembers.filter(m => m.id !== member.id));
    } else {
      onMemberUpdate([...(selectedMembers || []), member]);
    }
  };

  const filteredMembers = boardMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          width: 300,
          bgcolor: '#282E33',
          color: '#B6C2CF',
          p: 2
        }
      }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <Typography variant="subtitle2" sx={{ mb: 2 }}>Members</Typography>

      <CloseIcon onClick={onClose} cursor="pointer" sx={{ mt: -3 }}/>
      </Box>
      
      <TextField
        autoFocus
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        size="small"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'rgba(255,255,255,0.05)',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.1)',
            },
          },
          '& input': {
            color: '#B6C2CF',
            '&::placeholder': {
              color: '#9FADBC',
              opacity: 1
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9FADBC' }} />
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="subtitle2" sx={{ mb: 1 }}>Card members</Typography>
      <List>
        {selectedMembers?.map((member) => (
          <ListItem
            key={member.id}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: member.color }}>
                {member.initials}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} />
            <IconButton
              size="small"
              onClick={() => handleToggleMember(member)}
              sx={{ color: '#9FADBC' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>Board members</Typography>
      <List>
        {filteredMembers
          .filter(m => !selectedMembers?.some(sm => sm.id === m.id))
          .map((member) => (
            <ListItem
              key={member.id}
              onClick={() => handleToggleMember(member)}
              sx={{
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: member.color }}>
                  {member.initials}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={member.name} />
            </ListItem>
          ))}
      </List>
    </Popover>
  );
};

export default MembersPopover; 