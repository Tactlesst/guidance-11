import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await pool.connect();
      
      const { 
        userId, 
        name, 
        gradeSection, 
        date, 
        time, 
        counselor, 
        status, 
        purpose, 
        nature, 
        referredBy, 
        personalConcerns, 
        educationConcerns, 
        otherPersonalConcern, 
        otherEducationConcern, 
        remarks 
      } = req.body;

      // Validate required fields
      if (!userId || !name || !date || !purpose || !nature) {
        client.release();
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const query = `
        INSERT INTO appointments (
          user_id, name, grade_section, appointment_date, appointment_time, 
          counselor, status, purpose, nature, referred_by, 
          personal_concerns, education_concerns, other_personal_concern, 
          other_education_concern, remarks
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id
      `;

      const values = [
        userId, 
        name, 
        gradeSection, 
        date, 
        time, 
        counselor, 
        status, 
        purpose, 
        nature, 
        referredBy, 
        personalConcerns, 
        educationConcerns, 
        otherPersonalConcern, 
        otherEducationConcern, 
        remarks
      ];

      const result = await client.query(query, values);
      client.release();

      res.status(201).json({ id: result.rows[0].id, message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}