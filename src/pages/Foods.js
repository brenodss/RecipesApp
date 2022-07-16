import React from 'react';
import Header from '../componentes/Header';
import CardsRecipes from '../componentes/CardRecipes';
import Search from '../componentes/SearchBar';

const Foods = () => (
  <div>
    <Header title="Foods" />
    <Search />
    <CardsRecipes />
  </div>
);

export default Foods;
