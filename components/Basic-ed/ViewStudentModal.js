// components/Basic-ed/ViewStudentModal.js
import { FiX, FiUser, FiPhone, FiMail, FiCalendar, FiHome, FiBook, FiActivity, FiHeart, FiAward } from 'react-icons/fi';

export default function ViewStudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">ST. RITA'S COLLEGE OF BALINGASAG</h2>
              <p className="text-sm opacity-90">Basic Education Department - Guidance Center</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          {/* Student Info Header */}
          <div className="mt-6 flex items-start gap-4">
            <div className="relative">
              {student.studentPhotoUrl ? (
                <img 
                  src={student.studentPhotoUrl} 
                  alt="Student" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <FiUser className="text-gray-400 text-3xl" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{student.lastName}, {student.givenName} {student.middleName} {student.suffix}</h1>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div className="flex items-center">
                  <FiUser className="mr-2 opacity-70" />
                  <span>Grade Level: {student.gradeLevel}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 opacity-70" />
                  <span>School Year: {student.schoolYear}</span>
                </div>
                <div className="flex items-center">
                  <FiActivity className="mr-2 opacity-70" />
                  <span>Status: {student.status}</span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                    {student.studentType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Body - Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Personal Data Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
              PERSONAL DATA
            </h3>
            
            <div className="bg-gray-50 p-5 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Full Name</h4>
                    <p className="text-gray-800">{student.lastName}, {student.givenName} {student.middleName} {student.suffix}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h4>
                    <p className="text-gray-800">
                      {student.birthMonth} {student.birthDay}, {student.birthYear}
                      {student.age && ` (${student.age} years old)`}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Place of Birth</h4>
                    <p className="text-gray-800">{student.birthPlace || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Gender</h4>
                    <p className="text-gray-800">{student.gender || '-'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                    <p className="text-gray-800">{student.address || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Number</h4>
                    <p className="text-gray-800">{student.contactNumber || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Religion</h4>
                    <p className="text-gray-800">{student.religion || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Citizenship</h4>
                    <p className="text-gray-800">{student.citizenship || '-'}</p>
                  </div>
                </div>
              </div>
              
              {/* Sacraments */}
              {(['baptism', 'firstCommunion', 'confirmation'].some(sac => student[sac]?.received)) && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Sacraments Received</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['baptism', 'firstCommunion', 'confirmation'].map(sacrament => (
                      student[sacrament]?.received && (
                        <div key={sacrament} className="bg-white p-3 rounded-lg border border-gray-200">
                          <h5 className="font-medium capitalize text-gray-700">
                            {sacrament === 'firstCommunion' ? '1st Communion' : sacrament}
                          </h5>
                          <div className="mt-1 space-y-1 text-sm">
                            {student[sacrament].date && (
                              <p>Date: {student[sacrament].date}</p>
                            )}
                            {student[sacrament].church && (
                              <p>Church: {student[sacrament].church}</p>
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Family Information Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
              FAMILY INFORMATION
            </h3>
            
            <div className="bg-gray-50 p-5 rounded-xl">
              {/* Parents Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Father's Info */}
                {student.fatherName && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-blue-800 flex items-center">
                      <FiUser className="mr-2" />
                      Father's Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> {student.fatherName}</p>
                      {student.fatherOccupation && <p><span className="text-gray-600">Occupation:</span> {student.fatherOccupation}</p>}
                      {student.fatherStatus && <p><span className="text-gray-600">Status:</span> {student.fatherStatus}</p>}
                      {student.fatherEducation && <p><span className="text-gray-600">Education:</span> {student.fatherEducation}</p>}
                    </div>
                  </div>
                )}
                
                {/* Mother's Info */}
                {student.motherName && (
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-pink-800 flex items-center">
                      <FiUser className="mr-2" />
                      Mother's Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> {student.motherName}</p>
                      {student.motherOccupation && <p><span className="text-gray-600">Occupation:</span> {student.motherOccupation}</p>}
                      {student.motherStatus && <p><span className="text-gray-600">Status:</span> {student.motherStatus}</p>}
                      {student.motherEducation && <p><span className="text-gray-600">Education:</span> {student.motherEducation}</p>}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Family Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Parents' Marital Status</h4>
                  <p className="text-gray-800">{student.parentsMaritalStatus || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Residence Type</h4>
                  <p className="text-gray-800">{student.residenceType || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Languages Spoken at Home</h4>
                  <p className="text-gray-800">{student.languagesSpoken || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Family Monthly Income</h4>
                  <p className="text-gray-800">{student.familyIncome || '-'}</p>
                </div>
              </div>
              
              {/* Financial Support */}
              {student.financialSupport?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Source of Financial Support</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.financialSupport.map((source, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {source}
                      </span>
                    ))}
                    {student.otherFinancialSupport && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {student.otherFinancialSupport}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Leisure Activities */}
              {student.leisureActivities?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Leisure Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.leisureActivities.map((activity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {activity}
                      </span>
                    ))}
                    {student.otherLeisureActivities && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {student.otherLeisureActivities}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {/* Special Interests */}
              {student.specialInterests && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Special Interests</h4>
                  <p className="text-gray-800">{student.specialInterests}</p>
                </div>
              )}
              
              {/* Guardian Info */}
              {!student.livingWithParents && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3 text-gray-800">Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Guardian's Name</h4>
                      <p className="text-gray-800">{student.guardianName || '-'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Relation</h4>
                      <p className="text-gray-800">
                        {student.guardianRelation === 'other' 
                          ? student.otherGuardianRelation 
                          : student.guardianRelation?.replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace('Lord/Lady', 'Lord/Lady') || '-'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Guardian's Address</h4>
                      <p className="text-gray-800">{student.guardianAddress || '-'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Siblings */}
              {student.siblings?.some(sib => sib.name) && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Siblings (from Oldest to Youngest)</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {student.siblings.map((sibling, index) => (
                          sibling.name && (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{sibling.name}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{sibling.age || '-'}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{sibling.school || '-'}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{sibling.status || '-'}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{sibling.occupation || '-'}</td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Educational Background Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
              EDUCATIONAL BACKGROUND
            </h3>
            
            <div className="bg-gray-50 p-5 rounded-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards/Honors</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Year</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {['preschool', 'gradeSchool', 'highSchool'].map(level => (
                      student.educationBackground[level]?.school && (
                        <tr key={level}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">
                            {level === 'gradeSchool' ? 'Grade School' : level === 'highSchool' ? 'High School' : level}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                            {student.educationBackground[level].school}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                            {student.educationBackground[level].awards || '-'}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                            {student.educationBackground[level].year || '-'}
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Organizational Affiliations */}
          {student.organizations?.some(org => org.organization) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                ORGANIZATIONAL AFFILIATIONS
              </h3>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SY</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization/Club</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.organizations.map((org, index) => (
                        org.organization && (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{org.year || '-'}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{org.organization}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{org.designation || '-'}</td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Health Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
              HEALTH INFORMATION
            </h3>
            
            <div className="bg-gray-50 p-5 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Physical Handicap/Health Problem</h4>
                  <p className="text-gray-800">
                    {student.healthProblem === 'Yes' 
                      ? student.healthProblemDetails || 'Yes' 
                      : 'No'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">General Condition</h4>
                  <p className="text-gray-800">{student.generalCondition || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Under Medication</h4>
                  <p className="text-gray-800">
                    {student.underMedication === 'Yes' 
                      ? student.medicationDetails || 'Yes' 
                      : 'No'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Requires Special Care</h4>
                  <p className="text-gray-800">
                    {student.specialCare === 'Yes' 
                      ? student.specialCareDetails || 'Yes' 
                      : 'No'}
                  </p>
                </div>
                {(student.lastDoctorVisit || student.doctorVisitReason) && (
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Last Doctor Visit</h4>
                    <div className="flex flex-col md:flex-row gap-4">
                      {student.lastDoctorVisit && (
                        <p className="text-gray-800">Date: {student.lastDoctorVisit}</p>
                      )}
                      {student.doctorVisitReason && (
                        <p className="text-gray-800">Reason: {student.doctorVisitReason}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Test Results */}
          {student.testResults?.some(test => test.test) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                TEST RESULTS
              </h3>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Taken</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Taken</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {student.testResults.map((test, index) => (
                        test.test && (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{test.test}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{test.date || '-'}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{test.rating || '-'}</td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Consent */}
          <div className="mb-6 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-700 mb-3">
              St. Rita's College of Balingasag—Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
            </p>
            <p className="text-sm text-gray-700">
              By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided shall be processed for the purposes of carrying out Guidance Program Services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Signature over printed name</h4>
                <div className="flex items-center">
                  <div className="border-b border-gray-400 w-full h-8"></div>
                  {student.signatureDate && (
                    <>
                      <span className="ml-3 text-sm text-gray-500">Date:</span>
                      <span className="ml-2 text-sm text-gray-800">{student.signatureDate}</span>
                    </>
                  )}
                </div>
              </div>
              {student.age < 18 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Signature of Parent/Guardian</h4>
                  <div className="flex items-center">
                    <div className="border-b border-gray-400 w-full h-8"></div>
                    {student.parentSignatureDate && (
                      <>
                        <span className="ml-3 text-sm text-gray-500">Date:</span>
                        <span className="ml-2 text-sm text-gray-800">{student.parentSignatureDate}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}