import { FiX } from 'react-icons/fi';

const ViewStudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">Student Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <div className="flex items-start gap-6 mb-6">
            {student.studentPhotoUrl ? (
              <img 
                src={student.studentPhotoUrl} 
                alt="Student" 
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Photo</span>
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {student.lastName}, {student.givenName} {student.middleName}
              </h3>
              <p className="text-gray-600">{student.courseAndYear}</p>
              <p className="text-gray-600">{student.studentType}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nickname</p>
                  <p className="font-medium">{student.nickname || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sex</p>
                  <p className="font-medium">{student.gender || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{student.birthDate || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Place of Birth</p>
                  <p className="font-medium">{student.birthPlace || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{student.age || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Religion</p>
                  <p className="font-medium">{student.religion || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium">{student.nationality || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Civil Status</p>
                  <p className="font-medium">{student.civilStatus || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">{student.contactNumber || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{student.email || '-'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Home Address</p>
                  <p className="font-medium">{student.homeAddress || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City Address (if boarding)</p>
                  <p className="font-medium">{student.cityAddress || '-'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="font-medium">{student.emergencyContact || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium">{student.emergencyRelation || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-medium">{student.emergencyNumber || '-'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Family Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Father's Information</h5>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-500">Name:</span> {student.fatherFirstName} {student.fatherMiddleName} {student.fatherLastName}</p>
                    <p><span className="text-sm text-gray-500">Occupation:</span> {student.fatherOccupation || '-'}</p>
                    <p><span className="text-sm text-gray-500">Status:</span> {student.fatherStatus || '-'}</p>
                    <p><span className="text-sm text-gray-500">Education:</span> {student.fatherEducation || '-'}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Mother's Information</h5>
                  <div className="space-y-2">
                    <p><span className="text-sm text-gray-500">Name:</span> {student.motherFirstName} {student.motherMiddleName} {student.motherLastName}</p>
                    <p><span className="text-sm text-gray-500">Occupation:</span> {student.motherOccupation || '-'}</p>
                    <p><span className="text-sm text-gray-500">Status:</span> {student.motherStatus || '-'}</p>
                    <p><span className="text-sm text-gray-500">Education:</span> {student.motherEducation || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Residence Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Residence Type</p>
                  <p className="font-medium">{student.residenceType ? student.residenceType.charAt(0).toUpperCase() + student.residenceType.slice(1) : '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Languages Spoken at Home</p>
                  <p className="font-medium">{student.languagesSpoken || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Source of Financial Support</p>
                  <p className="font-medium">
                    {student.financialSupport.length > 0 ? 
                      student.financialSupport.join(', ') + (student.otherFinancialSupport ? ` (${student.otherFinancialSupport})` : '') 
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Leisure Activities</p>
                  <p className="font-medium">
                    {student.leisureActivities.length > 0 ? 
                      student.leisureActivities.join(', ') + (student.otherLeisureActivities ? ` (${student.otherLeisureActivities})` : '') 
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Special Talents</p>
                  <p className="font-medium">{student.specialTalents || '-'}</p>
                </div>
              </div>
            </div>

            {!student.livingWithParents && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Guardian Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Guardian's Name</p>
                    <p className="font-medium">{student.guardianName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{student.guardianAddress || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Relation</p>
                    <p className="font-medium">
                      {student.guardianRelation === 'other' ? 
                        student.otherGuardianRelation : 
                        student.guardianRelation || '-'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Educational Background</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards/Honors</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {['preschool', 'gradeSchool', 'highSchool'].map(level => (
                      <tr key={level}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                          {level === 'preschool' ? 'Preschool' : level === 'gradeSchool' ? 'Grade School' : 'High School'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {student.educationBackground[level].school || '-'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {student.educationBackground[level].awards || '-'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {student.educationBackground[level].year || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Organizational Affiliations</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Year</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization/Club</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {student.organizations.map((org, index) => (
                      org.organization && (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {org.year || '-'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {org.organization}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {org.designation || '-'}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Health Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-medium">{student.height || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{student.weight || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Physical Condition</p>
                  <p className="font-medium">{student.physicalCondition || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Health Problem</p>
                  <p className="font-medium">
                    {student.healthProblem === "Yes" ? 
                      `Yes (${student.healthProblemDetails || 'No details'})` : 
                      'No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Doctor Visit</p>
                  <p className="font-medium">
                    {student.lastDoctorVisit ? 
                      `${student.lastDoctorVisit} (${student.doctorVisitReason || 'No reason specified'})` : 
                      '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">General Condition</p>
                  <p className="font-medium">{student.generalCondition || '-'}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Test Results</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {student.testResults.map((test, index) => (
                      test.test && (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {test.test}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {test.date || '-'}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {test.rating || '-'}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;