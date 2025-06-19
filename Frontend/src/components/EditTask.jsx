import React, { useState, useEffect } from 'react';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  MenuItem,
  IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Close } from '@mui/icons-material';

const EditTask = ({ tasks, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = Number(id);
  const taskToEdit = tasks.find(task => task.id === taskId);
  
  const [editedTask, setEditedTask] = useState(taskToEdit || {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  });

  useEffect(() => {
    if (!taskToEdit) {
      navigate('/display'); // Redirect if task not found
    }
  }, [taskToEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(taskId, editedTask);
    navigate('/display');
  };

  if (!taskToEdit) return null;

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Edit Task
          </Typography>
          <IconButton onClick={() => navigate('/display')}>
            <Close />
          </IconButton>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid >
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid >
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid >
              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Check />}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTask;