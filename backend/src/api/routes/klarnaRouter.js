import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const klarnaRouter = express.Router();

// Klarna credentials from environment variables
const KLARNA_API_URL =
  process.env.KLARNA_API_URL || 'https://api.playground.klarna.com';
const KLARNA_USERNAME = process.env.KLARNA_USERNAME;
const KLARNA_PASSWORD = process.env.KLARNA_PASSWORD;

if (!KLARNA_USERNAME || !KLARNA_PASSWORD) {
  console.error('Klarna credentials are not configured!');
}

// Create Klarna order
klarnaRouter.post('/orders', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.items || !req.body.customer) {
      return res
        .status(400)
        .json({error: 'Missing required fields: items or customer'});
    }

    // Prepare Klarna order payload
    const orderData = {
      purchase_country: req.body.customer.country || 'FI',
      purchase_currency: req.body.currency || 'EUR',
      locale: req.body.locale || 'en-FI',
      order_amount: Math.round(req.body.total * 100), // Convert to cents
      order_tax_amount: 0, // Adjust if you have taxes
      order_lines: req.body.items.map((item) => ({
        type: 'physical',
        reference: item.id || '12345',
        name: item.name || 'Product',
        quantity: item.quantity || 1,
        unit_price: Math.round(item.price * 100), // in cents
        tax_rate: 0, // Adjust if you have taxes
        total_amount: Math.round(item.price * item.quantity * 100),
        total_tax_amount: 0,
      })),
      merchant_urls: {
        terms: process.env.KLARNA_TERMS_URL,
        checkout: process.env.KLARNA_CHECKOUT_URL,
        confirmation: process.env.KLARNA_CONFIRMATION_URL,
        push: process.env.KLARNA_PUSH_URL,
      },

      billing_address: {
        given_name: req.body.customer.firstName,
        family_name: req.body.customer.lastName,
        email: req.body.customer.email,
        street_address: req.body.customer.address,
        postal_code: req.body.customer.postalCode,
        city: req.body.customer.city,
        country: req.body.customer.country || 'FI',
        phone: req.body.customer.phone,
      },
      shipping_address: {
        given_name: req.body.customer.firstName,
        family_name: req.body.customer.lastName,
        email: req.body.customer.email,
        street_address: req.body.customer.address,
        postal_code: req.body.customer.postalCode,
        city: req.body.customer.city,
        country: req.body.customer.country || 'FI',
        phone: req.body.customer.phone,
      },
    };

    // Make request to Klarna API
    const response = await axios.post(
      `${KLARNA_API_URL}/checkout/v3/orders`,
      orderData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${KLARNA_USERNAME}:${KLARNA_PASSWORD}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Return Klarna response to client
    res.json(response.data);
  } catch (error) {
    console.error('Klarna API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to create Klarna order',
      details: error.response?.data || error.message,
    });
  }
});

export default klarnaRouter;
