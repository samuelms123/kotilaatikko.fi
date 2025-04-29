import { Outlet } from 'react-router'
import NavigationBarDesktop from './NavigationBarDesktop'
import NavigationBarMobile from './NavigationBarMobile'

const Layout = () => {

  return (
    <>
    <div className='max-w-screen mx-auto'>
      <header className="border-b-2 border-[var(--primary-color)]">
        <div className='flex justify-between items-center p-4 max-w-[1600px] mx-auto'>
          <h1 className='text-3xl font-[header]'>kotilaatikko.fi</h1>
          <nav>
          <div className="hidden md:block">
            <NavigationBarDesktop/>
          </div>
          <div className="block md:hidden">
            <NavigationBarMobile/>
          </div>
          </nav>
        </div>
      </header>

      <main className='max-w-[1600px] mx-auto min-h-screen'>
        <Outlet/>
      </main>

      <footer className='bg-[var(--grey-color)] pb-12 text-[var(--white-color)]'>
        <div className="max-w-[1600px] mx-auto text-center">
          <p className='py-10 text-lg font-[header]'>ASIAKASPALVELU</p>

          <p className='pt-5 font-bold'>Yhteystiedot</p>
          <p className='pt-3'>Puhelin: +358 40 66 420</p>
          <p>Sähköposti: aspakasa@kotilaatikko.fi</p>
          <p>Y-tunnus: 1234567-8</p>

          <div className='pt-15'>
            <p className='text-[90%]'>&#169; kotilaatikko.fi 2025 &#8212; Helposti ruokaa kotiovellesi!</p>
            <div className='flex justify-center pt-5'>
              <a href='http://tiktok.com'><img className='w-auto h-8 mr-2' src="/tt-icon.png" alt="TikTok brand logo." /></a>
              <a href='http://facebook.com'><img className='w-auto h-8 mr-2' src="/fb-icon.png" alt="Facebook brand logo." /></a>
              <a href='http://instagram.com'><img className='w-auto h-8 mr-2' src="/ig-icon.png" alt="Instagram brand logo." /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default Layout
