import React from 'react'
import { Link } from 'react-router'

const NavigationBarDesktop = () => {
  return (
    <nav className="p-4">
      <ul className="flex space-x-4">
        <li className='font-bold text-[1.5vh] group text-[var(--black-color)] transition duration-300'>
          <Link className='hover:text-[var(--primary-color)]' to="/">Etusivu</Link>
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
        </li>
        <li className='font-bold text-[1.5vh] group text-[var(--black-color)] transition duration-300'>
          <Link className='hover:text-[var(--primary-color)]' to="/profile">Profiili</Link>
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)] "></span>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBarDesktop
