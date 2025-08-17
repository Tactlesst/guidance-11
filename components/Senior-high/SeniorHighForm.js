//components/Senior-high/SeniorHighForm.js
import { useState, useRef } from 'react';
import { FiX, FiPlus, FiEdit2, FiSave, FiArchive, FiUser, FiPhone, FiMail, FiCalendar, FiUpload, FiImage, FiEye, FiPrinter, FiSearch } from 'react-icons/fi';
import SeniorHighModal from './SeniorHighModal';

export default function SeniorHighSchoolForm() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [viewingStudent, setViewingStudent] = useState(null);
  const [printingStudent, setPrintingStudent] = useState(null);
  const fileInputRef = useRef(null);
  
  const initialStudentState = {
    // School Information
    academicYear: '',
    gradeLevel: 'Grade 11',
    strand: '',
    studentType: 'New',
    status: 'Active',
    archived: false,
    lrn: '',
    
    // Personal Data
    lastName: '',
    firstName: '',
    middleName: '',
    gender: '',
    citizenship: '',
    contactNumber: '',
    address: '',
    birthDate: '',
    birthPlace: '',
    religion: '',
    
    // Residence Information
    residenceType: '',
    residenceOwner: '',
    languagesSpokenAtHome: '',
    
    // Financial Support
    financialSupport: [],
    otherFinancialSupport: '',
    
    // Leisure Activities
    leisureActivities: [],
    otherLeisureActivity: '',
    
    // Special Talents
    specialTalents: '',
    
    // If not living with parents
    guardianAddress: '',
    guardianGraduationName: '',
    guardianGraduationAddress: '',
    
    // Sacraments
    baptism: {
      received: false,
      date: '',
      church: ''
    },
    firstCommunion: {
      received: false,
      date: '',
      church: ''
    },
    confirmation: {
      received: false,
      date: '',
      church: ''
    },
    
    // Emergency Contact
    emergencyContact: '',
    emergencyRelation: '',
    emergencyNumber: '',
    
    // Family Information
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
    birthOrder: '',
    siblingsCount: 0,
    otherRelativesAtHome: [],
    familyMonthlyIncome: '',
    
    siblings: [
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' },
      { name: '', age: '', school: '', status: '', occupation: '' }
    ],
    
    // Educational Background
    preschool: {
      school: '',
      awards: '',
      year: ''
    },
    elementary: {
      school: '',
      awards: '',
      year: ''
    },
    highSchool: {
      school: '',
      awards: '',
      year: ''
    },
    seniorHigh: {
      school: '',
      awards: '',
      year: ''
    },
    
    // Health Information
    weight: '',
    physicalCondition: '',
    healthProblem: '',
    healthProblemDetails: '',
    lastDoctorVisit: '',
    lastDoctorVisitReason: '',
    generalCondition: '',
    
    // Test Results
    testResults: [
      { testName: '', dateTaken: '', rating: '' }
    ],
    
    // Student Photo
    studentPhoto: null,
    studentPhotoUrl: '',
    
    // Consent
    signature: '',
    signatureDate: '',
    parentSignature: '',
    parentSignatureDate: ''
  };

  const [newStudent, setNewStudent] = useState(initialStudentState);

  const validateForm = () => {
    const newErrors = {};
    if (!newStudent.lastName) newErrors.lastName = 'Last name is required';
    if (!newStudent.firstName) newErrors.firstName = 'First name is required';
    if (!newStudent.lrn) newErrors.lrn = 'LRN is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStudent(prev => ({
          ...prev,
          studentPhoto: file,
          studentPhotoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lrn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchive = showArchived ? student.archived : !student.archived;
    return matchesSearch && matchesArchive;
  });

  const handleArchive = (id) => {
    setStudents(students.map(student => 
      student.id === id ? {...student, archived: !student.archived} : student
    ));
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditForm({...student});
    setShowModal(true);
  };

  const handleView = (student) => {
    setViewingStudent(student);
  };

  const handlePrint = (student) => {
    setPrintingStudent(student);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleSave = () => {
    setStudents(students.map(student => 
      student.id === editingId ? {...editForm} : student
    ));
    setEditingId(null);
  };

  const handleAddStudent = () => {
    if (!validateForm()) return;
    
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentToAdd = {
      ...newStudent,
      id,
      birthDate: newStudent.birthDate,
      fullName: `${newStudent.lastName}, ${newStudent.firstName} ${newStudent.middleName}`
    };
    
    setStudents([...students, studentToAdd]);
    setShowModal(false);
    setNewStudent(initialStudentState);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...newStudent.siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setNewStudent(prev => ({...prev, siblings: updatedSiblings}));
  };

  const handleSacramentChange = (sacrament, field, value) => {
    setNewStudent(prev => ({
      ...prev,
      [sacrament]: {
        ...prev[sacrament],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (field, value) => {
    const current = newStudent[field] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setNewStudent(prev => ({ ...prev, [field]: updated }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Student Personal Data Management</h1>
            <p className="text-gray-600">St. Rita's College of Balingasag - Senior High School Department</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
            >
              <FiPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Student</span>
            </button>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-grow max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, LRN or contact number..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Student Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LRN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade & Strand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className={student.archived ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {student.studentPhotoUrl ? (
                              <img 
                                src={student.studentPhotoUrl} 
                                alt="Student" 
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiUser className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.lastName}, {student.firstName}
                              {student.middleName && ` ${student.middleName}`}
                              {student.archived && (
                                <span className="ml-2 text-xs text-gray-500">(Archived)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{student.contactNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{student.lrn}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {student.gradeLevel} - {student.strand}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {student.studentType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          student.status === 'Graduated' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleView(student)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                            title="View"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handlePrint(student)}
                            className="text-purple-600 hover:text-purple-900 p-2 rounded-full hover:bg-purple-50 transition-colors"
                            title="Print"
                          >
                            <FiPrinter className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleArchive(student.id)}
                            className={student.archived ? 'text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors' : 'text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors'}
                            title={student.archived ? 'Unarchive' : 'Archive'}
                          >
                            <FiArchive className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No students found matching your criteria. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <SeniorHighModal
          showModal={showModal}
          setShowModal={setShowModal}
          newStudent={newStudent}
          setNewStudent={setNewStudent}
          errors={errors}
          setErrors={setErrors}
          handleAddStudent={handleAddStudent}
          handleInputChange={handleInputChange}
          handleSacramentChange={handleSacramentChange}
          triggerFileInput={triggerFileInput}
          fileInputRef={fileInputRef}
          handleFileUpload={handleFileUpload}
          initialStudentState={initialStudentState}
          handleSiblingChange={handleSiblingChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {viewingStudent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Student Details</h2>
                  <p className="text-sm opacity-90">{viewingStudent.fullName}</p>
                </div>
                <button
                  onClick={() => setViewingStudent(null)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">LRN:</span>
                      <span>{viewingStudent.lrn || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Grade Level:</span>
                      <span>{viewingStudent.gradeLevel || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Strand:</span>
                      <span>{viewingStudent.strand || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Birth Date:</span>
                      <span>{viewingStudent.birthDate || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Gender:</span>
                      <span>{viewingStudent.gender || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Address:</span>
                      <span>{viewingStudent.address || '-'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Phone:</span>
                      <span>{viewingStudent.contactNumber || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Emergency Contact:</span>
                      <span>{viewingStudent.emergencyContact || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Relation:</span>
                      <span>{viewingStudent.emergencyRelation || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm font-medium text-gray-500">Emergency Phone:</span>
                      <span>{viewingStudent.emergencyNumber || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {printingStudent && (
        <div className="hidden print:block">
          {/* Print view content would go here */}
        </div>
      )}
    </div>
  );
}