import React from 'react';
import CardsRecipes from '../componentes/CardRecipes';
import Header from '../componentes/Header';
import Search from '../componentes/SearchBar';

const Drinks = () => (
  <div>
    <Header title="Drinks" />
    <Search />
    <CardsRecipes />
  </div>
);

export default Drinks;
