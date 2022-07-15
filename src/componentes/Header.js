import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title }) => {
  const history = useHistory();

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="icone de profile"
        />
      </button>
      {title === 'Profile'
      || title === 'Done Recipes'
      || title === 'Favorite Recipes' ? (
          ''
        ) : (
          <button type="button">
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="icone de pesquisa"
            />
          </button>
        )}
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default Header;
