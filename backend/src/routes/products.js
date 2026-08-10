import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/products
// "image_url AS image" matches the field name your frontend (products.js,
// cart.js) already expects, so components don't need to change.
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
