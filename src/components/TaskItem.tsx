import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  onRemove: (id: string) => void;
}

export function TaskItem({ id, title, onRemove }: TaskItemProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="task-item">
      <span className="task-title" data-testid={`task-title-${id}`}>{title}</span>
      <div className="task-controls">
        <div className="counter-controls">
          <button 
            type="button" 
            className="counter-btn minus" 
            onClick={() => setCount(c => c - 1)}
            aria-label={`Decrease count for ${title}`}
            data-testid={`minus-${id}`}
          >
            <Minus size={16} />
          </button>
          <span className="count-display" data-testid={`count-${id}`}>{count}</span>
          <button 
            type="button" 
            className="counter-btn plus" 
            onClick={() => setCount(c => c + 1)}
            aria-label={`Increase count for ${title}`}
            data-testid={`plus-${id}`}
          >
            <Plus size={16} />
          </button>
        </div>
        <button 
          type="button" 
          className="remove-btn" 
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title}`}
          data-testid={`remove-${id}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
