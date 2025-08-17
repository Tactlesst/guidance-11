// components/Basic-ed/BasicEdForm.js
import { useRef } from "react";
import { FiX, FiUser, FiUpload, FiSave, FiPlus } from "react-icons/fi";

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱15,000',
  '₱15,001 - ₱20,000',
  '₱20,001 - ₱25,000',
  '₱25,001 - ₱30,000',
  'Above ₱30,000'
];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'grandparents', 'other'];
const GRADE_LEVELS = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];
const MARITAL_STATUSES = ['Sacramental Marriage', 'Civil', 'Legally Separated', 'Annulled', 'Unmarried'];
const RESIDENCE_OPTIONS = ['Both Parents', 'Father Only', 'Mother Only', 'Others'];
const FINANCIAL_SUPPORT_OPTIONS = ['Parents', 'Grandparents', 'Others'];
const LEISURE_ACTIVITIES = ['Listening to radio', 'Watching TV', 'Picnic'];

export default function BasicEdForm({
  showModal,
  setShowModal,
  newStudent,
  setNewStudent,
  errors,
  setErrors,
  handleInputChange,
  handleSacramentChange,
  handleSiblingChange,
  handleEducationChange,
  handleOrganizationChange,
  handleTestResultChange,
  handleAddStudent,
  handleUpdateStudent,
  editingStudentId,
  initialStudentState
}) {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStudent({ ...newStudent, studentPhotoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (field, value) => {
    const currentValues = newStudent[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    setNewStudent({ ...newStudent, [field]: updatedValues });
  };

  const addSibling = () => {
    setNewStudent(prev => ({
      ...prev,
      siblings: [...prev.siblings, { name: '', age: '', school: '', status: '', occupation: '' }]
    }));
  };
const handleAddStudent = async () => {
  const requiredFields = {
    schoolYear: newStudent.schoolYear,
    gradeYearLevel: newStudent.gradeYearLevel,
    studentType: newStudent.studentType,
    lastName: newStudent.student?.lastName,
    firstName: newStudent.student?.firstName,
    address: newStudent.contact?.address,
    month: newStudent.birth?.month,
    day: newStudent.birth?.day,
    year: newStudent.birth?.year,
    place: newStudent.birth?.place,
    religion: newStudent.religion,
    signatureName: newStudent.signatureName,
    signatureDate: newStudent.signatureDate
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    setErrors(
      missingFields.reduce((acc, field) => ({ ...acc, [field]: `${field} is required` }), {})
    );
    return;
  }

  try {
    const response = await fetch(`/api/students/basic-ed?userId=1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save student');
    }
    const data = await response.json();
    console.log('Student saved:', data);
    setShowModal(false);
    setNewStudent(initialStudentState);
    setErrors({});
  } catch (error) {
    console.error('Error saving student:', error);
    setErrors({ general: error.message });
  }
  const removeSibling = (index) => {
    setNewStudent(prev => ({
      ...prev,
      siblings: prev.siblings.filter((_, i) => i !== index)
    }));
  };

  const addTestResult = () => {
    setNewStudent(prev => ({
      ...prev,
      testResults: [...prev.testResults, { test: '', date: '', rating: '' }]
    }));
  };

  const removeTestResult = (index) => {
    setNewStudent(prev => ({
      ...prev,
      testResults: prev.testResults.filter((_, i) => i !== index)
    }));
  };

  const addOrganization = () => {
    setNewStudent(prev => ({
      ...prev,
      organizations: [...prev.organizations, { year: '', organization: '', designation: '' }]
    }));
  };

  const removeOrganization = (index) => {
    setNewStudent(prev => ({
      ...prev,
      organizations: prev.organizations.filter((_, i) => i !== index)
    }));
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[95vh] overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-t-xl relative">
          <button
            onClick={() => {
              setShowModal(false);
              setNewStudent(initialStudentState);
              setErrors({});
            }}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 pt-2">
            <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">
              St. Rita's College of Balingasag
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm">
              <p className="font-medium opacity-95">Basic Education Department</p>
              <div className="hidden sm:block h-4 w-px bg-white/40 self-center"></div>
              <p className="font-medium opacity-95">GUIDANCE CENTER</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Form Title */}
          <h1 className="text-2xl font-bold uppercase tracking-tight text-gray-800 text-center mb-6">
            STUDENT PERSONAL DATA SHEET
          </h1>

          {/* School Year and Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Year (SY)*</label>
                <input
                  type="text"
                  name="schoolYear"
                  value={newStudent.schoolYear || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.schoolYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                  placeholder="e.g., 2023-2024"
                />
                {errors.schoolYear && <p className="mt-1 text-xs text-red-600">{errors.schoolYear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Year Level*</label>
                <select
                  name="gradeYearLevel"
                  value={newStudent.gradeYearLevel || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.gradeYearLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition shadow-sm`}
                >
                  <option value="">Select Grade/Year</option>
                  {GRADE_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.gradeYearLevel && <p className="mt-1 text-xs text-red-600">{errors.gradeYearLevel}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Type*</label>
              <div className="grid grid-cols-4 gap-2">
                {['New', 'Transferee', 'Returnee', 'Old'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="studentType"
                      checked={newStudent.studentType === type}
                      onChange={() => setNewStudent({ ...newStudent, studentType: type })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className={`w-32 h-32 rounded-full ${newStudent.studentPhotoUrl ? 'border-4 border-white shadow-md' : 'bg-gray-100 border-4 border-white shadow-md'} flex items-center justify-center overflow-hidden`}>
                  {newStudent.studentPhotoUrl ? (
                    <img
                      src={newStudent.studentPhotoUrl}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-4xl" />
                  )}
                </div>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-md group-hover:opacity-100 opacity-90"
                  aria-label="Upload photo"
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

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={newStudent.lastName || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Given Name*</label>
                <input
                  type="text"
                  name="givenName"
                  value={newStudent.givenName || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.givenName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="Enter given name"
                />
                {errors.givenName && <p className="mt-1 text-xs text-red-600">{errors.givenName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={newStudent.middleName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter middle name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                <select
                  name="suffix"
                  value={newStudent.suffix || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                >
                  <option value="">None</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={newStudent.gender || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
                <input
                  type="text"
                  name="citizenship"
                  value={newStudent.citizenship || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter citizenship"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newStudent.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter age"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={newStudent.address || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                placeholder="Enter complete address"
              />
            </div>

            {/* Birth Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    name="birthMonth"
                    value={newStudent.birthMonth || ''}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  >
                    <option value="">Month</option>
                    {MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="birthDay"
                    value={newStudent.birthDay || ''}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="birthYear"
                    value={newStudent.birthYear || ''}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                <input
                  type="text"
                  name="birthPlace"
                  value={newStudent.birthPlace || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter place of birth"
                />
              </div>
            </div>

            {/* Contact and Religion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tel./Mobile #</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={newStudent.contactNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={newStudent.religion || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter religion"
                />
              </div>
            </div>

            {/* Sacraments */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sacraments Received</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['baptism', 'firstCommunion', 'confirmation'].map((sacrament) => (
                  <div key={sacrament} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {sacrament === 'firstCommunion' ? '1st Communion' : sacrament}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newStudent[sacrament].received || false}
                          onChange={() =>
                            handleSacramentChange(sacrament, 'received', !newStudent[sacrament].received)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-9 h-4 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                      </label>
                    </div>
                    {newStudent[sacrament].received && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Date</label>
                          <input
                            type="date"
                            value={newStudent[sacrament].date || ''}
                            onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Church</label>
                          <input
                            type="text"
                            value={newStudent[sacrament].church || ''}
                            onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                            placeholder="Enter church name"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Person to be contacted in case of emergency</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={newStudent.emergencyContact || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter emergency contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  name="emergencyRelation"
                  value={newStudent.emergencyRelation || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter relationship"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  name="emergencyNumber"
                  value={newStudent.emergencyNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter emergency contact number"
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Family Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Father's Information */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
                <h4 className="font-medium text-blue-800 mb-4 text-lg">Father's Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newStudent.fatherName || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter father's full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={newStudent.fatherOccupation || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, fatherOccupation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Status</label>
                      <select
                        value={newStudent.fatherStatus || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, fatherStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Deceased">Deceased</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <input
                      type="text"
                      value={newStudent.fatherEducation || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, fatherEducation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter education level"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mother's Information */}
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-medium text-pink-800 mb-4 text-lg">Mother's Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newStudent.motherName || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter mother's full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={newStudent.motherOccupation || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, motherOccupation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter occupation"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Status</label>
                      <select
                        value={newStudent.motherStatus || ''}
                        onChange={(e) => setNewStudent({ ...newStudent, motherStatus: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Deceased">Deceased</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <input
                      type="text"
                      value={newStudent.motherEducation || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, motherEducation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter education level"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Parents' Marital Status</label>
              <div className="flex flex-wrap gap-3">
                {MARITAL_STATUSES.map(status => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="parentsMaritalStatus"
                      checked={newStudent.parentsMaritalStatus === status}
                      onChange={() => setNewStudent({ ...newStudent, parentsMaritalStatus: status })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Child is Residing</label>
              <div className="flex flex-wrap gap-3">
                {RESIDENCE_OPTIONS.map(option => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="childResidence"
                      checked={newStudent.childResidence === option}
                      onChange={() => setNewStudent({ ...newStudent, childResidence: option })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {newStudent.childResidence === 'Others' && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="childResidenceOther"
                    value={newStudent.childResidenceOther || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="Please specify"
                  />
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((order) => (
                  <label key={order} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birthOrder"
                      checked={newStudent.birthOrder === order}
                      onChange={() => setNewStudent({...newStudent, birthOrder: order})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {order}{order === 1 ? 'st' : order === 2 ? 'nd' : order === 3 ? 'rd' : 'th'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Number of Siblings */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Siblings</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'brothers', label: 'Brother/s' },
                  { key: 'sisters', label: 'Sister/s' },
                  { key: 'stepBrothers', label: 'Step Brother/s' },
                  { key: 'stepSisters', label: 'Step Sister/s' },
                  { key: 'adopted', label: 'Adopted' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={(newStudent.numberOfSiblings?.[key] || 0) > 0}
                      onChange={(e) => setNewStudent({
                        ...newStudent,
                        numberOfSiblings: {
                          ...(newStudent.numberOfSiblings || {}),
                          [key]: e.target.checked ? 1 : 0
                        }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                    {(newStudent.numberOfSiblings?.[key] || 0) > 0 && (
                      <input
                        type="number"
                        value={newStudent.numberOfSiblings?.[key] || 0}
                        onChange={(e) => setNewStudent({
                          ...newStudent,
                          numberOfSiblings: {
                            ...(newStudent.numberOfSiblings || {}),
                            [key]: parseInt(e.target.value) || 0
                          }
                        })}
                        className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Other Relatives at Home */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Relatives at Home</label>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                {['grandParents', 'uncle', 'aunt', 'cousins'].map((relative) => (
                  <label key={relative} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.otherRelatives[relative]}
                      onChange={(e) => setNewStudent({
                        ...newStudent,
                        otherRelatives: {
                          ...newStudent.otherRelatives,
                          [relative]: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {relative === 'grandParents' ? 'Grand Parents' : 
                       relative === 'uncle' ? 'Uncle' :
                       relative === 'aunt' ? 'Aunt' : 'Cousins'}
                    </span>
                  </label>
                ))}
              </div>

              {/* Others specification */}
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={newStudent.otherRelatives.others}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    otherRelatives: {
                      ...newStudent.otherRelatives,
                      others: e.target.checked
                    }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Others pls. specify</span>
                {newStudent.otherRelatives.others && (
                  <input
                    type="text"
                    value={newStudent.otherRelatives.othersSpecify || ''}
                    onChange={(e) => setNewStudent({
                      ...newStudent,
                      otherRelatives: {
                        ...newStudent.otherRelatives,
                        othersSpecify: e.target.value
                      }
                    })}
                    className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify other relatives"
                  />
                )}
              </div>

              {/* Total number of relatives at home */}
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">Total number of relatives at home:</span>
                <input
                  type="number"
                  value={newStudent.totalRelativesAtHome || ''}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    totalRelativesAtHome: parseInt(e.target.value) || 0
                  })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
            
            {/* Family Income */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FAMILY_INCOME_RANGES.map((range) => (
                  <label key={range} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="familyIncome"
                      checked={newStudent.familyIncome === range}
                      onChange={() => setNewStudent({ ...newStudent, familyIncome: range })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Residence Type and Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="residenceType"
                      checked={newStudent.residenceType === 'Rented'}
                      onChange={() => setNewStudent({ ...newStudent, residenceType: 'Rented' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Rented</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="residenceType"
                      checked={newStudent.residenceType === 'Owned'}
                      onChange={() => setNewStudent({ ...newStudent, residenceType: 'Owned' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Owned</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home</label>
                <input
                  type="text"
                  name="languagesSpoken"
                  value={newStudent.languagesSpoken || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., English, Tagalog, etc."
                />
              </div>
            </div>

            {/* Source of Financial Support */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {FINANCIAL_SUPPORT_OPTIONS.map((source) => (
                  <label key={source} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.financialSupport.includes(source)}
                      onChange={() => handleCheckboxChange('financialSupport', source)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{source}</span>
                    {source === 'Others' && newStudent.financialSupport.includes('Others') && (
                      <input
                        type="text"
                        name="otherFinancialSupport"
                        value={newStudent.otherFinancialSupport || ''}
                        onChange={handleInputChange}
                        className="ml-2 flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="specify"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Leisure Activities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities of the family members</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {LEISURE_ACTIVITIES.map((activity) => (
                  <label key={activity} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.leisureActivities.includes(activity)}
                      onChange={() => handleCheckboxChange('leisureActivities', activity)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{activity}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="otherLeisureActivities"
                  value={newStudent.otherLeisureActivities || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Others (please specify)"
                />
              </div>
            </div>

            {/* Special Talents */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special talent/s</label>
              <input
                type="text"
                name="specialInterests"
                value={newStudent.specialInterests || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                placeholder="e.g., Singing, Dancing, etc."
              />
            </div>

            {/* Siblings Table */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Siblings (Oldest to Youngest)</label>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Age</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Occupation</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {newStudent.siblings.map((sibling, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.name || ''}
                            onChange={(e) => handleSiblingChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.age || ''}
                            onChange={(e) => handleSiblingChange(index, 'age', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter age"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.school || ''}
                            onChange={(e) => handleSiblingChange(index, 'school', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter school"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.status || ''}
                            onChange={(e) => handleSiblingChange(index, 'status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter status"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={sibling.occupation || ''}
                            onChange={(e) => handleSiblingChange(index, 'occupation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter occupation"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => removeSibling(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addSibling}
                  className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiPlus className="mr-1" /> Add Sibling
                </button>
              </div>
            </div>

            {/* Guardian Information (if not living with parents) */}
            {newStudent.childResidence !== 'Both Parent' && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Guardian Information (if not living with parents)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Name</label>
                    <input
                      type="text"
                      name="guardianName"
                      value={newStudent.guardianName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Enter guardian's name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="guardianAddress"
                      value={newStudent.guardianAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Enter guardian's address"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relation:</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {RELATIONSHIP_OPTIONS.map((relation) => (
                      <label key={relation} className="flex items-center">
                        <input
                          type="radio"
                          name="guardianRelation"
                          checked={newStudent.guardianRelation === relation}
                          onChange={() => setNewStudent({...newStudent, guardianRelation: relation})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{relation}</span>
                      </label>
                    ))}
                  </div>
                  {newStudent.guardianRelation === 'other' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="otherGuardianRelation"
                        value={newStudent.otherGuardianRelation || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                        placeholder="Others please specify"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Educational Background */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Educational Background
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Level</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended/Address</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Object.entries(newStudent.educationBackground).map(([level, data]) => (
                    <tr key={level} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700 capitalize">{level}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={data.school || ''}
                          onChange={(e) => handleEducationChange(level, 'school', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter school name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={data.awards || ''}
                          onChange={(e) => handleEducationChange(level, 'awards', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter awards/honors"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={data.year || ''}
                          onChange={(e) => handleEducationChange(level, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter school year"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Organizational Affiliations */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Organizational Affiliations
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Organization/Club</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Designation</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {newStudent.organizations.map((org, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.year || ''}
                          onChange={(e) => handleOrganizationChange(index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 2023-2024"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.organization || ''}
                          onChange={(e) => handleOrganizationChange(index, 'organization', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter organization name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.designation || ''}
                          onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your designation"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeOrganization(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={addOrganization}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus className="mr-1" /> Add Organization
              </button>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
              Health Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                  type="text"
                  name="height"
                  value={newStudent.height || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 5'6&quot;"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={newStudent.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 60kg"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Physical Condition</label>
                <div className="flex gap-4">
                  {['Good', 'Fair', 'Poor'].map((condition) => (
                    <label key={condition} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="physicalCondition"
                        checked={newStudent.physicalCondition === condition}
                        onChange={() => setNewStudent({ ...newStudent, physicalCondition: condition })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Any physical handicap or health problem</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="healthProblem"
                      checked={newStudent.healthProblem === 'Yes'}
                      onChange={() => setNewStudent({ ...newStudent, healthProblem: 'Yes' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="healthProblem"
                      checked={newStudent.healthProblem === 'No'}
                      onChange={() => setNewStudent({ ...newStudent, healthProblem: 'No' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">no</span>
                  </label>
                </div>
                {newStudent.healthProblem === 'Yes' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">If yes, what is it?</label>
                    <input
                      type="text"
                      name="healthProblemDetails"
                      value={newStudent.healthProblemDetails || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Describe health problem"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">When was your last visit to the doctor?</label>
                <input
                  type="date"
                  name="lastDoctorVisit"
                  value={newStudent.lastDoctorVisit || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why?</label>
                <input
                  type="text"
                  name="doctorVisitReason"
                  value={newStudent.doctorVisitReason || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Reason for doctor visit"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">General Condition</label>
              <div className="flex flex-wrap gap-4">
                {['Good Condition', 'Under Medication', 'With Special Care/Attention'].map((condition) => (
                  <label key={condition} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="generalCondition"
                      checked={newStudent.generalCondition === condition}
                      onChange={() => setNewStudent({ ...newStudent, generalCondition: condition })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
              Test Results
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Test Taken</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date Taken</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Rating</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {newStudent.testResults.map((test, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={test.test || ''}
                          onChange={(e) => handleTestResultChange(index, 'test', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter test name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="date"
                          value={test.date || ''}
                          onChange={(e) => handleTestResultChange(index, 'date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={test.rating || ''}
                          onChange={(e) => handleTestResultChange(index, 'rating', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter rating"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => removeTestResult(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={addTestResult}
                className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus className="mr-1" /> Add Test Result
              </button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">7</span>
              Privacy Notice
            </h2>

            <div className="text-sm text-gray-700 space-y-4">
              <p>
                Dear Student/Parent,
              </p>
              <p>
                St. Rita's College of Balingasag - Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and its implementation rules and regulations. SRCB Guidance Center will not collect, disclose or process personal data, including data that may classified as personal information and/or sensitive personal information unless you voluntarily choose to provide us with it and give your consent thereto, or unless such disclosure is required by applicable laws and regulations.
              </p>
              <p>
                By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB - Guidance Center shall be processed by them for the purposes of current set their Guidance Program Services.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Signature over printed name*</label>
                <input
                  type="text"
                  name="signatureName"
                  value={newStudent.signatureName || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.signatureName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                />
                {errors.signatureName && <p className="mt-1 text-xs text-red-600">{errors.signatureName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed*</label>
                <input
                  type="date"
                  name="signatureDate"
                  value={newStudent.signatureDate || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.signatureDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                />
                {errors.signatureDate && <p className="mt-1 text-xs text-red-600">{errors.signatureDate}</p>}
              </div>
            </div>
            {newStudent.age < 18 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signature of Parent/Guardian over printed name*</label>
                  <input
                    type="text"
                    name="parentSignatureName"
                    value={newStudent.parentSignatureName || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.parentSignatureName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  />
                  {errors.parentSignatureName && <p className="mt-1 text-xs text-red-600">{errors.parentSignatureName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Signed*</label>
                  <input
                    type="date"
                    name="parentSignatureDate"
                    value={newStudent.parentSignatureDate || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.parentSignatureDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  />
                  {errors.parentSignatureDate && <p className="mt-1 text-xs text-red-600">{errors.parentSignatureDate}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-3 md:mb-0">
            {Object.keys(errors).length > 0 && (
              <div className="flex items-center text-red-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Please fill in all required fields marked with *</span>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setNewStudent(initialStudentState);
                setErrors({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editingStudentId ? handleUpdateStudent : handleAddStudent}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors w-full sm:w-auto"
              disabled={Object.keys(errors).length > 0}
            >
              <FiSave className="mr-2" />
              {editingStudentId ? 'Update Student' : 'Save Student'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}