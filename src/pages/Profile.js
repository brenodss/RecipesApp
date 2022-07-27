import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = () => {
  const history = useHistory();
  const getEmailLocalStorage = JSON.parse(localStorage.getItem('user'));
  console.log(getEmailLocalStorage);
  return (

    <div>
      <Header title="Profile" />
      { getEmailLocalStorage
       && <p data-testid="profile-email">{getEmailLocalStorage.email}</p>}

      <div>
        <label htmlFor="email">
          <input
            id="email"
          />
        </label>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
