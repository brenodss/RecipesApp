import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

const Provider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState({});
  const [selected, setSelected] = useState([]);

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
