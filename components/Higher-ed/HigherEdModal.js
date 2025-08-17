import { FiX, FiPlus, FiSave, FiUpload, FiUser } from 'react-icons/fi';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱15,000',
  '₱15,001 - ₱18,000',
  '₱18,001 - ₱21,000',
  '₱21,001 - ₱24,000',
  '₱24,001 - ₱27,000',
  '₱27,001 - ₱30,000',
  'Above ₱30,000.00'
];

const RELATIONSHIP_OPTIONS = [
  'sister/brother',
  'aunt/uncle',
  'land lord/lady',
  'grandparents',
  'other'
];

export default function HigherEdModal({
  showModal,
  setShowModal,
  newStudent,
  setNewStudent,
  errors,
  setErrors,
  handleAddStudent,
  handleInputChange,
  handleEducationChange,
  handleOrganizationChange,
  handleTestResultChange,
  triggerFileInput,
  fileInputRef,
  handleFileUpload,
  initialStudentState,
  handleSiblingChange
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">ST. RITA'S COLLEGE OF BALINGASAG</h2>
              <p className="text-xs opacity-80">Higher Education Department - Guidance Center</p>
            </div>
            <button 
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          {/* Form Title */}
          <div className="mt-4 text-center">
            <h1 className="text-lg font-bold uppercase tracking-wide">Student Personal Data Sheet</h1>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {['New', 'Transferee', 'Returnee', 'Old'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="studentType"
                    checked={newStudent.studentType === type}
                    onChange={() => setNewStudent({...newStudent, studentType: type})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* School Year and Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester & Year</label>
              <input
                type="text"
                name="semesterAndYear"
                value={newStudent.semesterAndYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., 1st Semester 2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course & Year*</label>
              <input
                type="text"
                name="courseAndYear"
                value={newStudent.courseAndYear}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${errors.courseAndYear ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., BSIT 3"
              />
              {errors.courseAndYear && <p className="mt-1 text-xs text-red-600">{errors.courseAndYear}</p>}
            </div>
          </div>

          {/* I. Personal Data */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">I. PERSONAL DATA</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              {/* Student Photo Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  {newStudent.studentPhotoUrl ? (
                    <img 
                      src={newStudent.studentPhotoUrl} 
                      alt="Student" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <FiUser className="text-gray-400 text-3xl" />
                    </div>
                  )}
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1.5 hover:bg-blue-600 transition-colors"
                  >
                    <FiUpload className="w-4 h-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newStudent.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    name="givenName"
                    value={newStudent.givenName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${errors.givenName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.givenName && <p className="mt-1 text-xs text-red-600">{errors.givenName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={newStudent.middleName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                  <input
                    type="text"
                    name="nickname"
                    value={newStudent.nickname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Additional Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={newStudent.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newStudent.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                  <textarea
                    name="homeAddress"
                    value={newStudent.homeAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City Address (if boarding)
                  </label>
                  <textarea
                    name="cityAddress"
                    value={newStudent.cityAddress}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g., 123 Mabini St., Purok 5, Brgy. Malinis, Davao City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Birth Date and Place */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      name="birthMonth"
                      value={newStudent.birthMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Month</option>
                      {MONTHS.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      name="birthDay"
                      value={newStudent.birthDay}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Day</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      name="birthYear"
                      value={newStudent.birthYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Year</option>
                      {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={newStudent.birthPlace}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={newStudent.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                  <input
                    type="text"
                    name="religion"
                    value={newStudent.religion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Civil Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                <select
                  name="civilStatus"
                  value={newStudent.civilStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Separated">Separated</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Person</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={newStudent.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    name="emergencyRelation"
                    value={newStudent.emergencyRelation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Number</label>
                  <input
                    type="text"
                    name="emergencyNumber"
                    value={newStudent.emergencyNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* II. Family Information */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">II. FAMILY INFORMATION</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              {/* Father's and Mother's Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Father's Information */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <FiUser className="mr-2" />
                    Father's Information
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="fatherLastName"
                          value={newStudent.fatherLastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="fatherFirstName"
                          value={newStudent.fatherFirstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                        <input
                          type="text"
                          name="fatherMiddleName"
                          value={newStudent.fatherMiddleName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="fatherOccupation"
                          value={newStudent.fatherOccupation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="fatherStatus"
                          value={newStudent.fatherStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Retired">Retired</option>
                          <option value="Disabled">Disabled</option>
                          <option value="Deceased">Deceased</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="flex gap-3">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="fatherLocation"
                              value="Overseas"
                              checked={newStudent.fatherLocation === "Overseas"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Overseas</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="fatherLocation"
                              value="Local"
                              checked={newStudent.fatherLocation === "Local"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Local</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                        <div className="flex gap-3">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="fatherEmploymentType"
                              value="Private"
                              checked={newStudent.fatherEmploymentType === "Private"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Private</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="fatherEmploymentType"
                              value="Government"
                              checked={newStudent.fatherEmploymentType === "Government"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Government</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                      <select
                        name="fatherEducation"
                        value={newStudent.fatherEducation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Some Elementary">Some Elementary</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Some High School">Some High School</option>
                        <option value="High School">High School</option>
                        <option value="Some College">Some College</option>
                        <option value="College Degree">College Degree</option>
                        <option value="Post Graduate Studies">Post Graduate Studies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <input
                        type="text"
                        name="fatherSpecialization"
                        value={newStudent.fatherSpecialization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="bg-pink-50 p-4 rounded-md">
                  <h4 className="font-medium text-pink-800 mb-3 flex items-center">
                    <FiUser className="mr-2" />
                    Mother's Information
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="motherLastName"
                          value={newStudent.motherLastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="motherFirstName"
                          value={newStudent.motherFirstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                        <input
                          type="text"
                          name="motherMiddleName"
                          value={newStudent.motherMiddleName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          name="motherOccupation"
                          value={newStudent.motherOccupation}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="motherStatus"
                          value={newStudent.motherStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Retired">Retired</option>
                          <option value="Disabled">Disabled</option>
                          <option value="Deceased">Deceased</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="flex gap-3">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="motherLocation"
                              value="Overseas"
                              checked={newStudent.motherLocation === "Overseas"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Overseas</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="motherLocation"
                              value="Local"
                              checked={newStudent.motherLocation === "Local"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Local</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                        <div className="flex gap-3">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="motherEmploymentType"
                              value="Private"
                              checked={newStudent.motherEmploymentType === "Private"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Private</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="motherEmploymentType"
                              value="Government"
                              checked={newStudent.motherEmploymentType === "Government"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Government</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Attainment</label>
                      <select
                        name="motherEducation"
                        value={newStudent.motherEducation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Some Elementary">Some Elementary</option>
                        <option value="Elementary">Elementary</option>
                        <option value="Some High School">Some High School</option>
                        <option value="High School">High School</option>
                        <option value="Some College">Some College</option>
                        <option value="College Degree">College Degree</option>
                        <option value="Post Graduate Studies">Post Graduate Studies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <input
                        type="text"
                        name="motherSpecialization"
                        value={newStudent.motherSpecialization}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Parents' Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
                <div className="flex flex-wrap gap-3">
                  {['Sacramental Marriage', 'Civil Marriage', 'Legally Separated', 'Annulled', 'Unmarried'].map(status => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="parentsMaritalStatus"
                        checked={newStudent.parentsMaritalStatus === status}
                        onChange={() => setNewStudent({...newStudent, parentsMaritalStatus: status})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Residence Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence:</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="residenceType"
                        checked={newStudent.residenceType === 'rented'}
                        onChange={() => setNewStudent({...newStudent, residenceType: 'rented'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Rented</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="residenceType"
                        checked={newStudent.residenceType === 'owned'}
                        onChange={() => setNewStudent({...newStudent, residenceType: 'owned'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Owned</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home:</label>
                  <input
                    type="text"
                    name="languagesSpoken"
                    value={newStudent.languagesSpoken}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Family Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {FAMILY_INCOME_RANGES.map(range => (
                    <label key={range} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="familyIncome"
                        checked={newStudent.familyIncome === range}
                        onChange={() => setNewStudent({...newStudent, familyIncome: range})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Financial Support */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support:</label>
                <div className="flex flex-wrap gap-3">
                  {['Parents', 'Grandparents', 'Others'].map(source => (
                    <label key={source} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.financialSupport.includes(source)}
                        onChange={() => {
                          const updated = newStudent.financialSupport.includes(source)
                            ? newStudent.financialSupport.filter(s => s !== source)
                            : [...newStudent.financialSupport, source];
                          setNewStudent({...newStudent, financialSupport: updated});
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
                {newStudent.financialSupport.includes('Others') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="otherFinancialSupport"
                      value={newStudent.otherFinancialSupport}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Please specify other financial support"
                    />
                  </div>
                )}
              </div>

              {/* Leisure Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities of family members:</label>
                <div className="flex flex-wrap gap-3">
                  {['listening to radio', 'watching TV', 'picnic'].map(activity => (
                    <label key={activity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities.includes(activity)}
                        onChange={() => {
                          const updated = newStudent.leisureActivities.includes(activity)
                            ? newStudent.leisureActivities.filter(a => a !== activity)
                            : [...newStudent.leisureActivities, activity];
                          setNewStudent({...newStudent, leisureActivities: updated});
                        }}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.leisureActivities.includes('other')}
                      onChange={() => {
                        const updated = newStudent.leisureActivities.includes('other')
                          ? newStudent.leisureActivities.filter(a => a !== 'other')
                          : [...newStudent.leisureActivities, 'other'];
                        setNewStudent({...newStudent, leisureActivities: updated});
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Others</span>
                  </label>
                </div>
                {newStudent.leisureActivities.includes('other') && (
                  <div className="mt-3">
                    <input
                      type="text"
                      name="otherLeisureActivities"
                      value={newStudent.otherLeisureActivities}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Please specify other leisure activities"
                    />
                  </div>
                )}
              </div>

              {/* Special Talents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special talents:</label>
                <input
                  type="text"
                  name="specialTalents"
                  value={newStudent.specialTalents}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Child Residing With */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Child is residing with:</label>
                <div className="flex flex-wrap gap-3">
                  {['Both Parents', 'Father Only', 'Mother Only', 'Others'].map(status => (
                    <label key={status} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="childResidingWith"
                        checked={newStudent.childResidingWith === status}
                        onChange={() => setNewStudent({...newStudent, childResidingWith: status})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guardian Information (if not living with parents) */}
              {newStudent.childResidingWith === 'Others' && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={newStudent.guardianName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                      <select
                        name="guardianRelation"
                        value={newStudent.guardianRelation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        {RELATIONSHIP_OPTIONS.map(relation => (
                          <option key={relation} value={relation}>
                            {relation.replace(/(^\w|\s\w)/g, m => m.toUpperCase()).replace('Lord/Lady', 'Lord/Lady')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {newStudent.guardianRelation === 'other' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Please specify relation</label>
                      <input
                        type="text"
                        name="otherGuardianRelation"
                        value={newStudent.otherGuardianRelation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Address</label>
                    <input
                      type="text"
                      name="guardianAddress"
                      value={newStudent.guardianAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Birth Order and Siblings Count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <label key={num} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="birthOrder"
                          value={num}
                          checked={newStudent.birthOrder === num.toString()}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{num}</span>
                      </label>
                    ))}
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="birthOrder"
                        value="Other"
                        checked={![1, 2, 3, 4, 5, 6, 7].includes(parseInt(newStudent.birthOrder)) && newStudent.birthOrder !== ""}
                        onChange={() => setNewStudent({...newStudent, birthOrder: "Other"})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Other</span>
                    </label>
                    {newStudent.birthOrder === "Other" && (
                      <input
                        type="text"
                        value={newStudent.otherBirthOrder || ""}
                        onChange={(e) => setNewStudent({...newStudent, otherBirthOrder: e.target.value})}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        placeholder="Specify"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Siblings</label>
                  <input
                    type="number"
                    name="siblingsCount"
                    value={newStudent.siblingsCount}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Siblings Table */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Siblings (from Oldest to Youngest)</label>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">School Attended</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Occupation</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Array.from({length: Math.max(6, newStudent.siblingsCount)}).map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.name || ''}
                              onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="number"
                              value={newStudent.siblings[index]?.age || ''}
                              onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.school || ''}
                              onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.status || ''}
                              onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={newStudent.siblings[index]?.occupation || ''}
                              onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* III. Educational Background */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">III. EDUCATIONAL BACKGROUND</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">School Attended/School Address</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Awards/Honors Received</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">School Year Attended</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {['preschool', 'gradeSchool', 'highSchool'].map(level => (
                      <tr key={level} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                          {level === 'preschool' ? 'Preschool' : level === 'gradeSchool' ? 'Grade School' : 'High School'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level]?.school || ''}
                            onChange={(e) => handleEducationChange(level, 'school', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level]?.awards || ''}
                            onChange={(e) => handleEducationChange(level, 'awards', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.educationBackground[level]?.year || ''}
                            onChange={(e) => handleEducationChange(level, 'year', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* IV. Organizational Affiliations */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">IV. ORGANIZATIONAL AFFILIATIONS</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SY</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Organization/Club</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newStudent.organizations.map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.organizations[index]?.year || ''}
                            onChange={(e) => handleOrganizationChange(index, 'year', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="SY 20___-20___"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.organizations[index]?.organization || ''}
                            onChange={(e) => handleOrganizationChange(index, 'organization', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.organizations[index]?.designation || ''}
                            onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* V. Health */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">V. HEALTH</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={newStudent.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={newStudent.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any physical handicap or health problem:</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="healthProblem"
                        checked={newStudent.healthProblem === 'Yes'}
                        onChange={() => setNewStudent({...newStudent, healthProblem: 'Yes'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="healthProblem"
                        checked={newStudent.healthProblem === 'No'}
                        onChange={() => setNewStudent({...newStudent, healthProblem: 'No'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {newStudent.healthProblem === 'Yes' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="healthProblemDetails"
                        value={newStudent.healthProblemDetails}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Please specify"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">General Condition:</label>
                  <div className="flex gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Good Condition'}
                        onChange={() => setNewStudent({...newStudent, generalCondition: 'Good Condition'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Good Condition</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'Under Medication'}
                        onChange={() => setNewStudent({...newStudent, generalCondition: 'Under Medication'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Under Medication</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="generalCondition"
                        checked={newStudent.generalCondition === 'With Special Care/Attention'}
                        onChange={() => setNewStudent({...newStudent, generalCondition: 'With Special Care/Attention'})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">With Special Care/Attention</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When was your last visit to the doctor?</label>
                  <input
                    type="date"
                    name="lastDoctorVisit"
                    value={newStudent.lastDoctorVisit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for visit:</label>
                  <input
                    type="text"
                    name="doctorVisitReason"
                    value={newStudent.doctorVisitReason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* VI. Test Results */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">VI. TEST RESULTS</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Test Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date Taken</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newStudent.testResults.map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.testResults[index]?.test || ''}
                            onChange={(e) => handleTestResultChange(index, 'test', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="date"
                            value={newStudent.testResults[index]?.date || ''}
                            onChange={(e) => handleTestResultChange(index, 'date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={newStudent.testResults[index]?.rating || ''}
                            onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Data Privacy Consent */}
          <section className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-700 mb-3">
              St. Rita's College of Balingasag – Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementing rules and regulations.
            </p>
            <p className="text-sm text-gray-700">
              By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided shall be processed for the purposes of carrying out Guidance Program Services.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Signature over printed name</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="signature"
                    value={newStudent.signature}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                  <input
                    type="date"
                    name="signatureDate"
                    value={newStudent.signatureDate}
                    onChange={handleInputChange}
                    className="ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {newStudent.age < 18 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature of Parent/Guardian</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="parentSignature"
                      value={newStudent.parentSignature}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter name"
                    />
                    <input
                      type="date"
                      name="parentSignatureDate"
                      value={newStudent.parentSignatureDate}
                      onChange={handleInputChange}
                      className="ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end items-center rounded-b-xl">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddStudent}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiSave className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}