import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';
import chickenMeals from '../../cypress/mocks/chickenMeals';
/* import ginDrinks from '../../cypress/mocks/ginDrinks'; */
import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';
/* import drinkCategories from '../../cypress/mocks/drinkCategories';
import { drinks } from '../../cypress/mocks/drinks'; */

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const INGR_SEARCH_RADIO = 'ingredient-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXER_SEARCH_BTN = 'exec-search-btn';

describe('Testa o SearchBar da aplicação para foods', () => {
  const ALERT_TEXT = 'Your search must have only 1 (one) character';
  beforeEach(() => {
    jest.spyOn(global, 'alert')
      .mockImplementation(() => ALERT_TEXT);
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(chickenMeals),
      }));
    const { history } = renderWithRouterDois(<App />);
    history.push('/foods');
  });
  afterEach(() => jest.clearAllMocks());

  test('1-testa se os inputs do SearcBar aparecem', () => {
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(INGR_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_SEARCH_RADIO)).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(EXER_SEARCH_BTN)).toBeInTheDocument();
  });

  test('2- Se o radio selecionado for Ingredient a busca é feita corretamente', () => {
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId(INGR_SEARCH_RADIO));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'chicken');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
  });

  test('3-testa se aparece alert se chamado com a duas letras', () => {
    expect(global.alert()).toBe(ALERT_TEXT);
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'xx');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    expect(global.alert).toBeCalled();
  });
});

describe('Testa o SearchBar da aplicação para drinks', () => {
  const ALERT_TEXT = 'Sorry, we haven\'t found any recipes for these filters.';
  beforeEach(() => {
    jest.spyOn(global, 'alert')
      .mockImplementation(() => ALERT_TEXT);
    jest.spyOn(global, 'fetch')
      .mockImplementation(fetch);
    /* .mockImplementation((endpoint) => Promise.resolve({ */
    /* json: () => {
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
            return drinkCategories;
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
            return drinks;
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chicken') {
            return chickenMeals;
          }
          if (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=blabla') {
            return {
              drinks: null,
            };
          }
          Promise.resolve(ginDrinks);
        }, */
    /*
      })); */
    const { history } = renderWithRouterDois(<App />);
    history.push('/drinks');
  });
  afterEach(() => jest.clearAllMocks());
  test('1- Se o radio selecionado for Ingredient a busca é feita corretamente',
    () => {
      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
      userEvent.click(screen.getByTestId(INGR_SEARCH_RADIO));
      userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'Light rum');
      userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    });

  test('2-testa se aparece alert se chamado com a duas letras', () => {
    expect(global.alert()).toBe(ALERT_TEXT);
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
    userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'xablau');
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
    expect(global.alert).toBeCalled();
  });

  test('3-testa o botão', () => {
    userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
  });
});

describe('Testa o SearchBar da aplicação para foods com uma receita ', () => {
  /*  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(oneMeal),
      }));
    const { history } = renderWithRouterDois(<App />);
    history.push('/foods');
  });

  test('1- testa se a pagina é redimencionada quando houver só um ingrediente',
    async () => {
      expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
      userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
      userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'Penne');
      userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));
      await waitFor(() => {
        expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      });
    }); */
  it('Testa se quando tem apenas uma comida, muda para a pag de details',
    async () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(oneMeal),
        }));
      const { history } = renderWithRouterDois(<App />);
      history.push('/foods');

      userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
      userEvent.click(screen.getByTestId(NAME_SEARCH_RADIO));
      userEvent.type(screen.queryByTestId(SEARCH_INPUT), 'penne');
      userEvent.click(screen.getByTestId(EXER_SEARCH_BTN));

      const cardFood = await screen.findByTestId('recipe-title');
      expect(cardFood).toBeInTheDocument();

      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52771');
    });
});
