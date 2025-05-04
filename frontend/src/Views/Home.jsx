import React, { useEffect, useState } from 'react'
import {CarouselInfoBuyOptions} from '../Components/CarouselInfoBuyOptions.jsx'
import Hero from '../Components/Hero.jsx';
import { fetchData } from '../Utils/fetchData';



const Home = () => {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch all items
        const data = await fetchData(import.meta.env.VITE_AUTH_API+'/meals'); // Replace with your API endpoint
        setAllItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (

    <>
      <Hero />

      <h1 className="font-bold text-[3.5vh] m-auto text-center">HERKULLISTA MAKAROONILAATIKKOA</h1>

      <div className="p-8">

      <h1 className="text-[3vh] font-bold text-center mb-8">Featured Cats</h1>


      <CarouselInfoBuyOptions items={allItems} />
      </div>
    </>


  )
}

export default Home
