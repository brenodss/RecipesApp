import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';

const DONE_BTN = 'profile-done-btn';
const FAVE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';

describe('Testa o Profile da aplicação para foods', () => {
  test('1- testa se os botoes estão na aplicação',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      expect(screen.getByTestId(DONE_BTN)).toBeInTheDocument();
      expect(screen.getByTestId(FAVE_BTN)).toBeInTheDocument();
      expect(screen.getByTestId(LOGOUT_BTN)).toBeInTheDocument();
    });
  test('1- testa se a rota muda para a tela de done-recipes',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId('profile-done-btn'));
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  test('1- testa se a rota muda para a tela de login',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId(LOGOUT_BTN));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  test('1- testa se a rota muda para a tela de favorite-recipes',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId('profile-favorite-btn'));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
    });
});
