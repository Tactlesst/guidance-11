import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    // Admin authentication (simplified; replace with proper session/JWT in production)
    const usertype = req.headers['x-usertype'] || '';
    if (usertype !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized: Admin access required' });
    }

    if (method === 'GET') {
        // Read: Fetch all users
        try {
            const query = `
        SELECT id, username, email, usertype, first_name, last_name, status
        FROM users
        ORDER BY created_at DESC
      `;
            const result = await pool.query(query);
            return res.status(200).json({ success: true, users: result.rows });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    } else if (method === 'POST') {
        // Create: Add a new user
        const { username, email, password, usertype, firstName, lastName, status = 'active' } = req.body;

        // Validate input
        if (!username || !email || !password || !usertype || !firstName || !lastName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!['admin', 'student', 'guidance_advocate'].includes(usertype)) {
            return res.status(400).json({ error: 'Invalid user type' });
        }
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            return res.status(400).json({ error: 'Username must be 3-20 characters (letters, numbers, underscores)' });
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }
        if (!/^[a-zA-Z\s-]{1,100}$/.test(firstName)) {
            return res.status(400).json({ error: 'First name must be 1-100 characters (letters, spaces, or hyphens)' });
        }
        if (!/^[a-zA-Z\s-]{1,100}$/.test(lastName)) {
            return res.status(400).json({ error: 'Last name must be 1-100 characters (letters, spaces, or hyphens)' });
        }
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        try {
            // Start transaction
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                // Check for existing username or email
                const checkQuery = 'SELECT id FROM users WHERE username = $1 OR email = $2';
                const checkValues = [username, email];
                const checkResult = await client.query(checkQuery, checkValues);
                if (checkResult.rows.length > 0) {
                    await client.query('ROLLBACK');
                    return res.status(409).json({ error: 'Username or email already exists' });
                }

                // Hash password
                const passwordHash = await bcrypt.hash(password, 12);

                // Insert new user
                const insertQuery = `
  INSERT INTO users (username, email, password_hash, usertype, first_name, last_name, status)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id, username, email, usertype, first_name, last_name, status
`;
                const insertValues = [username, email, passwordHash, usertype, firstName, lastName, status];
                const result = await client.query(insertQuery, insertValues);

                await client.query('COMMIT');
                return res.status(201).json({
                    success: true,
                    user: result.rows[0],
                });
            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Create user error:', error);
                return res.status(500).json({ error: 'Server error' });
            } finally {
                client.release();
            }
        } catch (error) {
            console.error('Database connection error:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}