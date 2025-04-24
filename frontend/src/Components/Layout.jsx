import React from 'react'
import { Outlet } from 'react-router'
import NavigationBarDesktop from './NavigationBarDesktop'

const Layout = () => {
  return (
    <>
    <header className="bg-gray-800">
      <div className='flex justify-between items-center bg-gray-800 text-white p-4 md:w-400 mx-auto'>
        <h1 className='text-3xl font-bold'>KISSAKUVAT.ORG</h1>
        <nav>
          <NavigationBarDesktop/>
        </nav>
      </div>
    </header>

    <main className='md:w-400 mx-auto min-h-screen'>
      <Outlet/>
    </main>

    <footer className='bg-gray-800 pb-30'>
      <div className="md:w-400 mx-auto text-center">
        <p className='pt-5'>Footeri - Herkkulaatikko 2025</p>
      </div>
    </footer>
    </>
  )
}

export default Layout
