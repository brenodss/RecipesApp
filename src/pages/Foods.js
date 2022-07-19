import React from 'react';
import Header from '../componentes/Header';
import Recipes from '../componentes/Recipes';
import Search from '../componentes/SearchBar';
import Footer from '../componentes/Footer';

const Foods = () => (
  <div>
    <Header title="Foods" />
    <Search />
    <Recipes />
    <Footer />
  </div>
);

export default Foods;
