import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders RomanNumeralConverter', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
