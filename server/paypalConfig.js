const paypal = require('paypal-rest-sdk');

// PayPal configuration
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID || 'your_client_id_here',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || 'your_client_secret_here'
});

module.exports = paypal; 