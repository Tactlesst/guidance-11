import pool from '@/lib/db';

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { userId, studentId } = query;

        if (studentId) {
          // Fetch single student
          const result = await pool.query(
            `SELECT * FROM basic_ed_students WHERE id = $1`,
            [studentId]
          );

          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
          }

          const student = result.rows[0];

          // Structure response to match frontend expectations
          const response = {
            id: student.id,
            schoolYear: student.school_year,
            gradeYearLevel: student.grade_year_level,
            studentType: student.student_type,
            student: {
              lastName: student.last_name || '',
              firstName: student.first_name || '',
              middleName: student.middle_name || '',
              suffix: student.suffix || '',
              gender: student.gender || '',
              citizenship: student.citizenship || ''
            },
            contact: {
              contactNumber: student.contact_number || '',
              address: student.address || ''
            },
            birth: {
              month: student.birth_month || '',
              day: student.birth_day || '',
              year: student.birth_year || '',
              place: student.birth_place || ''
            },
            religion: student.religion || '',
            sacraments: {
              baptism: student.baptism || { received: false, date: '', church: '' },
              firstCommunion: student.first_communion || { received: false, date: '', church: '' },
              confirmation: student.confirmation || { received: false, date: '', church: '' }
            },
            emergency_contact: {
              name: student.emergency_contact || '',
              relation: student.emergency_relation || '',
              number: student.emergency_number || ''
            },
            father: {
              lastName: student.father_name?.split(' ')[0] || '',
              firstName: student.father_name?.split(' ').slice(1).join(' ') || '',
              middleName: '',
              occupation: student.father_occupation || '',
              location: student.father_location || '',
              employmentType: student.father_employment_type || '',
              status: student.father_status || '',
              education: student.father_education || '',
              specialization: student.father_specialization || ''
            },
            mother: {
              lastName: student.mother_name?.split(' ')[0] || '',
              firstName: student.mother_name?.split(' ').slice(1).join(' ') || '',
              middleName: '',
              occupation: student.mother_occupation || '',
              location: student.mother_location || '',
              employmentType: student.mother_employment_type || '',
              status: student.mother_status || '',
              education: student.mother_education || '',
              specialization: student.mother_specialization || ''
            },
            parentsMaritalStatus: student.parents_marital_status || '',
            childResidence: {
              residence: student.child_residence || '',
              other: student.child_residence_other || ''
            },
            birthOrder: {
              order: student.birth_order || '',
              other: student.other_birth_order || ''
            },
            numberOfSiblings: student.number_of_siblings || { total: '', brothers: '', sisters: '', stepBrothers: '', stepSisters: '', adopted: '' },
            otherRelatives: {
              relatives: student.other_relatives?.relatives || [],
              otherSpecify: student.other_relative_specify || ''
            },
            familyMonthlyIncome: student.family_monthly_income || '',
            residenceType: student.residence_type || '',
            languagesSpokenAtHome: student.languages_spoken_at_home || '',
            financialSupport: student.financial_support || [],
            otherFinancialSupport: student.other_financial_support || '',
            leisureActivities: student.leisure_activities || [],
            otherLeisureActivity: student.other_leisure_activity || '',
            specialTalents: student.special_talents || '',
            guardian: {
              name: student.guardian_name || '',
              relationship: student.guardian_relationship || '',
              otherRelationship: student.other_guardian_relationship || '',
              address: student.guardian_address || ''
            },
            siblings: student.siblings || [],
            education: {
              preschool: student.preschool || { school: '', awards: '', year: '' },
              elementary: student.elementary || { school: '', awards: '', year: '' },
              highSchool: student.high_school || { school: '', awards: '', year: '' }
            },
            organizations: student.organizations || [],
            physicalInfo: {
              height: student.height || '',
              weight: student.weight || '',
              condition: student.physical_condition || '',
              healthProblem: student.health_problem || '',
              healthProblemDetails: student.health_problem_details || '',
              allergies: '' // Not stored in schema, default empty
            },
            testResults: student.test_results || [],
            signatureName: student.signature_name || '',
            signatureDate: student.signature_date || '',
            parentSignatureName: student.parent_signature_name || '',
            parentSignatureDate: student.parent_signature_date || '',
            studentPhotoUrl: student.student_photo_url || ''
          };

          return res.status(200).json(response);
        } else {
          // Fetch all students
          const result = await pool.query(
            `SELECT id, school_year, grade_year_level, student_type, last_name, first_name, middle_name, gender, citizenship, created_at 
             FROM basic_ed_students WHERE id = $1 ORDER BY created_at DESC`,
            [userId]
          );
          return res.status(200).json(result.rows);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

    case 'POST':
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Destructure with defaults, mapping to frontend structure
        const {
          schoolYear, gradeYearLevel, studentType,
          student: { lastName, firstName, middleName = null, suffix = null, gender, citizenship } = {},
          contact: { contactNumber = null, address } = {},
          birth: { month, day, year, place } = {},
          religion,
          sacraments: { baptism = {}, firstCommunion = {}, confirmation = {} } = {},
          emergency_contact: { name: emergencyContact = null, relation: emergencyRelation = null, number: emergencyNumber = null } = {},
          father = {}, mother = {},
          parentsMaritalStatus = null,
          childResidence: { residence: childResidence = null, other: childResidenceOther = null } = {},
          birthOrder: { order: birthOrder = null, other: otherBirthOrder = null } = {},
          numberOfSiblings = {},
          otherRelatives: { relatives: otherRelativesAtHome = [], otherSpecify: otherRelativeSpecify = null } = {},
          familyMonthlyIncome = null,
          residenceType = null,
          languagesSpokenAtHome = null,
          financialSupport = [],
          otherFinancialSupport = null,
          leisureActivities = [],
          otherLeisureActivity = null,
          specialTalents = null,
          guardian: { name: guardianName = null, relationship: guardianRelationship = null, otherRelationship: otherGuardianRelationship = null, address: guardianAddress = null } = {},
          siblings = [],
          education: { preschool = {}, elementary = {}, highSchool = {} } = {},
          organizations = [],
          physicalInfo: { height = null, weight = null, condition: physicalCondition = null, healthProblem = null, healthProblemDetails = null, allergies = null } = {},
          testResults = [],
          signatureName,
          signatureDate,
          parentSignatureName = null,
          parentSignatureDate = null,
          studentPhotoUrl = null
        } = body;

        const userId = query.userId;

        // Validate required fields
        const requiredFields = { userId, schoolYear, gradeYearLevel, studentType, lastName, firstName, address, month, day, year, place, religion, signatureName, signatureDate };
        const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([field]) => field);

        if (missingFields.length > 0) {
          return res.status(400).json({ error: 'Missing required fields', missingFields });
        }

        // Prepare values for main student table
        const values = [
          userId,
          schoolYear,
          gradeYearLevel,
          studentType,
          lastName,
          firstName,
          middleName,
          suffix,
          gender,
          citizenship,
          contactNumber,
          address,
          month,
          day,
          year,
          place,
          religion,
          baptism,
          firstCommunion,
          confirmation,
          emergencyContact,
          emergencyRelation,
          emergencyNumber,
          `${father.firstName || ''} ${father.lastName || ''}`.trim(),
          father.occupation || null,
          father.location || null,
          father.employmentType || null,
          father.status || null,
          father.education || null,
          father.specialization || null,
          `${mother.firstName || ''} ${mother.lastName || ''}`.trim(),
          mother.occupation || null,
          mother.location || null,
          mother.employmentType || null,
          mother.status || null,
          mother.education || null,
          mother.specialization || null,
          parentsMaritalStatus,
          childResidence,
          childResidenceOther,
          birthOrder,
          otherBirthOrder,
          numberOfSiblings,
          { relatives: otherRelativesAtHome, otherSpecify: otherRelativeSpecify },
          otherRelativesAtHome.length || null,
          otherRelativeSpecify,
          familyMonthlyIncome,
          residenceType,
          languagesSpokenAtHome,
          financialSupport,
          otherFinancialSupport,
          leisureActivities,
          otherLeisureActivity,
          specialTalents,
          guardianName,
          guardianRelationship,
          otherGuardianRelationship,
          guardianAddress,
          siblings,
          preschool,
          elementary,
          highSchool,
          organizations,
          height,
          weight,
          physicalCondition,
          healthProblem,
          healthProblemDetails,
          null, // last_doctor_visit (not in frontend, default null)
          null, // last_doctor_visit_reason (not in frontend, default null)
          null, // general_condition (not in frontend, default null)
          testResults,
          signatureName,
          signatureDate,
          parentSignatureName,
          parentSignatureDate,
          studentPhotoUrl
        ];

        // Insert student
        const studentResult = await client.query(
          `INSERT INTO basic_ed_students (
            id, school_year, grade_year_level, student_type, last_name, first_name, middle_name, suffix, gender,
            citizenship, contact_number, address, birth_month, birth_day, birth_year, birth_place, religion,
            baptism, first_communion, confirmation, emergency_contact, emergency_relation, emergency_number,
            father_name, father_occupation, father_location, father_employment_type, father_status, father_education,
            father_specialization, mother_name, mother_occupation, mother_location, mother_employment_type,
            mother_status, mother_education, mother_specialization, parents_marital_status, child_residence,
            child_residence_other, birth_order, other_birth_order, number_of_siblings, other_relatives,
            total_relatives_at_home, other_relative_specify, family_monthly_income, residence_type,
            languages_spoken_at_home, financial_support, other_financial_support, leisure_activities,
            other_leisure_activity, special_talents, guardian_name, guardian_relationship, other_guardian_relationship,
            guardian_address, siblings, preschool, elementary, high_school, organizations, height, weight,
            physical_condition, health_problem, health_problem_details, last_doctor_visit, last_doctor_visit_reason,
            general_condition, test_results, signature_name, signature_date, parent_signature_name, parent_signature_date,
            student_photo_url
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
            $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58,
            $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75
          )
          RETURNING id`,
          values
        );

        await client.query('COMMIT');
        return res.status(201).json({ id: studentResult.rows[0].id, message: 'Student created successfully' });
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating student:', error);
        return res.status(500).json({
          error: 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      } finally {
        client.release();
      }

    case 'PUT':
      const clientPut = await pool.connect();
      try {
        await clientPut.query('BEGIN');

        const studentId = query.studentId;
        if (!studentId) {
          return res.status(400).json({ error: 'Student ID is required' });
        }

        // Destructure with defaults, mapping to frontend structure
        const {
          schoolYear, gradeYearLevel, studentType,
          student: { lastName, firstName, middleName = null, suffix = null, gender, citizenship } = {},
          contact: { contactNumber = null, address } = {},
          birth: { month, day, year, place } = {},
          religion,
          sacraments: { baptism = {}, firstCommunion = {}, confirmation = {} } = {},
          emergency_contact: { name: emergencyContact = null, relation: emergencyRelation = null, number: emergencyNumber = null } = {},
          father = {}, mother = {},
          parentsMaritalStatus = null,
          childResidence: { residence: childResidence = null, other: childResidenceOther = null } = {},
          birthOrder: { order: birthOrder = null, other: otherBirthOrder = null } = {},
          numberOfSiblings = {},
          otherRelatives: { relatives: otherRelativesAtHome = [], otherSpecify: otherRelativeSpecify = null } = {},
          familyMonthlyIncome = null,
          residenceType = null,
          languagesSpokenAtHome = null,
          financialSupport = [],
          otherFinancialSupport = null,
          leisureActivities = [],
          otherLeisureActivity = null,
          specialTalents = null,
          guardian: { name: guardianName = null, relationship: guardianRelationship = null, otherRelationship: otherGuardianRelationship = null, address: guardianAddress = null } = {},
          siblings = [],
          education: { preschool = {}, elementary = {}, highSchool = {} } = {},
          organizations = [],
          physicalInfo: { height = null, weight = null, condition: physicalCondition = null, healthProblem = null, healthProblemDetails = null, allergies = null } = {},
          testResults = [],
          signatureName,
          signatureDate,
          parentSignatureName = null,
          parentSignatureDate = null,
          studentPhotoUrl = null
        } = body;

        // Validate required fields
        const requiredFields = { studentId, schoolYear, gradeYearLevel, studentType, lastName, firstName, address, month, day, year, place, religion, signatureName, signatureDate };
        const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([field]) => field);

        if (missingFields.length > 0) {
          return res.status(400).json({ error: 'Missing required fields', missingFields });
        }

        // Prepare values for update
        const values = [
          studentId,
          schoolYear,
          gradeYearLevel,
          studentType,
          lastName,
          firstName,
          middleName,
          suffix,
          gender,
          citizenship,
          contactNumber,
          address,
          month,
          day,
          year,
          place,
          religion,
          baptism,
          firstCommunion,
          confirmation,
          emergencyContact,
          emergencyRelation,
          emergencyNumber,
          `${father.firstName || ''} ${father.lastName || ''}`.trim(),
          father.occupation || null,
          father.location || null,
          father.employmentType || null,
          father.status || null,
          father.education || null,
          father.specialization || null,
          `${mother.firstName || ''} ${mother.lastName || ''}`.trim(),
          mother.occupation || null,
          mother.location || null,
          mother.employmentType || null,
          mother.status || null,
          mother.education || null,
          mother.specialization || null,
          parentsMaritalStatus,
          childResidence,
          childResidenceOther,
          birthOrder,
          otherBirthOrder,
          numberOfSiblings,
          { relatives: otherRelativesAtHome, otherSpecify: otherRelativeSpecify },
          otherRelativesAtHome.length || null,
          otherRelativeSpecify,
          familyMonthlyIncome,
          residenceType,
          languagesSpokenAtHome,
          financialSupport,
          otherFinancialSupport,
          leisureActivities,
          otherLeisureActivity,
          specialTalents,
          guardianName,
          guardianRelationship,
          otherGuardianRelationship,
          guardianAddress,
          siblings,
          preschool,
          elementary,
          highSchool,
          organizations,
          height,
          weight,
          physicalCondition,
          healthProblem,
          healthProblemDetails,
          null, // last_doctor_visit
          null, // last_doctor_visit_reason
          null, // general_condition
          testResults,
          signatureName,
          signatureDate,
          parentSignatureName,
          parentSignatureDate,
          studentPhotoUrl
        ];

        // Update student
        const updateResult = await clientPut.query(
          `UPDATE basic_ed_students SET
            school_year = $2, grade_year_level = $3, student_type = $4, last_name = $5, first_name = $6, middle_name = $7,
            suffix = $8, gender = $9, citizenship = $10, contact_number = $11, address = $12, birth_month = $13,
            birth_day = $14, birth_year = $15, birth_place = $16, religion = $17, baptism = $18, first_communion = $19,
            confirmation = $20, emergency_contact = $21, emergency_relation = $22, emergency_number = $23,
            father_name = $24, father_occupation = $25, father_location = $26, father_employment_type = $27,
            father_status = $28, father_education = $29, father_specialization = $30, mother_name = $31,
            mother_occupation = $32, mother_location = $33, mother_employment_type = $34, mother_status = $35,
            mother_education = $36, mother_specialization = $37, parents_marital_status = $38, child_residence = $39,
            child_residence_other = $40, birth_order = $41, other_birth_order = $42, number_of_siblings = $43,
            other_relatives = $44, total_relatives_at_home = $45, other_relative_specify = $46, family_monthly_income = $47,
            residence_type = $48, languages_spoken_at_home = $49, financial_support = $50, other_financial_support = $51,
            leisure_activities = $52, other_leisure_activity = $53, special_talents = $54, guardian_name = $55,
            guardian_relationship = $56, other_guardian_relationship = $57, guardian_address = $58, siblings = $59,
            preschool = $60, elementary = $61, high_school = $62, organizations = $63, height = $64, weight = $65,
            physical_condition = $66, health_problem = $67, health_problem_details = $68, last_doctor_visit = $69,
            last_doctor_visit_reason = $70, general_condition = $71, test_results = $72, signature_name = $73,
            signature_date = $74, parent_signature_name = $75, parent_signature_date = $76, student_photo_url = $77,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $1
          RETURNING id`,
          values
        );

        if (updateResult.rows.length === 0) {
          return res.status(404).json({ error: 'Student not found' });
        }

        await clientPut.query('COMMIT');
        return res.status(200).json({ id: studentId, message: 'Student updated successfully' });
      } catch (error) {
        await clientPut.query('ROLLBACK');
        console.error('Error updating student:', error);
        return res.status(500).json({
          error: 'Internal server error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      } finally {
        clientPut.release();
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}