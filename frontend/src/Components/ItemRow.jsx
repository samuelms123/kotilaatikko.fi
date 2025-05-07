import React from 'react';
import {useCart} from '../Contexts/CartContext';
import {useNavigate} from 'react-router'; // Import useNavigate

const ItemRow = ({allItems}) => {
  const {addToCart} = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      {allItems.map((item) => (
        <div
          key={item.id}
          className="rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row relative bg-gray-100 hover:scale-101 transition-transform duration-300"
        >
          {/* Image Container */}
          <div className="w-full sm:w-[400px] h-[300px] sm:h-[300px] shrink-0">
            <img
              src={import.meta.env.VITE_IMG_SERVE_URL + item?.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-grow relative">
            <div className="mb-4">
              <h3 className="text-2xl font-[header] mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-[var(--primary-color)] font-bold text-2xl">
                {item.price} &#8364;
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 flex flex-col sm:flex-row sm:gap-4 sm:justify-end md:absolute md:bottom-4 md:right-4">
            <button
              onClick={() => addToCart(item)}
              className="bg-[var(--primary-color)] mb-3 text-white px-4 py-2 rounded hover:bg-opacity-90 hover:scale-105 transition-transform duration-200 font-bold"
            >
              Lisää ostoskoriin
            </button>
            <button
              onClick={() => navigate(`/product/${item.id}`)}
              className="bg-gray-200 text-gray-800 mb-3 px-4 py-2 rounded hover:bg-gray-300 hover:scale-105 transition-transform duration-200 font-bold"
            >
              Lue lisää...
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default ItemRow;
