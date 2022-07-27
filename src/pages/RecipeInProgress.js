import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/RecipeInProgress.css';
import clipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import getFavoriteObject from '../utilities/getFavoriteObject';

const RecipesInProgress = () => {
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState('');
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [finishButton, setFinishButton] = useState(true);

  const [isCopied, setIsCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteToSave, setfavoriteToSave] = useState({});

  useEffect(() => {
    const isFavorite = localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes')).some((fav) => fav.id === id);

    setFavorite(isFavorite);
  }, [id]);

  const handleClick = () => {
    const currentyFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(currentyFavorites);
    if (!favorite) {
      console.log('favoritar');
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...currentyFavorites, favoriteToSave],
      ));
    } else {
      console.log('desfavoritar');
      const removeFav = currentyFavorites?.filter((fav) => fav.id !== id);

      console.log(removeFav);
      // currentyFavorites?.splice(removeFav, 1);

      setFavorite(false);

      localStorage.setItem('favoriteRecipes', JSON.stringify(
        removeFav,
      ));
    }
  };

  const handleClickInput = (ingredient, index) => {
    const clickedRadio = {
      ...ingredient,
      value: !ingredient.value,
    };

    ingredients.splice(index, 1, clickedRadio);

    setIngredients(
      [...ingredients],
    );
  };
  
  const showMessagem = (idPage) => {
    setIsCopied(true);
    let link = '';
    if (name === 'meals') {
      link = `http://localhost:3000/foods/${idPage}`;
    } else {
      link = `http://localhost:3000/drinks/${idPage}`;
    }
    clipboard(link);
  };

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

  const fetchRecipeId = async (url, rota) => {
    const RecipeFromId = await fetch(url);
    const data = await RecipeFromId.json();
    const info = data[name];
    if (info && info.length > 0) {
      // com o url definido é feito o fetch, salvo o obj no estado e manda o mesmo obj para a função ingredientArray()
      setRecipe(info[0]);
      ingredientArray(info[0]);
      setfavoriteToSave(getFavoriteObject(info[0], rota));
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
    fetchRecipeId(url, rota);
  }, [name]);

  useEffect(() => {
    const ableButton = ingredients.some((radio) => radio.value === false);
    setFinishButton(ableButton);
  }, [ingredients]);

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
                onClick={ () => showMessagem(id) }
              >
                <img
                  src={ shareIcon }
                  alt="share-btn"
                  data-testid="share-btn"
                />
              </button>
              { isCopied && (<p>Link copied!</p>)}
              <button
                type="button"
                onClick={ () => handleClick() }
              >
                <img
                  data-testid="favorite-btn"
                  alt="favorite-btn"
                  src={ favorite ? blackHeart : whiteHeart }
                />
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
                        <input
                          type="checkbox"
                          onChange={ () => handleClickInput(ingredient, index) }
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
                disabled={ finishButton }
                type="button"
                data-testid="finish-recipe-btn"
                onClick={ () => history.push('/done-recipes') }
                disabled={ finishButton }
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
