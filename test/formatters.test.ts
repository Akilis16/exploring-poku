import { assert } from 'poku';
import { formatUserName } from '../src/utils/formatters';

console.log('Init tests for formatters');

assert.equal(
    formatUserName('  akilis  '),
    'AKILIS',
    'Deve remover os espaços em branco e converter para maiúsculas'
);

console.log('All tests for formatters passed!');