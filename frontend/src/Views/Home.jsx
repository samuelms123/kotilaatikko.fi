import React from 'react'
import {CarouselInfoBuyOptions} from '../Components/CarouselInfoBuyOptions.jsx'

const Home = () => {
  // Carousel mock items with images, titles, and descriptions
  const carouselItems = [
    {
      image: 'https://placecats.com/neo/300/200',
      alt: 'cat',
      title: 'Truly a cat',
      description: 'Experience the cat of your dreams'
    },
    {
      image: 'https://placecats.com/millie/300/150',
      alt: 'cat',
      title: 'A cat',
      description: 'One of the cats of all time'
    },
    {
      image: 'https://placecats.com/neo_banana/300/200',
      alt: 'cat',
      title: "It's a cat",
      description: 'Love me some cat'
    },
    {
      image: 'https://placecats.com/millie_neo/300/200',
      alt: 'cat',
      title: 'Another cat',
      description: "Who could've guessed?"
    }
  ];

  return (

    <>
      <h1 className="font-bold text-8xl m-auto text-center">HERKULLISTA MAKAROONILAATIKKOA</h1>

      <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Cats</h1>
      <CarouselInfoBuyOptions items={carouselItems} />
      </div>

    </>


  )
}

export default Home
