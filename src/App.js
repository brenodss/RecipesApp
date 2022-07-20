import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Provider from './context/myProvider';

import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDetals from './pages/RecipesDetals';
import RecipesInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/foods/:id"
          render={ (props) => (<RecipesDetals { ...props } />) }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => (<RecipesDetals { ...props } />) }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          render={ (props) => (<RecipesInProgress { ...props } />) }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => (<RecipesInProgress { ...props } />) }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
