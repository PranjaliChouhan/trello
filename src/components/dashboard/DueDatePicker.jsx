import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const DueDatePicker = ({ anchorEl, onClose, onDateSelect, initialDate, completed }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(initialDate ? new Date(initialDate) : null);
  const [selectedDueDate, setSelectedDueDate] = useState(initialDate ? new Date(initialDate) : null);
  const [selectedTime, setSelectedTime] = useState(initialDate ? format(new Date(initialDate), 'HH:mm') : '12:18');
  const [reminder, setReminder] = useState('1 Day before');

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const handleDateClick = (date) => {
    if (!selectedStartDate) {
      setSelectedStartDate(date);
      setSelectedDueDate(date);
    } else {
      setSelectedDueDate(date);
    }
  };

  const handleSave = () => {
    onDateSelect({
      startDate: selectedStartDate,
      dueDate: selectedDueDate,
      time: selectedTime,
      reminder: reminder
    });
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
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          width: 300,
          bgcolor: '#282E33',
          color: '#B6C2CF',
          p: 2,
          '& .MuiCheckbox-root': {
            color: '#579DFF',
          }
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6">Dates</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#9FADBC' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Calendar Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <IconButton onClick={handlePrevMonth} sx={{ color: '#9FADBC' }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={handleNextMonth} sx={{ color: '#9FADBC' }}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ mb: 2 }}>
        {/* Weekday headers */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          mb: 1,
          textAlign: 'center'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Typography key={day} sx={{ fontSize: '12px', color: '#9FADBC' }}>
              {day}
            </Typography>
          ))}
        </Box>

        {/* Calendar days */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5
        }}>
          {daysInMonth.map((date, i) => (
            <Button
              key={i}
              onClick={() => handleDateClick(date)}
              sx={{
                minWidth: 0,
                p: 1,
                color: '#B6C2CF',
                bgcolor: isSameDay(date, selectedStartDate) || isSameDay(date, selectedDueDate) 
                  ? '#579DFF' 
                  : 'transparent',
                '&:hover': {
                  bgcolor: '#579DFF40'
                }
              }}
            >
              {format(date, 'd')}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Date Range Inputs */}
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={Boolean(selectedStartDate)}
              onChange={(e) => !e.target.checked && setSelectedStartDate(null)}
            />
          }
          label="Start date"
        />
        {selectedStartDate && (
          <input
            type="date"
            value={format(selectedStartDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedStartDate(new Date(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#22272B',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '4px',
              color: '#B6C2CF',
              marginBottom: '8px'
            }}
          />
        )}

        <FormControlLabel
          control={
            <Checkbox 
              checked={Boolean(selectedDueDate)}
              onChange={(e) => !e.target.checked && setSelectedDueDate(null)}
            />
          }
          label="Due date"
        />
        {selectedDueDate && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
              type="date"
              value={format(selectedDueDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDueDate(new Date(e.target.value))}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: '#22272B',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                color: '#B6C2CF'
              }}
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                width: '100px',
                padding: '8px',
                backgroundColor: '#22272B',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                color: '#B6C2CF'
              }}
            />
          </Box>
        )}
      </Box>

      {/* Reminder Dropdown */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontSize: '14px' }}>
          Set due date reminder
        </Typography>
        <Select
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          fullWidth
          size="small"
          sx={{
            bgcolor: '#22272B',
            color: '#B6C2CF',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <MenuItem value="1 Day before">1 Day before</MenuItem>
          <MenuItem value="2 Days before">2 Days before</MenuItem>
          <MenuItem value="3 Days before">3 Days before</MenuItem>
        </Select>
        <Typography sx={{ mt: 1, fontSize: '12px', color: '#9FADBC' }}>
          Reminders will be sent to all members and watchers of this card.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: '#579DFF',
            color: '#fff',
            '&:hover': {
              bgcolor: '#85B8FF'
            }
          }}
        >
          Save
        </Button>
        <Button
          fullWidth
          onClick={() => {
            onDateSelect({ startDate: null, dueDate: null });
            onClose();
          }}
          sx={{
            color: '#B6C2CF',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Remove
        </Button>
      </Box>
    </Popover>
  );
};

export default DueDatePicker; 