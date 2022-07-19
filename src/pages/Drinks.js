import React from 'react';
import Recipes from '../componentes/Recipes';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import Search from '../componentes/SearchBar';

const Drinks = () => (
  <div>
    <Header title="Drinks" />
    <Search />
    <Recipes />
    <Footer />
  </div>
);

export default Drinks;
