// pages/api/login.js
import jwt from 'jsonwebtoken';

const SECRET = 'your-secret-key'; // (move to env later)

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  // Fake login validation
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

    res.setHeader('Set-Cookie', `authToken=${token}; HttpOnly; Path=/; Max-Age=3600`);
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
