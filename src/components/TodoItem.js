import React, { useState } from 'react';

function TodoItem({ task, updateTask, markAsDone }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
// different states are defined to handle changes done to list of tasks
  const handleEdit = () => {
    if (isEditing) {
      updateTask({ ...task, title: editTitle, description: editDescription, timestamp: new Date().toLocaleString() });
    }
    setIsEditing(!isEditing);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`todo-item ${task.done ? 'done' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.done} 
        onChange={() => markAsDone(task.id)} 
      />
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
          />
          <textarea 
            value={editDescription} 
            onChange={(e) => setEditDescription(e.target.value)} 
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
        
          <div onClick={toggleExpand}>
            <span> Title: {task.title} </span>
            {isExpanded && (
              <>
                <p className="task-details">Description: {task.description}</p>
                <p className="task-timestamp">Last updated: {task.timestamp}</p>
              </>
            )}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
