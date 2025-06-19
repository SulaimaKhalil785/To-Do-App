import React from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const MuiWelcome = ({ mode, toggleColorMode }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: mode === 'dark' ? '#121212' : '#f0f7ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #0f0f0f 0%, #212121 100%)' 
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        transition: 'all 0.3s ease',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          background: mode === 'dark' ? '#1e1e1e' : 'white',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          position: 'relative',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Mode toggle button */}
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: mode === 'dark' ? '#fff' : '#1976d2',
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: mode === 'dark' ? '#90caf9' : '#1976d2',
            mb: 3,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            transition: 'all 0.3s ease',
          }}
        >
          To-Do App
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 3, 
            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
            transition: 'all 0.3s ease',
          }}
        >
          Organize your tasks and boost your productivity
        </Typography>
        
        <List sx={{ mb: 3 }}>
          {[
            { text: "Plan Your Day", color: "#4caf50" },
            { text: "Stay Productive", color: "#2196f3" },
            { text: "Never Miss a Task Again", color: "#ff9800" }
          ].map((item, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <Checkbox
                size="medium"
                sx={{ 
                  borderRadius: '50%', 
                  p: 1,
                  color: item.color,
                  '&.Mui-checked': {
                    color: item.color,
                  },
                }} 
                defaultChecked
              />
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  variant: 'h6',
                  sx: { 
                    fontWeight: 500,
                    color: mode === 'dark' ? '#fff' : 'inherit',
                    transition: 'all 0.3s ease',
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
        
        <Button 
          variant="contained" 
          onClick={() => navigate('/menu')}
          size="large"
          endIcon={<ArrowForwardIcon/>}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 600,
            background: mode === 'dark' 
              ? 'linear-gradient(45deg, #0d47a1 30%, #1976d2 90%)' 
              : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .2)',
            '&:hover': {
              background: mode === 'dark' 
                ? 'linear-gradient(45deg, #0b3d91 30%, #1565c0 90%)' 
                : 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Get Started
        </Button> 
      </Paper>
    </Box>
  );
};

export default MuiWelcome;