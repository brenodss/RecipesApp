import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Recommend from './Recomended';

function RecipesDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [infoDetails, setInfoDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [name, setName] = useState('');
  const { location: { pathname } } = history;

  const infoWorked = (info) => {
    setInfoDetails(info);
    const arrayInfo = [Object.entries(info)];
    const ingredient = arrayInfo[0]
      .filter((eachArray) => eachArray[0].includes('Ingredient'));
    const measure = arrayInfo[0]
      .filter((eachArray) => eachArray[0].includes('Measure'));
    setIngredients(ingredient);
    setMeasures(measure);
    console.log(info.strYoutube);
  };

  const fetchDetailsApi = async () => {
    if (pathname.includes('food')) {
      setName('Food');
      const urlDetailsFood = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchFoodApi = await fetch(urlDetailsFood);
      const data = await fetchFoodApi.json();
      const info = data.meals[0];
      infoWorked(info);
    }
    if (pathname.includes('drink')) {
      setName('Drink');
      const urlDetailsDrinkApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchDrink = await fetch(urlDetailsDrinkApi);
      const data = await fetchDrink.json();
      const info = data.drinks[0];
      infoWorked(info);
    }
  };
  useEffect(() => {
    fetchDetailsApi();
  }, []);
  return (
    <div>
      {
        (infoDetails.length === 0)
          ? <p>Loading... </p>
          : (
            <div>
              <img
                data-testid="recipe-photo"
                src={ (name === 'Food')
                  ? infoDetails.strMealThumb
                  : infoDetails.strDrinkThumb }
                alt={ (name === 'Food')
                  ? infoDetails.strMeal
                  : infoDetails.strDrink }
              />
              <h1 data-testid="recipe-title">
                {(name === 'Food')
                  ? infoDetails.strMeal
                  : infoDetails.strDrink}
              </h1>
              <h2 data-testid="recipe-category">
                {pathname.includes('food')
                  ? infoDetails.strCategory : infoDetails.strAlcoholic}
              </h2>
              <ul>
                { (ingredients.length && measures.length === 0)
                  ? <p>Loading... </p>
                  : (
                    ingredients.filter((eachIng) => eachIng[1] !== ''
                    && eachIng[1] !== null)
                      .map((eachIng, index = 0) => (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {eachIng[1] }
                          {' '}
                          { (measures[index][1]) !== null && (
                            <span>
                              -
                              {' '}
                              { (measures[index][1])}
                            </span>) }
                        </li>
                      )))}
              </ul>
              <div>
                <h2>Instructions</h2>
                <p data-testid="instructions">{infoDetails.strInstructions}</p>
              </div>
              { (
                infoDetails.strYoutube
              && (
                <section>
                  <iframe
                    data-testid="video"
                    title="trailer"
                    width="420"
                    height="315"
                    src={ (infoDetails.strYoutube.replace('watch?v=', 'embed/')) }
                  />
                </section>
              )) }
            </div>)
      }
      <Recommend />
    </div>
  );
}
export default RecipesDetails;
