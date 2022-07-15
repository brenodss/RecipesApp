import React from 'react';
import Header from '../componentes/Header';

const Drinks = (props) => {
  console.log(props);
  return (
    <>
      <div>drinksss</div>
      <Header title="Drinks" props={ props } />
    </>
  );
};

export default Drinks;
