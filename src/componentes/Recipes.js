import React, { useContext, /* useState */
  useEffect,
  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import myContext from '../context/myContext';

const Recipes = () => {
  const history = useHistory();
  const { recipe, setSelected, selected } = useContext(myContext); // <-- pesquisa por ingred, letra ou nome
  const [categorys, setCategorys] = useState([]); // <-- lista de botões
  const [beforeSearch, setBeforeSearch] = useState([]); // <-- receitas padrão
  const [filtered, setFiltered] = useState([]);

  const Doze = 12;
  const Cinco = 5;

  const rota = history.location.pathname === '/foods' ? 'meals' : 'drinks';

  const id = history.location.pathname === '/foods' ? 'idMeal' : 'idDrink';

  const afterOrBeforeSearch = () => {
    if (selected === 'beforeSearch') return beforeSearch[rota]?.slice(0, Doze);
    if (selected === 'category') return filtered[rota]?.slice(0, Doze);
    if (selected === 'search') return recipe[rota]?.slice(0, Doze);
  };

  const fetchRecipe = async (urlRecipes, urlCategorys) => {
    const getRecipe = await fetch(urlRecipes);
    const data = await getRecipe.json();

    const filters = await fetch(urlCategorys);
    const getFilters = await filters.json();
    const firstFive = getFilters[rota].slice(0, Cinco);

    setBeforeSearch(data);
    setCategorys(firstFive);
  };

  useEffect(() => {
    setSelected('beforeSearch');

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
  }, []);

  const handleButton = async (category) => {
    const url = rota === 'meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

    const FilteredRecipes = await fetch(url);
    const jsonFilter = await FilteredRecipes.json();
    setSelected('category');
    setFiltered(jsonFilter);
  };

  return (
    <div style={ { textAlign: 'center' } }>
      <button
        data-testid="All-category-filter"
        onClick={ () => setSelected('beforeSearch') }
        type="button"
      >
        All
      </button>
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
        {afterOrBeforeSearch() && afterOrBeforeSearch().map((meal, i = 0) => (
          <li key={ i }>
            <div
              data-testid={ `${i}-recipe-card` }
            >
              <h2 data-testid={ `${i}-card-name` }>
                {rota === 'meals' ? meal.strMeal : meal.strDrink}
              </h2>
              <Link to={ `${history.location.pathname}/${meal[id]}` }>
                <img
                  style={ { width: '250px' } }
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
