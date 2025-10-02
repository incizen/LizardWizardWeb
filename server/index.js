require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 5000);


const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is required in server/.env (see .env.example)');
  process.exit(1);
}

mongoose.set('strictQuery', true);

(async () => {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, family: 4 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

//Middleware 
app.use(cors());          
app.use(express.json());  


const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, default: 'N/A', trim: true },
    description: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);


app.get('/api/health', (_req, res) => res.json({ ok: true }));

//Products
app.get('/api/products', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
    const docs = await Product.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/products', async (req, res) => {
  try {
    const { name, price, type, description, image } = req.body || {};
    if (!name || typeof price !== 'number') {
      return res.status(400).json({ error: 'name and numeric price are required' });
    }
    const doc = await Product.create({ name, price, type, description, image });
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Bad Request' });
  }
});




app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  server.close(() => mongoose.connection.close(false).then(() => process.exit(0)));
});


module.exports = app;


