import {useState} from 'react';
import {fetchData} from '../Utils/fetchData';

const userApiUrl = import.meta.env.VITE_AUTH_API;

// token check from local storage, returns boolean
const tokenInLocalStorage = () => {
  Boolean(localStorage.getItem('token'));
};

// make a table with the mediaArray

const useAuthentication = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    console.log('loginResult', loginResult);

    window.localStorage.setItem('token', loginResult.token);

    setIsLoggedIn(tokenInLocalStorage());

    return loginResult;
  };
  return {postLogin, isLoggedIn};
};

function useUser() {
  async function getUserByToken() {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      return await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        fetchOptions,
      );
    } catch (error) {
      console.error('error', error);
    }
  }

  async function checkEmailAvailability(email) {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_AUTH_API + `/users/available/${email}`,
        fetchOptions,
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error', errorData);
      }
      const data = await response.json();
      return data.available;
    } catch (error) {
      return {message: 'Something went wrong in checkEmailAvailability', error};
    }
  }

  async function postUser(inputs) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions,
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  return {getUserByToken, postUser, checkEmailAvailability};
}

export {useAuthentication, useUser};
