import React from 'react'
import { Link } from 'react-router'

const NavigationBarDesktop = () => {
  return (
    <nav className="p-4">
      <ul className="flex space-x-4">
        <li className='font-bold text-xl hover:text-amber-300'>
          <Link to="/">Etusivu</Link>
        </li>
        <li className='font-bold text-xl hover:text-amber-300'>
          <Link to="/profile">Profiili</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBarDesktop
