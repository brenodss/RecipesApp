import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';

const ButtonRecipe = () => {
  const { id } = useParams();
  const { pathname } = useContext(myContext);
  const startString = 'Start Recipe';
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonText, setButtonText] = useState(startString);

  const keyOfObject = pathname.includes('/foods') ? 'meals' : 'cocktails';

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));

  const existProgress = recipesInProgress !== null // false se nao tem ou nao criei
  && Object.keys(recipesInProgress[keyOfObject])
    .some((recipe) => recipe === id);

  const existDone = recipesDone !== null // false se nao tem ou nao criei ainda
  && recipesDone.some((recipe) => recipe.id === id);

  const handleButton = () => {
    if (existProgress) {
      const objetoExistente = JSON.stringify({
        ...recipesInProgress,
        [keyOfObject]: {
          ...recipesInProgress[keyOfObject],
          [id]: ['lista-de-ingredientes-utilizados'],
        } });
      return localStorage.setItem('inProgressRecipes', objetoExistente);
    }

    const objetoInexistente = JSON.stringify({
      [keyOfObject]: {
        [id]: ['lista-de-ingredientes-utilizados'],
      } });
    return localStorage.setItem('inProgressRecipes', objetoInexistente);
  };

  useEffect(() => {
    if (!existProgress && !existDone) {
      setButtonText('Start Recipe');
      return setButtonVisible(true);
    }

    if ((!existDone && existProgress)) {
      setButtonText('Continue Recipe');
      return setButtonVisible(true);
    }

    if (existDone) {
      return setButtonVisible(false);
    }
  }, []);

  return (
    (buttonVisible)
      && (
        <button
          data-testid="start-recipe-btn"
          onClick={ handleButton }
          style={ { position: 'fixed', bottom: '0px', width: '10%', height: '7%' } }
          type="button"
        >
          {buttonText}
        </button>
      )
  );
};

export default ButtonRecipe;
