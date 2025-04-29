import React, { useState, useEffect } from 'react';
import { fetchData } from '../Utils/fetchData';

const MealPackagesList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await fetchData(import.meta.env.VITE_AUTH_API + '/meals');
        setMeals(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
        Error: {error}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="p-4 bg-blue-100 text-blue-700 rounded-md">
        No meal packages found. Add some to get started!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Meal Packages</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{meal.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  ${Number(meal.price).toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{meal.description}</p>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Details
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  Poista ruokapaketti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPackagesList;
