//api/login.js
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const query = 'SELECT id, username, password_hash, usertype, email, first_name, last_name FROM users WHERE username = $1 OR email = $1';
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length !== 1) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({
      success: true,
      usertype: user.usertype,
      firstName: user.first_name,
      lastName: user.last_name,
      userId: user.id 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}