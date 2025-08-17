// components/Basic-ed/BasicEdModal.js
import { useRef } from "react";
import { FiX, FiUser, FiUpload, FiSave, FiPlus } from "react-icons/fi";

const FAMILY_INCOME_RANGES = [
  'Below ₱10,000.00',
  '₱10,001 - ₱13,000',
  '₱13,001 - ₱15,000',
  '₱15,001 - ₱18,000',
  '₱18,001 - ₱21,000',
  '₱21,001 - ₱24,000',
  '₱24,001 - ₱27,000',
  '₱27,001 - ₱30,000',
  'Above ₱30,000'
];
const RELATIONSHIP_OPTIONS = ['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents', 'other'];
const GRADE_LEVELS = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];
const MARITAL_STATUSES = ['Sacramental Marriage', 'Civil', 'Legally Separated', 'Annulled', 'Unmarried'];
const RESIDENCE_OPTIONS = ['Both Parents', 'Father Only', 'Mother Only', 'Others'];
const FINANCIAL_SUPPORT_OPTIONS = ['Parents', 'Grandparents', 'Others'];
const LEISURE_ACTIVITIES = ['Listening to radio', 'Watching TV', 'Picnic'];

export default function BasicEdModal({
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
                <label className="block text-sm font-medium text-gray-700 mb-2">School Year*</label>
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
                  <option value="">Select Grade</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={newStudent.firstName || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      checked={newStudent.gender === 'Male'}
                      onChange={() => setNewStudent({ ...newStudent, gender: 'Male' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      checked={newStudent.gender === 'Female'}
                      onChange={() => setNewStudent({ ...newStudent, gender: 'Female' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
                {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
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
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
              <input
                type="text"
                name="address"
                value={newStudent.address || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                placeholder="Enter complete address"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                <input
                  type="date"
                  name="birthDate"
                  value={newStudent.birthDate || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition`}
                />
                {errors.birthDate && <p className="mt-1 text-xs text-red-600">{errors.birthDate}</p>}
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

            <div className="mb-6">
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

            {/* Sacraments Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sacraments Received</label>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Sacrament</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Received</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Church</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[
                      { sacrament: 'baptism', label: 'Baptism' },
                      { sacrament: 'firstCommunion', label: 'First Communion' },
                      { sacrament: 'confirmation', label: 'Confirmation' }
                    ].map(({ sacrament, label }) => (
                      <tr key={sacrament} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-700">{label}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newStudent[sacrament].received || false}
                              onChange={(e) => handleSacramentChange(sacrament, 'received', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="date"
                            value={newStudent[sacrament].date || ''}
                            onChange={(e) => handleSacramentChange(sacrament, 'date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            disabled={!newStudent[sacrament].received}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={newStudent[sacrament].church || ''}
                            onChange={(e) => handleSacramentChange(sacrament, 'church', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            disabled={!newStudent[sacrament].received}
                            placeholder="Church name"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Person</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={newStudent.emergencyContact || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter emergency contact"
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
                  placeholder="Enter emergency number"
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
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newStudent.father.lastName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          father: { ...newStudent.father, lastName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        value={newStudent.father.firstName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          father: { ...newStudent.father, firstName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={newStudent.father.middleName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          father: { ...newStudent.father, middleName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter middle name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                    <input
                      type="text"
                      value={newStudent.father.occupation || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        father: { ...newStudent.father, occupation: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter occupation"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Location</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherLocation"
                            checked={newStudent.father.location === 'Overseas'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              father: { ...newStudent.father, location: 'Overseas' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Overseas</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherLocation"
                            checked={newStudent.father.location === 'Local'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              father: { ...newStudent.father, location: 'Local' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Local</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherEmploymentType"
                            checked={newStudent.father.employmentType === 'Private'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              father: { ...newStudent.father, employmentType: 'Private' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Private</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="fatherEmploymentType"
                            checked={newStudent.father.employmentType === 'Government'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              father: { ...newStudent.father, employmentType: 'Government' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Government</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['Employed', 'Unemployed', 'Deceased', 'Retired', 'Disabled'].map(status => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="fatherStatus"
                            checked={newStudent.father.status === status}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              father: { ...newStudent.father, status: status } 
                            })}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <input
                      type="text"
                      value={newStudent.father.education || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        father: { ...newStudent.father, education: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter education level"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newStudent.father.specialization || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        father: { ...newStudent.father, specialization: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter specialization"
                    />
                  </div>
                </div>
              </div>
              
              {/* Mother's Information */}
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-medium text-pink-800 mb-4 text-lg">Mother's Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.lastName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          mother: { ...newStudent.mother, lastName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.firstName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          mother: { ...newStudent.mother, firstName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={newStudent.mother.middleName || ''}
                        onChange={(e) => setNewStudent({ 
                          ...newStudent, 
                          mother: { ...newStudent.mother, middleName: e.target.value } 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter middle name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Occupation</label>
                    <input
                      type="text"
                      value={newStudent.mother.occupation || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        mother: { ...newStudent.mother, occupation: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter occupation"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Location</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherLocation"
                            checked={newStudent.mother.location === 'Overseas'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              mother: { ...newStudent.mother, location: 'Overseas' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Overseas</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherLocation"
                            checked={newStudent.mother.location === 'Local'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              mother: { ...newStudent.mother, location: 'Local' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Local</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <div className="flex gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherEmploymentType"
                            checked={newStudent.mother.employmentType === 'Private'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              mother: { ...newStudent.mother, employmentType: 'Private' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Private</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="motherEmploymentType"
                            checked={newStudent.mother.employmentType === 'Government'}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              mother: { ...newStudent.mother, employmentType: 'Government' } 
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-1 text-xs">Government</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['Employed', 'Unemployed', 'Deceased', 'Retired', 'Disabled'].map(status => (
                        <label key={status} className="flex items-center">
                          <input
                            type="radio"
                            name="motherStatus"
                            checked={newStudent.mother.status === status}
                            onChange={() => setNewStudent({ 
                              ...newStudent, 
                              mother: { ...newStudent.mother, status: status } 
                            })}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-1 text-xs">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Highest Educational Attainment</label>
                    <input
                      type="text"
                      value={newStudent.mother.education || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        mother: { ...newStudent.mother, education: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter education level"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newStudent.mother.specialization || ''}
                      onChange={(e) => setNewStudent({ 
                        ...newStudent, 
                        mother: { ...newStudent.mother, specialization: e.target.value } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter specialization"
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
                {newStudent.childResidence === 'Others' && (
                  <input
                    type="text"
                    name="childResidenceOther"
                    value={newStudent.childResidenceOther || ''}
                    onChange={handleInputChange}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-32"
                    placeholder="Please specify"
                  />
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Birth Order</label>
              <div className="flex flex-wrap gap-3">
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].map((order) => (
                  <label key={order} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birthOrder"
                      checked={newStudent.birthOrder === order}
                      onChange={() => setNewStudent({ ...newStudent, birthOrder: order })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{order}</span>
                  </label>
                ))}
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="birthOrder"
                    checked={!['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'].includes(newStudent.birthOrder)}
                    onChange={() => setNewStudent({ ...newStudent, birthOrder: 'other' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                  {newStudent.birthOrder === 'other' && (
                    <input
                      type="text"
                      value={newStudent.otherBirthOrder || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, otherBirthOrder: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                      placeholder="Specify"
                    />
                  )}
                </label>
              </div>
            </div>
            
            {/* Number of Siblings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Siblings</label>
                <input
                  type="number"
                  name="siblingsCount"
                  value={newStudent.siblingsCount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  min="0"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Siblings Breakdown</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Brothers', 'Sisters', 'Step Brothers', 'Step Sisters', 'Adopted'].map(type => (
                    <div key={type} className="flex items-center">
                      <span className="text-xs mr-2 w-20 truncate">{type}:</span>
                      <input
                        type="number"
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        min="0"
                        placeholder="0"
                        value={newStudent.siblingDetails?.[type.toLowerCase().replace(' ', '')] || ''}
                        onChange={(e) => setNewStudent({
                          ...newStudent,
                          siblingDetails: {
                            ...newStudent.siblingDetails,
                            [type.toLowerCase().replace(' ', '')]: e.target.value
                          }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Relatives at Home</label>
              <div className="flex flex-wrap gap-2">
                {['Brother/s', 'Sister/s', 'Grand Parents', 'Uncle', 'Aunt', 'Step Brother/s', 'Step Sister/s', 'Cousins'].map(relative => (
                  <label key={relative} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.otherRelativesAtHome?.includes(relative) || false}
                      onChange={() => {
                        const current = newStudent.otherRelativesAtHome || [];
                        const updated = current.includes(relative)
                          ? current.filter(r => r !== relative)
                          : [...current, relative];
                        setNewStudent({ ...newStudent, otherRelativesAtHome: updated });
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{relative}</span>
                  </label>
                ))}
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newStudent.otherRelativesAtHome?.includes('Other') || false}
                    onChange={() => {
                      const current = newStudent.otherRelativesAtHome || [];
                      const updated = current.includes('Other')
                        ? current.filter(r => r !== 'Other')
                        : [...current, 'Other'];
                      setNewStudent({ ...newStudent, otherRelativesAtHome: updated });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Other</span>
                  {newStudent.otherRelativesAtHome?.includes('Other') && (
                    <input
                      type="text"
                      value={newStudent.otherRelativeSpecify || ''}
                      onChange={(e) => setNewStudent({ ...newStudent, otherRelativeSpecify: e.target.value })}
                      className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-20"
                      placeholder="Specify"
                    />
                  )}
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Monthly Income</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FAMILY_INCOME_RANGES.map(income => (
                  <label key={income} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="familyMonthlyIncome"
                      checked={newStudent.familyMonthlyIncome === income}
                      onChange={() => setNewStudent({ ...newStudent, familyMonthlyIncome: income })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{income}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Residence Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Residence Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Is your residence:</label>
                  <div className="flex gap-4">
                    {['Rented', 'Owned'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="residenceType"
                          checked={newStudent.residenceType === option}
                          onChange={() => setNewStudent({...newStudent, residenceType: option})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages spoken at home:</label>
                  <input
                    type="text"
                    name="languagesSpokenAtHome"
                    value={newStudent.languagesSpokenAtHome || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="e.g., English, Tagalog, etc."
                  />
                </div>
              </div>
            </div>

            {/* Financial Support */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Support</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Source of financial support:</label>
                <div className="flex flex-wrap gap-4">
                  {FINANCIAL_SUPPORT_OPTIONS.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.financialSupport?.includes(option) || false}
                        onChange={() => handleCheckboxChange('financialSupport', option)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {newStudent.financialSupport?.includes('Others') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="otherFinancialSupport"
                      value={newStudent.otherFinancialSupport || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                      placeholder="Please specify"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leisure activities of the family:</label>
                <div className="flex flex-wrap gap-4">
                  {LEISURE_ACTIVITIES.map(activity => (
                    <label key={activity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newStudent.leisureActivities?.includes(activity) || false}
                        onChange={() => handleCheckboxChange('leisureActivities', activity)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{activity}</span>
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newStudent.leisureActivities?.includes('Others') || false}
                      onChange={() => handleCheckboxChange('leisureActivities', 'Others')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Others (pls. specify)</span>
                    {newStudent.leisureActivities?.includes('Others') && (
                      <input
                        type="text"
                        name="otherLeisureActivity"
                        value={newStudent.otherLeisureActivity || ''}
                        onChange={handleInputChange}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm w-32"
                        placeholder="Specify"
                      />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Special Talents */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Special Talents</h3>
              <textarea
                name="specialTalents"
                value={newStudent.specialTalents || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                rows={3}
                placeholder="List any special talents or skills"
              />
            </div>

            {/* Guardian Information (if not living with parents) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                  <select
                    name="guardianRelationship"
                    value={newStudent.guardianRelationship || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  >
                    <option value="">Select Relation</option>
                    {RELATIONSHIP_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {newStudent.guardianRelationship === 'other' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="otherGuardianRelationship"
                        value={newStudent.otherGuardianRelationship || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                        placeholder="Please specify"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian's Address</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Siblings (from Oldest to Youngest)</label>
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
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Attended/School Address</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Awards/Honors Received</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">School Year Attended</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { level: 'preschool', label: 'Preschool' },
                    { level: 'elementary', label: 'Elementary' },
                    { level: 'highSchool', label: 'High School' }
                  ].map(({ level, label }) => (
                    <tr key={level} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm font-medium text-gray-700">{label}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].school || ''}
                          onChange={(e) => handleEducationChange(level, 'school', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter school name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].awards || ''}
                          onChange={(e) => handleEducationChange(level, 'awards', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter awards/honors"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={newStudent[level].year || ''}
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
                          placeholder="SY 2023-2024"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.organization || ''}
                          onChange={(e) => handleOrganizationChange(index, 'organization', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Organization name"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          value={org.designation || ''}
                          onChange={(e) => handleOrganizationChange(index, 'designation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                          placeholder="Position/role"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="text"
                  name="height"
                  value={newStudent.height || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  name="weight"
                  value={newStudent.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="e.g., 45"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Physical Condition</label>
              <div className="flex flex-wrap gap-3">
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

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Any physical handicap or health problem</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="healthProblem"
                    checked={newStudent.healthProblem === 'Yes'}
                    onChange={() => setNewStudent({ ...newStudent, healthProblem: 'Yes' })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="healthProblem"
                    checked={newStudent.healthProblem === 'No'}
                    onChange={() => setNewStudent({ ...newStudent, healthProblem: 'No' })}
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
                    value={newStudent.healthProblemDetails || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                    placeholder="Specify details"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">When was your last visit to the doctor?</label>
                <input
                  type="date"
                  name="lastDoctorVisit"
                  value={newStudent.lastDoctorVisit || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  name="lastDoctorVisitReason"
                  value={newStudent.lastDoctorVisitReason || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition"
                  placeholder="Enter reason"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">General Condition</label>
              <div className="flex gap-3">
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