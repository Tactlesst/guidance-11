import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
  FiHome, FiCalendar, FiFileText, FiBell, FiAlertCircle, FiPlus, FiX,
  FiLogOut, FiMenu, FiBook, FiAward, FiUser, FiSave
} from "react-icons/fi";
import BasicEdModal from "../components/Basic-ed/BasicEdModal";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [educationLevel, setEducationLevel] = useState('higher-ed');
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Basic Ed Modal States
  const [showBasicEdModal, setShowBasicEdModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    schoolYear: '',
    gradeYearLevel: '',
    studentType: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    gender: '',
    citizenship: '',
    contactNumber: '',
    address: '',
    birthDate: '',
    birthPlace: '',
    religion: '',
    baptism: { received: false, date: '', church: '' },
    firstCommunion: { received: false, date: '', church: '' },
    confirmation: { received: false, date: '', church: '' },
    emergencyContact: '',
    emergencyRelation: '',
    emergencyNumber: '',
    father: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '',
      employmentType: '',
      status: '',
      education: '',
      specialization: ''
    },
    mother: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '',
      employmentType: '',
      status: '',
      education: '',
      specialization: ''
    },
    parentsMaritalStatus: '',
    childResidence: '',
    childResidenceOther: '',
    birthOrder: '',
    otherBirthOrder: '',
    siblingsCount: '',
    siblingDetails: {
      brothers: '',
      sisters: '',
      stepBrothers: '',
      stepSisters: '',
      adopted: ''
    },
    otherRelativesAtHome: [],
    familyMonthlyIncome: '',
    residenceType: '',
    languagesSpokenAtHome: '',
    financialSupport: [],
    leisureActivities: [],
    specialTalents: '',
    guardianName: '',
    guardianRelationship: '',
    otherGuardianRelationship: '',
    guardianAddress: '',
    siblings: [],
    preschool: { school: '', awards: '', year: '' },
    elementary: { school: '', awards: '', year: '' },
    highSchool: { school: '', awards: '', year: '' },
    organizations: [],
    height: '',
    weight: '',
    physicalCondition: '',
    healthProblem: '',
    healthProblemDetails: '',
    lastDoctorVisit: '',
    lastDoctorVisitReason: '',
    generalCondition: '',
    testResults: [],
    signatureName: '',
    signatureDate: '',
    parentSignatureName: '',
    parentSignatureDate: '',
    studentPhotoUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);

  // Fetch firstName, lastName, userId, appointments, and students from database
  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'Juan';
    const storedLastName = localStorage.getItem('lastName') || 'Dela Cruz';
    const storedUserId = localStorage.getItem('userId');
    setFirstName(storedFirstName);
    setLastName(storedLastName);

    const fetchAppointments = async () => {
      if (!storedUserId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`/api/students/appointments/list?userId=${storedUserId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchStudents = async () => {
      if (!storedUserId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const response = await fetch(`/api/students/basic-ed?userId=${storedUserId}`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchAppointments();
    fetchStudents();
  }, []);

  const fullname = `${firstName} ${lastName}`;

  const handleLogout = async () => {
    try {
      setActiveTab('Logout');
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        localStorage.removeItem('usertype');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('userId');
        router.push('/loginpage');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/loginpage');
    }
  };

  const handleBookAppointment = () => {
    console.log('Booking new appointment for', selectedDate);
  };

  const checkAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === dateStr);
  };

  // Basic Ed Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSacramentChange = (sacrament, field, value) => {
    setNewStudent({
      ...newStudent,
      [sacrament]: {
        ...newStudent[sacrament],
        [field]: value
      }
    });
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...newStudent.siblings];
    updatedSiblings[index][field] = value;
    setNewStudent({ ...newStudent, siblings: updatedSiblings });
  };

  const handleEducationChange = (level, field, value) => {
    setNewStudent({
      ...newStudent,
      [level]: {
        ...newStudent[level],
        [field]: value
      }
    });
  };

  const handleOrganizationChange = (index, field, value) => {
    const updatedOrganizations = [...newStudent.organizations];
    updatedOrganizations[index][field] = value;
    setNewStudent({ ...newStudent, organizations: updatedOrganizations });
  };

  const handleTestResultChange = (index, field, value) => {
    const updatedTestResults = [...newStudent.testResults];
    updatedTestResults[index][field] = value;
    setNewStudent({ ...newStudent, testResults: updatedTestResults });
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

const handleAddStudent = async () => {
  const errors = {};
  if (!newStudent.schoolYear) errors.schoolYear = 'School Year is required';
  if (!newStudent.gradeYearLevel) errors.gradeYearLevel = 'Grade/Year Level is required';
  if (!newStudent.studentType) errors.studentType = 'Student Type is required';
  if (!newStudent.lastName) errors.lastName = 'Last Name is required';
  if (!newStudent.firstName) errors.firstName = 'First Name is required';
  if (!newStudent.address) errors.address = 'Address is required';
  if (!newStudent.birthDate) errors.birthDate = 'Birth Date is required';
  if (!newStudent.signatureName) errors.signatureName = 'Signature Name is required';
  if (!newStudent.signatureDate) errors.signatureDate = 'Signature Date is required';

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    console.error('Form validation errors:', errors);
    return;
  }

  const sanitizedNewStudent = {
    ...newStudent,
    siblingsCount: newStudent.siblingsCount ? parseInt(newStudent.siblingsCount, 10) : null,
    birthDate: newStudent.birthDate || null,
    signatureDate: newStudent.signatureDate || null,
    studentType: ['New', 'Transferee', 'Returnee', 'Old'].includes(newStudent.studentType) ? newStudent.studentType : 'New',
    gender: ['Male', 'Female'].includes(newStudent.gender) ? newStudent.gender : null,
    residenceType: ['Rented', 'Owned'].includes(newStudent.residenceType) ? newStudent.residenceType : null,
    physicalCondition: ['Good', 'Fair', 'Poor'].includes(newStudent.physicalCondition) ? newStudent.physicalCondition : null,
    healthProblem: ['Yes', 'No'].includes(newStudent.healthProblem) ? newStudent.healthProblem : null,
    parentsMaritalStatus: ['Sacramental Marriage', 'Civil', 'Legally Separated', 'Annulled', 'Unmarried'].includes(newStudent.parentsMaritalStatus) ? newStudent.parentsMaritalStatus : null,
    siblingDetails: newStudent.siblingDetails ? {
      brothers: newStudent.siblingDetails.brothers ? parseInt(newStudent.siblingDetails.brothers, 10) : 0,
      sisters: newStudent.siblingDetails.sisters ? parseInt(newStudent.siblingDetails.sisters, 10) : 0,
      stepBrothers: newStudent.siblingDetails.stepBrothers ? parseInt(newStudent.siblingDetails.stepBrothers, 10) : 0,
      stepSisters: newStudent.siblingDetails.stepSisters ? parseInt(newStudent.siblingDetails.stepSisters, 10) : 0,
      adopted: newStudent.siblingDetails.adopted ? parseInt(newStudent.siblingDetails.adopted, 10) : 0
    } : {}
  };

  console.log('Sending sanitized newStudent to API:', JSON.stringify(sanitizedNewStudent, null, 2));

  try {
    const response = await fetch(`/api/students/basic-ed?userId=${localStorage.getItem('userId')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedNewStudent),
    });
    const responseText = await response.text();
    console.log('API response:', response.status, responseText);
    if (response.ok) {
      const data = JSON.parse(responseText);
      setStudents([...students, { id: data.id, ...sanitizedNewStudent }]);
      setShowBasicEdModal(false);
      setNewStudent(initialStudentState);
      setErrors({});
    } else {
      console.error('Failed to save student data:', responseText);
    }
  } catch (error) {
    console.error('Error saving student data:', error);
  }
};

  const handleUpdateStudent = async () => {
    // Validate required fields
    const newErrors = {};
    if (!newStudent.schoolYear) newErrors.schoolYear = 'School Year is required';
    if (!newStudent.gradeYearLevel) newErrors.gradeYearLevel = 'Grade Level is required';
    if (!newStudent.studentType) newErrors.studentType = 'Student Type is required';
    if (!newStudent.lastName) newErrors.lastName = 'Last Name is required';
    if (!newStudent.firstName) newErrors.firstName = 'First Name is required';
    if (!newStudent.address) newErrors.address = 'Address is required';
    if (!newStudent.birthDate) newErrors.birthDate = 'Birth Date is required';
    if (!newStudent.signatureName) newErrors.signatureName = 'Signature is required';
    if (!newStudent.signatureDate) newErrors.signatureDate = 'Date Signed is required';
    if (newStudent.age < 18 && !newStudent.parentSignatureName) newErrors.parentSignatureName = 'Parent Signature is required';
    if (newStudent.age < 18 && !newStudent.parentSignatureDate) newErrors.parentSignatureDate = 'Parent Date Signed is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`/api/students/basic-ed?userId=${localStorage.getItem('userId')}&studentId=${editingStudentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        setStudents(students.map(student => student.id === editingStudentId ? { id: editingStudentId, ...newStudent } : student));
        setShowBasicEdModal(false);
        setNewStudent(initialStudentState);
        setEditingStudentId(null);
        setErrors({});
      } else {
        console.error('Failed to update student data');
      }
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  };

  const handleEditStudent = async (studentId) => {
    try {
      const response = await fetch(`/api/students/basic-ed?userId=${localStorage.getItem('userId')}&studentId=${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setNewStudent(data);
        setEditingStudentId(studentId);
        setShowBasicEdModal(true);
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const initialStudentState = {
    schoolYear: '',
    gradeYearLevel: '',
    studentType: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    gender: '',
    citizenship: '',
    contactNumber: '',
    address: '',
    birthDate: '',
    birthPlace: '',
    religion: '',
    baptism: { received: false, date: '', church: '' },
    firstCommunion: { received: false, date: '', church: '' },
    confirmation: { received: false, date: '', church: '' },
    emergencyContact: '',
    emergencyRelation: '',
    emergencyNumber: '',
    father: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '',
      employmentType: '',
      status: '',
      education: '',
      specialization: ''
    },
    mother: {
      lastName: '',
      firstName: '',
      middleName: '',
      occupation: '',
      location: '',
      employmentType: '',
      status: '',
      education: '',
      specialization: ''
    },
    parentsMaritalStatus: '',
    childResidence: '',
    childResidenceOther: '',
    birthOrder: '',
    otherBirthOrder: '',
    siblingsCount: '',
    siblingDetails: {
      brothers: '',
      sisters: '',
      stepBrothers: '',
      stepSisters: '',
      adopted: ''
    },
    otherRelativesAtHome: [],
    familyMonthlyIncome: '',
    residenceType: '',
    languagesSpokenAtHome: '',
    financialSupport: [],
    leisureActivities: [],
    specialTalents: '',
    guardianName: '',
    guardianRelationship: '',
    otherGuardianRelationship: '',
    guardianAddress: '',
    siblings: [],
    preschool: { school: '', awards: '', year: '' },
    elementary: { school: '', awards: '', year: '' },
    highSchool: { school: '', awards: '', year: '' },
    organizations: [],
    height: '',
    weight: '',
    physicalCondition: '',
    healthProblem: '',
    healthProblemDetails: '',
    lastDoctorVisit: '',
    lastDoctorVisitReason: '',
    generalCondition: '',
    testResults: [],
    signatureName: '',
    signatureDate: '',
    parentSignatureName: '',
    parentSignatureDate: '',
    studentPhotoUrl: ''
  };

  function SidebarItem({ icon: Icon, label, activeTab, setActiveTab, isSidebarOpen }) {
    const isActive = activeTab === label;
    return (
      <button
        className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${isActive
            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm"
            : "hover:bg-gray-50 text-gray-700"
          }`}
        onClick={() => setActiveTab(label)}
      >
        <Icon size={20} className="flex-shrink-0" />
        {isSidebarOpen && <span className="font-medium">{label}</span>}
      </button>
    );
  }

  function Forms({ educationLevel, setEducationLevel, setShowBasicEdModal }) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Student Forms</h3>
          <p className="text-gray-600">Select the appropriate form for your education level</p>
        </div>
        
        <div className="space-y-4">
          {/* Higher Education Card */}
          <div 
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${educationLevel === 'higher-ed' ? 
              'border-blue-500 bg-blue-50 shadow-sm' : 
              'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}`}
            onClick={() => setEducationLevel('higher-ed')}
          >
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FiBook className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Higher Education Form</h4>
                <p className="text-sm text-gray-600">For college/university students</p>
                {educationLevel === 'higher-ed' && (
                  <div className="mt-2 text-sm text-blue-600 font-medium flex items-center">
                    <span>Selected</span>
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Senior High School Card */}
          <div 
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${educationLevel === 'shs' ? 
              'border-blue-500 bg-blue-50 shadow-sm' : 
              'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}`}
            onClick={() => setEducationLevel('shs')}
          >
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FiAward className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Senior High School Form</h4>
                <p className="text-sm text-gray-600">For Grades 11-12 students</p>
                {educationLevel === 'shs' && (
                  <div className="mt-2 text-sm text-blue-600 font-medium flex items-center">
                    <span>Selected</span>
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Education Card */}
          <div 
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${educationLevel === 'basic-ed' ? 
              'border-blue-500 bg-blue-50 shadow-sm' : 
              'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}`}
            onClick={() => setEducationLevel('basic-ed')}
          >
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FiUser className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Basic Education Form</h4>
                <p className="text-sm text-gray-600">For Grades 1-10 students</p>
                {educationLevel === 'basic-ed' && (
                  <div className="mt-2 text-sm text-blue-600 font-medium flex items-center">
                    <span>Selected</span>
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {educationLevel === 'basic-ed' && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Submitted Forms</h3>
            {students.length === 0 ? (
              <p className="text-gray-600">No student forms submitted yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map(student => (
                  <div key={student.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <h4 className="font-medium text-gray-800">{student.firstName} {student.lastName}</h4>
                    <p className="text-sm text-gray-600">School Year: {student.schoolYear}</p>
                    <p className="text-sm text-gray-600">Grade: {student.gradeYearLevel}</p>
                    <button
                      className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      Edit Form
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button 
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            onClick={() => {
              if (educationLevel === 'basic-ed') {
                setNewStudent(initialStudentState);
                setEditingStudentId(null);
                setShowBasicEdModal(true);
              }
              // Handle other form types as needed
            }}
          >
            Continue with Selected Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`bg-white shadow-xl transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-20"} h-screen sticky top-0 flex flex-col border-r border-gray-100`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <img
                  src="/images/guidancelogo.png"
                  alt="Guidance Logo"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Guidance</h1>
                  <p className="text-xs text-gray-500">Student Portal</p>
                </div>
              </div>
            )}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={FiHome} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiFileText} label="Student Forms" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiCalendar} label="Appointments" activeTab={activeTab} setActiveTab={setActiveTab} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={FiLogOut} label="Logout" activeTab={activeTab} setActiveTab={handleLogout} isSidebarOpen={isSidebarOpen} />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-100 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeTab}</h2>
              <p className="text-gray-500 mt-1">Welcome back, {firstName}</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2">
                  {isSidebarOpen && <span className="font-medium text-gray-700">{fullname}</span>}
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {fullname.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="py-2">
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={handleLogout}
                      >
                        <FiLogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'Dashboard' && <Dashboard appointments={appointments} firstName={firstName} />}
          {activeTab === 'Student Forms' && (
            <Forms 
              educationLevel={educationLevel} 
              setEducationLevel={setEducationLevel} 
              setShowBasicEdModal={setShowBasicEdModal}
            />
          )}
          {activeTab === 'Appointments' && (
            <Appointments
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              appointments={appointments}
              setAppointments={setAppointments}
              handleBookAppointment={handleBookAppointment}
              checkAppointmentsForDate={checkAppointmentsForDate}
              firstName={firstName}
              lastName={lastName}
            />
          )}
        </div>
      </div>

      <BasicEdModal
        showModal={showBasicEdModal}
        setShowModal={setShowBasicEdModal}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        errors={errors}
        setErrors={setErrors}
        handleInputChange={handleInputChange}
        handleSacramentChange={handleSacramentChange}
        handleSiblingChange={handleSiblingChange}
        handleEducationChange={handleEducationChange}
        handleOrganizationChange={handleOrganizationChange}
        handleTestResultChange={handleTestResultChange}
        handleCheckboxChange={handleCheckboxChange}
        addSibling={addSibling}
        removeSibling={removeSibling}
        addTestResult={addTestResult}
        removeTestResult={removeTestResult}
        addOrganization={addOrganization}
        removeOrganization={removeOrganization}
        handleAddStudent={handleAddStudent}
        handleUpdateStudent={handleUpdateStudent}
        editingStudentId={editingStudentId}
        initialStudentState={initialStudentState}
      />
    </div>
  );
}

function Dashboard({ appointments, firstName }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, {firstName}!</h2>
        <p className="text-base">Schedule appointments and complete your student forms.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
          Upcoming Appointments
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {appointments.filter(app => new Date(app.date) >= new Date()).slice(0, 2).map((appointment, index) => (
            <div key={index} className={`p-4 rounded-lg border ${appointment.status === 'confirmed' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
              <h4 className="font-medium text-gray-800 mb-2">{appointment.type}</h4>
              <p className="text-gray-700 text-base">Date: {appointment.date}</p>
              <p className="text-gray-700 text-base">Time: {appointment.time}</p>
              <p className="text-gray-700 text-base">Counselor: {appointment.counselor}</p>
              <p className="text-gray-700 text-base">Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
          Pending Forms
        </h3>

        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <div className="flex items-start">
            <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800">Annual Student Profile Update</h4>
              <p className="text-sm text-yellow-700 mt-1">Please complete your student profile form for the current academic year.</p>
              <button
                className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded hover:bg-yellow-200 transition-colors"
                onClick={() => setActiveTab('Student Forms')}
              >
                Complete Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Appointments({
  selectedDate,
  setSelectedDate,
  appointments,
  setAppointments,
  handleBookAppointment,
  checkAppointmentsForDate,
  firstName, // Add firstName prop
  lastName   // Add lastName prop
}) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [counselingForm, setCounselingForm] = useState({
    name: `${firstName} ${lastName}`, // Initialize with firstName and lastName
    gradeSection: '',
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    nature: '',
    referredBy: '',
    personalConcerns: [],
    educationConcerns: [],
    otherPersonalConcern: '',
    otherEducationConcern: '',
    remarks: ''
  });
  const [error, setError] = useState(null);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    const firstDayOfWeek = date.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    const lastDayOfWeek = days[days.length - 1].getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setCounselingForm(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setCounselingForm(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setCounselingForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMonthChange = (increment) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCounselingForm(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  const handleSubmitAppointment = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Please log in to book an appointment.');
      return;
    }

    if (!counselingForm.name || !counselingForm.date || !counselingForm.purpose || !counselingForm.nature) {
      setError('Please fill out all required fields.');
      return;
    }

    const newAppointment = {
      userId: parseInt(userId),
      name: counselingForm.name,
      gradeSection: counselingForm.gradeSection,
      date: counselingForm.date,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      counselor: "To be assigned",
      status: "pending",
      purpose: counselingForm.purpose,
      nature: counselingForm.nature,
      referredBy: counselingForm.referredBy,
      personalConcerns: counselingForm.personalConcerns,
      educationConcerns: counselingForm.educationConcerns,
      otherPersonalConcern: counselingForm.otherPersonalConcern,
      otherEducationConcern: counselingForm.otherEducationConcern,
      remarks: counselingForm.remarks
    };

    try {
      const response = await fetch('/api/students/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        const result = await response.json();
        setAppointments(prev => [...prev, {
          date: newAppointment.date,
          time: newAppointment.time,
          counselor: newAppointment.counselor,
          status: newAppointment.status,
          type: newAppointment.purpose
        }]);
        setIsAppointmentModalOpen(false);
        setCounselingForm({
          name: '',
          gradeSection: '',
          date: selectedDate.toISOString().split('T')[0],
          purpose: '',
          nature: '',
          referredBy: '',
          personalConcerns: [],
          educationConcerns: [],
          otherPersonalConcern: '',
          otherEducationConcern: '',
          remarks: ''
        });
        setError(null);
      } else {
        const errorData = await response.json();
        setError(`Failed to book appointment: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setError('An error occurred while booking the appointment. Please try again.');
    }
  };

  const openAppointmentModal = () => {
    setCounselingForm(prev => ({
      ...prev,
      name: `${firstName} ${lastName}`, // Ensure name is set when opening modal
      date: selectedDate.toISOString().split('T')[0]
    }));
    setIsAppointmentModalOpen(true);
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">My Appointments</h3>
        <button
          onClick={openAppointmentModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2" />
          Book New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-800">Select Date</h4>
            <div className="flex items-center space-x-2 text-black">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-medium">
                {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  setCurrentMonth(today.getMonth());
                  setCurrentYear(today.getFullYear());
                  handleDateSelect(today);
                }}
                className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Today
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}

            {daysInMonth.map((date, i) => {
              const isCurrentMonth = date.getMonth() === currentMonth;
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isToday = new Date().toDateString() === date.toDateString();
              const appointmentsForDate = checkAppointmentsForDate(date);
              const hasAppointments = appointmentsForDate.length > 0;

              return (
                <button
                  key={i}
                  onClick={() => handleDateSelect(date)}
                  className={`p-2 rounded-lg text-center text-sm flex flex-col items-center ${isSelected
                      ? 'bg-blue-600 text-white font-medium'
                      : isToday
                        ? 'bg-blue-100 text-blue-800'
                        : !isCurrentMonth
                          ? 'text-gray-400'
                          : hasAppointments
                            ? 'hover:bg-blue-50 text-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {date.getDate()}
                  {hasAppointments && (
                    <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-500'
                      }`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold text-gray-800 mb-4">Appointment Details</h4>
          {(() => {
            const appointmentsForDate = checkAppointmentsForDate(selectedDate);
            const dateStr = selectedDate.toISOString().split('T')[0];
            const todayStr = new Date().toISOString().split('T')[0];

            if (!appointmentsForDate.length) {
              return (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-2">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-gray-500 text-sm">No appointments scheduled</p>
                  <button
                    onClick={openAppointmentModal}
                    className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              );
            }

            return (
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                {appointmentsForDate.map((appointment, index) => (
                  <div key={index} className={`p-4 rounded-lg border mb-2 last:mb-0 ${appointment.status === 'confirmed' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
                    <h4 className="font-medium text-gray-800 mb-1">{appointment.type}</h4>
                    <p className="text-gray-700 text-sm">Time: {appointment.time}</p>
                    <p className="text-gray-700 text-sm">Counselor: {appointment.counselor}</p>
                    <p className="text-gray-700 text-sm">Status: {appointment.status}</p>
                    {dateStr === todayStr && appointment.status === 'confirmed' && (
                      <p className="mt-2 text-sm text-green-600">Your appointment is today!</p>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-base font-semibold text-gray-800 mb-4">All Appointments</h4>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no upcoming appointments</p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <span className="font-medium text-gray-700 text-base">{appointment.type}</span>
                  <p className="text-gray-600 text-sm">
                    {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' at '}{appointment.time}
                  </p>
                  <p className="text-gray-600 text-sm">Counselor: {appointment.counselor}</p>
                </div>
                <span className={`text-sm ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Counseling Appointment Form</h3>
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-6 overflow-y-auto flex-1 text-gray-800">
              {/* === I. PERSONAL INFORMATION === */}
              <h3 className="font-bold text-lg mb-2">I. PERSONAL INFORMATION</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={counselingForm.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                {/* Grade & Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade & Section</label>
                  <input
                    type="text"
                    name="gradeSection"
                    value={counselingForm.gradeSection}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={counselingForm.date}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Purpose of Contact */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Contact</label>
                <div className="space-y-2">
                  {['Intake Interview', 'Consultation', 'Follow-up'].map((purpose) => (
                    <label key={purpose} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="purpose"
                        value={purpose}
                        checked={counselingForm.purpose === purpose}
                        onChange={handleFormChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <span>{purpose}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nature of Contact */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nature of Contact</label>
                <div className="space-y-2">
                  {['Walk-in / Voluntary', 'Referral', 'Guidance Personnel Initiated'].map((nature) => (
                    <label key={nature} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="nature"
                        value={nature}
                        checked={counselingForm.nature === nature}
                        onChange={handleFormChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <span>{nature}</span>
                    </label>
                  ))}
                </div>
                {counselingForm.nature === 'Referral' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referred by</label>
                    <input
                      type="text"
                      name="referredBy"
                      value={counselingForm.referredBy}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required={counselingForm.nature === 'Referral'}
                    />
                  </div>
                )}
              </div>

              {/* II. AREAS OF CONCERN */}
              <h3 className="font-bold text-lg mb-2">II. AREAS OF CONCERN</h3>
              {/* Personal / Social */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">A. Personal / Social</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Adjustment to school', 'Financial Problems', 'Health',
                    'Self-confidence / Self-esteem', 'Family Relationship',
                    'Friends', 'Romantic Relationship', 'Self-Identity Crisis',
                    'Depression / Anxiety', 'Suicidal Ideation/Tendencies',
                    'Addiction (drugs/alcohol)'
                  ].map((concern) => (
                    <label key={concern} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="personalConcerns"
                        value={concern}
                        checked={counselingForm.personalConcerns.includes(concern)}
                        onChange={handleFormChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm">{concern}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
                  <input
                    type="text"
                    name="otherPersonalConcern"
                    value={counselingForm.otherPersonalConcern}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Specify other personal concerns"
                  />
                </div>
              </div>

              {/* Education / Career */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">B. Education / Career</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Academic Deficiency', 'Attendance', 'School Choice',
                    'Failure', 'Study Habits'
                  ].map((concern) => (
                    <label key={concern} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="educationConcerns"
                        value={concern}
                        checked={counselingForm.educationConcerns.includes(concern)}
                        onChange={handleFormChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm">{concern}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Concerns</label>
                  <input
                    type="text"
                    name="otherEducationConcern"
                    value={counselingForm.otherEducationConcern}
                    onChange={handleFormChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Specify other education concerns"
                  />
                </div>
              </div>

              {/* Remarks */}
              <h3 className="font-bold text-lg mb-2">III. REMARKS</h3>
              <textarea
                name="remarks"
                value={counselingForm.remarks}
                onChange={handleFormChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAppointment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}