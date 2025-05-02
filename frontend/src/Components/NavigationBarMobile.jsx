import React, { useState } from 'react'
import { Link } from 'react-router';
import { useUserContext } from '../Hooks/contextHooks';
import CartIcon from './CartIcon';


const NavigationBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();
  const isLoggedIn = user || localStorage.getItem('token'); // Check both context and localStorage

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div className="inline-flex items-center space-x-4">
        <CartIcon />
      </div>

      <button
        onClick={toggleMenu}
        className="text-[var(--primary-color)] focus:outline-none"
      >
        <img src='/mobile-menu.png' alt="Mobile navigation bar button" className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-screen bg-white border border-gray-200 shadow-lg z-9999">
          <ul className="flex flex-col items-center text-center">
            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
              <Link to="/" onClick={toggleMenu}>Etusivu</Link>
            </li>

            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
              <Link to="/shop" onClick={toggleMenu}>Tilaa</Link>
            </li>
            {isLoggedIn && (
            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
            <Link  to="/profile" onClick={toggleMenu}>Profiili</Link>
            </li>)}
            {!isLoggedIn && (
            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
            <Link to="/login" onClick={toggleMenu}>Kirjaudu sisään</Link>
            </li>)}
            {!isLoggedIn && (
            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
            <Link to="/register" onClick={toggleMenu}>Rekisteröidy</Link>
            </li>)}
            {isLoggedIn && (
            <li className="font-bold text-[3vh] group text-[var(--black-color)] py-2">
            <Link to="/logout" onClick={toggleMenu}>Kirjaudu ulos</Link>
            </li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavigationBarMobile
