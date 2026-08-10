import jwt from 'jsonwebtoken';

// Attaches req.user if a valid token is present, otherwise rejects the request.
// Use this on any route that should only work for logged-in users
// (placing orders, viewing own profile, submitting reviews, etc.)
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
