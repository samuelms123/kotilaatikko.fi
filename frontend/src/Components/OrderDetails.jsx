import React from 'react';

const OrderDetails = ({ order, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tilauksen tiedot</h1>

      {/* Order Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tilaus</h2>
        <p><strong>Tilaus ID:</strong> {order.order_id}</p>
        <p><strong>Päivämäärä:</strong> {new Date(order.order_date).toLocaleDateString('fi-FI')}</p>
        <p><strong>Kokonais Hinta:</strong> {order.total_price} €</p>
      </div>

      {/* User Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tilaaja</h2>
        <p><strong>Nimi:</strong> {order.user.first_name} {order.user.last_name}</p>
        <p><strong>Sähköposti:</strong> {order.user.email}</p>
      </div>

      {/* Meals Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ateriat</h2>
        {order.meals.map((meal) => (
          <div key={meal.meal_id} className="mb-4 p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={meal.meal_image}
                alt={meal.meal_name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-lg">{meal.meal_name}</h3>
                <p className="text-sm text-gray-500">{meal.meal_description}</p>
                <p className="text-sm"><strong>Hinta:</strong> {meal.meal_price} €</p>
                <p className="text-sm"><strong>Määrä:</strong> {meal.quantity}</p>
                <p className="text-sm"><strong>Yhteensä:</strong> {meal.total_price} €</p>
              </div>
            </div>
            {/* Ingredients */}
            <div className="mt-4">
              <h4 className="font-semibold">Ainesosat:</h4>
              <ul className="list-disc list-inside">
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient.ingredient_id}>
                    {ingredient.ingredient_name}
                    {ingredient.allergens && ` (Allergeenit: ${ingredient.allergens})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-transform duration-200"
      >
        Takaisin
      </button>
    </div>
  );
};

export default OrderDetails;
