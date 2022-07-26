import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import myContext from '../context/myContext';

const MidiaButtons = ({ favoriteToSave }) => {
  const { favObject } = useContext(myContext);

  const [linkCopied, setLinkCopied] = useState('');
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const { location: { pathname } } = history;

  useEffect(() => {
    const isFavorite = localStorage.getItem('favoriteRecipes') !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes')).some((fav) => fav.id === id);

    setFavorite(isFavorite);
  }, [id]);

  const handleClick = (string) => {
    const currentyFavorites = localStorage.getItem('favoriteRecipes')
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    if (string === 'compartilhar') {
      setLinkCopied('Link copied!');
      copy(`http://localhost:3000${pathname}`);
    }

    if (string === 'favoritar' && currentyFavorites && !favorite) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...currentyFavorites, favoriteToSave],
      ));
    } else {
      const removeFav = currentyFavorites?.filter((fav) => fav.id !== id);

      setFavorite(false);

      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...removeFav],
      ));
    }
  };

  return (
    <>
      <button
        src={ share }
        name="compartilhar"
        onClick={ () => handleClick('compartilhar') }
        type="button"
        data-testid="share-btn"
      >
        <img alt="shareButton" src={ share } />
      </button>
      {`${linkCopied}`}
      <br />
      <button
        src={ favorite ? blackHeart : whiteHeart }
        name="favoritar"
        onClick={ () => handleClick('favoritar') }
        type="button"
        data-testid="favorite-btn"
      >
        <img alt="favButton" src={ favorite ? blackHeart : whiteHeart } />
      </button>
    </>
  );
};

MidiaButtons.propTypes = {
  favoriteToSave: PropTypes.instanceOf(Object).isRequired,
};

export default MidiaButtons;
