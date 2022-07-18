import React, { useContext /* useState */ } from 'react';
import { useHistory } from 'react-router-dom';
import myContext from '../context/myContext';

const CardsRecipes = () => {
  const history = useHistory();
  const { recipe } = useContext(myContext);

  const rota = history.location.pathname === '/foods'
    ? 'meals' : 'drinks';

  const Doze = 12;
  const firstTwelve = recipe[rota]?.slice(0, Doze);

  return (
    <div style={ { textAlign: 'center' } }>
      {firstTwelve && firstTwelve.map((meal, i) => (
        <div
          data-testid={ `${i}-recipe-card` }
          key={ i }
        >
          <p data-testid={ `${i}-card-name` }>
            {rota === 'meals' ? meal.strMeal : meal.strDrink}
          </p>
          <img
            style={ { width: '150px' } }
            alt="receita"
            src={ rota === 'meals' ? meal.strMealThumb : meal.strDrinkThumb }
            data-testid={ `${i}-card-img` }
          />
        </div>
      ))}
    </div>
  );
};

// idMeal
// strMealThumb -> foods
// strMeal

// idDrink
// strDrinkThumb -> drinks
// strDrink

export default CardsRecipes;
