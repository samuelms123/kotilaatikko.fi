export const createKlarnaOrder = async (orderData) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_AUTH_API + '/klarna/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create Klarna order');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create Klarna order:', error);
    throw error;
  }
};
