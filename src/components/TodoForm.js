import React, { useState } from 'react';

function TodoForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
// when someone click the button to submit, it is added to task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        id: Date.now(),
        title,
        description,
        done: false,
        timestamp: new Date().toLocaleString(),
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value= {title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TodoForm;
