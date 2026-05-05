/** @jsxImportSource react */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@pokujs/react';
import { test, assert, afterEach } from 'poku';
import { TaskList } from '../src/components/TaskList';
import { TaskItem } from '../src/components/TaskItem';

/**
 * PASSO 1: Configuração Global
 * O 'afterEach(cleanup)' garante que a tela (DOM) seja limpa após cada teste.
 * Isso evita que elementos de um teste interfiram no próximo.
 */
afterEach(cleanup);

/**
 * PASSO 2: Teste Unitário do Componente TaskItem
 * Objetivo: Verificar se o componente filho renderiza as informações iniciais corretamente.
 */
test('TaskItem renders correctly', () => {
  // Renderizamos o componente com propriedades (props) fixas para teste
  render(<TaskItem id="item-render" title="Test Item" onRemove={() => {}} />);
  
  // Usamos o 'assert' do Poku para validar se o texto na tela é o esperado
  assert.strictEqual(screen.getByTestId('task-title-item-render').textContent, 'Test Item');
  // Verificamos se o contador inicia em zero
  assert.strictEqual(screen.getByTestId('count-item-render').textContent, '0');
});

/**
 * PASSO 3: Teste de Interatividade (Contador)
 * Objetivo: Validar se o estado interno (useState) do componente responde aos cliques.
 */
test('TaskItem counter works', () => {
  render(<TaskItem id="item-counter" title="Test Item" onRemove={() => {}} />);
  
  // Simulamos o clique no botão de incremento (+)
  fireEvent.click(screen.getByTestId('plus-item-counter'));
  // Verificamos se o valor visual foi para 1
  assert.strictEqual(screen.getByTestId('count-item-counter').textContent, '1');
  
  // Simulamos o clique no botão de decremento (-)
  fireEvent.click(screen.getByTestId('minus-item-counter'));
  // Verificamos se o valor retornou para 0
  assert.strictEqual(screen.getByTestId('count-item-counter').textContent, '0');
});

/**
 * PASSO 4: Teste de Integração (Fluxo Completo da Lista)
 * Objetivo: Testar o ciclo de vida completo: Ver lista vazia -> Adicionar Item -> Remover Item.
 */
test('TaskList can add and remove items', () => {
  // Renderizamos o componente pai que gerencia o estado da lista
  render(<TaskList />);
  
  const input = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-button');

  // 1. Validamos o estado inicial: deve exibir a mensagem de lista vazia
  assert.ok(screen.queryByText('No items yet. Add one above!'));

  // 2. Fluxo de ADICIONAR: simulamos digitação e clique no botão
  fireEvent.change(input, { target: { value: '   New Task   ' } });
  fireEvent.click(addButton);

  // Verificamos se o novo item apareceu na tela + O nome foi formatado para MAIÚSCULAS e sem espaços
  assert.ok(screen.getByTestId('task-list'));
  assert.strictEqual(screen.getByText('NEW TASK').textContent, 'NEW TASK');

  // 3. Fluxo de REMOVER: buscamos o botão de remover pelo rótulo de acessibilidade (aria-label)
  const removeButton = screen.getByLabelText(/Remove New Task/i);
  fireEvent.click(removeButton);

  // 4. Validamos o estado final: a lista deve estar vazia novamente
  assert.ok(screen.queryByText('No items yet. Add one above!'));
});
