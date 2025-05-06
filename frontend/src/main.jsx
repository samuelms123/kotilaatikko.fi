import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

//program starts here


// Dynamically set the favicon
const setFavicon = (url) => {
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = url;
  document.head.appendChild(link);
};

setFavicon(`${import.meta.env.BASE_URL}fav-icon.png`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
