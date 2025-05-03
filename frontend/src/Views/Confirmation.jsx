// src/Views/Confirmation.jsx
import { useEffect } from 'react';
import { useCart } from '../Contexts/CartContext';
import { useSearchParams } from 'react-router-dom';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get('klarna_order_id');

  useEffect(() => {
    if (orderId) {
      clearCart();
      // You might want to save the order to your database here
    }
  }, [orderId, clearCart]);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Kiitos tilauksestasi!</h1>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        Tilausnumerosi: <strong>{orderId}</strong>
      </div>
      <p className="mb-6">Saamme sinulle tilausvahvistuksen sähköpostitse.</p>
      <a
        href="/shop"
        className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 inline-block"
      >
        Jatka ostoksia
      </a>
    </div>
  );
};

export default Confirmation;
