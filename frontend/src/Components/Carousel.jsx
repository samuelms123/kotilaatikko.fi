import React, { useState } from 'react';

const Carousel = ({ items }) => {
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
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-100 * currentIndex}%)` }}
          >
            <div className="flex flex-col h-full justify-center items-center p-5">
              <img
                src={item.image}
                alt={item.alt || `Slide ${index + 1}`}
                className="max-w-full max-h-[70%] object-contain"
              />
              {/* More flexible content rendering */}
              {item.content && (
                <div className="text-center mt-5">{item.content}</div>
              )}
              {!item.content && (item.title || item.description) && (
                <div className="text-center mt-5">
                  {item.title && <h3 className="text-xl font-bold">{item.title}</h3>}
                  {item.description && <p className="mt-2">{item.description}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2 rounded-full hover:bg-opacity-80 z-10"
      >
        &larr;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2 rounded-full hover:bg-opacity-80 z-10"
      >
        &rarr;
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
