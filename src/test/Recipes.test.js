import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';

import fetch from '../../cypress/mocks/fetch';

const BEEF_BTN = 'Beef-category-filter';
const ALL_BTN = 'All-category-filter';

describe('Testa o Ricepe da aplicação para foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(fetch);
    const { history } = renderWithRouterDois(<App />);
    history.push('/foods');
  });
  afterEach(() => jest.clearAllMocks());
  test('1- testa o btn Beef',
    async () => {
      waitFor(() => {
        userEvent.click(screen.getByTestId(BEEF_BTN));
        expect(screen.getByTestId('0-card-name')).toBe('Beef and Mustard Pie');
      });
    });

  test('1- testa o btn All',
    async () => {
      waitFor(() => {
        userEvent.click(screen.getByTestId(ALL_BTN));
        expect(screen.getByTestId('0-card-name')).toBe('Corba');
      });
    });
});
