const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./src/routes/products.routes');

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean); // filter(Boolean) drops FRONTEND_URL if it's undefined locally

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);

// 404 fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
