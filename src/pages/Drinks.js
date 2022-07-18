import React from 'react';
import CardsRecipes from '../componentes/CardRecipes';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import Search from '../componentes/SearchBar';

const Drinks = () => (
  <div>
    <Header title="Drinks" />
    <Search />
    <CardsRecipes />
    <Footer />
  </div>
);

export default Drinks;
