import { Link } from 'react-router-dom'
import { useUserContext } from '../Hooks/contextHooks';

const NavigationBarDesktop = () => {
  const { user } = useUserContext();
  const isLoggedIn = user || localStorage.getItem('token'); // Check both context and localStorage

  return (
    <nav className="p-4">
      <ul className="flex space-x-4">
        <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
          <Link className='hover:text-[var(--primary-color)]' to="/">Etusivu</Link>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
        </li>
        <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
          <Link className='hover:text-[var(--primary-color)]' to="/shop">Tilaa</Link>
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
        </li>

        {/* Only show Profile if logged in */}
        {isLoggedIn && (
          <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
            <Link className='hover:text-[var(--primary-color)]' to="/profile">Profiili</Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
          </li>
        )}

        {/* Only show Login/Register if NOT logged in */}
        {!isLoggedIn && (
          <>
            <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
              <Link className='hover:text-[var(--primary-color)]' to="/login">Kirjaudu sisään</Link>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
            </li>
            <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
              <Link className='hover:text-[var(--primary-color)]' to="/register">Rekisteröidy</Link>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
            </li>
          </>
        )}

        {/* Only show Logout if logged in */}
        {isLoggedIn && (
          <li className='font-bold text-xl group text-[var(--black-color)] transition duration-300'>
            <Link className='hover:text-[var(--primary-color)]' to="/logout">Kirjaudu ulos</Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[var(--primary-color)]"></span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBarDesktop
