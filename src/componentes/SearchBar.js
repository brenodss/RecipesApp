import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import context from '../context/myContext';

// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

const Search = () => {
  const [radio, setRadio] = useState('');
  const [foods, setFoods] = useState({});

  const simulation = {
    nome: 'Arrabiata',
    firstLetter: 'a',
    ingredient: 'chicken_breast',
  };

  const handleRadios = ({ target }) => {
    setRadio(target.value);
  };

  const handleFetchs = async (url) => {
    const input = 'a';
    if (input.length !== 1 && radio === 'FirstLetter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const getResults = await fetch(url);
    const data = await getResults.json();
    setFoods(data);
  };

  const handleButton = async () => {
    const ingred = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
    const nome = `https://www.themealdb.com/api/json/v1/1/search.php?s=${simulation.nome}`;
    const firstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${simulation.firstLetter}`;
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
