import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';

const DONE_BTN = 'profile-done-btn';
const FAVE_BTN = 'profile-favorite-btn';
const LOGOUT_BTN = 'profile-logout-btn';

// fonte: https://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests
const mock = (function localMock() {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: mock,
});

const email = 'ali.hon@email.com';

describe('Testa o Profile da aplicação para foods', () => {
  test('1- testa se os botoes estão na aplicação',
    () => {
      localStorage.setItem('user', JSON.stringify({ email }));
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      expect(screen.getByTestId(DONE_BTN)).toBeInTheDocument();
      expect(screen.getByTestId(FAVE_BTN)).toBeInTheDocument();
      expect(screen.getByTestId(LOGOUT_BTN)).toBeInTheDocument();
      expect(screen.queryByTestId('profile-email')).toBeInTheDocument();
    });
  test('1- testa se a rota muda para a tela de done-recipes',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId('profile-done-btn'));
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  test('1- testa se a rota muda para a tela de favorite-recipes',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId('profile-favorite-btn'));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
    });
  test('1- testa se a rota muda para a tela de login',
    () => {
      const { history } = renderWithRouterDois(<App />);
      history.push('/profile');
      userEvent.click(screen.getByTestId(LOGOUT_BTN));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  test('1-verifica os elementos de uma receita de comidas', async () => {
    const { history } = renderWithRouterDois(<App />);
    history.push('/drinks/11410/in-progress');
    waitFor(() => {
      userEvent.click(screen.getByTestId('finish-recipe-btn'));
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });
});
