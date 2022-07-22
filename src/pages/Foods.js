import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Search from '../components/SearchBar';
import Footer from '../components/Footer';

const Foods = () => (
  <div>
    <Header title="Foods" />
    <Search />
    <Recipes />
    <Footer />
  </div>
);

export default Foods;
