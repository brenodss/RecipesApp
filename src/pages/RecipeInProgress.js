import React, { useContext /* useEffect */ } from 'react';
import context from '../context/myContext';
import '../style/RecipeInProgress.css';

const RecipesInProgress = () => {
  const contexto = useContext(context);
  const handleClick = (target) => {
    const completed = target.parentNode;
    completed.className = 'completed';
    localStorage.setItem('inProgressRecipes',
      JSON.stringify([completed]));
  };

  return (
    <>
      {console.log(contexto)}
      <h1>Recipes In Progress</h1>
      <div>
        <img
          src=""
          alt=""
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">f</h2>
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
        <h3 data-testid="recipe-category">categoria</h3>
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
    </>
  );
};

export default RecipesInProgress;
