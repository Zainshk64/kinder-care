// pages/admin/AdminDoctors.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Stethoscope, Search, Filter, Plus, Download, 
  Eye, Edit2, Trash2, MoreVertical, Mail, Phone,
  MapPin, Calendar, CheckCircle, XCircle, Clock,
  Star, Users, Video, Award, Shield, ChevronLeft,
  ChevronRight, Activity, FileText, Settings
} from 'lucide-react'

const AdminDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [viewTab, setViewTab] = useState('overview')

  const doctors = [
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

  const specialties = ['All Specialties', 'Pediatrics', 'General Physician', 'Child Specialist', 'Neonatologist']

  const stats = [
    { label: 'Total Doctors', value: '45', icon: Stethoscope, color: 'blue' },
    { label: 'Online Now', value: '12', icon: CheckCircle, color: 'green' },
    { label: 'Pending Approval', value: '3', icon: Clock, color: 'orange' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'yellow' },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'online':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> <span>Online</span>
        </span>
      case 'offline':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span> <span>Offline</span>
        </span>
      case 'pending':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" /> <span>Pending</span>
        </span>
      default:
        return null
    }
  }

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'Available':
        return <span className="text-green-600 text-sm font-medium">Available</span>
      case 'Busy':
        return <span className="text-red-600 text-sm font-medium">Busy</span>
      case 'In Consultation':
        return <span className="text-orange-600 text-sm font-medium">In Consultation</span>
      case 'Under Review':
        return <span className="text-yellow-600 text-sm font-medium">Under Review</span>
      default:
        return null
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus
    return matchesSearch && matchesSpecialty && matchesStatus
  })

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor)
    setShowViewModal(true)
    setViewTab('overview')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="admin" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
            <p className="text-gray-500 mt-1">Manage all registered doctors in the system</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Doctor</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search doctors..."
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="card hover:shadow-lg transition-all">
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
                  <span>{doctor.hospital}</span>
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
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-primary-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Doctor Modal */}
        {showViewModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-white/20 rounded-xl"
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
                  </div>
                )}

                {viewTab === 'reviews' && (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Reviews will be displayed here</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex space-x-3 p-6 border-t border-gray-100">
                <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  Edit Doctor
                </button>
                <button className="flex-1 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Message</span>
                </button>
                {selectedDoctor.status === 'pending' && (
                  <button className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Doctor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" placeholder="Dr. " className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Pediatrics</option>
                      <option>General Physician</option>
                      <option>Child Specialist</option>
                      <option>Neonatologist</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input type="text" placeholder="MBBS, FCPS" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input type="text" placeholder="e.g., 10 years" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                  <input type="text" placeholder="Rs. " className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <button key={day} className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  Add Doctor
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