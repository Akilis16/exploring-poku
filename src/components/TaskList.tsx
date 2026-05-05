import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { PlusCircle } from 'lucide-react';
import { formatUserName } from '../utils/formatters';

interface Task {
  id: string;
  title: string;
}

/**
 * COMPONENTE: TaskList
 * Responsável por gerenciar a lista de tarefas, permitindo a adição e remoção de itens.
 */
export function TaskList() {
  // Estado para armazenar a lista de tarefas (Array de objetos Task)
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado para controlar o que o usuário digita no campo de entrada (Input)
  const [inputValue, setInputValue] = useState('');

  /**
   * FUNÇÃO: handleAddTask
   * Chamada ao submeter o formulário. Cria uma nova tarefa.
   */
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      // Gera um identificador único universal (UUID) para cada tarefa
      id: crypto.randomUUID(),
      // AQUI ESTÁ O PONTO CHAVE: Aplicamos o formatador externo.
      // É por isso que no teste buscamos por 'NEW TASK' e não pelo valor bruto.
      title: formatUserName(inputValue),
    };
    
    // Atualiza a lista adicionando o novo item ao final do array
    setTasks([...tasks, newTask]);
    // Limpa o campo de entrada após a adição
    setInputValue('');
  };

  /**
   * FUNÇÃO: handleRemoveTask
   * Recebe o ID da tarefa e filtra a lista para removê-la.
   */
  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-list-container">
      <header className="task-list-header">
        <h2>My Items</h2>
        <p>Manage your items and track quantities</p>
      </header>
      
      {/* Formulário de Adição */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          placeholder="What needs to be tracked?" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="task-input"
          data-testid="task-input" // Identificador para os testes
        />
        <button 
          type="submit" 
          className="add-btn" 
          disabled={!inputValue.trim()} // Desabilita o botão se o campo estiver vazio
          data-testid="add-button"
        >
          <PlusCircle size={20} />
          <span>Add</span>
        </button>
      </form>

      {/* Renderização Condicional da Lista */}
      <div className="tasks-wrapper">
        {tasks.length === 0 ? (
          // Exibido quando a lista está vazia (Estado inicial testado no TaskList.test.tsx)
          <div className="empty-state">
            <p>No items yet. Add one above!</p>
          </div>
        ) : (
          // Mapeia o array de tarefas para renderizar os componentes TaskItem
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
