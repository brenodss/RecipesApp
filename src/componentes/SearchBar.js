import React from 'react';
// import PropTypes from 'prop-types';
// import context from '../context/myContext';

const search = () => (
  <>
    <label htmlFor="ingredient">
      <input id="ingredient" data-testid="ingredient-search-radio" type="radio" />
    </label>
    <label htmlFor="name">
      <input id="name" data-testid="name-search-radio" type="radio" />
    </label>
    <label htmlFor="firstletter">
      <input id="firstletter" data-testid="first-letter-search-radio" type="radio" />
    </label>
    <button data-testid="exec-search-btn" type="button">Buscar</button>
  </>
);

export default search;
