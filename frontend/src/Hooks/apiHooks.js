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
    //console.log('loginResult', loginResult);

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

  async function postUser(inputs) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const postResults = await fetchData(
      import.meta.env.VITE_AUTH_API,
      fetchOptions,
    );
    console.log('post result: ', postResults);

    return postResults;
  }
  return {getUserByToken, postUser};
}

export {useAuthentication, useUser};
