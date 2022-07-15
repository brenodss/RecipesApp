import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const CardsRecipes = () => {
  const { recipe: { meals }, recipe } = useContext(myContext);
  const [type, setType] = useState('');
  const firstTwelve = meals?.slice(0, 12);

  return (
    <div style={ { textAlign: 'center' } }>
      {meals && firstTwelve.map((meal, i) => (
        <div
          data-testid={ `${i}-recipe-card` }
          key={ i }
        >
          <p data-testid={ `${i}-card-name` }>{meal.strMeal}</p>
          <img
            style={ { width: '150px' } }
            alt="receita"
            src={ meal.strMealThumb }
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
//
//

export default CardsRecipes;
