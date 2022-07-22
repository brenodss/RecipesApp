import React, { useContext, useEffect, useState } from 'react';
import ButtonRecipe from './ButtonRecipe';
import myContext from '../context/myContext';

const Recommend = () => {
  const { pathname } = useContext(myContext);
  const [recommends, setRecommends] = useState([]);
  const [carrousel, setCarrousel] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(start + 2);

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
      setCarrousel(firstSix.slice(start, end));
    } else {
      const apiRecommendMeal = await fetch(urlRecommendMeal);
      const data = await apiRecommendMeal.json();
      const firstSix = data[rota].slice(0, six);
      setRecommends(firstSix);
      setCarrousel(firstSix.slice(start, end));
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  const four = 4;
  useEffect(() => {
    if (end > six) {
      setStart(0);
      setEnd(2);
      return;
    }
    if (start < 0) {
      setStart(four);
      setEnd(six);
      return;
    }
    setCarrousel(recommends.slice(start, end));
  }, [start, end]);

  const handleButton = (target) => {
    if (target.name === 'next') {
      setStart(start + 2);
      setEnd(end + 2);
    } else {
      setStart(start - 2);
      setEnd(end - 2);
    }
  };

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '55px',
      } }
    >
      <button
        name="previous"
        onClick={ ({ target }) => handleButton(target) }
        type="button"
      >
        Previous

      </button>
      {carrousel && carrousel.map((recipe, index) => (
        <div key={ recipe[id] }>
          <div data-testid={ `${index}-recomendation-card` }>
            <h2>
              {recipe[rota === 'meals' ? 'strMeal' : 'strDrink']}
            </h2>
            <img
              style={ { width: '150px' } }
              alt="Recipe"
              src={ recipe[rota === 'drinks' ? 'strDrinkThumb' : 'strMealThumb'] }
            />
          </div>
        </div>
      ))}
      <button
        onClick={ ({ target }) => handleButton(target) }
        type="button"
      >
        Next
      </button>
      <ButtonRecipe />
    </div>

  );
};

export default Recommend;
