import React, { useContext, /* useState */
  useEffect,
  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import myContext from '../context/myContext';

const Recipes = () => {
  const history = useHistory();
  const { recipe } = useContext(myContext);
  const [beforeSearch, setBeforeSearch] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [filter, setFilter] = useState('');

  const rota = history.location.pathname === '/foods' ? 'meals' : 'drinks';
  const id = history.location.pathname === '/foods' ? 'idMeal' : 'idDrink';

  const Doze = 12;
  const Cinco = 5;

  const fetchRecipe = async (urlRecipes, urlCategorys) => {
    const getRecipe = await fetch(urlRecipes);
    const data = await getRecipe.json();

    const filters = await fetch(urlCategorys);
    const getFilters = await filters.json();
    const firstFive = getFilters[rota].slice(0, Cinco);

    console.log(firstFive);
    setBeforeSearch(data);
    setCategorys(firstFive);
  };

  const handleButton = (category) => {
    setFilter(category);
  };

  useEffect(() => {
    let urlRecipes = '';
    let urlCategorys = '';
    if (rota === 'meals') {
      urlRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      urlCategorys = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    }
    if (rota === 'drinks') {
      urlRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      urlCategorys = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    }
    fetchRecipe(urlRecipes, urlCategorys);
  }, [rota]);

  const firstTwelve = recipe[rota]
    ? recipe[rota].slice(0, Doze) : beforeSearch[rota]?.slice(0, Doze);

  return (
    <div style={ { textAlign: 'center' } }>
      {categorys
         && categorys
           .map((cate) => (
             <button
               onClick={ () => handleButton(cate.strCategory) }
               data-testid={ `${cate.strCategory}-category-filter` }
               key={ cate.strCategory }
               type="button"
             >
               {cate.strCategory}
             </button>))}
      <ul style={ { listStyle: 'none' } }>
        {firstTwelve && firstTwelve.map((meal, i = 0) => (
          <li key={ i }>
            <div
              data-testid={ `${i}-recipe-card` }
            >
              <p data-testid={ `${i}-card-name` }>
                {rota === 'meals' ? meal.strMeal : meal.strDrink}
              </p>
              <Link to={ `${history.location.pathname}/${meal[id]}` }>
                <img
                  style={ { width: '150px' } }
                  alt="receita"
                  src={ rota === 'meals' ? meal.strMealThumb : meal.strDrinkThumb }
                  data-testid={ `${i}-card-img` }
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// idMeal
// strMealThumb -> foods
// strMeal

// idDrink
// strDrinkThumb -> drinks
// strDrink

export default Recipes;
