import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Recommend = () => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recommends, setRecommends] = useState([]);
  const [carrousel, setCarrousel] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(start + 2);

  const rota = history.location.pathname.includes('/drinks') ? 'meals' : 'drinks';

  const id = rota === 'meals' ? 'idMeal' : 'idDrink';

  const fetchRecommend = async () => {
    const urlRecommendDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlRecommendMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    if (pathname.includes('food')) {
      const apiRecommendDrink = await fetch(urlRecommendDrink);
      const data = await apiRecommendDrink.json();
      const firstSix = data[rota].slice(0, 6);
      setRecommends(firstSix);
      setCarrousel(firstSix.slice(start, end));
    } else {
      const apiRecommendMeal = await fetch(urlRecommendMeal);
      const data = await apiRecommendMeal.json();
      const firstSix = data[rota].slice(0, 6);
      setRecommends(firstSix);
      setCarrousel(firstSix.slice(start, end));
    }
  };

  useEffect(() => {
    fetchRecommend();
  }, []);

  useEffect(() => {
    if (end > 6) {
      setStart(0);
      setEnd(2);
      return;
    }
    if (start < 0) {
      setStart(4);
      setEnd(6);
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
      {carrousel?.map((recipe) => (
        <div key={ recipe[id] }>
          <div>
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
      <button
        name="next"
        style={ { position: 'fixed', bottom: '0px', width: '10%', height: '7%' } }
        type="button"
      >
        Start Recipe
      </button>
    </div>

  );
};

export default Recommend;
