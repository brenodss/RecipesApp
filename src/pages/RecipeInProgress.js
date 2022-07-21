import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/RecipeInProgress.css';

const RecipesInProgress = () => {
  const history = useHistory();
  const { id } = useParams();

  const [recipe, setRecipe] = useState('');
  const [name, setName] = useState('');

  const handleClick = (target) => {
    const completed = target.parentNode;
    completed.className = 'completed';
    localStorage.setItem('inProgressRecipes',
      JSON.stringify([completed]));
  };

  const fetchRecipeId = async (url) => {
    const RecipeFromId = await fetch(url);
    const data = await RecipeFromId.json();
    const info = data[name];
    if (info && info.length > 0) {
      setRecipe(info[0]);
    }
  };

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
                {['AAA', 'BBB', 'd', 'j', 'k', 'hj', 'j', 'j'].map((e, index) => (
                  <li
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                  >
                    <input
                      type="checkbox"
                      onClick={ ({ target }) => handleClick(target) }
                    />
                    {e}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">instruction</p>
              <button
                type="button"
                data-testid="finish-recipe-btn"
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
