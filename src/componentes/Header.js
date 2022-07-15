import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = (props) => (

  <header>
    <h1 data-testid="page-title">
      {props.title}
      {console.log(props)}
    </h1>
    <button
      type="button"
      onClick={ () => props.props.history.push('/profile') }
    >
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="icone de profile"
      />
    </button>
    {props.title === 'Profile'
    || props.title === 'Done Recipes'
    || props.title === 'Favorite Recipes'
      ? '' : (
        <button
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="icone de pesquisa"
          />
        </button>
      ) }

  </header>

);

Header.propTypes = {
  history: PropTypes.instanceOf(Object),
}.isRequired;

export default Header;
