import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../context/myContext';
import '../style/Login.css';

const Login = ({ history }) => {
  const { user, setUser } = useContext(context);
  const [isDisable, setIsDisable] = useState(true);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/; return re.test(email);
  }

  const disableButton = () => {
    const passwordLength = 6;
    if (validateEmail(user.email) === false
    || user.password.length <= passwordLength) {
      setIsDisable(true);
      return;
    }
    setIsDisable(false);
  };

  const handleInputs = (target) => {
    setUser({ ...user, [target.id]: target.value });
  };

  const handleButton = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '1525125125' }]));
    history.push('/foods');
  };

  useEffect(() => {
    disableButton();
  }, [user]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="emailLogin">
        Email
        <input
          onChange={ ({ target }) => handleInputs(target) }
          value={ user.email }
          data-testid="email-input"
          id="email"
          type="email"
        />
      </label>
      <label htmlFor="passwordLogin">
        Senha
        <input
          value={ user.password }
          onChange={ ({ target }) => handleInputs(target) }
          data-testid="password-input"
          id="password"
          type="password"
        />
      </label>
      <button
        onClick={ handleButton }
        disabled={ isDisable }
        data-testid="login-submit-btn"
        type="button"
      >
        Entrar
      </button>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default Login;
