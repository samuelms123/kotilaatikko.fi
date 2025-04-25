import React from 'react'

const Hero = () => {
  // Define the text arrays for the moving text
  const topText = [
    "AINA TUORETTA!",
    "100% KOTIMAINEN!",
    "NOPEA TOIMITUS!",
    "TILAA NYT!",
    "SESONGIN PARHAAT!",
    "LAAJA VALIKOIMA!"
  ];

  // Define the text arrays for the moving text
  const bottomText = [
    "NOPEA TOIMITUS!",
    "LAAJA VALIKOIMA!",
    "SESONGIN PARHAAT!",
    "AINA TUORETTA!",
    "100% KOTIMAINEN!",
    "TILAA NYT!"
  ];

  // Function to create text content with bullet points
  const textContent = (array) => {
    return (
      <>
        {array.map((text, index) => (
          <span key={index}>
            &nbsp; &#10007; &nbsp; {text}
          </span>
        ))}
      </>
    )
  }

  return (
    <>
    <div className="relative w-full h-[500px]">
      <img src="/hero.jpg" alt="hero" className="w-full h-full object-cover rounded-b-xs" />

      <div className="absolute top-0 w-full overflow-hidden">
        <div className="moving-text-wrapper">
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          {textContent(topText)}
          </div>
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          {textContent(topText)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full overflow-hidden">
        <div className="moving-text-wrapper">
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          {textContent(bottomText)}
          </div>
          <div className="moving-text text-[var(--primary-color)] text-lg font-[header] text-shadow-lg">
          {textContent(bottomText)}
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Hero
