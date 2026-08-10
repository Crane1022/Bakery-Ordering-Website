import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/reviews/product/:productId
router.get('/product/:productId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT reviews.id, reviews.rating, reviews.comment, reviews.created_at,
              users.name AS reviewer_name
       FROM reviews
       JOIN users ON users.id = reviews.user_id
       WHERE reviews.product_id = ?
       ORDER BY reviews.created_at DESC`,
      [req.params.productId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews  (requires login)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating) {
      return res.status(400).json({ error: 'product_id and rating are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    await pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES (?, ?, ?, ?)`,
      [product_id, req.user.id, rating, comment || null]
    );

    res.status(201).json({ message: 'Review submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

export default router;
