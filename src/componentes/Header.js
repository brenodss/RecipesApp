import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import MyContext from '../context/myContext';

const Header = ({ title }) => {
  const { input, setInput } = useContext(MyContext);
  const history = useHistory();
  const [searchBarEnable, setSearchBarEnable] = useState(false);
  // const title = history.location.pathname === '/foods' ? 'Foods' : 'Drinks';

  return (
    <header>
      {searchBarEnable && (
        <label
          htmlFor="search-input"
        >

          <input
            onChange={ ({ target }) => setInput(target.value) }
            value={ input }
            placeholder="Search Recipe"
            id="search-input"
            data-testid="search-input"
            type="text"
          />
        </label>
      )}
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
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
          <button
            type="button"
            onClick={ () => setSearchBarEnable(!searchBarEnable) }
          >
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
