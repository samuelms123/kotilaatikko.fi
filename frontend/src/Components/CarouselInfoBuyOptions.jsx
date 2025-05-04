import React, { useState } from 'react';

const CarouselInfoBuyOptions = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = ((currentIndex - 1) % items.length + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className=" relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-100 * currentIndex}%)` }}
          >
            <div className="flex flex-auto h-full justify-evenly items-center p-5">
              {/* More flexible content rendering */}


              <div className="max-w-1/2 text-left m-5 p-5">
                {item.name && <h3 className="text-xl font-bold">{item.name}</h3>}
                {item.description && <p className="mt-2">{item.description}</p>}
              </div>

              <img
                src={item?.image}
                alt={item.name}
                className="w-full sm:w-1/3 h-[300px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="h-1/3 absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/30 text-white text-2xl p-4 rounded-full hover:bg-gray-950 z-10"
      >
        &larr;
      </button>
      <button
        onClick={goToNext}
        className="h-1/3 absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/30 text-white text-2xl p-4 rounded-full hover:bg-gray-950 z-10"
      >
        &rarr;
      </button>

      <div className="flex justify-end">
        <button className="rounded-2xl bg-[var(--primary-color)] text-[var(--white-color)] hover:bg-[var(--grey-color)] py-4 px-6 ml-1 mr-1 " onClick={() => {console.log("info pressed")}}>Lisää ruuasta</button>
        <button className="rounded-2xl bg-[var(--primary-color)] text-[var(--white-color)] hover:bg-[var(--grey-color)] py-4 px-6 ml-1 mr-1 " onClick={() => {console.log("buy pressed")}}>Tilaa kotiin!</button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? 'bg-[var(--grey-color)]' : 'bg-gray-300'}`}
          />
        ))}
      </div>

    </div>
  );
};

export { CarouselInfoBuyOptions };
