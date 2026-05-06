// pages/admin/AdminDoctors.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Stethoscope, Search, Filter, Plus, Download, 
  Eye, Edit2, Trash2, MoreVertical, Mail, Phone,
  MapPin, Calendar, CheckCircle, XCircle, Clock,
  Star, Users, Video, Award, Shield, ChevronLeft,
  ChevronRight, Activity, FileText, Settings, AlertTriangle
} from 'lucide-react'

// Initial mock data
const INITIAL_DOCTORS = [
  { 
    id: 1, 
    name: 'Dr. Ayesha Khan', 
    email: 'ayesha.khan@clinic.com', 
    phone: '+92 300 1111111',
    specialty: 'Pediatrics', 
    qualification: 'MBBS, FCPS',
    experience: '12 years',
    hospital: 'Children Hospital Rawalpindi',
    status: 'online', 
    availability: 'Available',
    patients: 156, 
    rating: 4.9,
    reviews: 89,
    triagesReviewed: 234,
    joinDate: 'Jan 10, 2025',
    lastActive: 'Just now', 
    avatar: '👩‍⚕️',
    fee: 'Rs. 2,000',
    schedule: {
      mon: true, tue: true, wed: false, thu: true, fri: true, sat: true, sun: false
    }
  },
  { 
    id: 2, 
    name: 'Dr. Imran Ali', 
    email: 'imran.ali@hospital.com', 
    phone: '+92 301 2222222',
    specialty: 'General Physician', 
    qualification: 'MBBS, MD',
    experience: '8 years',
    hospital: 'City Hospital Islamabad',
    status: 'offline', 
    availability: 'Busy',
    patients: 89, 
    rating: 4.7,
    reviews: 56,
    triagesReviewed: 145,
    joinDate: 'Feb 15, 2025',
    lastActive: '2 hours ago', 
    avatar: '👨‍⚕️',
    fee: 'Rs. 1,500',
    schedule: {
      mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false
    }
  },
  { 
    id: 3, 
    name: 'Dr. Sara Khan', 
    email: 'sara.khan@clinic.com', 
    phone: '+92 302 3333333',
    specialty: 'Pediatrics', 
    qualification: 'MBBS, DCH',
    experience: '10 years',
    hospital: 'KinderCare Clinic',
    status: 'online', 
    availability: 'In Consultation',
    patients: 124, 
    rating: 4.8,
    reviews: 72,
    triagesReviewed: 198,
    joinDate: 'Mar 5, 2025',
    lastActive: '5 mins ago', 
    avatar: '👩‍⚕️',
    fee: 'Rs. 1,800',
    schedule: {
      mon: true, tue: false, wed: true, thu: true, fri: true, sat: true, sun: false
    }
  },
  { 
    id: 4, 
    name: 'Dr. Hassan Ali', 
    email: 'hassan.ali@medical.com', 
    phone: '+92 303 4444444',
    specialty: 'Child Specialist', 
    qualification: 'MBBS, MRCP',
    experience: '15 years',
    hospital: 'Pakistan Institute of Medical Sciences',
    status: 'online', 
    availability: 'Available',
    patients: 201, 
    rating: 4.9,
    reviews: 134,
    triagesReviewed: 312,
    joinDate: 'Apr 1, 2025',
    lastActive: '10 mins ago', 
    avatar: '👨‍⚕️',
    fee: 'Rs. 2,500',
    schedule: {
      mon: true, tue: true, wed: true, thu: false, fri: true, sat: true, sun: false
    }
  },
  { 
    id: 5, 
    name: 'Dr. Fatima Zahra', 
    email: 'fatima.z@clinic.com', 
    phone: '+92 304 5555555',
    specialty: 'Pediatrics', 
    qualification: 'MBBS, FCPS',
    experience: '7 years',
    hospital: 'Shifa International Hospital',
    status: 'pending', 
    availability: 'Under Review',
    patients: 0, 
    rating: 0,
    reviews: 0,
    triagesReviewed: 0,
    joinDate: 'Jun 15, 2025',
    lastActive: 'Never', 
    avatar: '👩‍⚕️',
    fee: 'Rs. 1,500',
    schedule: {
      mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false
    }
  },
]

const AdminDoctors = () => {
  // State Management
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDoctors, setSelectedDoctors] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [viewTab, setViewTab] = useState('overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: 'Pediatrics',
    qualification: '',
    experience: '',
    hospital: '',
    fee: '',
    status: 'pending',
    schedule: {
      mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false
    }
  })

  // Stats Calculation
  const stats = [
    { 
      label: 'Total Doctors', 
      value: doctors.length, 
      icon: Stethoscope, 
      color: 'blue' 
    },
    { 
      label: 'Online Now', 
      value: doctors.filter(d => d.status === 'online').length, 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      label: 'Pending Approval', 
      value: doctors.filter(d => d.status === 'pending').length, 
      icon: Clock, 
      color: 'orange' 
    },
    { 
      label: 'Avg Rating', 
      value: (doctors.reduce((acc, d) => acc + (d.rating || 0), 0) / doctors.filter(d => d.rating > 0).length).toFixed(1) || '0', 
      icon: Star, 
      color: 'yellow' 
    },
  ]

  // Filter Doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus
    return matchesSearch && matchesSpecialty && matchesStatus
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)

  // CRUD Operations
  const handleAddDoctor = (e) => {
    e.preventDefault()
    const newDoctor = {
      id: doctors.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialty: formData.specialty,
      qualification: formData.qualification,
      experience: formData.experience,
      hospital: formData.hospital,
      fee: formData.fee,
      status: formData.status,
      availability: formData.status === 'pending' ? 'Under Review' : 'Available',
      patients: 0,
      rating: 0,
      reviews: 0,
      triagesReviewed: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActive: 'Never',
      avatar: formData.name.toLowerCase().includes('dr.') && formData.name.split(' ').length > 1 ? '👨‍⚕️' : '👩‍⚕️',
      schedule: formData.schedule
    }
    setDoctors([...doctors, newDoctor])
    setShowAddModal(false)
    resetForm()
    showNotification('Doctor added successfully!', 'success')
  }

  const handleEditDoctor = (e) => {
    e.preventDefault()
    setDoctors(doctors.map(doctor => 
      doctor.id === selectedDoctor.id 
        ? { ...doctor, ...formData }
        : doctor
    ))
    setShowEditModal(false)
    setSelectedDoctor(null)
    resetForm()
    showNotification('Doctor updated successfully!', 'success')
  }

  const handleDeleteDoctor = () => {
    setDoctors(doctors.filter(doctor => doctor.id !== selectedDoctor.id))
    setShowDeleteModal(false)
    setSelectedDoctor(null)
    showNotification('Doctor deleted successfully!', 'success')
  }

  const handleBulkDelete = () => {
    setDoctors(doctors.filter(doctor => !selectedDoctors.includes(doctor.id)))
    setSelectedDoctors([])
    showNotification(`${selectedDoctors.length} doctors deleted successfully!`, 'success')
  }

  const handleApproveDoctor = (doctorId) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, status: 'online', availability: 'Available' }
        : doctor
    ))
    showNotification('Doctor approved successfully!', 'success')
  }

  const handleStatusChange = (doctorId, newStatus) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, status: newStatus }
        : doctor
    ))
    showNotification('Doctor status updated!', 'success')
  }

  // Helper Functions
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialty: 'Pediatrics',
      qualification: '',
      experience: '',
      hospital: '',
      fee: '',
      status: 'pending',
      schedule: {
        mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false
      }
    })
  }

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor)
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.specialty,
      qualification: doctor.qualification,
      experience: doctor.experience,
      hospital: doctor.hospital,
      fee: doctor.fee,
      status: doctor.status,
      schedule: doctor.schedule
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (doctor) => {
    setSelectedDoctor(doctor)
    setShowDeleteModal(true)
  }

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setShowViewModal(true)
    setViewTab('overview')
  }

  const toggleScheduleDay = (day) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: !formData.schedule[day]
      }
    })
  }

  const showNotification = (message, type) => {
    alert(message)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      online: {
        icon: 'pulse',
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'Online',
        dotColor: 'bg-green-500'
      },
      offline: {
        icon: 'dot',
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        label: 'Offline',
        dotColor: 'bg-gray-400'
      },
      pending: {
        icon: Clock,
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        label: 'Pending'
      }
    }

    const config = statusConfig[status] || statusConfig.offline

    if (status === 'online') {
      return (
        <span className={`flex items-center space-x-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
          <span className={`w-2 h-2 ${config.dotColor} rounded-full animate-pulse`}></span>
          <span>{config.label}</span>
        </span>
      )
    } else if (status === 'offline') {
      return (
        <span className={`flex items-center space-x-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
          <span className={`w-2 h-2 ${config.dotColor} rounded-full`}></span>
          <span>{config.label}</span>
        </span>
      )
    } else {
      const Icon = config.icon
      return (
        <span className={`flex items-center space-x-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
          <Icon className="w-3 h-3" />
          <span>{config.label}</span>
        </span>
      )
    }
  }

  const getAvailabilityBadge = (availability) => {
    const availabilityConfig = {
      'Available': 'text-green-600',
      'Busy': 'text-red-600',
      'In Consultation': 'text-orange-600',
      'Under Review': 'text-yellow-600'
    }
    
    return (
      <span className={`${availabilityConfig[availability] || 'text-gray-600'} text-sm font-medium`}>
        {availability}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userType="admin" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
            <p className="text-gray-500 mt-1">Manage all registered doctors in the system</p>
          </div>
          <div className="flex space-x-3">
            {selectedDoctors.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete ({selectedDoctors.length})</span>
              </button>
            )}
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Doctor</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search doctors by name, email, or hospital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Specialties</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="General Physician">General Physician</option>
              <option value="Child Specialist">Child Specialist</option>
              <option value="Neonatologist">Neonatologist</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentDoctors.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="flex flex-col items-center justify-center text-gray-400">
                <Stethoscope className="w-16 h-16 mb-4" />
                <p className="text-lg">No doctors found</p>
              </div>
            </div>
          ) : (
            currentDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                      {doctor.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                  </div>
                  {getStatusBadge(doctor.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span>{doctor.qualification}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{doctor.hospital}</span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-lg font-bold text-gray-800">{doctor.patients}</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-lg font-bold text-gray-800 flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                      {doctor.rating || '-'}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-lg font-bold text-gray-800">{doctor.triagesReviewed}</p>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {getAvailabilityBadge(doctor.availability)}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewDoctor(doctor)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button 
                      onClick={() => openEditModal(doctor)}
                      className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit Doctor"
                    >
                      <Edit2 className="w-4 h-4 text-primary-600" />
                    </button>
                    <button 
                      onClick={() => openDeleteModal(doctor)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Doctor"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredDoctors.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDoctors.length)} of {filteredDoctors.length} doctors
            </p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-primary-500 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="text-gray-400">...</span>
                }
                return null
              })}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Add Doctor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddDoctor} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Dr. John Doe" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
                    <select 
                      required
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Child Specialist">Child Specialist</option>
                      <option value="Neonatologist">Neonatologist</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="doctor@clinic.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                      placeholder="MBBS, FCPS" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="e.g., 10 years" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.hospital}
                    onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                    placeholder="Hospital name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fee}
                    onChange={(e) => setFormData({...formData, fee: e.target.value})}
                    placeholder="Rs. 2000" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                      <button 
                        key={day}
                        type="button"
                        onClick={() => toggleScheduleDay(day)}
                        className={`px-4 py-2 border-2 rounded-lg transition-colors capitalize ${
                          formData.schedule[day]
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending Approval</option>
                    <option value="online">Active</option>
                    <option value="offline">Inactive</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      resetForm()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Doctor Modal */}
        {showEditModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Doctor</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedDoctor(null)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEditDoctor} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
                    <select 
                      required
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Child Specialist">Child Specialist</option>
                      <option value="Neonatologist">Neonatologist</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.hospital}
                    onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fee}
                    onChange={(e) => setFormData({...formData, fee: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                      <button 
                        key={day}
                        type="button"
                        onClick={() => toggleScheduleDay(day)}
                        className={`px-4 py-2 border-2 rounded-lg transition-colors capitalize ${
                          formData.schedule[day]
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending Approval</option>
                    <option value="online">Active</option>
                    <option value="offline">Inactive</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setSelectedDoctor(null)
                      resetForm()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Update Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Doctor Modal */}
        {showViewModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                      {selectedDoctor.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                      <p className="text-white/80">{selectedDoctor.specialty} • {selectedDoctor.qualification}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getStatusBadge(selectedDoctor.status)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowViewModal(false)
                      setSelectedDoctor(null)
                    }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {['overview', 'schedule', 'patients', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setViewTab(tab)}
                    className={`flex-1 py-4 text-center font-medium capitalize transition-colors ${
                      viewTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                {viewTab === 'overview' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <p className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{selectedDoctor.email}</span>
                          </p>
                          <p className="flex items-center space-x-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{selectedDoctor.phone}</span>
                          </p>
                          <p className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{selectedDoctor.hospital}</span>
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Professional Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Experience</span>
                            <span className="font-medium text-gray-800">{selectedDoctor.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Consultation Fee</span>
                            <span className="font-medium text-gray-800">{selectedDoctor.fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Join Date</span>
                            <span className="font-medium text-gray-800">{selectedDoctor.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDoctor.patients}</p>
                          <p className="text-sm text-gray-500">Total Patients</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 text-center">
                          <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDoctor.triagesReviewed}</p>
                          <p className="text-sm text-gray-500">Triages Reviewed</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4 text-center">
                          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDoctor.rating || '-'}</p>
                          <p className="text-sm text-gray-500">Avg Rating</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center">
                          <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-800">{selectedDoctor.reviews}</p>
                          <p className="text-sm text-gray-500">Reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {viewTab === 'schedule' && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Weekly Availability</h4>
                    <div className="grid grid-cols-7 gap-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                        const dayKey = day.toLowerCase()
                        const isAvailable = selectedDoctor.schedule[dayKey]
                        return (
                          <div key={day} className={`p-4 rounded-xl text-center ${
                            isAvailable ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'
                          }`}>
                            <p className="font-medium text-gray-800">{day}</p>
                            {isAvailable ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400 mx-auto mt-2" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 mt-4">
                      <p className="text-sm text-blue-700">
                        <strong>Working Hours:</strong> 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                )}

                {viewTab === 'patients' && (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Patient list will be displayed here</p>
                    <p className="text-sm text-gray-400 mt-2">Total Patients: {selectedDoctor.patients}</p>
                  </div>
                )}

                {viewTab === 'reviews' && (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Reviews will be displayed here</p>
                    <p className="text-sm text-gray-400 mt-2">Average Rating: {selectedDoctor.rating || 'No ratings yet'}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex space-x-3 p-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setShowViewModal(false)
                    openEditModal(selectedDoctor)
                  }}
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Edit Doctor
                </button>
                <button className="flex-1 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Message</span>
                </button>
                {selectedDoctor.status === 'pending' && (
                  <button 
                    onClick={() => {
                      handleApproveDoctor(selectedDoctor.id)
                      setShowViewModal(false)
                    }}
                    className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Doctor</h2>
                <p className="text-gray-500">
                  Are you sure you want to delete <strong>{selectedDoctor.name}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false)
                    setSelectedDoctor(null)
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteDoctor}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Doctor
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDoctors