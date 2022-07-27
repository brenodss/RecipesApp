import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import getFavoriteObject from '../utilities/getFavoriteObject';
import MidiaButtons from './MidiaButtons';
import Recommend from './Recomended';
import myContext from '../context/myContext';

function RecipesDetails() {
  const { id } = useParams();
  const { setFavObject } = useContext(myContext);
  const history = useHistory();
  const [infoDetails, setInfoDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [name, setName] = useState('');
  const { location: { pathname } } = history;

  const rota = pathname.includes('/food') ? 'meals' : 'drinks';

  const infoWorked = (info) => {
    setInfoDetails(info);
    const arrayInfo = [Object.entries(info)];

    const ingredient = arrayInfo[0]
      .filter((eachArray) => eachArray[0].includes('Ingredient'));

    const measure = arrayInfo[0]
      .filter((eachArray) => eachArray[0].includes('Measure'));

    setIngredients(ingredient);
    setMeasures(measure);
  };
  const stringRecipe = rota === 'meals' ? 'strMeal' : 'strDrink';

  const fetchDetailsApi = async () => {
    const link = rota === 'meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    setName(rota === 'meals' ? 'Food' : 'Drink');

    const fetchFoodApi = await fetch(link);
    const data = await fetchFoodApi.json();
    const info = data[rota][0];
    infoWorked(info);
    setFavObject(getFavoriteObject(info, rota));
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
                alt={ infoDetails[stringRecipe] }
                style={ { width: '250px' } }
              />
              <h1 data-testid="recipe-title">
                {infoDetails[stringRecipe]}
              </h1>

              <h2 data-testid="recipe-category">
                {pathname.includes('food')
                  ? infoDetails.strCategory : infoDetails.strAlcoholic}
              </h2>
              <MidiaButtons favoriteToSave={ getFavoriteObject(infoDetails, rota) } />
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
