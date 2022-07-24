import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import myContext from '../context/myContext';

const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));

const existProgress = (key, id) => recipesInProgress // false se nao tem ou nao criei
&& Object.keys(recipesInProgress[key])
  .some((recipe) => recipe === id);

const existDone = (id) => recipesDone// false se nao tem ou nao criei ainda
  && recipesDone.some((recipe) => recipe.id === id);

const ButtonRecipe = () => {
  const { id } = useParams();
  const { pathname } = useContext(myContext);
  const keyOfObject = pathname.includes('/foods') ? 'meals' : 'cocktails';
  const rota = pathname.includes('/food') ? 'foods' : 'drinks';
  const history = useHistory();

  const startString = 'Start Recipe';
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonText, setButtonText] = useState(startString);

  const handleButton = () => {
    if (existProgress(keyOfObject, id)) {
      const objetoExistente = JSON.stringify({
        ...recipesInProgress,
        [keyOfObject]: {
          ...recipesInProgress[keyOfObject],
          [id]: [],
        } });
      localStorage.setItem('inProgressRecipes', objetoExistente);
      return history.push(`/${rota}/${id}/in-progress`);
    }

    if (buttonText === startString) {
      const objetoInexistente = JSON.stringify({
        [keyOfObject]: {
          [id]: [],
        } });
      localStorage.setItem('inProgressRecipes', objetoInexistente);
      history.push(`/${rota}/${id}/in-progress`);
    }
  };

  useEffect(() => {
    if (!existProgress(keyOfObject, id) && !existDone(id)) {
      setButtonText('Start Recipe');
      return setButtonVisible(true);
    }

    if ((!existDone(id) && existProgress(keyOfObject, id))) {
      setButtonText('Continue Recipe');
      return setButtonVisible(true);
    }

    if (existDone(id)) {
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
