import React, { useEffect, useState } from 'react';
import { fetchData } from '../Utils/fetchData';

const AdminOrderTracking = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State for selected order ID
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // State for selected order details

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchData(
          import.meta.env.VITE_AUTH_API + '/orders',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = async (orderId) => {
    if (selectedOrderId === orderId) {
      // If the same order is clicked again, close the details
      setSelectedOrderId(null);
      setSelectedOrderDetails(null);
      return;
    }

    try {
      const data = await fetchData(
        `${import.meta.env.VITE_AUTH_API}/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      setSelectedOrderId(orderId); // Set the selected order ID
      setSelectedOrderDetails(data.order); // Set the selected order details
    } catch {
      alert('Virhe haettaessa tilauksen tietoja.');
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      `Haluatko varmasti poistaa tilauksen ID: ${orderId}?`,
    );
    if (confirmDelete) {
      try {
        await fetch(`${import.meta.env.VITE_AUTH_API}/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.order_id !== orderId),
        );
        alert(`Tilaus ID: ${orderId} poistettu onnistuneesti.`);
      } catch {
        alert(`Virhe poistettaessa tilausta ID: ${orderId}.`);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Tilaukset latautuvat...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Virhe: {error}</div>;
  }

  return (
    <div className="mx-auto py-3 px-2 sm:px-4">
      <div className="overflow-x-auto shadow-md rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--primary-color)] text-white">
            <tr>
              <th className="px-2 py-2 sm:px-4">Tilausnumero</th>
              <th className="px-2 py-2 sm:px-4">Tilaaja</th>
              <th className="px-2 py-2 sm:px-4">Hinta</th>
              <th className="px-2 py-2 sm:px-4">Päivämäärä</th>
              <th className="px-2 py-2 sm:px-4">Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                <tr
                  className={`hover:bg-orange-300 ${
                    index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  <td className="px-2 py-2 sm:px-4">{order?.order_id}</td>
                  <td className="px-2 py-2 sm:px-4">
                    {order?.first_name} {order?.last_name}
                  </td>
                  <td className="px-2 py-2 sm:px-4">{order?.total_price} €</td>
                  <td className="px-2 py-2 sm:px-4">
                    {new Date(order?.date).toLocaleDateString('fi-FI', {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-2 py-2 sm:px-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleViewDetails(order?.order_id)}
                      className="bg-[var(--primary-color)] text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-opacity-90 hover:scale-105 transition-transform duration-200"
                    >
                      Näytä lisätiedot
                    </button>
                    <button
                      onClick={() => handleDelete(order?.order_id)}
                      className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                    >
                      Poista
                    </button>
                  </td>
                </tr>
                {selectedOrderId === order.order_id && selectedOrderDetails && (
                  <tr>
                    <td colSpan="5" className="bg-gray-100 p-4">
                      <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg sm:text-xl font-bold mb-4">
                          Tilauksen tiedot
                        </h2>
                        <p>
                          <strong>Tilausnumero:</strong>{' '}
                          {selectedOrderDetails.order_id}
                        </p>
                        <p>
                          <strong>Päivämäärä:</strong>{' '}
                          {new Date(
                            selectedOrderDetails.order_date,
                          ).toLocaleDateString('fi-FI')}
                        </p>
                        <p>
                          <strong>Tilauksen hinta:</strong>{' '}
                          {selectedOrderDetails.total_price} €
                        </p>

                        <h3 className="text-md sm:text-lg font-semibold mt-4">
                          Tilaaja
                        </h3>
                        <p>
                          <strong>Nimi:</strong>{' '}
                          {selectedOrderDetails.user.first_name}{' '}
                          {selectedOrderDetails.user.last_name}
                        </p>
                        <p>
                          <strong>Sähköposti:</strong>{' '}
                          {selectedOrderDetails.user.email}
                        </p>

                        <h3 className="text-md sm:text-lg font-semibold mt-4">
                          Ateriat
                        </h3>
                        {selectedOrderDetails.meals.map((meal) => (
                          <div
                            key={meal.meal_id}
                            className="mb-4 p-4 bg-gray-100 rounded-lg"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <img
                                src={meal.meal_image}
                                alt={meal.meal_name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <h4 className="font-medium text-md sm:text-lg">
                                  {meal.meal_name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {meal.meal_description}
                                </p>
                                <p className="text-sm">
                                  <strong>Hinta:</strong> {meal.meal_price} €
                                </p>
                                <p className="text-sm">
                                  <strong>Määrä:</strong> {meal.quantity}
                                </p>
                                <p className="text-sm">
                                  <strong>Yhteensä:</strong> {meal.total_price} €
                                </p>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h5 className="font-semibold mt-5">
                                Ainesosat:
                              </h5>
                              <ul className="list-disc list-inside">
                                {meal.ingredients.map((ingredient) => (
                                  <li key={ingredient.ingredient_id}>
                                    {ingredient.ingredient_name}
                                    {ingredient.allergens &&
                                      ` (Allergeenit: ${ingredient.allergens})`}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderTracking;
