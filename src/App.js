import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './componentes/Login';
import Provider from './context/myProvider';

import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route path="/foods/:id" render={ (props) => (<Recipes { ...props } />) } />
          <Route path="/drinks/:id" render={ (props) => (<Recipes { ...props } />) } />
          <Route path="/foods/:id/in-progress" />
          <Route path="/drinks/:id/in-progress" />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
