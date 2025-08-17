//pages/api/students/appoinments/list.js
import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const client = await pool.connect();
      const query = `
        SELECT 
          id, 
          appointment_date AS date, 
          appointment_time AS time, 
          counselor, 
          status, 
          purpose AS type 
        FROM appointments 
        WHERE user_id = $1 
        ORDER BY appointment_date, appointment_time
      `;
      const result = await client.query(query, [userId]);
      client.release();

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}