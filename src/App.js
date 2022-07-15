import React from 'react';
import { Route } from 'react-router-dom';
import Login from './componentes/Login';
import Provider from './context/myProvider';
import Search from './componentes/SearchBar';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
      <Search />
    </Provider>
  );
}

export default App;
