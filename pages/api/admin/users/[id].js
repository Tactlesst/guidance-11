import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  // Admin authentication (simplified; replace with proper session/JWT in production)
  const usertype = req.headers['x-usertype'] || '';
  if (usertype !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized: Admin access required' });
  }

  // Validate ID
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  if (method === 'PATCH') {
    // Update: Modify user details
    const { username, email, password, usertype, firstName, lastName, status } = req.body;

    // Validate input
    if (username && !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 characters (letters, numbers, underscores)' });
    }
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' });
    }
    if (usertype && !['admin', 'student', 'guidance_advocate'].includes(usertype)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    if (firstName && !/^[a-zA-Z\s-]{1,100}$/.test(firstName)) {
      return res.status(400).json({ error: 'First name must be 1-100 characters (letters, spaces, or hyphens)' });
    }
    if (lastName && !/^[a-zA-Z\s-]{1,100}$/.test(lastName)) {
      return res.status(400).json({ error: 'Last name must be 1-100 characters (letters, spaces, or hyphens)' });
    }
    if (status && !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    try {
      // Start transaction
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Check for existing username or email (excluding current user)
        if (username || email) {
          const checkQuery = 'SELECT id FROM users WHERE (username = $1 OR email = $2) AND id != $3';
          const checkValues = [username || '', email || '', id];
          const checkResult = await client.query(checkQuery, checkValues);
          if (checkResult.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'Username or email already exists' });
          }
        }

        // Build update query dynamically
        const updates = [];
        const values = [];
        let index = 1;

        if (username) {
          updates.push(`username = $${index++}`);
          values.push(username);
        }
        if (email) {
          updates.push(`email = $${index++}`);
          values.push(email);
        }
        if (password) {
          const passwordHash = await bcrypt.hash(password, 12);
          updates.push(`password_hash = $${index++}`);
          values.push(passwordHash);
        }
        if (usertype) {
          updates.push(`usertype = $${index++}`);
          values.push(usertype);
        }
        if (firstName) {
          updates.push(`first_name = $${index++}`);
          values.push(firstName);
        }
        if (lastName) {
          updates.push(`last_name = $${index++}`);
          values.push(lastName);
        }
        if (status) {
          updates.push(`status = $${index++}`);
          values.push(status);
        }
        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        if (updates.length === 0) {
          await client.query('ROLLBACK');
          return res.status(400).json({ error: 'No fields provided for update' });
        }

        const updateQuery = `
          UPDATE users
          SET ${updates.join(', ')}
          WHERE id = $${index}
          RETURNING id, username, email, usertype, first_name, last_name, status
        `;
        const result = await client.query(updateQuery, values);

        if (result.rows.length === 0) {
          await client.query('ROLLBACK');
          return res.status(404).json({ error: 'User not found' });
        }

        await client.query('COMMIT');
        return res.status(200).json({ success: true, user: result.rows[0] });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Update user error:', error);
        return res.status(500).json({ error: 'Server error' });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else if (method === 'DELETE') {
    // Delete: Remove a user
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}