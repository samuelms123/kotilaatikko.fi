import React, { useEffect, useState } from 'react'
import ItemRow from '../Components/ItemRow'
import { fetchData } from '../Utils/fetchData'

const Shop = () => {
  const [allItems, setAllItems] = useState([]) // State to store items
  const [loading, setLoading] = useState(true) // State to handle loading
  const [error, setError] = useState(null) // State to handle errors

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch all items
        const data = await fetchData('http://localhost:3000/api/v1/categories') // Replace with your API endpoint
        const itemsWithPrices = await Promise.all(
          data.map(async (item) => {
            // Fetch price for each item by its ID
            const priceResponse = await fetchData(`http://localhost:3000/api/v1/categories/${item.id}/price`)
            return { ...item, price: priceResponse.price }
          })
        )
        setAllItems(itemsWithPrices) // Set the items with their prices
      } catch (err) {
        setError(err.message) // Handle errors
      } finally {
        setLoading(false) // Stop loading
      }
    }

    fetchItems()
  }, [])

  if (loading) {
    return <div className="text-center mt-8">Tuote sivu latautuu...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Virhe: {error}</div>
  }

  if (allItems.length === 0) {
    return <div className="text-center mt-8">Sivustolla ei ole yhtään ruokaboksia?!</div>
  }

  return (
    <div className="shop-page">
        <div className="relative">
          <img
            src="/hero-blur.jpg"
            alt="Shop Hero"
            className="w-full h-[200px] object-cover rounded-b-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-center px-4">
            <h1 className="text-white text-4xl font-[header] mb-4">Tee arjestasi helppoa &#8212; Tilaa tänään!</h1>
            <p className="text-white text-lg">
              Kotilaatikon tilaaminen tekee arjesta helpompaa. Et tarvitse enää huolehtia ruokalistan suunnittelusta tai kaupasta raahaamisesta – saat kaiken valmiiksi toimitettuna. Näin voit nauttia maukkaasta ruoasta ilman turhaa vaivannäköä!
            </p>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4">
          <div className="recommended-section my-8">
            <h2 className="text-2xl font-[header] mb-4">Suosituin kotilaatikko</h2>
            <div className="rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row relative bg-gray-100 hover:scale-102 transition-transform duration-300">
              <div className="absolute top-0 left-0 bg-[var(--primary-color)] text-white text-sm font-bold px-3 py-1 rounded-br-lg">
                TILATUIN !
              </div>
              <img
                src={allItems[0].image}
                alt={allItems[0].name}
                className="w-full sm:w-1/3 h-[300px] object-cover"
              />
              <div className="p-6 flex flex-col justify-between flex-grow relative">
                <div>
                  <h3 className="text-2xl font-[header] mb-2">{allItems[0].name}</h3>
                  <p className="text-gray-600 mb-4">{allItems[0].description}</p>
                  <p className="text-[var(--primary-color)] font-bold text-2xl">
                    {allItems[0].price} &#8364;
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
        </div>
        <ItemRow allItems={allItems} />
      </div>
    </div>
  )
}



export default Shop
