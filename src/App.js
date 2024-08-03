import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get('search') || '';
// To add new task, it gets added to the list.
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
// To update the selected task
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };
//to strike through a task
  const markAsDone = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Update URL with search term
    if (searchTerm) {
      navigate(`?search=${searchTerm}`);
    } else {
      navigate('/');
    }
  }, [searchTerm, navigate]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>To-do List</h1>
      <TodoForm addTask={addTask} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => navigate(`?search=${e.target.value}`)}
      />
      <TodoList
        tasks={filteredTasks}
        updateTask={updateTask}
        markAsDone={markAsDone}
      />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
