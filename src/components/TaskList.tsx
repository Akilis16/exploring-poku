import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { PlusCircle } from 'lucide-react';
import { formatUserName } from '../utils/formatters';

interface Task {
  id: string;
  title: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: formatUserName(inputValue),
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-list-container">
      <header className="task-list-header">
        <h2>My Items</h2>
        <p>Manage your items and track quantities</p>
      </header>
      
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          placeholder="What needs to be tracked?" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="task-input"
          data-testid="task-input"
        />
        <button type="submit" className="add-btn" disabled={!inputValue.trim()} data-testid="add-button">
          <PlusCircle size={20} />
          <span>Add</span>
        </button>
      </form>

      <div className="tasks-wrapper">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No items yet. Add one above!</p>
          </div>
        ) : (
          <ul className="tasks-list" data-testid="task-list">
            {tasks.map(task => (
              <li key={task.id}>
                <TaskItem 
                  id={task.id} 
                  title={task.title} 
                  onRemove={handleRemoveTask} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
