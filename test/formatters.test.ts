import { assert } from 'poku';
import { formatUserName } from '../src/utils/formatters';

/**
 * TESTE UNITÁRIO: Formatadores
 * Objetivo: Garantir que as funções de utilidade (formatters) funcionam isoladamente.
 */

console.log('Iniciando testes dos formatadores...');

/**
 * Teste da função formatUserName:
 * Verifica se a função limpa espaços extras e converte o texto para CAIXA ALTA.
 */
assert.equal(
    formatUserName('  akilis  '),
    'AKILIS',
    'Deve remover os espaços em branco e converter para maiúsculas'
);

console.log('Todos os testes de formatadores passaram!');
