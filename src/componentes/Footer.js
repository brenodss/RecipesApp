import React from 'react';
import { Link } from 'react-router-dom';
import meal from '../images/mealIcon.svg';
import drink from '../images/drinkIcon.svg';

const Footer = () => (
  <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
    <Link to="/foods">
      <img data-testid="food-bottom-btn" alt="comida" src={ meal } />
    </Link>
    <Link style={ { position: 'fixed', bottom: '0px', right: '0%' } } to="/drinks">
      <img data-testid="drinks-bottom-btn" alt="bebida" src={ drink } />
    </Link>
  </footer>
);

export default Footer;
