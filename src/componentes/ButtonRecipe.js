import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

const ButtonRecipe = () => {
  const { id } = useParams();
  const { pathname } = useContext(myContext);
  const startString = 'Start Recipe';
  const [buttonVisible, setButtonVisible] = useState(true);
  const [buttonText, setButtonText] = useState(startString);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipesInProgress = JSON.parse(localStorage.getItem('recipesInProgress'));
  const keyOfObject = pathname.includes('/foods') ? 'cocktails' : 'meals';

  const isInProgress = recipesInProgress && Object.keys(recipesInProgress[keyOfObject])
    .some((recipe) => recipe === id);
  const haveDone = doneRecipes && doneRecipes.some((recipe) => recipe.id === id);

  const handleButton = () => {
    if (!isInProgress && !haveDone) {
      return localStorage.setItem('recipesInProgress', JSON.stringify({
        ...recipesInProgress,
        [keyOfObject]: {
          ...recipesInProgress[keyOfObject],
          [id]: '[lista-de-ingredientes-utilizados]',
        },
      }));
    }
  };

  useEffect(() => {
    if (haveDone) {
      return setButtonVisible(true);
    }
    if (isInProgress && !haveDone) {
      return setButtonText('Continue Recipe');
    }
    setButtonVisible(false);
  }, []);

  return (
    (!buttonVisible && buttonText === startString)
      ? (
        <button
          onClick={ handleButton }
          style={ { position: 'fixed', bottom: '0px', width: '10%', height: '7%' } }
          type="button"
        >
          Start Recipe
        </button>
      )
      : (
        <button
          onClick={ handleButton }
          style={ { position: 'fixed', bottom: '0px', width: '10%', height: '7%' } }
          type="button"
        >
          Continue Recipe
        </button>
      )
  );
};

export default ButtonRecipe;
