// server/index.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Mongo connection (Atlas) ----
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is required in server/.env (see .env.example)');
  process.exit(1);
}

mongoose.set('strictQuery', true);
mongoose
  .connect(uri, { serverSelectionTimeoutMS: 10000, family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// ---- Middleware ----
app.use(cors());            // not strictly needed if you use CRA proxy, but safe
app.use(express.json());    // replaces body-parser

// ---- Data models ----
const productSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);

// ---- Health endpoint (quick smoke test) ----
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// ---- Products ----
// List with optional search: /api/products?q=term
app.get('/api/products', async (req, res) => {
  try {
    const q = req.query.q?.trim();
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create (for your Add Product form)
app.post('/api/products', async (req, res) => {
  try {
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// ---- OPTIONAL: seed route for quick demo (remove in prod) ----
app.post('/api/dev/seed', async (_req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Men's Casual T-shirt",
        type: 'Men',
        description: 'Comfortable and stylish casual T-shirt for men',
        price: 350,
        image:
          'https://media.geeksforgeeks.org/wp-content/uploads/20230407153931/gfg-tshirts.jpg',
      },
      {
        name: 'Luxury bag',
        type: 'Not Applicable',
        description: 'Elegant luxury bag with leather strap',
        price: 2500,
        image:
          'https://media.geeksforgeeks.org/wp-content/uploads/20230407154213/gfg-bag.jpg',
      },
    ]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'seed failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

