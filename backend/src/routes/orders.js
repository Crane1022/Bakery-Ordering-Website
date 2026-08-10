import { Router } from 'express';
import pool from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/orders  (requires login)
// Expects: { items: [{ product_id, quantity }], payment_method: string }
// Price and total are calculated server-side from the products table —
// never trust a price sent from the frontend.
router.post('/', requireAuth, async (req, res) => {
  const { items, payment_method } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let total = 0;
    const itemsWithPrices = [];

    for (const item of items) {
      const [rows] = await conn.query('SELECT id, price, stock FROM products WHERE id = ?', [
        item.product_id,
      ]);
      const product = rows[0];

      if (!product) {
        throw new Error(`Product ${item.product_id} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${item.product_id}`);
      }

      const lineTotal = Number(product.price) * item.quantity;
      total += lineTotal;
      itemsWithPrices.push({ ...item, price: product.price });
    }

    // Checkout's payment modal simulates an instant successful payment,
    // so the order is marked 'paid' right away rather than left 'pending'.
    await conn.query(
      `INSERT INTO orders (id, user_id, total, status, payment_method) VALUES (UUID(), ?, ?, 'paid', ?)`,
      [req.user.id, total, payment_method || null]
    );

    const [orderRow] = await conn.query(
      'SELECT id FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [req.user.id]
    );
    const orderId = orderRow[0].id;

    for (const item of itemsWithPrices) {
      await conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
      await conn.query('UPDATE products SET stock = stock - ? WHERE id = ?', [
        item.quantity,
        item.product_id,
      ]);
    }

    await conn.commit();
    res.status(201).json({ order_id: orderId, total: Number(total) });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to place order' });
  } finally {
    conn.release();
  }
});

// GET /api/orders/history  (requires login)
router.get('/history', requireAuth, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    for (const order of orders) {
      order.total = Number(order.total);

      const [items] = await pool.query(
        `SELECT order_items.quantity, order_items.price_at_purchase, products.name
         FROM order_items
         JOIN products ON products.id = order_items.product_id
         WHERE order_items.order_id = ?`,
        [order.id]
      );
      order.items = items.map((item) => ({
        ...item,
        price_at_purchase: Number(item.price_at_purchase),
      }));
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

export default router;
