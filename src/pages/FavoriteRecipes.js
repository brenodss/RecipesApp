import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const [filter, setFilter] = useState('all');
  const [isCopied, setIsCopied] = useState(false);
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const showMessagem = (link) => {
    setIsCopied(true);
    clipboard(link);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        onClick={ () => setFilter('food') }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      {
        favRecipes && favRecipes
          .filter((e) => (filter === 'all' ? e : (e.type === filter)))
          .map((recipe, index) => (
            <div className="cards" key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testId={ `${index}-horizontal-image` }
                  alt={ recipe.name }
                  src={ recipe.image }
                  style={ { width: '250px' } }
                />
              </Link>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.type === 'food'
                  ? (`${recipe.nationality} - ${recipe.category}`)
                  : (recipe.alcoholicOrNot) }
              </p>

              <button
                type="button"
                onClick={ () => showMessagem(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }

              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share-btn"
                />
              </button>
              <button
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="favorite-btn"
                  src={ blackHeart }
                />
              </button>
              { isCopied && (<p>Link copied!</p>)}
            </div>
          ))
      }
    </div>
  );
};

export default FavoriteRecipes;
