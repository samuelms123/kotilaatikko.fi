import React, { useState } from 'react';
import { fetchData } from '../Utils/fetchData';

const AdminAddMealPanel = ({ onMealAdded }) => {

  // State to manage form data
  const [formData, setFormData] = useState({
    mealName: '',
    mealPrice: '',
    mealDescription: '',
    categoryName: '',
    categoryDescription: '',
    ingredients: [{ name: '', price: '', description: '' }],
    image: null,
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...formData.ingredients];
    ingredients[index][name] = value;
    setFormData({
      ...formData,
      ingredients
    });
  };

  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', price: '', description: '' }]
    });
  };

  const removeIngredientField = (index) => {
    const ingredients = [...formData.ingredients];
    ingredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      // Filter out empty ingredient fields
      const nonEmptyIngredients = formData.ingredients.filter(
        ing => ing.name.trim() !== '' || ing.price !== '' || ing.description.trim() !== ''
      );

      const payload = {
        ...formData,
        ingredients: nonEmptyIngredients
      };

      const response = await fetchData(import.meta.env.VITE_AUTH_API + '/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      setMessage('Meal package added successfully!');
      // Reset form after successful submission
      setFormData({
        mealName: '',
        mealPrice: '',
        mealDescription: '',
        categoryName: '',
        categoryDescription: '',
        ingredients: [{ name: '', price: '', description: '' }]
      });

      // Call the callback to notify parent
      if (onMealAdded) {
        onMealAdded();
      }

    } catch (error) {
      console.error('Error adding meal:', error);
      setIsError(true);
      setMessage(error.message || 'Failed to add meal package');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-w-1/2 max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Food Package</h2>

      {message && (
        <div className={`p-3 mb-6 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meal Information Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Meal Information</h3>

          <div className="mb-4">
            <label htmlFor="mealName" className="block text-sm font-medium text-gray-700 mb-1">
              Meal Name:
            </label>
            <input
              type="text"
              id="mealName"
              name="mealName"
              value={formData.mealName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mealPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($):
            </label>
            <input
              type="number"
              id="mealPrice"
              name="mealPrice"
              value={formData.mealPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mealDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <textarea
              id="mealDescription"
              name="mealDescription"
              value={formData.mealDescription}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mealImage" className="block text-sm font-medium text-gray-700 mb-1">
              Meal Image:
            </label>
            <input
              type="file"
              id="mealImage"
              name="image"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Information Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Information</h3>

          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Category Description:
            </label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              value={formData.categoryDescription}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Ingredients</h3>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-md relative">
              <div className="mb-4">
                <label htmlFor={`ingredientName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredient Name:
                </label>
                <input
                  type="text"
                  id={`ingredientName-${index}`}
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`ingredientPrice-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($):
                </label>
                <input
                  type="number"
                  id={`ingredientPrice-${index}`}
                  name="price"
                  value={ingredient.price}
                  onChange={(e) => handleIngredientChange(index, e)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`ingredientDescription-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description:
                </label>
                <textarea
                  id={`ingredientDescription-${index}`}
                  name="description"
                  value={ingredient.description}
                  onChange={(e) => handleIngredientChange(index, e)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredientField(index)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Remove Ingredient
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredientField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Add Another Ingredient
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
        >
          {isSubmitting ? 'Adding...' : 'Add Food Package'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddMealPanel;
