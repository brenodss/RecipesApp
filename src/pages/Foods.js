import React from 'react';
import Header from '../componentes/Header';
import CardsRecipes from '../componentes/CardRecipes';
import Search from '../componentes/SearchBar';
import Footer from '../componentes/Footer';

const Foods = () => (
  <div>
    <Header title="Foods" />
    <Search />
    <CardsRecipes />
    <Footer />
  </div>
);

export default Foods;
