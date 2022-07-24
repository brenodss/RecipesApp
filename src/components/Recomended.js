import React, { useContext, useEffect, useState } from 'react';
import ButtonRecipe from './ButtonRecipe';
import myContext from '../context/myContext';

const Recommend = () => {
  const { pathname } = useContext(myContext);
  const [recommends, setRecommends] = useState([]);

  const rota = pathname.includes('/drinks') ? 'meals' : 'drinks';

  const id = rota === 'meals' ? 'idMeal' : 'idDrink';
  const six = 6;

  const fetchRecommend = async () => {
    const urlRecommendDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlRecommendMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    if (pathname.includes('food')) {
      const apiRecommendDrink = await fetch(urlRecommendDrink);
      const data = await apiRecommendDrink.json();
      const firstSix = data[rota].slice(0, six);
      setRecommends(firstSix);
    } else {
      const apiRecommendMeal = await fetch(urlRecommendMeal);
      const data = await apiRecommendMeal.json();
      const firstSix = data[rota].slice(0, six);
      setRecommends(firstSix);
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '55px',
      } }
    >
      <div className="carrosel">
        {recommends && recommends.map((recipe, index) => (
          <div key={ recipe[id] }>
            <h2 data-testid={ `${index}-recomendation-title` }>
              {recipe[rota === 'meals' ? 'strMeal' : 'strDrink']}
            </h2>
            <div
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                style={ { width: '172px', margin: 0, padding: 0 } }
                className="imagesCarrosel"
                alt="Recipe"
                src={ recipe[rota === 'drinks' ? 'strDrinkThumb' : 'strMealThumb'] }
              />
            </div>
          </div>
        ))}
      </div>

      <ButtonRecipe />
    </div>

  );
};

export default Recommend;
