import React from 'react';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Search from '../components/SearchBar';

const Drinks = () => (
  <div>
    <Header title="Drinks" />
    <Search />
    <Recipes />
    <Footer />
  </div>
);

export default Drinks;
