import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import myContext from '../context/myContext';

// import PropTypes from 'prop-types';
// import context from '../context/myContext';

// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
// https://www.themealdb.com/api/json/v1/1/filte'r.php?i=chicken
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

const Search = () => {
  const { input, recipe, setRecipe } = useContext(myContext);
  const [radio, setRadio] = useState('');

  const history = useHistory();

  const handleRadios = ({ target }) => {
    setRadio(target.value);
  };

  const handleFetchs = async (url) => {
    if (input.length !== 1 && radio === 'FirstLetter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const getResults = await fetch(url);
    const data = await getResults.json();
    setRecipe(data);
  };

  useEffect(() => {
    const recipeLength = 1;
    const id = recipe.length > 0 && Object.keys(recipe[0]);
    if (recipe?.drinks?.length === recipeLength
      || recipe?.foods?.length === recipeLength) {
      history.push(`${history.location.pathname}/${recipe[0][id]}`); // <--
    }
  }, [recipe]);

  const handleButton = async () => {
    const pageLocation = history.location.pathname;
    let ingred = '';
    let nome = '';
    let firstLetter = '';
    if (pageLocation === '/foods') {
      ingred = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
      nome = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
      firstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    } if (pageLocation === '/drinks') {
      ingred = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
      nome = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
      firstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
    switch (radio) {
    case 'Ingredient':
      handleFetchs(ingred);
      break;
    case 'Name':
      handleFetchs(nome);
      break;
    case 'FirstLetter':
      handleFetchs(firstLetter);
      break;
    default:
      return fetch;
    }
  };

  return (
    <>
      <label htmlFor="ingredient">
        Ingredient
        <input
          value="Ingredient"
          checked={ (radio === 'Ingredient') }
          onChange={ handleRadios }
          id="ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          value="Name"
          checked={ (radio === 'Name') }
          onChange={ handleRadios }
          id="name"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>

      <label htmlFor="firstletter">
        First Letter
        <input
          value="FirstLetter"
          checked={ radio === 'FirstLetter' }
          onChange={ handleRadios }
          id="firstletter"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button
        onClick={ handleButton }
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </>
  );
};

export default Search;
