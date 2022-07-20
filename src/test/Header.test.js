import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../componentes/Header';
import Provider from '../context/myProvider';

describe('Testa o Header da aplicação', () => {
  let globalHistory = '';
  beforeEach(() => {
    const { history } = renderWithRouter(Header, { title: 'Foods' }, Provider);
    globalHistory = history;
  });
  test('1 - "testa se o header po título "Foods', () => {
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
  test('2- testa se a mudança de tela ocorre clicando no botão de perfil', () => {
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(globalHistory.location.pathname).toBe('/profile');
  });
  test('3-testa o input search', () => {
    const SEARCH_INPUT = 'search-input';
    const btnSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    userEvent.click(btnSearch);
    expect(screen.queryByTestId(SEARCH_INPUT)).toBeNull();
    /* expect(searchInput).not.toBeInTheDocument(); */
    userEvent.click(btnSearch);
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'aa');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('aa');
  });

  test('4-testa de a rota /favorite-recipes não possui o icone de pesquisa', () => {
    renderWithRouter(Header, { title: 'Favorite Recipes' }, Provider);
    expect(screen.queryByTestId('search-input')).toBeNull();
  });
});
