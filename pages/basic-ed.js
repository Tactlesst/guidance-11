import { useState } from 'react';

const BasicEdModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Personal Data
    lastName: '',
    givenName: '',
    middleName: '',
    gender: '',
    citizenship: '',
    address: '',
    phone: '',
    birthDate: '',
    birthMonth: '',
    birthYear: '',
    birthPlace: '',
    religion: '',
    baptism: { yes: false, no: false, date: '', church: '' },
    firstCommunion: { yes: false, no: false, date: '', church: '' },
    confirmation: { yes: false, no: false, date: '', church: '' },
    emergencyContact: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    
    // Family Information
    fatherName: '',
    fatherOccupation: '',
    fatherLocation: '',
    fatherEmploymentType: '',
    fatherStatus: '',
    fatherEducation: '',
    fatherDegree: '',
    fatherPostGrad: '',
    fatherSpecialization: '',
    motherName: '',
    motherOccupation: '',
    motherLocation: '',
    motherEmploymentType: '',
    motherStatus: '',
    motherEducation: '',
    motherDegree: '',
    motherPostGrad: '',
    motherSpecialization: '',
    parentsMaritalStatus: '',
    childResidingWith: '',
    birthOrder: '',
    siblingsCount: '',
    brothers: 0,
    sisters: 0,
    stepBrothers: 0,
    stepSisters: 0,
    adopted: 0,
    relativesAtHome: '',
    familyIncome: '',
    siblings: [{ name: '', age: '', school: '', status: '', occupation: '' }],
    
    // Residence Info
    residenceType: '',
    languages: '',
    financialSupport: [],
    leisureActivities: [],
    talents: '',
    guardianName: '',
    guardianAddress: '',
    guardianRelation: '',
    
    // Educational Background
    preschool: { school: '', awards: '', year: '' },
    gradeSchool: { school: '', awards: '', year: '' },
    highSchool: { school: '', awards: '', year: '' },
    
    // Organizational Affiliations
    organizations: [{ yearFrom: '', yearTo: '', name: '', designation: '' }],
    
    // Health
    height: '',
    weight: '',
    physicalCondition: '',
    healthProblem: { hasProblem: false, description: '' },
    lastDoctorVisit: { date: '', reason: '' },
    generalCondition: '',
    
    // Test Results
    tests: [{ name: '', date: '', rating: '' }]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle nested checkbox fields (like sacraments)
      const [parent, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };

  const addSibling = () => {
    setFormData(prev => ({
      ...prev,
      siblings: [...prev.siblings, { name: '', age: '', school: '', status: '', occupation: '' }]
    }));
  };

  const addOrganization = () => {
    setFormData(prev => ({
      ...prev,
      organizations: [...prev.organizations, { yearFrom: '', yearTo: '', name: '', designation: '' }]
    }));
  };

  const addTest = () => {
    setFormData(prev => ({
      ...prev,
      tests: [...prev.tests, { name: '', date: '', rating: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-[#163269] text-white p-4 rounded-t-lg sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">St. Rifa's College of Balingasag - Basic Education Department</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm mt-1">GUIDANCE CENTER - Personal Data Sheet</p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* School Year and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Year</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                placeholder="SY ______"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grade/Year Level</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                placeholder="______"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1 flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="status" className="text-[#163269]" />
                  <span className="ml-2">New</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="status" className="text-[#163269]" />
                  <span className="ml-2">Transferee</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="status" className="text-[#163269]" />
                  <span className="ml-2">Returnee</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="status" className="text-[#163269]" />
                  <span className="ml-2">Old</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section I: Personal Data */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">I. PERSONAL DATA</h3>
            
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Given Name</label>
                <input
                  type="text"
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Given Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Middle Name"
                />
              </div>
            </div>

            {/* Gender, Citizenship */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="Male" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="gender" value="Female" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Citizenship</label>
                <input
                  type="text"
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Citizenship"
                />
              </div>
            </div>

            {/* Address, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tel./Mobile #</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Tel./Mobile #"
                />
              </div>
            </div>

            {/* Birth Date, Place, Religion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="birthMonth"
                    value={formData.birthMonth}
                    onChange={handleChange}
                    className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Month"
                  />
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Day"
                  />
                  <input
                    type="text"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Year"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Place of Birth</label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Place of Birth"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Religion"
                />
              </div>
            </div>

            {/* Sacraments */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Sacrament (please check)</label>
              <div className="mt-2 space-y-2">
                {/* Baptism */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center">
                    <span className="mr-2">Baptism</span>
                    <label className="inline-flex items-center mr-4">
                      <input type="checkbox" name="baptism.yes" checked={formData.baptism.yes} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="baptism.no" checked={formData.baptism.no} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="baptism.date"
                      value={formData.baptism.date}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Date"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="baptism.church"
                      value={formData.baptism.church}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Church"
                    />
                  </div>
                </div>

                {/* 1st Communion */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center">
                    <span className="mr-2">1st Communion</span>
                    <label className="inline-flex items-center mr-4">
                      <input type="checkbox" name="firstCommunion.yes" checked={formData.firstCommunion.yes} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="firstCommunion.no" checked={formData.firstCommunion.no} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstCommunion.date"
                      value={formData.firstCommunion.date}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Date"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="firstCommunion.church"
                      value={formData.firstCommunion.church}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Church"
                    />
                  </div>
                </div>

                {/* Confirmation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center">
                    <span className="mr-2">Confirmation</span>
                    <label className="inline-flex items-center mr-4">
                      <input type="checkbox" name="confirmation.yes" checked={formData.confirmation.yes} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="confirmation.no" checked={formData.confirmation.no} onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="confirmation.date"
                      value={formData.confirmation.date}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Date"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="confirmation.church"
                      value={formData.confirmation.church}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Church"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Person to be contacted in case of emergency</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Emergency Contact"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <input
                  type="text"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Relationship"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="text"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Contact Number"
                />
              </div>
            </div>
          </div>

          {/* Section II: Family Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">II. FAMILY INFORMATION (Write + if deceased)</h3>
            
            {/* Father's Information */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">Father's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Surname Given Name Middle Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Occupation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="fatherLocation" value="Overseas" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Overseas</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="fatherLocation" value="Local" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Local</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <div className="mt-1 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="fatherEmploymentType" value="Private" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Private</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="fatherEmploymentType" value="Govt" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Govt</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="fatherStatus" value="Employed" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Employed</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="fatherStatus" value="Unemployed" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Unemployed</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="fatherStatus" value="Deceased" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Deceased</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="fatherStatus" value="Retired" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Retired</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="fatherStatus" value="Disabled" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Disabled</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highest Educational Attainment</label>
                  <select
                    name="fatherEducation"
                    value={formData.fatherEducation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  >
                    <option value="">Select</option>
                    <option value="Some Elementary">Some Elementary</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Some High School">Some High School</option>
                    <option value="High School">High School</option>
                    <option value="Some College">Some College</option>
                    <option value="College Degree">College Degree</option>
                    <option value="Post Graduate Studies">Post Graduate Studies</option>
                    <option value="MS/MS">MS/MS</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    name="fatherDegree"
                    value={formData.fatherDegree}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Degree"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    name="fatherSpecialization"
                    value={formData.fatherSpecialization}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specialization"
                  />
                </div>
              </div>
            </div>

            {/* Mother's Information */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">Mother's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Surname Given Name Middle Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Occupation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="motherLocation" value="Overseas" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Overseas</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="motherLocation" value="Local" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Local</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <div className="mt-1 flex space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="motherEmploymentType" value="Private" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Private</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="motherEmploymentType" value="Govt" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Govt</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="motherStatus" value="Employed" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Employed</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="motherStatus" value="Unemployed" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Unemployed</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="motherStatus" value="Deceased" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Deceased</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="motherStatus" value="Retired" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Retired</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" name="motherStatus" value="Disabled" onChange={handleChange} className="text-[#163269]" />
                      <span className="ml-2">Disabled</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highest Educational Attainment</label>
                  <select
                    name="motherEducation"
                    value={formData.motherEducation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  >
                    <option value="">Select</option>
                    <option value="Some Elementary">Some Elementary</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Some High School">Some High School</option>
                    <option value="High School">High School</option>
                    <option value="Some College">Some College</option>
                    <option value="College Degree">College Degree</option>
                    <option value="Post Graduate Studies">Post Graduate Studies</option>
                    <option value="MS/MS">MS/MS</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    name="motherDegree"
                    value={formData.motherDegree}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Degree"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Specialization</label>
                  <input
                    type="text"
                    name="motherSpecialization"
                    value={formData.motherSpecialization}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specialization"
                  />
                </div>
              </div>
            </div>

            {/* Parents Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parents Marital Status</label>
                <div className="mt-1 grid grid-cols-1 gap-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="parentsMaritalStatus" value="Sacramental Marriage" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Sacramental Marriage</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="parentsMaritalStatus" value="Civil" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Civil</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="parentsMaritalStatus" value="Legally Separated" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Legally Separated</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="parentsMaritalStatus" value="Annulled" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Annulled</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="parentsMaritalStatus" value="Unmarried" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Unmarried</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Child is Residing</label>
                <div className="mt-1 grid grid-cols-1 gap-2">
                  <label className="inline-flex items-center">
                    <input type="radio" name="childResidingWith" value="Both Parent" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Both Parent</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="childResidingWith" value="Father Only" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Father Only</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="childResidingWith" value="Mother Only" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Mother Only</span>
                  </label>
                  <div className="flex items-center">
                    <input type="radio" name="childResidingWith" value="Others" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Others, Pls. Specify</span>
                    <input
                      type="text"
                      name="childResidingWithOther"
                      className="ml-2 flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Specify"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Birth Order */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Birth Order</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <label key={num} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="birthOrder"
                      value={num}
                      checked={formData.birthOrder === num.toString()}
                      onChange={handleChange}
                      className="text-[#163269]"
                    />
                    <span className="ml-2">{num === 1 ? `${num}st` : num === 2 ? `${num}nd` : num === 3 ? `${num}rd` : `${num}th`}</span>
                  </label>
                ))}
                <div className="flex items-center">
                  <input type="radio" name="birthOrder" value="Other" className="text-[#163269]" />
                  <span className="ml-2">Others please specify</span>
                  <input
                    type="text"
                    name="birthOrderOther"
                    className="ml-2 flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specify"
                  />
                </div>
              </div>
            </div>

            {/* Siblings */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Number of Siblings</label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Brother/s</label>
                  <input
                    type="number"
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Sister/s</label>
                  <input
                    type="number"
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Step Brother/s</label>
                  <input
                    type="number"
                    name="stepBrothers"
                    value={formData.stepBrothers}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Step Sister/s</label>
                  <input
                    type="number"
                    name="stepSisters"
                    value={formData.stepSisters}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Adopted</label>
                  <input
                    type="number"
                    name="adopted"
                    value={formData.adopted}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Other Relatives at Home */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Other Relatives at Home</label>
              <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Grand Parents', 'Uncle', 'Aunt', 'Cousins'].map(relative => (
                  <label key={relative} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={`relativesAtHome_${relative.replace(/\s+/g, '')}`}
                      checked={formData.relativesAtHome.includes(relative)}
                      onChange={() => {
                        const newRelatives = formData.relativesAtHome.includes(relative)
                          ? formData.relativesAtHome.filter(r => r !== relative)
                          : [...formData.relativesAtHome, relative];
                        setFormData(prev => ({
                          ...prev,
                          relativesAtHome: newRelatives
                        }));
                      }}
                      className="text-[#163269]"
                    />
                    <span className="ml-2">{relative}</span>
                  </label>
                ))}
                <div className="flex items-center col-span-2 md:col-span-4">
                  <span className="mr-2">Others pls. specify</span>
                  <input
                    type="text"
                    name="relativesAtHomeOther"
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specify"
                  />
                </div>
              </div>
            </div>

            {/* Family Monthly Income */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">FAMILY MONTHLY INCOME</label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  'Below P 10, 000.00',
                  'P 10, 001 - Php13, 000',
                  'P 13, 001 - Php15, 000',
                  'P 15, 001 - Php18, 000',
                  'P 18, 001 - Php21, 000',
                  'P 21, 001 - Php24, 000',
                  'P 24, 001 - Php27, 000',
                  'P 27, 001 - Php30, 000',
                  'Above P 30, 000.00'
                ].map(income => (
                  <label key={income} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="familyIncome"
                      value={income}
                      checked={formData.familyIncome === income}
                      onChange={handleChange}
                      className="text-[#163269]"
                    />
                    <span className="ml-2">{income}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Siblings Table */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">SIBLINGS (from Oldest to Youngest)</label>
                <button
                  type="button"
                  onClick={addSibling}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#163269] hover:bg-[#1e4091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#163269]"
                >
                  Add Sibling
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.siblings.map((sibling, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={sibling.name}
                            onChange={(e) => handleArrayChange('siblings', index, 'name', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                            placeholder="Name"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={sibling.age}
                            onChange={(e) => handleArrayChange('siblings', index, 'age', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                            placeholder="Age"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={sibling.school}
                            onChange={(e) => handleArrayChange('siblings', index, 'school', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                            placeholder="School"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={sibling.status}
                            onChange={(e) => handleArrayChange('siblings', index, 'status', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                            placeholder="Status"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={sibling.occupation}
                            onChange={(e) => handleArrayChange('siblings', index, 'occupation', e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                            placeholder="Occupation"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Residence Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Is your residence</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="residenceType" value="rented" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Rented</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="residenceType" value="owned" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Owned</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Languages spoken at home</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Languages"
                />
              </div>
            </div>

            {/* Financial Support */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Source of financial support</label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                {['Parents', 'Grandparents'].map(source => (
                  <label key={source} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={`financialSupport_${source}`}
                      checked={formData.financialSupport.includes(source)}
                      onChange={() => {
                        const newSources = formData.financialSupport.includes(source)
                          ? formData.financialSupport.filter(s => s !== source)
                          : [...formData.financialSupport, source];
                        setFormData(prev => ({
                          ...prev,
                          financialSupport: newSources
                        }));
                      }}
                      className="text-[#163269]"
                    />
                    <span className="ml-2">{source}</span>
                  </label>
                ))}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="financialSupport_Other"
                    checked={formData.financialSupport.some(s => !['Parents', 'Grandparents'].includes(s))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          financialSupport: [...prev.financialSupport, 'Other']
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          financialSupport: prev.financialSupport.filter(s => ['Parents', 'Grandparents'].includes(s))
                        }));
                      }
                    }}
                    className="text-[#163269]"
                  />
                  <span className="ml-2">Others (specify)</span>
                  <input
                    type="text"
                    name="financialSupportOther"
                    className="ml-2 flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specify"
                  />
                </div>
              </div>
            </div>

            {/* Leisure Activities */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Leisure activities of the family members</label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                {['listening to radio', 'watching TV', 'picnic'].map(activity => (
                  <label key={activity} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={`leisureActivities_${activity.replace(/\s+/g, '')}`}
                      checked={formData.leisureActivities.includes(activity)}
                      onChange={() => {
                        const newActivities = formData.leisureActivities.includes(activity)
                          ? formData.leisureActivities.filter(a => a !== activity)
                          : [...formData.leisureActivities, activity];
                        setFormData(prev => ({
                          ...prev,
                          leisureActivities: newActivities
                        }));
                      }}
                      className="text-[#163269]"
                    />
                    <span className="ml-2">{activity}</span>
                  </label>
                ))}
                <div className="flex items-center col-span-3">
                  <span className="mr-2">Others pls. specify</span>
                  <input
                    type="text"
                    name="leisureActivitiesOther"
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Specify"
                  />
                </div>
              </div>
            </div>

            {/* Special Talent */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Special talent/s</label>
              <input
                type="text"
                name="talents"
                value={formData.talents}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                placeholder="Special talent/s"
              />
            </div>

            {/* Guardian Info (if not living with parents) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">If not living with parents:</label>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Guardian's Name</label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Guardian's Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">Address</label>
                  <input
                    type="text"
                    name="guardianAddress"
                    value={formData.guardianAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-500">Relation</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {['sister/brother', 'aunt/uncle', 'land lord/lady', 'grandparents'].map(relation => (
                    <label key={relation} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="guardianRelation"
                        value={relation}
                        checked={formData.guardianRelation === relation}
                        onChange={handleChange}
                        className="text-[#163269]"
                      />
                      <span className="ml-2 capitalize">{relation}</span>
                    </label>
                  ))}
                  <div className="flex items-center">
                    <input type="radio" name="guardianRelation" value="Other" className="text-[#163269]" />
                    <span className="ml-2">Others please specify</span>
                    <input
                      type="text"
                      name="guardianRelationOther"
                      className="ml-2 flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Specify"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section III: Educational Background */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">III. EDUCATIONAL BACKGROUND</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Attended/School Address</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awards/Honors Received</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Year Attended</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap">Preschool</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="preschool.school"
                        value={formData.preschool.school}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School/Address"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="preschool.awards"
                        value={formData.preschool.awards}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="Awards/Honors"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="preschool.year"
                        value={formData.preschool.year}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School Year"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap">Grade School</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="gradeSchool.school"
                        value={formData.gradeSchool.school}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School/Address"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="gradeSchool.awards"
                        value={formData.gradeSchool.awards}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="Awards/Honors"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="gradeSchool.year"
                        value={formData.gradeSchool.year}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School Year"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap">High School</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="highSchool.school"
                        value={formData.highSchool.school}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School/Address"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="highSchool.awards"
                        value={formData.highSchool.awards}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="Awards/Honors"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        name="highSchool.year"
                        value={formData.highSchool.year}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                        placeholder="School Year"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section IV: Organizational Affiliations */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">IV. ORGANIZATIONAL AFFILIATIONS</h3>
            
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Organizations/Clubs</label>
              <button
                type="button"
                onClick={addOrganization}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#163269] hover:bg-[#1e4091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#163269]"
              >
                Add Organization
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.organizations.map((org, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <span className="mr-2">SY</span>
                    <input
                      type="text"
                      value={org.yearFrom}
                      onChange={(e) => handleArrayChange('organizations', index, 'yearFrom', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="200__"
                    />
                    <span className="mx-2">-</span>
                    <input
                      type="text"
                      value={org.yearTo}
                      onChange={(e) => handleArrayChange('organizations', index, 'yearTo', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="200__"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={org.name}
                      onChange={(e) => handleArrayChange('organizations', index, 'name', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Organizational/Club"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={org.designation}
                      onChange={(e) => handleArrayChange('organizations', index, 'designation', e.target.value)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Designation"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section V: Health */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">V. HEALTH</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Height"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Physical Condition</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="physicalCondition" value="Good" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Good</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="physicalCondition" value="Fair" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Fair</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="physicalCondition" value="Poor" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Poor</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Any physical handicap or health problem</label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="healthProblem.hasProblem" value="yes" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="healthProblem.hasProblem" value="no" onChange={handleChange} className="text-[#163269]" />
                    <span className="ml-2">No</span>
                  </label>
                </div>
                {formData.healthProblem.hasProblem === 'yes' && (
                  <div className="mt-2">
                    <label className="block text-xs font-medium text-gray-500">If yes, what is it?</label>
                    <input
                      type="text"
                      name="healthProblem.description"
                      value={formData.healthProblem.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                      placeholder="Describe health problem"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">When was your last visit to the doctor?</label>
                <input
                  type="text"
                  name="lastDoctorVisit.date"
                  value={formData.lastDoctorVisit.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Date"
                />
                <label className="block text-xs font-medium text-gray-500 mt-2">Why?</label>
                <input
                  type="text"
                  name="lastDoctorVisit.reason"
                  value={formData.lastDoctorVisit.reason}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                  placeholder="Reason"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">General Condition</label>
              <div className="mt-1 flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="generalCondition" value="Good Condition" onChange={handleChange} className="text-[#163269]" />
                  <span className="ml-2">Good Condition</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="generalCondition" value="Under Medication" onChange={handleChange} className="text-[#163269]" />
                  <span className="ml-2">Under Medication</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="generalCondition" value="With Special Care/Attention" onChange={handleChange} className="text-[#163269]" />
                  <span className="ml-2">With Special Care/Attention</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section VI: Test Results */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold text-[#163269] mb-4">VI. TEST RESULTS</h3>
            
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Tests Taken</label>
              <button
                type="button"
                onClick={addTest}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#163269] hover:bg-[#1e4091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#163269]"
              >
                Add Test
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Taken</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Taken</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.tests.map((test, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => handleArrayChange('tests', index, 'name', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                          placeholder="Test Name"
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={test.date}
                          onChange={(e) => handleArrayChange('tests', index, 'date', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                          placeholder="Date"
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={test.rating}
                          onChange={(e) => handleArrayChange('tests', index, 'rating', e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                          placeholder="Rating"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Privacy Notice */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-md font-medium text-[#163269] mb-2">Dear Student/Parent,</h4>
            <p className="text-sm text-gray-600 mb-2">
              St. Rita's College of Balingasag – Guidance Center shall protect the data you provided in compliance with the Data Privacy Act of 2012 and it's implementing rules and regulations. SRCB – Guidance Center will not collect, disclose or process personal data, including data that may classified as personal information and/or sensitive personal information unless you voluntarily choose to provide us with it and give your consent thereto, or unless such disclosure is required by applicable laws and regulations.
            </p>
            <p className="text-sm text-gray-600">
              By signing this form, you hereby agree and express your voluntary, unequivocal and informed consent that your Personal data which you have provided to SRCB – Guidance Center shall be processed by them for the purposes of carrying out their Guidance Program Services.
            </p>
          </div>

          {/* Signature Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Signature over printed name</label>
              <div className="mt-1 flex">
                <div className="flex-1 border-b-2 border-gray-300 h-8"></div>
              </div>
              <label className="block text-xs font-medium text-gray-500 mt-2">Date Signed</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                placeholder="Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">If below 18 y/o:</label>
              <label className="block text-xs font-medium text-gray-500 mt-2">Signature of Parent/Guardian over printed name</label>
              <div className="mt-1 flex">
                <div className="flex-1 border-b-2 border-gray-300 h-8"></div>
              </div>
              <label className="block text-xs font-medium text-gray-500 mt-2">Date Signed</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#163269] focus:border-[#163269]"
                placeholder="Date"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#163269]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#163269] hover:bg-[#1e4091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#163269]"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicEdModal;