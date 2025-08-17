import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiHome } from 'react-icons/fi';

const BasicEdPrintView = ({ student }) => {
  if (!student) return null;

  // Format date of birth
  const formattedDOB = student.birthMonth && student.birthDay && student.birthYear 
    ? `${student.birthMonth} ${student.birthDay}, ${student.birthYear}` 
    : '';

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white print:p-0 font-sans">
      {/* Print Header */}
      <div className="hidden print:block mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-900 uppercase">
          St. Rita's College of Balingasag
        </h1>
        <h2 className="text-lg text-gray-700 uppercase">
          Basic Education Department - Guidance Center
        </h2>
        <h3 className="text-xl font-bold mt-4 border-t-2 border-b-2 border-gray-300 py-2">
          PERSONAL DATA SHEET
        </h3>
        
        {/* School Year Info */}
        <div className="flex justify-center gap-8 mt-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">SY:</span>
            <span className="font-medium">{student.schoolYear || '______'}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Kindly Check:</span>
            <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.studentType === 'New' ? 'bg-gray-800' : ''}`}></span>
            <span className="mr-3">New</span>
            <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.studentType === 'Transferee' ? 'bg-gray-800' : ''}`}></span>
            <span className="mr-3">Transferee</span>
            <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.studentType === 'Returnee' ? 'bg-gray-800' : ''}`}></span>
            <span>Returnee</span>
          </div>
        </div>
      </div>

      {/* I. PERSONAL DATA */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">I. Personal Data</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <div className="mt-1 border-b border-gray-300 pb-1">
                {student.lastName}, {student.givenName} {student.middleName} {student.suffix}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Address:</label>
              <div className="mt-1 border-b border-gray-300 pb-1">
                {student.address || '_______________________________________'}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
              <div className="mt-1 border-b border-gray-300 pb-1">
                {formattedDOB || '__________________________'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Sacrament:</label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.baptism.received ? 'bg-gray-800' : ''}`}></span>
                  <span>Baptism</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.firstCommunion.received ? 'bg-gray-800' : ''}`}></span>
                  <span>First Communion</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.confirmation.received ? 'bg-gray-800' : ''}`}></span>
                  <span>Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* II. FAMILY INFORMATION */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">II. Family Information</h2>
        
        {/* Parents Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Father's Info */}
          <div>
            <h3 className="text-md font-semibold mb-2 border-b border-gray-300 pb-1">Father</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Name:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.fatherName || '______________________'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Occupation:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.fatherOccupation || '______________________'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Status:</label>
                <div className="flex gap-2 mt-1">
                  <span className={`inline-block w-4 h-4 border border-gray-500 ${student.fatherStatus === 'Employed' ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm mr-2">Employed</span>
                  <span className={`inline-block w-4 h-4 border border-gray-500 ${student.fatherStatus === 'Unemployed' ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm">Unemployed</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Education:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.fatherEducation || '______________________'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mother's Info */}
          <div>
            <h3 className="text-md font-semibold mb-2 border-b border-gray-300 pb-1">Mother</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Name:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.motherName || '______________________'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Occupation:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.motherOccupation || '______________________'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Status:</label>
                <div className="flex gap-2 mt-1">
                  <span className={`inline-block w-4 h-4 border border-gray-500 ${student.motherStatus === 'Employed' ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm mr-2">Employed</span>
                  <span className={`inline-block w-4 h-4 border border-gray-500 ${student.motherStatus === 'Unemployed' ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm">Unemployed</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Education:</label>
                <div className="border-b border-gray-300 pb-1">
                  {student.motherEducation || '______________________'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Family Income */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income:</label>
          <div className="flex flex-wrap gap-4">
            {['Below ₱10,000', '₱10,001-₱15,000', '₱15,001-₱20,000', 'Above ₱20,000'].map((range) => (
              <div key={range} className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.familyIncome === range ? 'bg-gray-800' : ''}`}></span>
                <span className="text-sm">{range}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Siblings Table */}
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Siblings (from Oldest to Youngest)</h3>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-1 text-left text-sm">Name</th>
                <th className="border border-gray-300 px-3 py-1 text-left text-sm">Age</th>
                <th className="border border-gray-300 px-3 py-1 text-left text-sm">School Attended</th>
                <th className="border border-gray-300 px-3 py-1 text-left text-sm">Status</th>
                <th className="border border-gray-300 px-3 py-1 text-left text-sm">Occupation</th>
              </tr>
            </thead>
            <tbody>
              {student.siblings.map((sibling, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-1">{sibling.name || '______'}</td>
                  <td className="border border-gray-300 px-3 py-1">{sibling.age || '______'}</td>
                  <td className="border border-gray-300 px-3 py-1">{sibling.school || '______'}</td>
                  <td className="border border-gray-300 px-3 py-1">{sibling.status || '______'}</td>
                  <td className="border border-gray-300 px-3 py-1">{sibling.occupation || '______'}</td>
                </tr>
              ))}
              {student.siblings.length === 0 && (
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-3 py-1 text-center text-gray-500">
                    No siblings recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Residence Information */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">Residence Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Is your residence:</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.residenceType === 'Rented' ? 'bg-gray-800' : ''}`}></span>
                <span>Rented</span>
              </div>
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.residenceType === 'Owned' ? 'bg-gray-800' : ''}`}></span>
                <span>Owned</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages spoken at home:</label>
            <div className="mt-1 border-b border-gray-300 pb-1">
              {student.languagesSpoken || '__________________________'}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Source of financial support:</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {['Parents', 'Grandparents', 'Scholarship', 'Other'].map((source) => (
                <div key={source} className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.financialSupport?.includes(source) ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm">{source}</span>
                </div>
              ))}
              {student.otherFinancialSupport && (
                <div className="border-b border-gray-300 inline-block pb-1">
                  {student.otherFinancialSupport}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Leisure activities of the family members:</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {['Listening to radio', 'Watching TV', 'Picnic', 'Other'].map((activity) => (
                <div key={activity} className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.leisureActivities?.includes(activity) ? 'bg-gray-800' : ''}`}></span>
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
              {student.otherLeisureActivities && (
                <div className="border-b border-gray-300 inline-block pb-1">
                  {student.otherLeisureActivities}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* III. EDUCATIONAL BACKGROUND */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">III. Educational Background</h2>
        
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-1 text-left">School Attended/School Address</th>
              <th className="border border-gray-300 px-3 py-1 text-left">Awards/Honors Received</th>
              <th className="border border-gray-300 px-3 py-1 text-left">School Year Attended</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.preschool?.school || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.preschool?.awards || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.preschool?.year || '__________________________'}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.gradeSchool?.school || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.gradeSchool?.awards || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.gradeSchool?.year || '__________________________'}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.highSchool?.school || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.highSchool?.awards || '__________________________'}</td>
              <td className="border border-gray-300 px-3 py-1">{student.educationBackground?.highSchool?.year || '__________________________'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* IV. ORGANIZATIONAL AFFILIATIONS */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">IV. Organizational Affiliations</h2>
        
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-1 text-left">SY</th>
              <th className="border border-gray-300 px-3 py-1 text-left">Organization/Club</th>
              <th className="border border-gray-300 px-3 py-1 text-left">Designation</th>
            </tr>
          </thead>
          <tbody>
            {student.organizations.map((org, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-3 py-1">{org.year || '______'}</td>
                <td className="border border-gray-300 px-3 py-1">{org.organization || '______'}</td>
                <td className="border border-gray-300 px-3 py-1">{org.designation || '______'}</td>
              </tr>
            ))}
            {student.organizations.length === 0 && (
              <tr>
                <td colSpan="3" className="border border-gray-300 px-3 py-1 text-center text-gray-500">
                  No organizational affiliations recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* V. HEALTH */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">V. Health</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Any physical handicap or health problem:</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.healthProblem === 'Yes' ? 'bg-gray-800' : ''}`}></span>
                <span>Yes</span>
                {student.healthProblem === 'Yes' && (
                  <span className="ml-2 border-b border-gray-300">{student.healthProblemDetails}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.healthProblem === 'No' ? 'bg-gray-800' : ''}`}></span>
                <span>No</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">General Condition:</label>
            <div className="flex gap-4">
              {['Good', 'Fair', 'Poor'].map((condition) => (
                <div key={condition} className="flex items-center">
                  <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.generalCondition === condition ? 'bg-gray-800' : ''}`}></span>
                  <span>{condition}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Under Medication:</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.underMedication === 'Yes' ? 'bg-gray-800' : ''}`}></span>
                <span>Yes</span>
                {student.underMedication === 'Yes' && (
                  <span className="ml-2 border-b border-gray-300">{student.medicationDetails}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.underMedication === 'No' ? 'bg-gray-800' : ''}`}></span>
                <span>No</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">With Special Care/Attention:</label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.specialCare === 'Yes' ? 'bg-gray-800' : ''}`}></span>
                <span>Yes</span>
                {student.specialCare === 'Yes' && (
                  <span className="ml-2 border-b border-gray-300">{student.specialCareDetails}</span>
                )}
              </div>
              <div className="flex items-center">
                <span className={`inline-block w-4 h-4 border border-gray-500 mr-1 ${student.specialCare === 'No' ? 'bg-gray-800' : ''}`}></span>
                <span>No</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">When was your last visit to the doctor?</label>
            <div className="mt-1 flex gap-4">
              <div className="border-b border-gray-300 flex-1">{student.lastDoctorVisit || '______'}</div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700">Why?</label>
                <div className="border-b border-gray-300">{student.doctorVisitReason || '______'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VI. TEST RESULTS */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 uppercase text-blue-900">VI. Test Results</h2>
        
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-3 py-1 text-left">Test Taken</th>
              <th className="border border-gray-300 px-3 py-1 text-left">Date Taken</th>
              <th className="border border-gray-300 px-3 py-1 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {student.testResults.map((test, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-3 py-1">{test.test || '______'}</td>
                <td className="border border-gray-300 px-3 py-1">{test.date || '______'}</td>
                <td className="border border-gray-300 px-3 py-1">{test.rating || '______'}</td>
              </tr>
            ))}
            {student.testResults.length === 0 && (
              <tr>
                <td colSpan="3" className="border border-gray-300 px-3 py-1 text-center text-gray-500">
                  No test results recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Consent Footer */}
      <div className="mt-12 text-xs">
        <p className="mb-4">
          St. Rita's College of Balingasag—Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations. SRCB—Guidance Center will not collect, disclose or process personal data, including data that may be classified as personal information under such documents. It shall be applicable for individuals who provide us with a text gap. You request sherry's or status such disclosure is required by applicable laws and regulations.
        </p>
        <p className="mb-6">
          By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB—Guidance Center shall be processed by them for the purposes of carrying out their Guidance Program Services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-sm font-medium">Signature over printed name</p>
              <div className="h-12 mt-2 border-b border-gray-300"></div>
              <p className="text-sm mt-1">Date Signed: {student.signatureDate || '______'}</p>
            </div>
          </div>
          
          {student.age < 18 && (
            <div>
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-medium">Signature of Parent/Guardian over printed name</p>
                <div className="h-12 mt-2 border-b border-gray-300"></div>
                <p className="text-sm mt-1">Date Signed: {student.parentSignatureDate || '______'}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block mt-8 text-center text-xs text-gray-500">
        <p>Page 1 of 1 • Generated on {new Date().toLocaleDateString()}</p>
        <p className="mt-1">Form Rev. 1 Rev. Gareth M.D., 2021</p>
      </div>
    </div>
  );
};

export default BasicEdPrintView;