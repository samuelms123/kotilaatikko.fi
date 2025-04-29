import React, { useState } from 'react';
import { fetchData } from "../Utils/fetchData";

const MealPackagesList = ({ meals, isLoading, error, onMealDeleted }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDeleteMeal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this meal package?')) {
      return;
    }

    try {
      await fetchData(`${import.meta.env.VITE_AUTH_API}/meals/${id}`, {
        method: 'DELETE'
      });

      if (onMealDeleted) {
        onMealDeleted(id);
      }
      // Close drawer if the deleted meal was being viewed
      if (selectedMeal?.id === id) {
        setIsDrawerOpen(false);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const mealDetails = await fetchData(`${import.meta.env.VITE_AUTH_API}/meals/${id}`);
      setSelectedMeal(mealDetails);
      setIsDrawerOpen(true);
    } catch (err) {
      console.error('Error fetching meal details:', err);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedMeal(null);
  };

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
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Meal Packages</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{meal.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {Number(meal.price).toFixed(2)} €
                </span>
              </div>

              <p className="text-gray-600 mb-4">{meal.description}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleViewDetails(meal.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Poista ruokapaketti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Component */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeDrawer}
        ></div>

        {/* Drawer Panel */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedMeal?.name || 'Meal Details'}
              </h2>
              <button
                onClick={closeDrawer}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedMeal && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h3>
                    <p className="text-gray-600"><span className="font-medium">Price:</span> ${selectedMeal.price}</p>
                    <p className="text-gray-600"><span className="font-medium">Description:</span> {selectedMeal.description}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Category</h3>
                    {selectedMeal.category ? (
                      <div>
                        <p className="text-gray-600"><span className="font-medium">Name:</span> {selectedMeal.category.name}</p>
                        <p className="text-gray-600"><span className="font-medium">Description:</span> {selectedMeal.category.description}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No category assigned</p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
                    {selectedMeal.ingredients?.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedMeal.ingredients.map((ingredient, index) => (
                          <li key={index} className="border-b border-gray-200 pb-2 last:border-0">
                            <p className="font-medium text-gray-800">{ingredient.name}</p>
                            <p className="text-gray-600">${ingredient.price} - {ingredient.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No ingredients listed</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t">
              <button
                onClick={closeDrawer}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPackagesList;
