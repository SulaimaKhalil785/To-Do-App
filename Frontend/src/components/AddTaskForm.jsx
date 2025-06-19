import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Grid
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (task.title.trim()) {
    addTask({
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    });
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
    alert("Task Added Successfully!");
    navigate('/display'); // Redirect to display page after adding
  }

  };

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
      }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: 300 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          <AddCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Add New Task
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid >
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={task.description}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            
            <Grid >
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
  <Grid >
    <TextField
      fullWidth
      select
      label="Priority"
      name="priority"
      value={task.priority}
      onChange={handleChange}
      SelectProps={{ native: true }}
      variant="outlined"
    >
      <option value="low">low</option>
       <option value="medium">medium</option>
      <option value="high">High</option>
    </TextField>
  </Grid>
  
  <Grid >
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      sx={{ py: 1.5 }}
    >
      Add Task
    </Button>
  </Grid>
</Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddTaskForm;