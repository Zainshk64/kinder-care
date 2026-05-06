// pages/doctor/DoctorPatients.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Users, Search, Filter, Eye, MessageSquare, Calendar, Edit2, Trash2,
  Baby, Phone, Mail, MapPin, Activity, FileText,
  ChevronRight, Clock, CheckCircle, AlertTriangle, Plus, XCircle
} from 'lucide-react'

// Initial mock data
const INITIAL_PATIENTS = [
  { 
    id: 1, 
    parentName: 'Ahmed Khan', 
    parentEmail: 'ahmed.khan@email.com',
    parentPhone: '+92 300 1234567',
    children: [
      { id: 1, name: 'Ali', age: '3 years', gender: 'Male', lastVisit: '2 days ago', triages: 5, dateOfBirth: '2021-06-15' },
      { id: 2, name: 'Sara', age: '5 years', gender: 'Female', lastVisit: '1 week ago', triages: 3, dateOfBirth: '2019-03-20' }
    ],
    phone: '+92 300 1234567',
    email: 'ahmed.khan@email.com',
    address: 'Rawalpindi, Pakistan',
    totalVisits: 12,
    lastTriage: 'Home Care',
    status: 'active',
    joinDate: 'Jan 10, 2025',
    notes: 'Regular patient, very cooperative'
  },
  { 
    id: 2, 
    parentName: 'Fatima Ali', 
    parentEmail: 'fatima.ali@email.com',
    parentPhone: '+92 301 2345678',
    children: [
      { id: 3, name: 'Hassan', age: '2 years', gender: 'Male', lastVisit: '3 days ago', triages: 8, dateOfBirth: '2022-09-10' }
    ],
    phone: '+92 301 2345678',
    email: 'fatima.ali@email.com',
    address: 'Islamabad, Pakistan',
    totalVisits: 8,
    lastTriage: 'GP Visit',
    status: 'active',
    joinDate: 'Feb 15, 2025',
    notes: 'Child has recurring fever, monitor closely'
  },
  { 
    id: 3, 
    parentName: 'Zainab Hassan', 
    parentEmail: 'zainab.h@email.com',
    parentPhone: '+92 302 3456789',
    children: [
      { id: 4, name: 'Aisha', age: '4 years', gender: 'Female', lastVisit: '1 day ago', triages: 4, dateOfBirth: '2020-11-05' },
      { id: 5, name: 'Omar', age: '6 years', gender: 'Male', lastVisit: '5 days ago', triages: 2, dateOfBirth: '2018-08-22' },
      { id: 6, name: 'Yusuf', age: '1 year', gender: 'Male', lastVisit: '1 week ago', triages: 6, dateOfBirth: '2023-12-01' }
    ],
    phone: '+92 302 3456789',
    email: 'zainab.h@email.com',
    address: 'Lahore, Pakistan',
    totalVisits: 24,
    lastTriage: 'Home Care',
    status: 'active',
    joinDate: 'Mar 5, 2025',
    notes: 'Large family, very engaged in health monitoring'
  },
]

const DoctorPatients = () => {
  // State Management
  const [patients, setPatients] = useState(INITIAL_PATIENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddChildModal, setShowAddChildModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [selectedChild, setSelectedChild] = useState(null)

  // Form State for Patient
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })

  // Form State for Child
  const [childFormData, setChildFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    dateOfBirth: ''
  })

  // Stats Calculation
  const stats = [
    { 
      label: 'Total Patients', 
      value: patients.length,
      icon: Users, 
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Active This Week', 
      value: patients.filter(p => p.status === 'active').length,
      icon: Activity, 
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      label: 'Children Registered', 
      value: patients.reduce((sum, p) => sum + p.children.length, 0),
      icon: Baby, 
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Pending Reviews', 
      value: patients.filter(p => p.lastTriage === 'Home Care').length,
      icon: Clock, 
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    },
  ]

  // Filter Patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.children.some(child => child.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  // CRUD Operations for Patients
  const handleAddPatient = (e) => {
    e.preventDefault()
    const newPatient = {
      id: patients.length + 1,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
      email: formData.email || formData.parentEmail,
      phone: formData.phone || formData.parentPhone,
      address: formData.address,
      children: [],
      totalVisits: 0,
      lastTriage: 'Pending',
      status: 'active',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: formData.notes
    }
    setPatients([...patients, newPatient])
    setShowAddModal(false)
    resetFormData()
    showNotification('Patient added successfully!', 'success')
  }

  const handleEditPatient = (e) => {
    e.preventDefault()
    setPatients(patients.map(patient => 
      patient.id === selectedPatient.id 
        ? {
            ...patient,
            parentName: formData.parentName,
            parentEmail: formData.parentEmail,
            parentPhone: formData.parentPhone,
            email: formData.email || formData.parentEmail,
            phone: formData.phone || formData.parentPhone,
            address: formData.address,
            notes: formData.notes
          }
        : patient
    ))
    setShowEditModal(false)
    setSelectedPatient(null)
    resetFormData()
    showNotification('Patient updated successfully!', 'success')
  }

  const handleDeletePatient = () => {
    setPatients(patients.filter(patient => patient.id !== selectedPatient.id))
    setShowDeleteModal(false)
    setSelectedPatient(null)
    showNotification('Patient deleted successfully!', 'success')
  }

  const handleAddChild = (e) => {
    e.preventDefault()
    if (!selectedPatient) return

    const newChild = {
      id: Math.max(...selectedPatient.children.map(c => c.id), 0) + 1,
      name: childFormData.name,
      age: childFormData.age,
      gender: childFormData.gender,
      dateOfBirth: childFormData.dateOfBirth,
      lastVisit: 'Never',
      triages: 0
    }

    setPatients(patients.map(patient =>
      patient.id === selectedPatient.id
        ? { ...patient, children: [...patient.children, newChild] }
        : patient
    ))

    setSelectedPatient({
      ...selectedPatient,
      children: [...selectedPatient.children, newChild]
    })

    setShowAddChildModal(false)
    resetChildFormData()
    showNotification('Child added successfully!', 'success')
  }

  const handleDeleteChild = (childId) => {
    if (!selectedPatient) return

    setPatients(patients.map(patient =>
      patient.id === selectedPatient.id
        ? { ...patient, children: patient.children.filter(c => c.id !== childId) }
        : patient
    ))

    setSelectedPatient({
      ...selectedPatient,
      children: selectedPatient.children.filter(c => c.id !== childId)
    })

    showNotification('Child removed successfully!', 'success')
  }

  // Helper Functions
  const resetFormData = () => {
    setFormData({
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    })
  }

  const resetChildFormData = () => {
    setChildFormData({
      name: '',
      age: '',
      gender: 'Male',
      dateOfBirth: ''
    })
  }

  const openEditModal = (patient) => {
    setSelectedPatient(patient)
    setFormData({
      parentName: patient.parentName,
      parentEmail: patient.parentEmail,
      parentPhone: patient.parentPhone,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      notes: patient.notes
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (patient) => {
    setSelectedPatient(patient)
    setShowDeleteModal(true)
  }

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient)
    setShowViewModal(true)
  }

  const showNotification = (message, type) => {
    alert(message)
  }

  const getTriageBadge = (triage) => {
    const triageConfig = {
      'Home Care': { bg: 'bg-green-100', text: 'text-green-700' },
      'GP Visit': { bg: 'bg-orange-100', text: 'text-orange-700' },
      'Emergency': { bg: 'bg-red-100', text: 'text-red-700' },
      'Pending': { bg: 'bg-gray-100', text: 'text-gray-700' }
    }
    const config = triageConfig[triage] || triageConfig['Pending']
    return (
      <span className={`px-2 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
        {triage}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
            <p className="text-gray-500 mt-1">Manage and view patient information</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Patient</span>
            </button>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium">
              Total: {patients.length} Families
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`bg-gradient-to-br ${stat.gradient} text-white rounded-2xl p-6 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <Icon className="w-10 h-10 text-white/50" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by parent or child name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Users className="w-16 h-16 mb-4" />
                <p className="text-lg">No patients found</p>
              </div>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl">
                      👨‍👩‍👧‍👦
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{patient.parentName}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{patient.phone}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{patient.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{patient.address}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-gray-500">{patient.totalVisits} visits</span>
                        <span className="text-gray-300">•</span>
                        {getTriageBadge(patient.lastTriage)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewPatient(patient)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => openEditModal(patient)}
                      className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit Patient"
                    >
                      <Edit2 className="w-5 h-5 text-primary-600" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(patient)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Patient"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Children List */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600">Children ({patient.children.length})</p>
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient)
                        setShowAddChildModal(true)
                      }}
                      className="flex items-center space-x-1 text-xs px-2 py-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Child</span>
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {patient.children.map((child) => (
                      <div key={child.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                            {child.gender === 'Male' ? '👦' : '👧'}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{child.name}</h4>
                            <p className="text-xs text-gray-500">{child.age}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <button 
                            onClick={() => handleDeleteChild(child.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Remove Child"
                          >
                            <Trash2 className="w-3 h-3 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Patient</h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false)
                    resetFormData()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="parent@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Add any medical notes or observations..."
                    rows="3"
                  />
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      resetFormData()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Patient Modal */}
        {showEditModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Patient</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedPatient(null)
                    resetFormData()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEditPatient} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                  />
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setSelectedPatient(null)
                      resetFormData()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Update Patient
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Patient Modal */}
        {showViewModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.parentName}</h2>
                  <p className="text-gray-500 text-sm mt-1">Patient Family Profile</p>
                </div>
                <button 
                  onClick={() => {
                    setShowViewModal(false)
                    setSelectedPatient(null)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Parent Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Parent/Guardian Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-800">{selectedPatient.parentEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-800">{selectedPatient.parentPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm font-medium text-gray-800">{selectedPatient.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedPatient.totalVisits}</p>
                    <p className="text-xs text-gray-600 mt-1">Total Visits</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedPatient.children.length}</p>
                    <p className="text-xs text-gray-600 mt-1">Children</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-purple-600">
                      {selectedPatient.children.reduce((sum, c) => sum + c.triages, 0)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Total Triages</p>
                  </div>
                </div>

                {/* Children Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Registered Children ({selectedPatient.children.length})</h3>
                  <div className="space-y-2">
                    {selectedPatient.children.map((child) => (
                      <div key={child.id} className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {child.gender === 'Male' ? '👦' : '👧'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{child.name}</p>
                            <p className="text-xs text-gray-500">
                              Age: {child.age} | DOB: {child.dateOfBirth} | {child.triages} Triages
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedPatient.notes && (
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Medical Notes</h3>
                    <p className="text-sm text-gray-700">{selectedPatient.notes}</p>
                  </div>
                )}

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Join Date</p>
                      <p className="font-medium text-gray-800">{selectedPatient.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <p className="font-medium text-gray-800 capitalize">{selectedPatient.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  Send Message
                </button>
                <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Child Modal */}
        {showAddChildModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Child</h2>
                <button 
                  onClick={() => {
                    setShowAddChildModal(false)
                    resetChildFormData()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddChild} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Child Name *</label>
                  <input 
                    type="text" 
                    required
                    value={childFormData.name}
                    onChange={(e) => setChildFormData({...childFormData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Child's full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input 
                      type="date" 
                      required
                      value={childFormData.dateOfBirth}
                      onChange={(e) => setChildFormData({...childFormData, dateOfBirth: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select
                      required
                      value={childFormData.gender}
                      onChange={(e) => setChildFormData({...childFormData, gender: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input 
                    type="text" 
                    required
                    value={childFormData.age}
                    onChange={(e) => setChildFormData({...childFormData, age: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 3 years"
                  />
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddChildModal(false)
                      resetChildFormData()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add Child
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedPatient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Patient</h2>
                <p className="text-gray-500">
                  Are you sure you want to delete <strong>{selectedPatient.parentName}</strong> and all associated children records? This action cannot be undone.
                </p>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false)
                    setSelectedPatient(null)
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeletePatient}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Patient
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DoctorPatients