import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './myContext';

const Provider = ({ children }) => {
  const history = useHistory();

  const { location: { pathname } } = history;
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState({});
  const [selected, setSelected] = useState([]);
  const [favObject, setFavObject] = useState([]);

  // const [type, setType] = useState('');

  const globalState = {
    user,
    setUser,
    input,
    setInput,
    recipe,
    setRecipe,
    selected,
    setSelected,
    pathname,
    history,
    favObject,
    setFavObject,
  };

  return (
    <MyContext.Provider value={ globalState }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
