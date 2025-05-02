import React, { useState, useEffect } from 'react';
import { useCart } from '../Contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Hooks/apiHooks'; // Import your user hook

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { getUserByToken } = useUser(); // Get the user hook function
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'Finland',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('klarna');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Create Klarna order (mock API call)
      const klarnaResponse = await mockKlarnaCreateOrder({
        items: cartItems,
        total: cartTotal,
        customer: customerInfo
      });

      if (klarnaResponse.success) {
        // Redirect to Klarna's mock payment page
        window.location.href = klarnaResponse.redirect_url;
        // In a real app, you would clear cart after successful payment
        // clearCart();
      } else {
        throw new Error(klarnaResponse.message || 'Payment processing failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock Klarna API function
  const mockKlarnaCreateOrder = async (orderData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // This is where you would make the real Klarna API call in production
    // For testing, we'll return a mock response
    return {
      success: true,
      order_id: `mock-${Math.random().toString(36).substr(2, 9)}`,
      redirect_url: 'https://playground.klarna.com/checkout/v3/order/mock-order',
      message: 'Mock payment initiated successfully'
    };
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to={"/shop"}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const fetchUserData = async () => {
    setLoadingUser(true);
    setUserError(null);
    try {
      const userData = await getUserByToken();
      setUser(userData.user);

      // Populate the form with user data
      setCustomerInfo({
        firstName: userData.user.firstName || '',
        lastName: userData.user.lastName || '',
        email: userData.user.email || '',
        address: userData.user.address || '',
        postalCode: userData.user.postalCode || '',
        city: userData.user.city || '',
        country: userData.user.country || 'Finland',
        phone: userData.user.phone || ''
      });
    } catch (err) {
      setUserError(err.message || 'Failed to fetch user data');
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Customer Information</h2>
            <button
              onClick={fetchUserData}
              disabled={loadingUser}
              className={`px-3 py-1 text-sm rounded ${loadingUser ? 'bg-gray-300' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              {loadingUser ? 'Loading...' : 'Fill in my info'}
            </button>
          </div>

          {userError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {userError}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={customerInfo.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={customerInfo.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Finland">Finland</option>
                <option value="Sweden">Sweden</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
              </select>
            </div>

            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="klarna"
                  checked={paymentMethod === 'klarna'}
                  onChange={() => setPaymentMethod('klarna')}
                  className="h-4 w-4"
                />
                <span>Klarna</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Pay later or in installments with Klarna
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${isProcessing ? 'bg-gray-400' : 'bg-[var(--primary-color)] hover:bg-opacity-90'}`}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="divide-y">
            {cartItems.map(item => (
              <div key={item.id} className="py-4 flex justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
