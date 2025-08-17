import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const { rows } = await pool.query(`
          SELECT * FROM basic_ed_students
          ORDER BY created_at DESC
        `);
        res.status(200).json(rows);
        break;

      case 'POST':
        const studentData = req.body;
        const {
          studentType, student_photo_url, last_name, given_name, middle_name, suffix, gender, citizenship, age,
          address, birth_date, birth_place, contact_number, religion,
          baptism, first_communion, confirmation,
          father_name, father_occupation, father_status, father_education,
          mother_name, mother_occupation, mother_status, mother_education,
          parents_marital_status, residence_type, languages_spoken, family_income,
          financial_support, other_financial_support, leisure_activities, other_leisure_activities,
          special_interests, living_with_parents, guardian_name, guardian_relation, other_guardian_relation,
          guardian_address, health_problem, health_problem_details, general_condition,
          under_medication, medication_details, special_care, special_care_details,
          last_doctor_visit, doctor_visit_reason, siblings, education_background,
          organizations, test_results, signature_name, signature_date,
          parent_signature_name, parent_signature_date
        } = studentData;

        const { rows: [newStudent] } = await pool.query(`
          INSERT INTO basic_ed_students (
            student_type, student_photo_url, last_name, given_name, middle_name, suffix, gender, citizenship, age,
            address, birth_date, birth_place, contact_number, religion,
            baptism, first_communion, confirmation,
            father_name, father_occupation, father_status, father_education,
            mother_name, mother_occupation, mother_status, mother_education,
            parents_marital_status, residence_type, languages_spoken, family_income,
            financial_support, other_financial_support, leisure_activities, other_leisure_activities,
            special_interests, living_with_parents, guardian_name, guardian_relation, other_guardian_relation,
            guardian_address, health_problem, health_problem_details, general_condition,
            under_medication, medication_details, special_care, special_care_details,
            last_doctor_visit, doctor_visit_reason, siblings, education_background,
            organizations, test_results, signature_name, signature_date,
            parent_signature_name, parent_signature_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
                   $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
                   $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54)
          RETURNING id
        `, [
          studentType, student_photo_url, last_name, given_name, middle_name, suffix, gender, citizenship, age,
          address, birth_date || null, birth_place, contact_number, religion,
          JSON.stringify(baptism), JSON.stringify(first_communion), JSON.stringify(confirmation),
          father_name, father_occupation, father_status, father_education,
          mother_name, mother_occupation, mother_status, mother_education,
          parents_marital_status, residence_type, languages_spoken, family_income,
          financial_support, other_financial_support, leisure_activities, other_leisure_activities,
          special_interests, living_with_parents, guardian_name, guardian_relation, other_guardian_relation,
          guardian_address, health_problem, health_problem_details, general_condition,
          under_medication, medication_details, special_care, special_care_details,
          last_doctor_visit || null, doctor_visit_reason, JSON.stringify(siblings), JSON.stringify(education_background),
          JSON.stringify(organizations), JSON.stringify(test_results), signature_name, signature_date || null,
          parent_signature_name, parent_signature_date || null
        ]);

        res.status(201).json({ id: newStudent.id });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}