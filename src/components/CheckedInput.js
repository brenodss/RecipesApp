import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CheckedInput = ({ ingredients }) => {
  const { id } = useParams();
  console.log(id);
  const [checked, setChecked] = useState(false);

  const addchecked = (checkedIng) => {
    const readcheckedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [id]: [] };
    console.log(readcheckedRecipes);
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        { ...readcheckedRecipes,
          [id]: [...readcheckedRecipes[id], checkedIng],
        },

      ));
  };

  const handleClick = (target, ingredient) => {
    console.log(target);
    target.parentNode.className = 'completed';
    setChecked(!checked);
    addchecked(ingredient);
  };
  /*   if (readcheckedRecipes().some((ingre) => ingre === ingredients)) {
    setChecked(!checked);
  } */
  return (
    <>
      <input
        type="checkbox"
        onClick={ ({ target }) => handleClick(target, ingredients) }
        onChange={ () => setChecked(!checked) }
        checked={ checked }
      />
      {ingredients}
    </>
  );
};

export default CheckedInput;
