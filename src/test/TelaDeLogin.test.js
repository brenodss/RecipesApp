import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterDois from './renderWithRouteDois';

describe('Testa a tela de login', () => {
  beforeEach(() => {
    renderWithRouterDois(<App />);
  });

  test('1 - testa os inputs da tela de login', () => {
    const submitBtn = screen.getByRole('button', { name: /entrar/i });
    const loginEmailInput = screen.getByText(/email/i);
    const loginPasswordInput = screen.getByText(/senha/i);

    expect(loginPasswordInput).toBeInTheDocument();
    expect(loginEmailInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('2-testa se o botão esta desativado se o email for invalidos', () => {
    const submitBtn = screen.getByRole('button', { name: /entrar/i });
    const loginEmailInput = screen.getByText(/email/i);
    const loginPasswordInput = screen.getByText(/senha/i);

    userEvent.type(loginEmailInput, 'emailemail');
    userEvent.type(loginPasswordInput, '1234567');
    expect(submitBtn).toBeDisabled();
  });

  test('3-testa se o botão esta desativado se a senha for invalidos', () => {
    const submitBtn = screen.getByTestId('login-submit-btn');
    const loginEmailInput = screen.getByTestId('email-input');
    const loginPasswordInput = screen.getByTestId('password-input');

    userEvent.type(loginEmailInput, 'email@email.com');
    userEvent.type(loginPasswordInput, '1234');
    expect(submitBtn).toBeDisabled();
  });

  test('4-testa se a tela muda para a rota principal de receitas ', () => {
    const submitBtn = screen.getByTestId('login-submit-btn');
    const loginEmailInput = screen.getByTestId('email-input');
    const loginPasswordInput = screen.getByTestId('password-input');

    userEvent.type(loginEmailInput, 'email@email.com');
    userEvent.type(loginPasswordInput, '1234567');
    expect(submitBtn).not.toBeDisabled();

    userEvent.click(submitBtn);
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });
});
