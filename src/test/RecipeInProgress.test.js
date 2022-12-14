import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import ginDrinks from '../../cypress/mocks/ginDrinks';

describe('Testa o RecipeInProgress no path name /foods da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));
    const { history } = renderWithRouterDois(<App />);
    history.push('/foods/52771/in-progress');
  });
  afterEach(() => jest.clearAllMocks());

  test('1-verifica os elementos de uma receita de comidas', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    });
  });
});

describe('Testa o RecipeInProgress no path name /drinks da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(ginDrinks),
      }));
    const { history } = renderWithRouterDois(<App />);
    history.push('/drinks/11410/in-progress');
  });
  afterEach(() => jest.clearAllMocks());

  test('1-verifica os elementos de uma receita de comidas', async () => {
    await waitFor(() => {
      expect(screen.getByText('Gin Fizz')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    });
  });
});
