import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TaskMenu from './components/TaskMenu';
import MuiWelcome from './components/MuiWelcome';
import MuiHome from './Pages/MuiHome';
import AddTaskForm from './components/AddTaskForm';
import EditTask from './components/EditTask';
import DisplayTasks from './components/DisplayTasks';

function App() {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  
  // Initialize state with tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // show all
  });

  const addTask = (newTask) => {
    const taskWithId = { 
      ...newTask, 
      id: Date.now(), 
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, taskWithId]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MuiHome />} />
        <Route path="/welcome" element={<MuiWelcome />} />
        <Route 
          path="/menu" 
          element={<TaskMenu setFilter={setFilter} />} 
        />
        <Route path="/add" element={<AddTaskForm addTask={addTask} />} />
        <Route 
          path="/display" 
          element={
            <DisplayTasks 
              tasks={filteredTasks} 
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
            />
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <EditTask 
              tasks={tasks} 
              onUpdate={updateTask} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;