import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
/* import Foods from '../pages/Foods'; */
import Header from '../componentes/Header';

describe('Testa o Header da aplicação', () => {
  beforeEach(() => {
    render(<Header />);
  });
  test('1 - "testa se o header po título "Foods', () => {
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});
