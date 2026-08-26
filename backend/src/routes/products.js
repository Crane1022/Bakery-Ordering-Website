import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, price, image_url AS image, category, tag, stock, created_at
       FROM products ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/debug-env  (must come BEFORE /:id)
router.get('/debug-env', async (req, res) => {
  const envStatus = {
    DB_HOST: process.env.DB_HOST ? 'SET' : 'MISSING',
    DB_PORT: process.env.DB_PORT ? 'SET' : 'MISSING',
    DB_USER: process.env.DB_USER ? 'SET' : 'MISSING',
    DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING',
    DB_NAME: process.env.DB_NAME ? 'SET' : 'MISSING',
  };

  try {
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();
    res.json({ ...envStatus, dbConnection: 'SUCCESS' });
  } catch (err) {
    res.json({
      ...envStatus,
      dbConnection: 'FAILED',
      errorMessage: err.message,
      errorCode: err.code || null
    });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, price, image_url AS image, category, tag, stock, created_at
       FROM products WHERE id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;