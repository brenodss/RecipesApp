import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/RecipeInProgress.css';
import CheckedInput from '../components/CheckedInput';

const RecipesInProgress = () => {
  const history = useHistory();
  const { id } = useParams();

  const [recipe, setRecipe] = useState('');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  /*   const [checked, setChecked] = useState([]); */

  // presisa salvar o checked em um arrey
  /*  const handleClick = (target) => {
    target.parentNode.className = 'completed';
    setChecked([...checked, target.name]);
  }; */

  /* useEffect(() => {
    const readcheckedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [id]: [] };
    console.log(readcheckedRecipes);
    localStorage
      .setItem('inProgressRecipes', JSON.stringify(
        { ...readcheckedRecipes,
          [id]: checked,
        },
      ));
  }, [checked]); */

  // essa função filtra apenas os ingredientes e salva em um array no estado ingrets
  const ingredientArray = (obj) => {
    const arrayInfo = Object.entries(obj);
    const ingredient = arrayInfo
      .filter((eachArray) => eachArray[0].includes('Ingredient'));
    const ingredientFiltered = ingredient
      .filter((e) => e[1] !== null && e[1] !== '');
    setIngredients(ingredientFiltered);
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
                    ingredients.map((e, index) => (
                      <li
                        data-testid={ `${index}-ingredient-step` }
                        key={ index }
                      >
                        <CheckedInput ingredients={ e[1] } />
                        {/*   <input
                          type="checkbox"
                          onClick={ ({ target }) => handleClick(target) }
                            onChange={ () => setChecked(!checked) }
                          checked={ checked[0].chave }
                          name={ e[1] }
                        />
                        {e[1]} */}
                      </li>
                    ))
                  )}
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
