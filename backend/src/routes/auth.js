import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Register.vue sends a single "address" field (not "street"), plus dob/gender,
    // and "state" for the region -- matched here exactly to that payload shape.
    const { email, password, name, dob, gender, address, city, postcode, state } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (email, password_hash, name, dob, gender, street, city, postcode, state)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        passwordHash,
        name,
        dob || null,
        gender || null,
        address || null,
        city || null,
        postcode || null,
        state || null,
      ]
    );

    // "street AS address" makes the API response match the field name
    // Profile.vue already expects (it was written for the old localStorage
    // version, which used "address" not "street").
    const [rows] = await pool.query(
      `SELECT id, email, name, dob, gender, street AS address, city, postcode, state, created_at
       FROM users WHERE email = ?`,
      [email]
    );
    const user = rows[0];

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Strip password_hash, and rename street -> address to match what
    // Profile.vue expects (same reasoning as the register route above).
    const { password_hash, street, ...rest } = user;
    const safeUser = { ...rest, address: street };

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
});

export default router;