import React, { useEffect, useState } from 'react'
import {CarouselInfoBuyOptions} from '../Components/CarouselInfoBuyOptions.jsx'
import Hero from '../Components/Hero.jsx';
import { fetchData } from '../Utils/fetchData';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate();
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

      <h1 className="mt-5 font-bold text-[5.5vh] m-auto text-center text-shadow-2xs">Tervetuloa kotilaatikkoon!</h1>

      <div className="p-5">
        <div className="p-5 items-center justify-center">
          <h1 className="text-[3vh] font-bold max-w-4xl mx-auto mb-8">Tuoreena pakatut ainesosat suoraan kotiisi, kokkaamista vaille valmista.</h1>

          <p className=" max-w-4xl mx-auto mb-8">
            Kotilaatikon ruokapakettimme ovat valmiiksi mietittyjä ateriakokonaisuuksia.
            Jokaiseen pakettiin kuuluu kaikki ruuan laittoon tarvittavat ainesosat ja reseptit.
            Voit siis vaikka tilata koko viikon ruuat valmiiksi ainesosina ja kokata joka päivä jotain uutta!
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">Ladataan ruokalistoja...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl text-red-500">Ruokalistan lataus epäonnistui</p>
          </div>
        ) : (
          <CarouselInfoBuyOptions items={allItems} />
        )}
      </div>
    </>


  )
}

export default Home
