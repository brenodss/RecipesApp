import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

const Provider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const globalState = {
    user,
    setUser,
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
