import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterDois from './renderWithRouteDois';
import App from '../App';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

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

describe('Testa o FavoriteRecipes da aplicação para foods', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouterDois(<App />);
    history.push('/favorite-recipes');
  });
  afterEach(() => jest.clearAllMocks());
  test('1-testa se os inputs do FavoriteRecipes aparecem', () => {
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
  });
  const NAME0 = '0-horizontal-name';
  const NAME1 = '1-horizontal-name';

  test('2-testa o botão all de filtro', () => {
    const AllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(AllBtn);
    expect(screen.getByTestId(NAME0)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId(NAME1)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
  });

  test('2-testa o botão food de filtro', () => {
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodBtn);
    expect(screen.getByTestId(NAME0)).toBeInTheDocument();
    expect(screen.queryByTestId(NAME1)).toBeNull();
  });
  test('2-testa o botão drink de filtro', () => {
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkBtn);
    expect(screen.getByTestId(NAME0)).toBeInTheDocument();
    expect(screen.queryByTestId(NAME1)).toBeNull();
  });
});
