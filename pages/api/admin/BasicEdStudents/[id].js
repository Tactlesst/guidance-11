import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  // Validate id is a positive integer
  const studentId = parseInt(id, 10);
  if (isNaN(studentId) || studentId <= 0) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  try {
    switch (method) {
      case 'GET':
        const { rows: [student] } = await pool.query('SELECT * FROM basic_ed_students WHERE id = $1', [studentId]);
        if (!student) {
          return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({
          ...student,
          baptism: JSON.parse(student.baptism),
          first_communion: JSON.parse(student.first_communion),
          confirmation: JSON.parse(student.confirmation),
          siblings: JSON.parse(student.siblings),
          education_background: JSON.parse(student.education_background),
          organizations: JSON.parse(student.organizations),
          test_results: JSON.parse(student.test_results),
        });
        break;

      case 'PUT':
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

        const { rowCount } = await pool.query(`
          UPDATE basic_ed_students SET
            student_type = $1, student_photo_url = $2, last_name = $3, given_name = $4, middle_name = $5,
            suffix = $6, gender = $7, citizenship = $8, age = $9, address = $10, birth_date = $11,
            birth_place = $12, contact_number = $13, religion = $14,
            baptism = $15, first_communion = $16, confirmation = $17,
            father_name = $18, father_occupation = $19, father_status = $20, father_education = $21,
            mother_name = $22, mother_occupation = $23, mother_status = $24, mother_education = $25,
            parents_marital_status = $26, residence_type = $27, languages_spoken = $28, family_income = $29,
            financial_support = $30, other_financial_support = $31, leisure_activities = $32, other_leisure_activities = $33,
            special_interests = $34, living_with_parents = $35, guardian_name = $36, guardian_relation = $37,
            other_guardian_relation = $38, guardian_address = $39, health_problem = $40, health_problem_details = $41,
            general_condition = $42, under_medication = $43, medication_details = $44, special_care = $45,
            special_care_details = $46, last_doctor_visit = $47, doctor_visit_reason = $48,
            siblings = $49, education_background = $50, organizations = $51, test_results = $52,
            signature_name = $53, signature_date = $54, parent_signature_name = $55, parent_signature_date = $56
          WHERE id = $57
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
          parent_signature_name, parent_signature_date || null, studentId
        ]);

        if (rowCount === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
        break;

      case 'DELETE':
        const result = await pool.query('DELETE FROM basic_ed_students WHERE id = $1', [studentId]);
        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    if (error.code === '22P02') { // PostgreSQL invalid input syntax for integer
      return res.status(400).json({ error: 'Invalid student ID format' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}