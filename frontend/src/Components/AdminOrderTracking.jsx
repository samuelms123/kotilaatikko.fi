import React, { useEffect, useState } from 'react';
import { fetchData } from '../Utils/fetchData';

const AdminOrderTracking = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchData(import.meta.env.VITE_AUTH_API + '/orders'); // Replace with your API endpoint
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(`Haluatko varmasti poistaa tilauksen ID: ${orderId}?`);
    if (confirmDelete) {
      try {
        // Replace with your API endpoint for deleting an order
        await fetch(`${import.meta.env.VITE_AUTH_API}/orders/${orderId}`, {
          method: 'DELETE',
        });
        // Remove the deleted order from the state
        setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
        alert(`Tilaus ID: ${orderId} poistettu onnistuneesti.`);
      } catch {
        alert(`Virhe poistettaessa tilausta ID: ${orderId}. `);
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
    <div className="mx-auto py-3">
      <div className="overflow-y-auto shadow-md rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--primary-color)]">
            <tr>
              <th className="px-4 py-2">Tilaus ID</th>
              <th className="px-4 py-2">Tilaaja</th>
              <th className="px-4 py-2">Hinta</th>
              <th className="px-4 py-2">Päivämäärä</th>
              <th className="px-4 py-2">Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`hover:bg-orange-300 ${
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                }`}
              >
                <td className="px-4 py-2">{order?.order_id}</td>
                <td className="px-4 py-2">{order?.orderer}</td>
                <td className="px-4 py-2">{order?.price} €</td>
                <td className="px-4 py-2">
                  {new Date(order?.order_date).toLocaleDateString('fi-FI', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => alert(`Näytä lisätiedot tilaukselle ID: ${order?.order_id}`)}
                    className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90 hover:scale-105 transition-transform duration-200"
                  >
                    Näytä lisätiedot
                  </button>
                  <button
                    onClick={() => handleDelete(order?.order_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                  >
                    Poista
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderTracking;
