import React, { /* useContext, */ useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/RecipeInProgress.css';
/* import myContext from '../context/myContext'; */

const RecipesInProgress = () => {
  // const { pathname } = useContext(myContext);
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState('');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  // const keyOfObject = pathname.includes('/foods') ? 'meals' : 'cocktails';

  // presisa salvar o checked em um arrey
  const handleClick = (ingredient, index) => {
    // const inProgress = localStorage.getItem('inProgressRecipes');

    // const changeValue = {};

    // const readcheckedRecipes = inProgress !== null && JSON
    //  .parse(localStorage.getItem('inProgressRecipes'));

    const clickedRadio = {
      ...ingredient,
      value: !ingredient.value,
    };

    ingredients.splice(index, 1, clickedRadio);

    // console.log(e, clickedRadio);

    setIngredients(
      [...ingredients],
    );

    /*     if (readcheckedRecipes) {
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(
          { ...readcheckedRecipes,
            [keyOfObject]: {
              ...readcheckedRecipes[keyOfObject],
              [id]: [...readcheckedRecipes[keyOfObject][id], e.name],
            },
          },
        ));
    }

    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        { [keyOfObject]: {
          [id]: [target.name],
        },
        },
      )); */
  };
  /*   useEffect(() => {
    const readcheckedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [id]: [] };
    console.log(ingredients);
    console.log(readcheckedRecipes[id]);
    ingredients.forEach((e, i) => {
      console.log(e[1]);
      if (e[1] === readcheckedRecipes[id][i]) {
        e[1].setAttribute('checked', true);
      }
    });
  }, []); */
  /*   useEffect(() => {
    const readcheckedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    console.log(readcheckedRecipes[id]);
    if(readcheckedRecipes[id].some((e) => e === ))
  }, []) */
  // essa função filtra apenas os ingredientes e salva em um array no estado ingrets

  const ingredientArray = (obj) => {
    const arrayInfo = Object.entries(obj);

    const ingredient = arrayInfo
      .filter((eachArray) => eachArray[0].includes('Ingredient')
      && (eachArray[1] !== null && eachArray[1] !== ''));

    const ingredientObject = ingredient.map((ingreds) => ({
      name: ingreds[1],
      value: false,
    }));

    setIngredients(ingredientObject);
  };

  const fetchRecipeId = async (url) => {
    const RecipeFromId = await fetch(url);
    const data = await RecipeFromId.json();
    const info = data[name];
    if (info && info.length > 0) {
      // com o url definido é feito o fetch, salvo o obj no estado e manda o mesmo obj para a função ingredientArray()
      setRecipe(info[0]);
      ingredientArray(info[0]);
    }
  };

  // no useEffect é definada a rota e conforme o pathname é definido o url

  useEffect(() => {
    const rota = history.location.pathname.includes('food') ? 'meals' : 'drinks';
    let url = '';
    if (rota === 'meals') {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setName('meals');
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setName('drinks');
    }
    fetchRecipeId(url);
  }, [name]);

  return (
    <>
      <h1>Recipes In Progress</h1>
      {
        (recipe === '')
          ? <p>Loading... </p>
          : (
            <div>
              <img
                style={ { width: '250px' } }
                data-testid="recipe-photo"
                src={ (name === 'meals')
                  ? recipe.strMealThumb
                  : recipe.strDrinkThumb }
                alt={ (name === 'meals')
                  ? recipe.strMeal
                  : recipe.strDrink }
              />
              <h2 data-testid="recipe-title">
                {
                  (name === 'meals')
                    ? recipe.strMeal
                    : recipe.strDrink
                }
              </h2>
              <button
                type="button"
                data-testid="share-btn"
              >
                compartilhar
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
              >
                favoritar
              </button>
              <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
              <ul>
                { (ingredients === [])
                  ? <p>Loading... </p>
                  : (
                    ingredients.map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-step` }
                        key={ index }
                      >
                        {/*  <CheckedInput ingredients={ e[1] } /> */}
                        <input
                          type="checkbox"
                          onChange={ () => handleClick(ingredient, index) }
                          checked={ ingredient.value }
                          name={ ingredient.name }
                        />
                        {ingredient.name}
                      </li>
                    ))
                  )}
              </ul>
              <p data-testid="instructions">instruction</p>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ () => history.push('/done-recipes') }
              >
                Finalizar
              </button>
            </div>
          )
      }
    </>
  );
};

export default RecipesInProgress;
