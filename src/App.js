import React from 'react';
import { Route } from 'react-router-dom';
import Login from './componentes/Login';
import Provider from './context/myProvider';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
    </Provider>
  );
}

export default App;
