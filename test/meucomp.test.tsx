import React from 'react';
import { cleanup, render, screen } from '@pokujs/react';
import { afterEach, assert, test } from 'poku';

afterEach(cleanup);

test('renderiza um título', () => {
  render(<h1>Olá</h1>);
  assert.strictEqual(screen.getByRole('heading').textContent, 'Olá');
});