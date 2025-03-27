const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const paypal = require('./paypalConfig'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb+srv://incizen06:0407@e-comwebproject.ztyamhj.mongodb.net/?retryWrites=true&w=majority&appName=E-comWebProject',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Define Product Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);


const seedDatabase = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    const products = [
      {
        name: "Men's Casual T-shirt",
        type: 'Men',
        description: 'Comfortable and stylish casual T-shirt for men',
        price: 350,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230407153931/gfg-tshirts.jpg'
      },
      {
        name: 'Luxury bag',
        type: 'Not Applicable',
        description: 'Elegant luxury bag with leather strap',
        price: 2500,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230407154213/gfg-bag.jpg'
      }
    ];

    await Product.insertMany(products);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();

// Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create PayPal Order
app.post('/api/create-paypal-order', (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [
      {
        amount: { total: amount, currency: 'USD' },
        description: 'Purchase from our store',
      }
    ],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating payment' });
    } else {
      res.json({ id: payment.id });
    }
  });
});


app.post('/api/capture-paypal-payment', (req, res) => {
  const { paymentId, payerId } = req.body;

  const execute_payment_json = { payer_id: payerId };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Payment execution failed' });
    } else {
      res.json({ success: true, payment });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
