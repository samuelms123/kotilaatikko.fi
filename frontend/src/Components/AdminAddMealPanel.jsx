import React, { useEffect, useState } from 'react';
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
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories and ingredients on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchData(`${import.meta.env.VITE_AUTH_API}/categories`);
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchIngredients = async () => {
      try {
        const data = await fetchData(`${import.meta.env.VITE_AUTH_API}/ingredients`);
        setIngredients(data);
      } catch (err) {
        console.error('Error fetching ingredients:', err);
      } finally {
        setIsLoadingIngredients(false);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  // Update formData when selecting existing category
  const handleCategorySelect = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find(cat => cat.id == selectedId);

    setFormData({
      ...formData,
      categoryId: selectedId,
      categoryName: selectedCategory ? selectedCategory.name : '',
      categoryDescription: selectedCategory ? selectedCategory.description : ''
    });
  };

  // Handle ingredient selection from dropdown
  const handleIngredientSelect = (index, e) => {
    const selectedId = e.target.value;
    const selectedIngredient = ingredients.find(ing => ing.id == selectedId);

    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      ingredientId: selectedId,
      name: selectedIngredient ? selectedIngredient.name : '',
      price: selectedIngredient ? selectedIngredient.price : '',
      description: selectedIngredient ? selectedIngredient.description : ''
    };

    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleRemoveIngredientFromDB = async (ingredientId, index) => {
    if (!window.confirm('Are you sure you want to permanently delete this ingredient from the database?')) {
      return;
    }

    try {
      const response = await fetchData(`${import.meta.env.VITE_AUTH_API}/ingredients/${ingredientId}`, {
        method: 'DELETE'
      });

      // Success case - no need to check response body for 204
      const updatedIngredients = ingredients.filter(ing => ing.id !== ingredientId);
      setIngredients(updatedIngredients);

      const updatedFormIngredients = [...formData.ingredients];
      updatedFormIngredients[index] = {
        ingredientId: '',
        name: '',
        price: '',
        description: ''
      };

      setFormData({
        ...formData,
        ingredients: updatedFormIngredients
      });

      setMessage('Ainesosa poistettu mallikkaasti!');
      setIsError(false);
    } catch (error) {
      console.error('Virhe poistaessa ainesosaa:', error);
      setMessage(error.message || 'Ainesosan poisto epäonnistui');
      setIsError(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Special handling for file input
    if (name === 'image' && files) {
      setFormData({
        ...formData,
        [name]: files[0] // Store the File object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
        // Create FormData object
      const formDataToSend = new FormData();

      // Append all fields to FormData
      formDataToSend.append('mealName', formData.mealName);
      formDataToSend.append('mealPrice', formData.mealPrice);
      formDataToSend.append('mealDescription', formData.mealDescription);
      formDataToSend.append('categoryName', formData.categoryName);
      formDataToSend.append('categoryDescription', formData.categoryDescription);

      // Append image if it exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Append ingredients
      formData.ingredients
        .filter(ing => ing.name.trim() !== '' || ing.price !== '' || ing.description.trim() !== '')
        .forEach((ingredient, index) => {
          formDataToSend.append(`ingredients[${index}][name]`, ingredient.name);
          formDataToSend.append(`ingredients[${index}][price]`, ingredient.price);
          formDataToSend.append(`ingredients[${index}][description]`, ingredient.description);
        });

      const response = await fetchData(import.meta.env.VITE_AUTH_API + '/meals', {
        method: 'POST',
        headers: {
          // Don't set Content-Type header - let the browser set it with boundary
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Lisää uusi ruokapaketti</h2>

      {message && (
        <div className={`p-3 mb-6 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meal Information Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Ruuan tiedot</h3>

          <div className="mb-4">
            <label htmlFor="mealName" className="block text-sm font-medium text-gray-700 mb-1">
              Ruuan nimi:
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
              Hinta (€):
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
              Kuvaus:
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
              Ruuan kuva:
            </label>
            <input
              type="file"
              id="mealImage"
              name="image"  // this name should match what multer expects
              accept="image/jpeg, image/png, image/webp"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Information Section */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Kategoriatiedot</h3>

          <div className="mb-4">
            <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700 mb-1">
              Valitse olemassa oleva kategoria:
            </label>
            <select
              id="categorySelect"
              value={formData.categoryId}
              onChange={handleCategorySelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoadingCategories}
            >
              <option value="">-- Valitse kategoria --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Tai luo uusi kategorian nimi:
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Kategorian kuvaus:
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Ainesosat</h3>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-md relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={`ingredientSelect-${index}`} className="block text-sm font-medium text-gray-700">
                  Valitse olemassa oleva ainesosa:
                </label>
                {ingredient.ingredientId && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredientFromDB(ingredient.ingredientId, index)}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  >
                    Remove from DB
                  </button>
                )}
              </div>

              <select
                id={`ingredientSelect-${index}`}
                value={ingredient.ingredientId || ''}
                onChange={(e) => handleIngredientSelect(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                disabled={isLoadingIngredients}
              >
                <option value="">-- Valitse ainesosa --</option>
                {ingredients.map(ing => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} ({ing.price} €)
                  </option>
                ))}
              </select>

              <div className="mb-4">
                <label htmlFor={`ingredientName-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Tai lisää uusi ainesosa:
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
                  Ainesosan hinta (€):
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
                  Kuvaus:
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
                  Poista ainesosa
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredientField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Lisää uusi ainesosa
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
        >
          {isSubmitting ? 'Lisätään...' : 'Lisää ruokapaketti'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddMealPanel;
