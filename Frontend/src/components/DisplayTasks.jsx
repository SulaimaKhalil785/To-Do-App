import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Divider,
  Chip,
  Button,
  Grid,
  Checkbox,
  IconButton,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AddCircleOutline,
  Delete,
  Edit,
  CalendarToday,
  Flag,
  ArrowBack
} from '@mui/icons-material';

const DisplayTasks = ({ tasks = [], onDelete, onToggleComplete, filter = 'all', mode }) => {
  const navigate = useNavigate();

  // Priority color mapping
  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };

  // Filter tasks based on the filter prop
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <Box sx={{ 
      minHeight: '100vh',
      p: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: mode === 'dark' 
        ? 'linear-gradient(135deg, #0f0f0f 0%, #212121 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: 4,
        width: '100%',
        maxWidth: 900,
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
        background: mode === 'dark' ? '#1e1e1e' : 'white',
        position: 'relative'
      }}>
        
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: mode === 'dark' ? '#90caf9' : 'primary.main',
            display: 'flex',
            alignItems: 'center'
          }}>
            {filter === 'completed' ? 'Completed Tasks' : 
             filter === 'active' ? 'Active Tasks' : 'All Tasks'}
            <Chip 
              label={`${filteredTasks.length} ${filteredTasks.length === 1 ? 'item' : 'items'}`} 
              color="primary"
              variant="outlined"
              sx={{ 
                ml: 2,
                fontSize: '0.8rem',
                height: '28px'
              }} 
            />
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={() => navigate('/add')}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            New Task
          </Button>
        </Box>
        
        <Divider sx={{ mb: 4, borderColor: 'divider' }} />
        
        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <Typography variant="h6" color={mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'} sx={{ mb: 2 }}>
              {filter === 'completed' ? 'No completed tasks found' :
               filter === 'active' ? 'No active tasks found' : 'No tasks found'}
            </Typography>
            <Typography variant="body1" color={mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'} sx={{ mb: 3 }}>
              {filter === 'completed' ? 'Complete some tasks to see them here' :
               'Get started by adding your first task'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutline />}
              onClick={() => navigate('/add')}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2
              }}
            >
              {filter === 'completed' ? 'View All Tasks' : 'Create Task'}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredTasks.map(task => (
              <Grid item xs={12} key={task.id}>
                <Paper elevation={1} sx={{ 
                  p: 3,
                  borderRadius: 3,
                  borderLeft: `4px solid`,
                  borderColor: `${priorityColors[task.priority]}.main`,
                  transition: 'all 0.3s ease',
                  background: mode === 'dark' ? '#2d2d2d' : 'white',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    gap: 2
                  }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                      color="primary"
                      sx={{ 
                        mt: 0.5,
                        '& .MuiSvgIcon-root': { 
                          fontSize: 28 
                        } 
                      }}
                    />
                    
                    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontWeight: 600,
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed 
                            ? 'text.disabled' 
                            : (mode === 'dark' ? '#fff' : 'text.primary'),
                          mb: 1,
                          wordBreak: 'break-word'
                        }}
                      >
                        {task.title}
                      </Typography>
                      
                      {task.description && (
                        <Typography 
                          variant="body1" 
                          color={mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'}
                          sx={{ 
                            mb: 2,
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {task.description}
                        </Typography>
                      )}
                      
                      <Stack  spacing={2} direction={{sm:'row', xs:'column'}} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<CalendarToday fontSize="small" />}
                          label={task.dueDate || 'No deadline'}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            borderRadius: 1,
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'
                          }}
                        />
                        <Chip
                          icon={<Flag fontSize="small" />}
                          label={`Priority: ${task.priority}`}
                          size="small"
                          color={priorityColors[task.priority]}
                          sx={{ 
                            borderRadius: 1,
                            fontWeight: 500
                          }}
                        />
                      </Stack>
                    </Box>
                    
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => navigate(`/edit/${task.id}`)}
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'primary.dark'
                          }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(task.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.dark'
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        
        {/* Back Button */}
        <Box sx={{ 
          mt: 4,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button
            variant="contained"
            color="info"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/menu')}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            Back to Menu
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DisplayTasks;