import React from 'react';
import TodoItem from './TodoItem';
//it shows list of all the task
function TodoList({ tasks, updateTask, markAsDone }) {
  return (
    <div >
      
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          markAsDone={markAsDone}
        />
      ))}
    </div>
  );
}

export default TodoList;
