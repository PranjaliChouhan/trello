import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Info as InfoIcon,
  List as ActivityIcon,
  Archive as ArchiveIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  ViewList as CustomFieldsIcon,
  AutoFixHigh as AutomationIcon,
  Bolt as PowerUpsIcon,
  Label as LabelsIcon,
  EmojiEmotions as StickersIcon,
  ContentCopy as TemplateIcon,
  Visibility as WatchIcon,
  Email as EmailIcon,
  UnfoldLess as CollapseIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Close as CloseMenuIcon
} from '@mui/icons-material';
import BackgroundPicker from './BackgroundPicker';

const BoardMenu = ({ open, onClose, onBackgroundChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const menuItems = [
    { icon: <InfoIcon />, text: 'About this board', subtext: 'Add a description to your board' },
    { icon: <ActivityIcon />, text: 'Activity' },
    { icon: <ArchiveIcon />, text: 'Archived items' },
    { icon: <SettingsIcon />, text: 'Settings' },
    { icon: <PaletteIcon />, text: 'Change background', color: '#A567A4' },
    { icon: <CustomFieldsIcon />, text: 'Custom Fields' },
    { icon: <AutomationIcon />, text: 'Automation' },
    { icon: <PowerUpsIcon />, text: 'Power-Ups' },
    { icon: <LabelsIcon />, text: 'Labels' },
    { icon: <StickersIcon />, text: 'Stickers' },
    { icon: <TemplateIcon />, text: 'Make template' },
    { icon: <WatchIcon />, text: 'Watch' },
    { icon: <EmailIcon />, text: 'Email-to-board' },
    { icon: <CollapseIcon />, text: 'Collapse all lists' },
    { icon: <CopyIcon />, text: 'Copy board' },
    { icon: <ShareIcon />, text: 'Print, export, and share' },
    { icon: <CloseMenuIcon />, text: 'Close board' }
  ];

  const handleBackgroundClick = () => {
    setShowColorPicker(true);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: open ? 0 : '-360px',
        top: 0,
        width: 360,
        height: '100vh',
        backgroundColor: '#282E33',
        transition: 'right 0.3s ease',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {!showColorPicker ? (
        <>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                flex: 1,
                color: '#B6C2CF',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Menu
            </Typography>
            <IconButton 
              onClick={onClose}
              sx={{ color: '#B6C2CF' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ flex: 1, overflowY: 'auto' }}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <ListItem
                  button
                  onClick={item.text === 'Change background' ? handleBackgroundClick : undefined}
                  sx={{
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: item.color || '#B6C2CF',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    secondary={item.subtext}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: '#B6C2CF',
                        fontSize: '14px'
                      },
                      '& .MuiListItemText-secondary': {
                        color: '#9FADBC',
                        fontSize: '12px'
                      }
                    }}
                  />
                </ListItem>
                {[4, 11, 12, 13].includes(index) && (
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      ) : (
        <BackgroundPicker
          onBack={() => setShowColorPicker(false)}
          onColorSelect={(color) => {
            onBackgroundChange(color);
            setShowColorPicker(false);
            onClose();
          }}
        />
      )}
    </Box>
  );
};

export default BoardMenu; 