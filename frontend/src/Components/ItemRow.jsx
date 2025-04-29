import React from 'react'

const ItemRow = ({allItems}) => {
  return (
    <>
      {/* All Items Section */}
      <div className="all-items-section my-8">
        <h2 className="text-2xl font-[header] mb-4">Kaikki kotilaatikot</h2>
        <div className="flex flex-col gap-4">
          {allItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row relative bg-gray-100 hover:scale-101 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-1/3 h-[300px] object-cover"
              />
              <div className="p-6 flex flex-col justify-between flex-grow relative">
                <div>
                  <h3 className="text-2xl mb-2 font-[header]">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <p className="text-[var(--primary-color)] font-bold text-2xl">
                    {item.price} &#8364;
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-4">
                  <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90 hover:scale-105 transition-transform duration-200 font-bold">
                    Tilaa
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 hover:scale-105 transition-transform duration-200 font-bold">
                    Lue lisää...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default ItemRow
