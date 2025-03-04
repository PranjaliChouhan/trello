import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  IconButton,
  ClickAwayListener,
  Chip,
  Avatar,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  Checkbox,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputBase,
  Popover,
  InputAdornment,
} from '@mui/material';
import { 
  Add as AddIcon,
  Close as CloseIcon,
  MoreHoriz as MoreIcon,
  StarBorder,
  Groups2,
  Bolt,
  AutoFixHigh,
  FilterList,
  Share,
  Add,
  RemoveRedEye as EyeIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Label as LabelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  AccessTime as TimeIcon,
  VideoCall as MeetIcon,
  Event as DueIcon,
  Checklist as ChecklistIcon,
  Check as CheckIcon,
  ContentCopy as CopyIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import BoardHeader from './BoardHeader';
import BoardMenu from './BoardMenu';
import CardDetailsModal from './CardDetailsModal';
import LabelPopover from './Labels';
import { format } from 'date-fns';
import DueDatePicker from './DueDatePicker';
import Checklist from './Checklist';

const Board = () => {
  const [lists, setLists] = useState([
    {
      id: 'list-1',
      title: 'Todo',
      cards: [
        { 
          id: 'card-1', 
          content: 'Project planning',
          completion: 0,
          estimatedHours: 0,
          labels: [
            { id: 'l1', color: '#61BD4F', text: 'Priority' },
            { id: 'l2', color: '#F2D600', text: 'Design' }
          ],
          dueDate: '2024-02-20',
          dueDateComplete: false,
          checklists: []
        },
        { 
          id: 'card-2', 
          content: 'Kickoff meeting',
          completion: 0,
          estimatedHours: 0,
          labels: [],
        },
      ]
    },
    {
      id: 'list-2',
      title: 'Doing',
      cards: []
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: []
    }
  ]);

  console.log(lists[0]?.cards[0]?.checklists)

  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [addingCard, setAddingCard] = useState(null); // stores list ID
  const [newCardContent, setNewCardContent] = useState('');
  const [boardTitle, setBoardTitle] = useState('My Board');
  const [backgroundColor, setBackgroundColor] = useState('#8f3f65');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const [memberAnchorEl, setMemberAnchorEl] = useState(null);

  // Add new list
  const handleAddList = () => {
    if (newListTitle.trim()) {
      const newList = {
        id: `list-${Date.now()}`,
        title: newListTitle,
        cards: []
      };
      setLists([...lists, newList]);
      setNewListTitle('');
      setAddingList(false);
    }
  };

  // Add new card
  const handleAddCard = (listId) => {
    if (newCardContent.trim()) {
      const newCard = {
        id: `card-${Date.now()}`,
        content: newCardContent
      };
      
      setLists(lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        }
        return list;
      }));
      
      setNewCardContent('');
      setAddingCard(null);
    }
  };

  // Delete list
  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  // Delete card
  const handleDeleteCard = (e, listId, cardId) => {
    e.stopPropagation();
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle list reordering
    if (type === 'list') {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      setLists(newLists);
      return;
    }

    // Handle card reordering
    const sourceList = lists.find(list => list.id === source.droppableId);
    const destList = lists.find(list => list.id === destination.droppableId);
    const draggingCard = sourceList.cards.find(card => card.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Same list
      const newCards = Array.from(sourceList.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggingCard);

      const newList = {
        ...sourceList,
        cards: newCards
      };

      setLists(lists.map(list => 
        list.id === newList.id ? newList : list
      ));
    } else {
      // Different lists
      const sourceCards = Array.from(sourceList.cards);
      sourceCards.splice(source.index, 1);
      const newSourceList = {
        ...sourceList,
        cards: sourceCards
      };

      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, draggingCard);
      const newDestList = {
        ...destList,
        cards: destCards
      };

      setLists(lists.map(list => {
        if (list.id === newSourceList.id) return newSourceList;
        if (list.id === newDestList.id) return newDestList;
        return list;
      }));
    }
  };

  const handleCardUpdate = (listId, cardId, updatedCard) => {
    const newLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card =>
            card.id === cardId ? {
              ...updatedCard,
              checklist: updatedCard.checklist || card.checklist // Preserve checklist data
            } : card
          )
        };
      }
      return list;
    });
    
    setLists(newLists);
    // Update selectedCard to trigger re-render
    setSelectedCard(updatedCard);

    // Save to localStorage or your backend
    localStorage.setItem('lists', JSON.stringify(newLists));
  };

  const handleMemberUpdate = (member, action) => {
    if (action === 'add') {
      setLists(lists.map(list => {
        if (list.id === selectedList) {
          return {
            ...list,
            cards: list.cards.map(card => {
              if (card.id === selectedCard) {
                return {
                  ...card,
                  members: [...(card.members || []), member]
                };
              }
              return card;
            })
          };
        }
        return list;
      }));
    } else {
      setLists(lists.map(list => {
        if (list.id === selectedList) {
          return {
            ...list,
            cards: list.cards.map(card => {
              if (card.id === selectedCard) {
                return {
                  ...card,
                  members: card.members.filter(m => m.id !== member.id)
                };
              }
              return card;
            })
          };
        }
        return list;
      }));
    }
  };

  const findListIdForCard = (cardId) => {
    for (const list of lists) {
      if (list.cards.some(card => card.id === cardId)) {
        return list.id;
      }
    }
    return null;
  };

  const Card = ({ listId, card, index }) => {
    const [showActions, setShowActions] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleEditClick = (e) => {
      e.stopPropagation();
      setSelectedCard(card);
      setSelectedList(listId);
      setIsModalOpen(true);
    };


    const handleMarkComplete = (e) => {
      e.stopPropagation();
      setLists(lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(c => 
              c.id === card.id 
                ? { ...c, completion: 100, isComplete: true }
                : c
            )
          };
        }
        return list;
      }));
    };

    const handleUpdateCard = (updates) => {
      setLists(lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(c => 
              c.id === card.id ? { ...c, ...updates } : c
            )
          };
        }
        return list;
      }));
    };

    // Calculate checklist completion
    const checklistTotal = card.checklist?.items.length || 0;
    const checklistComplete = card.checklist?.items.filter(item => item.complete).length || 0;
    const checklistPercentage = checklistTotal > 0 
      ? (checklistComplete / checklistTotal) * 100 
      : 0;

    const handleJoinMeeting = (e) => {
      e.stopPropagation();
      window.open('https://meet.google.com', '_blank');
    };

    const handleCopyMeetLink = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(card.meetLink);
    };

    return (
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleEditClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              p: 1,
              mb: 1,
              bgcolor: '#22272B',
              borderRadius: 1,
              cursor: 'pointer',
              position: 'relative',
              '&:hover': {
                bgcolor: '#282E33'
              }
            }}
          >
            {isHovered && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCard(e, listId, card.id);
                }}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  padding: '4px',
                  color: '#9FADBC',
                  zIndex: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: '#FF5F5F'
                  }
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}

            {/* Labels row */}
            {card.labels && card.labels.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                {card.labels.map((label) => (
                  <Box
                    key={label.id}
                    sx={{
                      bgcolor: label.color,
                      height: '6px',
                      width: '40px',
                      borderRadius: '3px',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.2s'
                      }
                    }}
                    title={label.text || label.name}
                  />
                ))}
              </Box>
            )}

            {/* Card content */}
            <Typography sx={{ color: '#B6C2CF', fontSize: '14px' }}>
              {card.content}
            </Typography>

            {/* Card footer with icons and info */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              mt: 1
            }}>
              {/* Due date */}
              {card.dueDate && (
                <Tooltip title={card.dueDateComplete ? "Completed" : "Due soon"}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    gap: 0.5
                  }}>
                    <ClockIcon sx={{ 
                      fontSize: 16, 
                      color: card.dueDateComplete ? '#61BD4F' : '#F87462'
                    }} />
                    <Typography sx={{ 
                      fontSize: '12px',
                      color: card.dueDateComplete ? '#61BD4F' : '#F87462'
                    }}>
                      {card?.startDate && format(new Date(card?.startDate), 'MMM d') + ' - '} {format(new Date(card.dueDate), 'MMM d')}
                    </Typography>
                  </Box>
                </Tooltip>
              )}

              {/* Google Meet */}
              <Tooltip title="Create Google Meet">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://meet.google.com/new', '_blank');
                  }}
                  sx={{ 
                    padding: '2px',
                    color: '#9FADBC',
                    '&:hover': {
                      color: '#B6C2CF',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <MeetIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>

              {/* Checklist progress */}
              {card.checklists && card.checklists.length > 0 && (
                <Tooltip title={(() => {
                  const completed = card.checklists.reduce((total, checklist) => 
                    total + (checklist.items?.filter(item => item.checked).length || 0), 0);
                  const total = card.checklists.reduce((total, checklist) => 
                    total + (checklist.items?.length || 0), 0);
                  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
                  
                  return `${percentage}% (${completed}/${total} completed)`;
                })()}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <ChecklistIcon sx={{ fontSize: 16, color: '#9FADBC' }} />
                    <Typography sx={{ 
                      fontSize: '12px',
                      color: '#9FADBC'
                    }}>
                      {card.checklists.reduce((total, checklist) => 
                        total + (checklist.items?.filter(item => item.checked).length || 0), 0
                      )}/
                      {card.checklists.reduce((total, checklist) => 
                        total + (checklist.items?.length || 0), 0
                      )}
                    </Typography>
                  </Box>
                </Tooltip>
              )}

              {/* Estimated hours */}
              {card.estimatedHours > 0 && (
                <Tooltip title="Estimated hours">
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <TimeIcon sx={{ fontSize: 16, color: '#9FADBC' }} />
                    <Typography sx={{ 
                      fontSize: '12px',
                      color: '#9FADBC'
                    }}>
                      {card.estimatedHours}h
                    </Typography>
                  </Box>
                </Tooltip>
              )}

              {/* Members */}
              {card.members && card.members.length > 0 && (
                <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                  {card.members.map((member, index) => (
                    <Avatar
                      key={member.id}
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '12px',
                        bgcolor: member.color,
                        marginLeft: index > 0 ? -0.5 : 0
                      }}
                    >
                      {member.initials}
                    </Avatar>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Draggable>
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: backgroundColor,
        transition: 'background-color 0.3s ease',
        minHeight: '100vh',
        pl:'16px'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexWrap:'wrap',
        p: 1,
        gap: 1,
        alignItems: 'center',
        padding:'16px'
      }}>
        <Typography sx={{ 
          color: '#fff',
          fontSize: '18px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          Usama
          <IconButton size="small" sx={{ color: '#fff' }}>
            <StarBorder fontSize="small" />
          </IconButton>
        </Typography>

        {/* Hide Workspace visible button on mobile */}
        <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Groups2 />}
            
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              textTransform: 'none',
              
              '&:hover': {
                borderColor: '#fff',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Workspace visible
          </Button>
        </Box>

        <Button
          variant="outlined"
          size="small"
          sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.4)',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Board
        </Button>

        <Box sx={{ flex: 1 }} />

        <Button
          size="small"
          startIcon={<Bolt />}
          sx={{
            color: '#fff',
            textTransform: 'none',
            display: { xs: 'none', sm: 'inline-flex' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Power-Ups
        </Button>

        <Button
          size="small"
          startIcon={<AutoFixHigh />}
          sx={{
            color: '#fff',
            textTransform: 'none',
            display: { xs: 'none', sm: 'inline-flex' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Automation
        </Button>

        <Button
          size="small"
          startIcon={<FilterList />}
          sx={{
            color: '#fff',
            textTransform: 'none',
            display: { xs: 'none', sm: 'inline-flex' },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Filters
        </Button>

        <Box sx={{ 
          display: 'flex', 
          gap: 0.5 
        }}>
          <Chip
            label="UK"
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              height: '24px'
            }}
          />
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Share />}
          sx={{
            color: '#fff',
            xs:'none',
            sm:'block',
            display: { xs: 'none', sm: 'inline-flex' },
            borderColor: 'rgba(255,255,255,0.4)',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Share
        </Button>

        <IconButton 
          size="small" 
          sx={{ color: '#fff' }}
          onClick={() => setMenuOpen(true)}
        >
          <MoreIcon />
        </IconButton>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                p: 1,
                display: 'flex',
                flexWrap:'wrap',
                gap: 2,
                alignItems: 'flex-start',
                overflowX: 'auto'
              }}
            >
              {lists.map((list, index) => (
                <Draggable key={list.id} draggableId={list.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        width: 340,
                        backgroundColor: 'black',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 'calc(100vh - 100px)',
                      }}
                    >
                      {/* List Header */}
                      <Box sx={{ 
                        p: '10px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Typography sx={{ 
                          color: '#B6C2CF',
                          fontSize: '14px',
                          fontWeight: 500,
                          px: 1
                        }}>
                          {list.title}
                        </Typography>
                        <IconButton 
                          size="small"
                          sx={{ 
                            color: '#9FADBC',
                            padding: '6px',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          <MoreIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Cards Container */}
                      <Droppable droppableId={list.id} type="card">
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{ 
                              p: 1,
                              flex: 1,
                              overflowY: 'auto',
                              '&::-webkit-scrollbar': {
                                width: '8px'
                              },
                              '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                borderRadius: '4px'
                              }
                            }}
                          >
                            {list.cards.map((card, index) => (
                              <Card key={card.id} listId={list.id} card={card} index={index} />
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>

                      {/* Add Card Button/Form */}
                      {addingCard === list.id ? (
                        <ClickAwayListener onClickAway={() => setAddingCard(null)}>
                          <Box sx={{ p: 1 }}>
                            <TextField
                              autoFocus
                              fullWidth
                              multiline
                              value={newCardContent}
                              onChange={(e) => setNewCardContent(e.target.value)}
                              placeholder="Enter a title for this card..."
                              sx={{
                                mb: 1,
                                '& .MuiInputBase-input': {
                                  color: '#B6C2CF',
                                  backgroundColor: '#282E33',
                                  borderRadius: 1,
                                  p: 1
                                }
                              }}
                            />
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                variant="contained"
                                onClick={() => handleAddCard(list.id)}
                                sx={{
                                  bgcolor: '#579DFF',
                                  '&:hover': {
                                    bgcolor: '#85B8FF'
                                  }
                                }}
                              >
                                Add card
                              </Button>
                              <IconButton 
                                onClick={() => setAddingCard(null)}
                                sx={{ color: '#9FADBC' }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </ClickAwayListener>
                      ) : (
                        <Button
                          startIcon={<Add />}
                          onClick={() => setAddingCard(list.id)}
                          sx={{
                            color: '#9FADBC',
                            justifyContent: 'flex-start',
                            textTransform: 'none',
                            p: '8px',
                            borderRadius: '0 0 12px 12px',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              color: '#B6C2CF'
                            }
                          }}
                        >
                          Add a card
                        </Button>
                      )}
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* Add List Button/Form */}
              {addingList ? (
                <ClickAwayListener onClickAway={() => setAddingList(false)}>
                  <Box
                    sx={{
                      width: 272,
                      bgcolor: '#282E33',
                      borderRadius: 1,
                      p: 1
                    }}
                  >
                    <TextField
                      autoFocus
                      fullWidth
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      sx={{
                        mb: 1,
                        '& .MuiInputBase-input': {
                          color: '#B6C2CF'
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleAddList}
                        sx={{
                          bgcolor: '#579DFF',
                          '&:hover': {
                            bgcolor: '#85B8FF'
                          }
                        }}
                      >
                        Add list
                      </Button>
                      <IconButton 
                        onClick={() => setAddingList(false)}
                        sx={{ color: '#9FADBC' }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </ClickAwayListener>
              ) : (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setAddingList(true)}
                  sx={{
                    width: 272,
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)'
                    }
                  }}
                >
                  Add another list
                </Button>
              )}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <BoardMenu 
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBackgroundChange={setBackgroundColor}
      />

      {selectedCard && (
        <CardDetailsModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCard(null);
          }}
          card={selectedCard}
          listName={lists.find(list => list.id === selectedList)?.title}
          onCardUpdate={(updatedCard) => {
            if (selectedList) {
              handleCardUpdate(selectedList, selectedCard.id, updatedCard);
            }
          }}
          onDeleteCard={(e) => handleDeleteCard(e, selectedList, selectedCard.id)}
        />
      )}

      {/* Add this component for the member list popup */}
      <MemberListPopover
        anchorEl={memberAnchorEl}
        open={Boolean(memberAnchorEl)}
        onClose={() => setMemberAnchorEl(null)}
        onAddMember={handleMemberUpdate}
        currentMembers={selectedCard?.members}
      />
    </Box>
  );
};

// Add this component for the member list popup
const MemberListPopover = ({ anchorEl, open, onClose, onAddMember, currentMembers }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample board members - replace with your actual data
  const boardMembers = [
    { id: '1', name: 'Usama Kaleem', initials: 'UK', color: '#614B9E' },
    { id: '2', name: 'John Doe', initials: 'JD', color: '#4F8AD1' },
  ];

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
          mt: 1
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>Members</Typography>
        
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
          {currentMembers?.map((member) => (
            <ListItem
              key={member.id}
              sx={{
                borderRadius: 1,
                mb: 0.5
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
                onClick={() => onAddMember(member, 'remove')}
                sx={{ color: '#9FADBC' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>Board members</Typography>
        <List>
          {boardMembers
            .filter(m => !currentMembers?.some(cm => cm.id === m.id))
            .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((member) => (
              <ListItem
                key={member.id}
                onClick={() => onAddMember(member, 'add')}
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
      </Box>
    </Popover>
  );
};

export default Board; 