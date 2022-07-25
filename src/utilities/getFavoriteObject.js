const getFavoriteObject = (infoDetails, rota) => ({
  id: rota === 'meals' ? infoDetails.idMeal : infoDetails.idDrink,
  type: rota === 'meals' ? 'food' : 'drink',
  nationality: infoDetails.strArea ? infoDetails.strArea : '',
  category: infoDetails.strCategory,
  alcoholicOrNot: rota === 'meals' ? '' : infoDetails.strAlcoholic,
  name: rota === 'meals' ? infoDetails.strMeal : infoDetails.strDrink,
  image: rota === 'meals' ? infoDetails.strMealThumb : infoDetails.strDrinkThumb,
});

export default getFavoriteObject;
