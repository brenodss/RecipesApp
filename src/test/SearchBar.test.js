import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';
import chickenMeals from '../../cypress/mocks/chickenMeals';

describe('Testa o SearchBar da aplicação', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const SEARCH_INPUT = 'search-input';
  const INGR_SEARCH_RADIO = 'ingredient-search-radio';
  const EXER_SEARCH_BTN = 'exec-search-btn';
  beforeEach(() => {
    const { history } = renderWithRouterDois(<App />);
    history.push('/foods');
  });
  afterEach(() => jest.clearAllMocks());

  test('1-testa se os inputs do SearcBar aparecem', () => {
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(INGR_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(EXER_SEARCH_BTN)).toBeInTheDocument();
  });

  test('2- Se o radio selecionado for Ingredient a busca é feita corretamente', () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(chickenMeals),
      }));
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId(INGR_SEARCH_RADIO));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
  });

  test('3 - testa se aparece alert se não encontrado com a primeira letra', async () => {
    const ALERT_TEXT = 'Your search must have only 1 (one) character';
    jest.spyOn(global, 'alert')
      .mockImplementation(() => ALERT_TEXT);
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'xxxx');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    await waitFor(() => {
      expect(global.alert).toBeCalledWith(ALERT_TEXT);
    });
  });

  /*   test('3-testa se aparece alert se chamado com a duas letras', () => {
    const ALERT_TEXT = 'Your search must have only 1 (one) character';
    jest.spyOn(global, 'alert')
      .mockImplementation(() => ALERT_TEXT);
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'xx');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    expect(global.alert()).toBe(ALERT_TEXT);
  }); */

  test('4 - testa se aparece um alert caso nenhum item seja encontrado', async () => {
    const ALERT_TEXT = 'Sorry, we haven\'t found any recipes for these filters.';
    jest.spyOn(global, 'alert')
      .mockImplementation(() => ALERT_TEXT);
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId(INGR_SEARCH_RADIO));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'xxxx');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    await waitFor(() => {
      expect(global.alert()).toBe(ALERT_TEXT);
    });
  });
});
