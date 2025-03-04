import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  TextField,
  Divider,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  CreditCard as CardIcon,
  Description as DescriptionIcon,
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatListBulleted as ListIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Help as HelpIcon,
  Label as LabelIcon,
  CheckBox as ChecklistIcon,
  AccessTime as DatesIcon,
  AttachFile as AttachmentIcon,
  LocationOn as LocationIcon,
  Image as CoverIcon,
  ViewList as CustomFieldsIcon,
  Add as AddIcon,
  Bolt as PowerUpsIcon,
  AutoFixHigh as AutomationIcon,
  ContentCopy as CopyIcon,
  FileCopy as MirrorIcon,
  SaveAlt as TemplateIcon,
  Archive as ArchiveIcon,
  ArrowForward as MoveIcon,
  PersonAdd as PersonAddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  KeyboardArrowDown as ArrowDownIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import Labels from './Labels';
import MembersPopover from './MembersPopover';
import Checklist from './Checklist';
import ChecklistDialog from './ChecklistDialog';
import DueDatePicker from './DueDatePicker';
import { format, isAfter } from 'date-fns';
import LocationPopover from './LocationPopover';
import AttachmentPopover from './AttachmentPopover';
import CoverPopover from './CoverPopover';

const CardDetailsModal = ({ open, onClose, card, listName, onCardUpdate }) => {
  // Core card data state
  const [cardData, setCardData] = useState({
    ...card,
    startDate: card?.startDate || null,
    dueDate: card?.dueDate || null,
    dueTime: card?.dueTime || null,
    dueDateComplete: card?.dueDateComplete || false,
    title: card?.content || '',
    description: card?.description || '',
    members: card?.members || [],
    labels: card?.labels || [],
    checklists: card?.checklists || [],
    comments: card?.comments || [],
    watching: card?.watching || false,
  });

  // UI states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);
  const [memberAnchorEl, setMemberAnchorEl] = useState(null);
  const [dateAnchorEl, setDateAnchorEl] = useState(null);

  // Initialize title state with card title
  const [title, setTitle] = useState(card?.content || 'Project Planning');

  // Update title when card prop changes
  useEffect(() => {
    if (card?.content) {
      setTitle(card.content);
    }
  }, [card]);

  // Add state for checklist dialog
  const [checklistDialogOpen, setChecklistDialogOpen] = useState(false);

  // Add local state to manage card data
  const [localCard, setLocalCard] = useState(card);

  // Update local state when card prop changes
  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  // Add this console.log to debug
  console.log('Current card data:', card);

  // Add this helper function to determine if date is overdue
  const isOverdue = (date) => {
    if (!date) return false;
    return isAfter(new Date(), new Date(date));
  };

  // Add this helper function to format the date range
  const formatDateRange = () => {
    if (!cardData.startDate && !cardData.dueDate) return null;

    const startDate = cardData.startDate ? format(new Date(cardData.startDate), 'MMM d') : '';
    const dueDate = cardData.dueDate ? format(new Date(cardData.dueDate), 'MMM d') : '';
    const time = cardData.dueTime ? format(new Date(`2000-01-01T${cardData.dueTime}`), 'h:mm a') : '';

    if (startDate && dueDate) {
      return `${startDate} - ${dueDate}${time ? `, ${time}` : ''}`;
    }
    return dueDate + (time ? `, ${time}` : '');
  };

  // Handler functions
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onCardUpdate({ ...cardData, title: newTitle });
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setCardData(prev => ({ ...prev, description: newDescription }));
  };

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    onCardUpdate(cardData);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: {
        name: 'Usama Kaleem',
        initials: 'UK',
        color: '#614B9E'
      },
      createdAt: new Date().toISOString()
    };

    const updatedCard = {
      ...cardData,
      comments: [...(cardData.comments || []), newComment]
    };

    setCardData(updatedCard);
    onCardUpdate(updatedCard);
    setCommentText('');
    setShowCommentActions(false);
  };

  const handleDeleteComment = (commentId) => {
    const updatedCard = {
      ...cardData,
      comments: cardData.comments.filter(comment => comment.id !== commentId)
    };
    
    setCardData(updatedCard);
    onCardUpdate(updatedCard);
  };

  const toggleWatching = () => {
    setCardData(prev => ({
      ...prev,
      watching: !prev.watching
    }));
    onCardUpdate({ ...cardData, watching: !cardData.watching });
  };

  const handleLabelsUpdate = (newLabels) => {
    setCardData(prev => ({
      ...prev,
      labels: newLabels
    }));
    onCardUpdate({ ...cardData, labels: newLabels });
  };

  const handleMemberUpdate = (newMembers) => {
    setCardData(prev => ({
      ...prev,
      members: newMembers
    }));
    onCardUpdate({ ...cardData, members: newMembers });
  };

  const handleAddChecklist = (title) => {
    
    const newChecklist = {
      id: Date.now(),
      title,
      items: []
    };

    const updatedCard = {
      ...localCard,
      checklists: [...(localCard.checklists || []), newChecklist]
    };

    // Update both local and parent state
    setLocalCard(updatedCard);
    onCardUpdate(updatedCard);
    setChecklistDialogOpen(false);
  };

  const handleChecklistUpdate = (checklistId, updatedChecklist) => {
    const updatedChecklists = cardData.checklists.map(cl =>
      cl.id === checklistId ? updatedChecklist : cl
    );
    onCardUpdate({ ...cardData, checklists: updatedChecklists });
  };

  const handleChecklistDelete = (checklistId) => {
    const updatedChecklists = cardData.checklists.filter(cl => cl.id !== checklistId);
    onCardUpdate({ ...cardData, checklists: updatedChecklists });
  };

  // Add handler for date button click
  const handleDateButtonClick = (event) => {
    setDateAnchorEl(event.currentTarget);
  };

  // Add handler for date updates
  const handleDateUpdate = (dateData) => {
    const updatedCard = {
      ...cardData,
      startDate: dateData.startDate,
      dueDate: dateData.dueDate,
      dueTime: dateData.time,
      dueDateComplete: dateData.completed,
    };
    setCardData(updatedCard);
    onCardUpdate(updatedCard);
    setDateAnchorEl(null);
  };

  // Add state for location
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  
  // Add location handler
  const handleLocationSelect = (location) => {
    const updatedCard = {
      ...cardData,
      location: location
    };
    setCardData(updatedCard);
    onCardUpdate(updatedCard);
  };

  // Add state for attachment popover
  const [attachmentPopoverOpen, setAttachmentPopoverOpen] = useState(false);

  // Add handler for attachments
  const handleAttachment = (attachment) => {
    const updatedCard = {
      ...cardData,
      attachments: [...(cardData.attachments || []), attachment]
    };
    setCardData(updatedCard);
    onCardUpdate(updatedCard);
  };

  // Add state for cover popover
  const [coverPopoverOpen, setCoverPopoverOpen] = useState(false);

  // Add handler for cover selection
  const handleCoverSelect = (cover) => {
    const updatedCard = {
      ...cardData,
      cover: cover
    };
    setCardData(updatedCard);
    onCardUpdate(updatedCard);
  };

  const sideButtons = [
    { icon: <PersonAddIcon />, text: 'Members' },
    { icon: <LabelIcon />, text: 'Labels' },
    { icon: <ChecklistIcon />, text: 'Checklist' },
    { 
      icon: <DatesIcon />, 
      text: 'Dates',
      onClick: (e) => handleSideButtonClick(e, { text: 'Dates' })
    },
    {
      icon: <AttachmentIcon />,
      text: 'Attachment',
      onClick: () => setAttachmentPopoverOpen(true)
    },
    { 
      icon: <LocationIcon />, 
      text: 'Location',
      onClick: (e) => setLocationAnchorEl(e.currentTarget)
    },
    {
      icon: <CoverIcon />,
      text: 'Cover',
      onClick: () => setCoverPopoverOpen(true)
    },
    { icon: <CustomFieldsIcon />, text: 'Custom Fields' }
  ];

  const actionButtons = [
    { icon: <MoveIcon />, text: 'Move' },
    { icon: <CopyIcon />, text: 'Copy' },
    { icon: <MirrorIcon />, text: 'Mirror' },
    { icon: <TemplateIcon />, text: 'Make template' },
    { icon: <ArchiveIcon />, text: 'Archive' }
  ];

  const handleSideButtonClick = (e, button) => {
    if (button.text === 'Members') {
      setMemberAnchorEl(e.currentTarget);
    } else if (button.text === 'Labels') {
      setLabelAnchorEl(e.currentTarget);
    } else if (button.text === 'Checklist') {
      setChecklistDialogOpen(true);
    }else if (button.text === 'Dates') {
      setDateAnchorEl(e.currentTarget);
    }else if (button.text === 'Location') {
      setLocationAnchorEl(e.currentTarget);
    }else if (button.text === 'Attachment') {
      setAttachmentPopoverOpen(true);
    }else if (button.text === 'Cover') {
      setCoverPopoverOpen(true);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      }}
    >
      <Box sx={{
        width: '768px',
        maxWidth: '90vw',
        maxHeight: 'calc(100vh - 48px)',
        bgcolor: '#282E33',
        borderRadius: '8px',
        boxShadow: 24,
        overflow: 'auto',
        p: '0px 16px 0 16px',
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '4px'
        }
      }}>
        {/* Close button - Updated styling */}

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '98%'
        }}>

        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            marginLeft: '94%',
            marginBottom: '-50px',
            color: '#9FADBC',
            padding: '16px', // Increased clickable area
            borderRadius: 0,
            borderTopRightRadius: '8px', // Match modal corner
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
              color: '#B6C2CF'
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
       
        {/* Card header with title */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          mb: 2,
          ml: 2 
        }}>
          <CardIcon sx={{ mr: 2, color: '#9FADBC', fontSize: 20 }} />
          <Box sx={{ flex: 1 }}>
            <TextField
              
              value={title}
              onChange={handleTitleChange}
              variant="standard"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '20px',
                  fontWeight: '600',
                  width: '100%',
                  color: '#B6C2CF',
                  padding: '0 0 8px 0',
                }
              }}
            />
            <Typography sx={{ 
              color: '#9FADBC', 
              fontSize: '14px',
              mt: 0.5 
            }}>
              in list {listName}
            </Typography>
          </Box>
        </Box>
       <div style={{display: 'flex', justifyContent: 'space-between' , flexWrap: 'wrap'}}>
        <div  style={{ width: '550px' , '@media (max-width: 800px)': { width: '100%' }}}>
           {/* Location section - Add this after the title section */}
        {cardData.location && (
          <Box sx={{ 
            mb: 3,
            ml: 4,
            mt: 2,
            bgcolor: '#22272B',
            borderRadius: 1,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              height: 200, 
              position: 'relative',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }
            }}>
              <img 
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${cardData.location.lat},${cardData.location.lng}&zoom=13&size=600x300&maptype=roadmap&markers=${cardData.location.lat},${cardData.location.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`}
                alt="Location map"
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: '#fff'
              }}>
                <Typography variant="subtitle1">
                  {cardData.location.name}
                </Typography>
                <Typography variant="body2">
                  {cardData.location.address}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Main sections row */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '40px',
          mb: 3,
          mt: 5,
          ml: 2
        }}>
          {/* Members section */}
          <Box>
            <Typography sx={{ 
              color: '#9FADBC', 
              fontSize: '12px',
              fontWeight: '500',
              mb: 1
            }}>
              Members
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: '4px',
              alignItems: 'center'
            }}>
              {cardData.members?.map((member) => (
                <Avatar
                  key={member.id}
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: '13px',
                    bgcolor: member.color,
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                >
                  {member.initials}
                </Avatar>
              ))}
              <IconButton
                onClick={(e) => setMemberAnchorEl(e.currentTarget)}
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <AddIcon sx={{ fontSize: 16, color: '#9FADBC' }} />
              </IconButton>
            </Box>
          </Box>

          {/* Labels section */}
          <Box>
            <Typography sx={{ 
              color: '#9FADBC', 
              fontSize: '12px',
              fontWeight: '500',
              mb: 1
            }}>
              Labels
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '4px',
              alignItems: 'center'
            }}>
              {cardData.labels.map((label) => (
                <Box
                  key={label.id}
                  sx={{
                    bgcolor: label.color,
                    color: '#fff',
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                >
                  {label.text}
                </Box>
              ))}
              <IconButton
                onClick={(e) => setLabelAnchorEl(e.currentTarget)}
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <AddIcon sx={{ fontSize: 16, color: '#9FADBC' }} />
              </IconButton>
            </Box>
          </Box>

          {/* Notifications section */}
          <Box>
            <Typography sx={{ 
              color: '#9FADBC', 
              fontSize: '12px',
              fontWeight: '500',
              mb: 1
            }}>
              Notifications
            </Typography>
            <Button
              onClick={toggleWatching}
              startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: '#9FADBC',
                textTransform: 'none',
                fontSize: '14px',
                padding: '4px 8px',
                minWidth: 'auto',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              {cardData.watching ? 'Watching' : 'Watch'}
            </Button>
          </Box>
        </Box>

         {/* Updated Dates section */}
         <Box sx={{ mb: 3, ml: 2 }}>
           <Typography 
             variant="body2" 
             sx={{ 
               color: '#9FADBC',
               fontSize: '12px',
               fontWeight: 500,
               mb: 1
             }}
           >
             Dates
           </Typography>
           <Box 
             onClick={(e) => handleDateButtonClick(e)}
             sx={{ 
               display: 'inline-flex',
               alignItems: 'center',
               bgcolor: '#22272B',
               border: '1px solid rgba(255,255,255,0.1)',
               borderRadius: '3px',
               p: '6px 12px',
               cursor: 'pointer',
               '&:hover': {
                 bgcolor: '#282E33'
               }
             }}
           >
             <TimeIcon sx={{ 
               fontSize: 16, 
               mr: 1, 
               color: '#9FADBC' 
             }} />
             
             <Typography sx={{ 
               fontSize: '14px',
               color: isOverdue(cardData.dueDate) ? '#F87462' : '#B6C2CF',
               display: 'flex',
               alignItems: 'center',
               gap: 1
             }}>
               {formatDateRange()}
               {isOverdue(cardData.dueDate) && (
                 <Box 
                   component="span"
                   sx={{ 
                     px: 1,
                     py: 0.25,
                     bgcolor: '#F87462',
                     color: '#fff',
                     borderRadius: '3px',
                     fontSize: '12px'
                   }}
                 >
                   Overdue
                 </Box>
               )}
             </Typography>

             <ArrowDownIcon sx={{ 
               fontSize: 20, 
               ml: 1,
               color: '#9FADBC'
             }} />
           </Box>
         </Box>

        {/* Main content area */}
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          ml: 2
        }}>
          {/* Left column */}
          <Box sx={{ flex: 1, mb: 3 , width: '100%' }}>
            {/* Description section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                mb: 1.5 ,
                ml: 0
              }}>
                <DescriptionIcon sx={{ 
                  color: '#9FADBC',
                  mr: 2,
                  fontSize: '16px'
                }} />
                <Typography sx={{ 
                  color: '#B6C2CF',
                  fontSize: '16px',
                  fontWeight: 500
                }}>
                  Description
                </Typography>
              </Box>

              {/* Editor toolbar */}
              <Box sx={{ 
                ml: 0,
                bgcolor: '#22272B',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  p: 1,
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Button size="small" sx={{ minWidth: 0, p: 0.5 }}>
                    <Typography sx={{ px: 1 }}>Aa</Typography>
                  </Button>
                  <IconButton size="small"><BoldIcon /></IconButton>
                  <IconButton size="small"><ItalicIcon /></IconButton>
                  <IconButton size="small"><ListIcon /></IconButton>
                  <IconButton size="small"><LinkIcon /></IconButton>
                  <IconButton size="small"><ImageIcon /></IconButton>
                  <IconButton size="small"><CodeIcon /></IconButton>
                  <Box sx={{ flex: 1 }} />
                  <IconButton size="small"><HelpIcon /></IconButton>
                </Box>

                <TextField
                  multiline
                  minRows={3}
                  value={cardData.description}
                  onChange={handleDescriptionChange}
                  onFocus={() => setIsEditingDescription(true)}
                  placeholder="Add a more detailed description..."
                  fullWidth
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#B6C2CF',
                      p: 2
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                />
              </Box>
              {isEditingDescription && (
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleDescriptionSave}
                    sx={{ bgcolor: '#579DFF', '&:hover': { bgcolor: '#4C8FE2' } }}
                  >
                    Save
                  </Button>
                  <Button 
                    onClick={() => setIsEditingDescription(false)}
                    sx={{ color: '#9FADBC' }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>

            {/* Checklists section - use localCard */}
            {localCard?.checklists?.map(checklist => (
              <Checklist
                key={checklist.id}
                checklist={checklist}
                onUpdate={(updated) => {
                  const updatedChecklists = localCard.checklists.map(cl =>
                    cl.id === checklist.id ? updated : cl
                  );
                  const updatedCard = { ...localCard, checklists: updatedChecklists };
                  setLocalCard(updatedCard);
                  onCardUpdate(updatedCard);
                }}
                onDelete={() => {
                  const updatedChecklists = localCard.checklists.filter(cl => 
                    cl.id !== checklist.id
                  );
                  const updatedCard = { ...localCard, checklists: updatedChecklists };
                  setLocalCard(updatedCard);
                  onCardUpdate(updatedCard);
                }}
              />
            ))}

            {/* Activity section */}
            <Box sx={{ mb: 3, ml: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ color: '#9FADBC', mr: 2 }} />
                <Typography sx={{ color: '#B6C2CF', fontWeight: 600, flex: 1 }}>
                  Activity
                </Typography>
                <Button sx={{ color: '#9FADBC' }}>Show details</Button>
              </Box>

              {/* Comment input */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: '#614B9E', 
                  width: 32, 
                  height: 32, 
                  fontSize: '13px' 
                }}>
                  UK
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    placeholder="Write a comment..."
                    fullWidth
                    multiline
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onFocus={() => setShowCommentActions(true)}
                    sx={{
                      bgcolor: '#22272B',
                      borderRadius: 1,
                      '& .MuiInputBase-input': {
                        color: '#B6C2CF',
                        p: 1.5
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  />
                  
                  {/* Comment actions */}
                  {showCommentActions && (
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        sx={{
                          bgcolor: '#579DFF',
                          '&:hover': { bgcolor: '#4C8FE2' },
                          '&.Mui-disabled': {
                            bgcolor: 'rgba(87, 157, 255, 0.5)'
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setShowCommentActions(false);
                          setCommentText('');
                        }}
                        sx={{ color: '#9FADBC' }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Comments list */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {cardData.comments?.map((comment) => (
                  <Box 
                    key={comment.id} 
                    sx={{ 
                      display: 'flex', 
                      gap: 2,
                      '&:hover .comment-actions': {
                        opacity: 1
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: comment.author.color, 
                        width: 32, 
                        height: 32, 
                        fontSize: '13px' 
                      }}
                    >
                      {comment.author.initials}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between' 
                      }}>
                        <Typography sx={{ 
                          color: '#B6C2CF', 
                          fontWeight: 600,
                          fontSize: '14px'
                        }}>
                          {comment.author.name}
                        </Typography>
                        <Box 
                          className="comment-actions"
                          sx={{ 
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            display: 'flex',
                            gap: 1
                          }}
                        >
                          <Button 
                            size="small"
                            sx={{ 
                              color: '#9FADBC',
                              minWidth: 'auto',
                              p: '2px 8px',
                              fontSize: '12px'
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small"
                            onClick={() => handleDeleteComment(comment.id)}
                            sx={{ 
                              color: '#9FADBC',
                              minWidth: 'auto',
                              p: '2px 8px',
                              fontSize: '12px'
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                      <Typography sx={{ 
                        color: '#B6C2CF',
                        fontSize: '14px',
                        my: 0.5
                      }}>
                        {comment.text}
                      </Typography>
                      <Typography sx={{ 
                        color: '#9FADBC', 
                        fontSize: '12px' 
                      }}>
                        {format(new Date(comment.createdAt), 'MMM d, yyyy, h:mm a')}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

         
        </Box>

        </div>
        
         {/* Right sidebar - Updated positioning */}
         <div >
         <Box 
          sx={{ 
            width: '180px',
            mt: 0,
            // display: { xs: 'none', sm: 'block' }
          }}>
            <Typography  sx={{ 
              color: '#9FADBC',
              fontSize: '12px',
              fontWeight: 500,
              mb: 1,
              mt: '-25%',
              textTransform: 'uppercase'
            }}>
              Add to card
            </Typography>

            {/* Sidebar buttons with consistent styling */}
            <Stack spacing={1}>
              {sideButtons.map((button) => (
                <Button
                  key={button.text}
                  startIcon={button.icon}
                  fullWidth
                  onClick={(e) => handleSideButtonClick(e , button)}
                  
                  sx={{
                    color: '#B6C2CF',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontSize: '14px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  {button.text}
                </Button>
              ))}
            </Stack>

            <Typography sx={{ color: '#9FADBC', mb: 1, fontSize: '12px', fontWeight: 500 }}>
              Power-Ups
            </Typography>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              sx={{
                color: '#B6C2CF',
                justifyContent: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.1)',
                mb: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Add Power-Ups
            </Button>

            <Typography sx={{ color: '#9FADBC', mb: 1, fontSize: '12px', fontWeight: 500 }}>
              Automation
            </Typography>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              sx={{
                color: '#B6C2CF',
                justifyContent: 'flex-start',
                backgroundColor: 'rgba(255,255,255,0.1)',
                mb: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Add button
            </Button>

            <Typography sx={{ color: '#9FADBC', mb: 1, fontSize: '12px', fontWeight: 500 }}>
              Actions
            </Typography>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {actionButtons.map((button) => (
                <Button
                  key={button.text}
                  startIcon={button.icon}
                  fullWidth
                  sx={{
                    color: '#B6C2CF',
                    justifyContent: 'flex-start',
                    fontSize: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  {button.text}
                </Button>
              ))}
            </Stack>

            {/* Update the Checklist button in the side menu */}
         
          </Box>
          </div>
       </div>
       
        {/* Popovers */}
        <MembersPopover
          anchorEl={memberAnchorEl}
          open={Boolean(memberAnchorEl)}
          onClose={() => setMemberAnchorEl(null)}
          selectedMembers={cardData.members}
          onMemberUpdate={handleMemberUpdate}
        />

        <Labels
          anchorEl={labelAnchorEl}
          open={Boolean(labelAnchorEl)}
          onClose={() => setLabelAnchorEl(null)}
          selectedLabels={cardData.labels}
          onLabelsUpdate={handleLabelsUpdate}
        />

        {/* Checklist Dialog */}
        <ChecklistDialog
          open={checklistDialogOpen}
          onClose={() => setChecklistDialogOpen(false)}
          onAdd={handleAddChecklist}
        />

        <DueDatePicker
          anchorEl={dateAnchorEl}
          onClose={() => setDateAnchorEl(null)}
          onDateSelect={handleDateUpdate}
          initialDate={cardData.dueDate}
          initialStartDate={cardData.startDate}
          initialTime={cardData.dueTime}
          completed={cardData.dueDateComplete}
        />

        {/* Add LocationPopover component */}
        <LocationPopover
          anchorEl={locationAnchorEl}
          onClose={() => setLocationAnchorEl(null)}
          onLocationSelect={handleLocationSelect}
        />

        <AttachmentPopover
          open={attachmentPopoverOpen}
          onClose={() => setAttachmentPopoverOpen(false)}
          onAttach={handleAttachment}
        />

        <CoverPopover
          open={coverPopoverOpen}
          onClose={() => setCoverPopoverOpen(false)}
          onSelectCover={handleCoverSelect}
        />
      </Box>
    </Modal>
  );
};

export default CardDetailsModal; 