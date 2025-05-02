import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="flex flex-col items-center justify-center text-white text-center px-4 mt-15 bg-gray-100 py-8 rounded-2xl shadow-lg">
      {/* Animated 404 Text */}
      <h1 className="text-6xl sm:text-8xl text-[var(--primary-color)] font-[header] animate-bounce mb-6">
        Hups!
      </h1>
      {/* Subtitle */}
      <h2 className="text-2xl text-[var(--primary-color)] sm:text-3xl font-[header] mb-4">
        Oho! Nyt on bitti vinossa.
      </h2>
      <p className="text-lg sm:text-xl text-black mb-20">
        Näyttää siltä, että jostain syystä etsimääsi osoitetta ei voitu avata. Mutta ei hätää, voit aina palata etusivulle!
      </p>
      {/* Button to Navigate Back */}
      <button
        onClick={() => navigate('/')}
        className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 hover:scale-105 transition-transform duration-300 shadow-lg"
      >
        Takaisin etusivulle
      </button>

    </div>
  );
};

export default NotFound;
