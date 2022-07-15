import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Provider from './context/myProvider';

import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/foods/:id" component={ Foods } />
        <Route
          path="/drinks/:id"
          render={ (props) => (<Recipes
            { ...props }
          />) }
        />
        <Route path="/foods/:id/in-progress" />
        <Route path="/drinks/:id/in-progress" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Provider>
    </Switch>
  );
}

export default App;
