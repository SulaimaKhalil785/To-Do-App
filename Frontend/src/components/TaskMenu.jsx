import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  Divider,
  Box,
  IconButton  // Added this import
} from '@mui/material';
import {
  AddTask,
  ListAlt,
  DoneAll,
  ChevronRight,
  ArrowBack  // Added this icon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TaskMenu = ({ setFilter }) => {
  const navigate = useNavigate();

  const handleFilterClick = (filterType) => {
    setFilter(filterType);
    navigate('/display');
  };

  const menuItems = [
    {
      text: 'Add New Task',
      icon: <AddTask />,
      color: 'primary',
      action: () => navigate('/add')
    },
    {
      text: 'View All Tasks',
      icon: <ListAlt />,
      color: 'secondary',
      action: () => handleFilterClick('all')
    },
    {
      text: 'Completed Tasks',
      icon: <DoneAll />,
      color: 'success',
      action: () => handleFilterClick('completed')
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f7ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Paper
        sx={{ 
          width: 300, 
          p: 2,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
          position: 'relative'  // Added for positioning the back button
        }}
      >
        {/* Back Arrow Button */}
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            pl: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'  // Center the title
          }}
        >
          Task Management
        </Typography>
        
        <Divider sx={{ mb: 1 }} />
        
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text}
              onClick={item.action}
              sx={{
                borderRadius: 1,
                mb: item.text !== 'Completed Tasks' ? 0.5 : 0,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: `${item.color}.light`,
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: `${item.color}.contrastText`
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {React.cloneElement(item.icon, { 
                  sx: { color: `${item.color}.main` } 
                })}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  variant: 'body1'
                }} 
              />
              <ChevronRight sx={{ color: 'text.secondary' }} />
            </ListItem>
          ))}
        </List>
        
        <Box 
          sx={{ 
            mt: 2, 
            pt: 1, 
            borderTop: '1px dashed', 
            borderColor: 'divider',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontStyle: 'italic'
            }}
          >
            Organize your productivity
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskMenu;