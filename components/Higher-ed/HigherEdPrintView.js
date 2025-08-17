const HigherEdPrintView = ({ student }) => {
  if (!student) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">St. Rita's College of Balingasag</h1>
        <h2 className="text-xl">Higher Education Department</h2>
        <h3 className="text-lg">GUIDANCE CENTER</h3>
        <h4 className="text-md font-semibold mt-4">Personal Data Sheet</h4>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-semibold">Semester, SY:</span> {student.semesterAndYear || '________________'}
          </div>
          <div>
            <span className="font-semibold">Course & Year:</span> {student.courseAndYear || '________________'}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {student.studentPhotoUrl ? (
            <img 
              src={student.studentPhotoUrl} 
              alt="Student" 
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
              <span className="text-gray-400">Photo</span>
            </div>
          )}
          <div>
            <div className="text-sm text-gray-500">Student Type:</div>
            <div className="font-medium">{student.studentType || '________________'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">I. PERSONAL DATA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Name:</div>
              <div className="font-medium">{student.lastName || '________________'}, {student.givenName || '________________'} {student.middleName || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Nickname:</div>
              <div className="font-medium">{student.nickname || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Sex:</div>
              <div className="font-medium">{student.gender || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date of Birth:</div>
              <div className="font-medium">{student.birthDate || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Place of Birth:</div>
              <div className="font-medium">{student.birthPlace || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Age:</div>
              <div className="font-medium">{student.age || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Religion:</div>
              <div className="font-medium">{student.religion || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Nationality:</div>
              <div className="font-medium">{student.nationality || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Civil Status:</div>
              <div className="font-medium">{student.civilStatus || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Contact Number:</div>
              <div className="font-medium">{student.contactNumber || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email Address:</div>
              <div className="font-medium">{student.email || '________________'}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Home Address:</div>
            <div className="font-medium">{student.homeAddress || '________________________________________________________________'}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">City Address (if boarding):</div>
            <div className="font-medium">{student.cityAddress || '________________________________________________________________'}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Emergency Contact Person:</div>
              <div className="font-medium">{student.emergencyContact || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Relationship:</div>
              <div className="font-medium">{student.emergencyRelation || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Contact Number:</div>
              <div className="font-medium">{student.emergencyNumber || '________________'}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">II. FAMILY INFORMATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h4 className="font-medium mb-2">Father's Information</h4>
              <div className="space-y-1">
                <div>
                  <div className="text-sm text-gray-500">Name:</div>
                  <div className="font-medium">{student.fatherLastName || '________________'}, {student.fatherFirstName || '________________'} {student.fatherMiddleName || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Occupation:</div>
                  <div className="font-medium">{student.fatherOccupation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location:</div>
                  <div className="font-medium">{student.fatherLocation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Employment Type:</div>
                  <div className="font-medium">{student.fatherEmploymentType || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status:</div>
                  <div className="font-medium">{student.fatherStatus || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Highest Education:</div>
                  <div className="font-medium">{student.fatherEducation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Specialization:</div>
                  <div className="font-medium">{student.fatherSpecialization || '________________'}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Mother's Information</h4>
              <div className="space-y-1">
                <div>
                  <div className="text-sm text-gray-500">Name:</div>
                  <div className="font-medium">{student.motherLastName || '________________'}, {student.motherFirstName || '________________'} {student.motherMiddleName || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Occupation:</div>
                  <div className="font-medium">{student.motherOccupation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location:</div>
                  <div className="font-medium">{student.motherLocation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Employment Type:</div>
                  <div className="font-medium">{student.motherEmploymentType || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status:</div>
                  <div className="font-medium">{student.motherStatus || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Highest Education:</div>
                  <div className="font-medium">{student.motherEducation || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Specialization:</div>
                  <div className="font-medium">{student.motherSpecialization || '________________'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Parents' Marital Status:</div>
              <div className="font-medium">{student.parentsMaritalStatus || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Child is Residing With:</div>
              <div className="font-medium">{student.childResidingWith || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Birth Order:</div>
              <div className="font-medium">{student.birthOrder || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Number of Siblings:</div>
              <div className="font-medium">{student.siblingsCount || '________________'}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Other Relatives at Home:</div>
            <div className="font-medium">
              {student.relativesAtHome.length > 0 ? 
                student.relativesAtHome.join(', ') + (student.otherRelatives ? ` (${student.otherRelatives})` : '') 
                : '________________'}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Total Number of Relatives at Home:</div>
            <div className="font-medium">{student.totalRelatives || '________________'}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Family Monthly Income:</div>
            <div className="font-medium">{student.familyIncome || '________________'}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Siblings (from Oldest to Youngest):</div>
            <table className="min-w-full border border-gray-200 mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Age</th>
                  <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">School Attended</th>
                  <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Occupation</th>
                </tr>
              </thead>
              <tbody>
                {student.siblings.map((sibling, index) => (
                  sibling.name && (
                    <tr key={index}>
                      <td className="border border-gray-300 px-2 py-1">{sibling.name}</td>
                      <td className="border border-gray-300 px-2 py-1">{sibling.age || '-'}</td>
                      <td className="border border-gray-300 px-2 py-1">{sibling.school || '-'}</td>
                      <td className="border border-gray-300 px-2 py-1">{sibling.status || '-'}</td>
                      <td className="border border-gray-300 px-2 py-1">{sibling.occupation || '-'}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Is your residence:</div>
              <div className="font-medium">
                {student.residenceType ? student.residenceType.charAt(0).toUpperCase() + student.residenceType.slice(1) : '________________'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Languages spoken at home:</div>
              <div className="font-medium">{student.languagesSpoken || '________________'}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Source of financial support:</div>
            <div className="font-medium">
              {student.financialSupport.length > 0 ? 
                student.financialSupport.join(', ') + (student.otherFinancialSupport ? ` (${student.otherFinancialSupport})` : '') 
                : '________________'}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Leisure activities of the family members:</div>
            <div className="font-medium">
              {student.leisureActivities.length > 0 ? 
                student.leisureActivities.join(', ') + (student.otherLeisureActivities ? ` (${student.otherLeisureActivities})` : '') 
                : '________________'}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">Special talent/s:</div>
            <div className="font-medium">{student.specialTalents || '________________'}</div>
          </div>

          {!student.livingWithParents && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">If not living with parents:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Guardian's Name:</div>
                  <div className="font-medium">{student.guardianName || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address:</div>
                  <div className="font-medium">{student.guardianAddress || '________________'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Relation:</div>
                  <div className="font-medium">
                    {student.guardianRelation === 'other' ? 
                      student.otherGuardianRelation : 
                      student.guardianRelation || '________________'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">III. EDUCATIONAL BACKGROUND</h3>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Level</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">School Attended/School Address</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Awards/Honors Received</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">School Year Attended</th>
              </tr>
            </thead>
            <tbody>
              {['preschool', 'gradeSchool', 'highSchool'].map(level => (
                <tr key={level}>
                  <td className="border border-gray-300 px-2 py-1 capitalize">
                    {level === 'preschool' ? 'Preschool' : level === 'gradeSchool' ? 'Grade School' : 'High School'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {student.educationBackground[level].school || '________________'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {student.educationBackground[level].awards || '________________'}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {student.educationBackground[level].year || '________________'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">IV. ORGANIZATIONAL AFFILIATIONS</h3>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">School Year</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Organization/Club</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Designation</th>
              </tr>
            </thead>
            <tbody>
              {student.organizations.map((org, index) => (
                org.organization && (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{org.year || '________________'}</td>
                    <td className="border border-gray-300 px-2 py-1">{org.organization}</td>
                    <td className="border border-gray-300 px-2 py-1">{org.designation || '________________'}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">V. HEALTH</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Height:</div>
              <div className="font-medium">{student.height || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Weight:</div>
              <div className="font-medium">{student.weight || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Physical Condition:</div>
              <div className="font-medium">{student.physicalCondition || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Any physical handicap or health problem:</div>
              <div className="font-medium">
                {student.healthProblem === "Yes" ? 
                  `Yes (${student.healthProblemDetails || 'No details'})` : 
                  'No'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">When was your last visit to the doctor?</div>
              <div className="font-medium">{student.lastDoctorVisit || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Why?</div>
              <div className="font-medium">{student.doctorVisitReason || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">General Condition:</div>
              <div className="font-medium">{student.generalCondition || '________________'}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">VI. TEST RESULTS</h3>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Test Taken</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Date Taken</th>
                <th className="border border-gray-300 px-2 py-1 text-left text-xs font-medium text-gray-500">Rating</th>
              </tr>
            </thead>
            <tbody>
              {student.testResults.map((test, index) => (
                test.test && (
                  <tr key={index}>
                    <td className="border border-gray-300 px-2 py-1">{test.test}</td>
                    <td className="border border-gray-300 px-2 py-1">{test.date || '________________'}</td>
                    <td className="border border-gray-300 px-2 py-1">{test.rating || '________________'}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b border-black mb-2">CONSENT</h3>
          <div className="mb-4 text-sm">
            <p className="mb-2">
              St. Rita's College of Balingasag – Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and it's implementing rules and regulations. SRCB – Guidance Center will not collect, disclose or process personal data, including data that may classified as personal information and/or sensitive personal information unless you voluntarily choose to provide us with it and give your consent thereto, or unless such disclosure is required by applicable laws and regulations.
            </p>
            <p>
              By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB – Guidance Center shall be processed by them for the purposes of carrying out their Guidance Program Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Signature over printed name:</div>
              <div className="font-medium">{student.signature || '________________'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Date Signed:</div>
              <div className="font-medium">{student.signatureDate || '________________'}</div>
            </div>
          </div>

          {student.age < 18 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Signature of Parent/Guardian over printed name:</div>
                <div className="font-medium">{student.parentSignature || '________________'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date Signed:</div>
                <div className="font-medium">{student.parentSignatureDate || '________________'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HigherEdPrintView;