import React from 'react'

const Hero = () => {
  return (
    <>
    <div className="relative w-full h-[500px]">
      <img src="/hero.jpg" alt="hero" className="w-full h-full object-cover" />

      <div className="absolute top-0 w-full overflow-hidden">
        <div className="moving-text-wrapper">
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          &nbsp; • &nbsp; AINA TUORETTA! &nbsp; • &nbsp; 100% KOTIMAINEN! &nbsp; • &nbsp; NOPEA TOIMITUS! &nbsp; • &nbsp; TILAA NYT! &nbsp; • &nbsp; SENSONGIN PARHAAT! &nbsp; • &nbsp; LAAJA VALIKOIMA!
          </div>
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          &nbsp; • &nbsp; AINA TUORETTA! &nbsp; • &nbsp; 100% KOTIMAINEN! &nbsp; • &nbsp; NOPEA TOIMITUS! &nbsp; • &nbsp; TILAA NYT! &nbsp; • &nbsp; SENSONGIN PARHAAT! &nbsp; • &nbsp; LAAJA VALIKOIMA!
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full overflow-hidden">
        <div className="moving-text-wrapper">
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          &nbsp; • &nbsp; 100% KOTIMAINEN! &nbsp; • &nbsp; NOPEA TOIMITUS! &nbsp; • &nbsp; LAAJA VALIKOIMA! &nbsp; • &nbsp; SENSONGIN PARHAAT! &nbsp; • &nbsp; AINA TUORETTA! &nbsp; • &nbsp; TILAA NYT!
          </div>
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          &nbsp; • &nbsp; 100% KOTIMAINEN! &nbsp; • &nbsp; NOPEA TOIMITUS! &nbsp; • &nbsp; LAAJA VALIKOIMA! &nbsp; • &nbsp; SENSONGIN PARHAAT! &nbsp; • &nbsp; AINA TUORETTA! &nbsp; • &nbsp; TILAA NYT!
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero
