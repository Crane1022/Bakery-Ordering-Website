import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { testConnection } from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import reviewRoutes from './routes/reviews.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Vercel sets process.env.VERCEL = '1' automatically
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  testConnection().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
