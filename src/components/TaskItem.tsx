import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  onRemove: (id: string) => void;
}

/**
 * COMPONENTE: TaskItem
 * Representa um item individual na lista com seu próprio contador de quantidade.
 */
export function TaskItem({ id, title, onRemove }: TaskItemProps) {
  // Estado local para gerenciar a quantidade deste item específico
  const [count, setCount] = useState(0);

  return (
    <div className="task-item">
      {/* Título do item com ID dinâmico para os testes */}
      <span className="task-title" data-testid={`task-title-${id}`}>{title}</span>
      
      <div className="task-controls">
        <div className="counter-controls">
          {/* Botão para decrementar a contagem */}
          <button 
            type="button" 
            className="counter-btn minus" 
            onClick={() => setCount(c => c - 1)}
            aria-label={`Decrease count for ${title}`}
            data-testid={`minus-${id}`}
          >
            <Minus size={16} />
          </button>
          
          {/* Exibição da contagem atual */}
          <span className="count-display" data-testid={`count-${id}`}>{count}</span>
          
          {/* Botão para incrementar a contagem */}
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

        {/* Botão para remover o item da lista (chama a função do componente pai) */}
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
