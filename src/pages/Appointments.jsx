// pages/Appointments.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  Calendar, Clock, Video, MapPin, User, Phone,
  Plus, Filter, Search, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertCircle, MoreVertical,
  CalendarDays, Users, Stethoscope, Trash2, Edit2
} from 'lucide-react'

// Initial Mock Data
const INITIAL_APPOINTMENTS = {
  upcoming: [
    { id: 1, doctor: 'Dr. Ayesha Khan', patient: 'Ali (3y)', specialty: 'Pediatrics', date: '2025-06-25', time: '10:00 AM', type: 'In-Person', status: 'confirmed', avatar: '👩‍⚕️' },
    { id: 2, doctor: 'Dr. Imran Ali', patient: 'Sara (5y)', specialty: 'General', date: '2025-06-28', time: '2:30 PM', type: 'Teleconsult', status: 'pending', avatar: '👨‍⚕️' },
    { id: 3, doctor: 'Dr. Sara Khan', patient: 'Ali (3y)', specialty: 'Pediatrics', date: '2025-07-02', time: '11:00 AM', type: 'In-Person', status: 'confirmed', avatar: '👩‍⚕️' },
  ],
  past: [
    { id: 4, doctor: 'Dr. Ayesha Khan', patient: 'Sara (5y)', specialty: 'Pediatrics', date: '2025-06-15', time: '9:00 AM', type: 'In-Person', status: 'completed', avatar: '👩‍⚕️' },
    { id: 5, doctor: 'Dr. Hassan Ali', patient: 'Ali (3y)', specialty: 'Child Specialist', date: '2025-06-10', time: '3:00 PM', type: 'Teleconsult', status: 'completed', avatar: '👨‍⚕️' },
  ],
  cancelled: [
    { id: 6, doctor: 'Dr. Imran Ali', patient: 'Ali (3y)', specialty: 'General', date: '2025-06-08', time: '10:00 AM', type: 'In-Person', status: 'cancelled', avatar: '👨‍⚕️' },
  ]
}

const Appointments = ({ userType = 'parent' }) => {
  // State Management
  const [activeTab, setActiveTab] = useState('upcoming')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  
  // Data State
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [formData, setFormData] = useState({
    child: 'Ali (3y)',
    doctor: 'Dr. Ayesha Khan - Pediatrics',
    type: 'In-Person',
    date: '',
    time: '9:00 AM',
    reason: ''
  })

  // Static Data
  const doctors = [
    { id: 1, name: 'Dr. Ayesha Khan', specialty: 'Pediatrics', rating: 4.9, available: true },
    { id: 2, name: 'Dr. Imran Ali', specialty: 'General Physician', rating: 4.7, available: true },
    { id: 3, name: 'Dr. Sara Khan', specialty: 'Pediatrics', rating: 4.8, available: false },
  ]

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']

  // Stats Calculation
  const totalAppointments = Object.values(appointments).flat().length
  const upcomingCount = appointments.upcoming.length
  const pastCount = appointments.past.length
  const cancelledCount = appointments.cancelled.length

  // Helper Functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // CRUD Operations
  const handleAddAppointment = (e) => {
    e.preventDefault()
    const newAppointment = {
      id: Date.now(),
      doctor: formData.doctor.split(' - ')[0],
      patient: formData.child,
      specialty: formData.doctor.split(' - ')[1] || 'General',
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'pending',
      avatar: '👨‍⚕️'
    }

    setAppointments({
      ...appointments,
      upcoming: [...appointments.upcoming, newAppointment]
    })

    setShowNewAppointment(false)
    resetForm()
    showNotification('Appointment booked successfully!')
  }

  const handleEditAppointment = (e) => {
    e.preventDefault()
    
    // Move to upcoming tab if editing a past/cancelled appointment
    const updatedAppointments = { ...appointments }
    
    // Remove from all tabs first
    Object.keys(updatedAppointments).forEach(key => {
      updatedAppointments[key] = updatedAppointments[key].filter(apt => apt.id !== selectedAppointment.id)
    })

    // Add to upcoming with updated data
    const updatedApt = {
      ...selectedAppointment,
      doctor: formData.doctor.split(' - ')[0],
      patient: formData.child,
      specialty: formData.doctor.split(' - ')[1] || 'General',
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'pending' // Reset status when editing
    }

    updatedAppointments.upcoming.push(updatedApt)

    setAppointments(updatedAppointments)
    setShowEditModal(false)
    setSelectedAppointment(null)
    resetForm()
    showNotification('Appointment updated successfully!')
  }

  const handleCancelAppointment = (apt) => {
    const updatedAppointments = { ...appointments }
    
    // Remove from current tab
    Object.keys(updatedAppointments).forEach(key => {
      updatedAppointments[key] = updatedAppointments[key].filter(a => a.id !== apt.id)
    })

    // Add to cancelled tab
    updatedAppointments.cancelled.push({ ...apt, status: 'cancelled' })

    setAppointments(updatedAppointments)
    showNotification('Appointment cancelled successfully!')
  }

  const handleDeleteAppointment = (apt) => {
    const updatedAppointments = { ...appointments }
    
    Object.keys(updatedAppointments).forEach(key => {
      updatedAppointments[key] = updatedAppointments[key].filter(a => a.id !== apt.id)
    })

    setAppointments(updatedAppointments)
    showNotification('Appointment deleted successfully!')
  }

  const resetForm = () => {
    setFormData({
      child: 'Ali (3y)',
      doctor: 'Dr. Ayesha Khan - Pediatrics',
      type: 'In-Person',
      date: '',
      time: '9:00 AM',
      reason: ''
    })
  }

  const openEditModal = (apt) => {
    setSelectedAppointment(apt)
    setFormData({
      child: apt.patient,
      doctor: `${apt.doctor} - ${apt.specialty}`,
      type: apt.type,
      date: apt.date,
      time: apt.time,
      reason: ''
    })
    setShowEditModal(true)
  }

  const showNotification = (message) => {
    alert(message)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userType={userType} />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-500 mt-1">Manage your medical appointments</p>
          </div>
          <button 
            onClick={() => setShowNewAppointment(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Appointment</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Appointments</p>
                <h3 className="text-3xl font-bold mt-1">{totalAppointments}</h3>
              </div>
              <CalendarDays className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Upcoming</p>
                <h3 className="text-3xl font-bold mt-1">{upcomingCount}</h3>
              </div>
              <Clock className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completed</p>
                <h3 className="text-3xl font-bold mt-1">{pastCount}</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Cancelled</p>
                <h3 className="text-3xl font-bold mt-1">{cancelledCount}</h3>
              </div>
              <XCircle className="w-10 h-10 text-white/50" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-sm">
              {['upcoming', 'past', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-lg font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab} ({appointments[tab].length})
                </button>
              ))}
            </div>

            {/* Appointments */}
            <div className="space-y-4">
              {appointments[activeTab].length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No {activeTab} appointments</p>
                </div>
              ) : (
                appointments[activeTab].map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl">
                          {apt.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{userType === 'parent' ? apt.doctor : apt.patient}</h3>
                          <p className="text-sm text-gray-500">{apt.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center space-x-1 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(apt.date)}</span>
                            </span>
                            <span className="flex items-center space-x-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{apt.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                        <div className="flex items-center space-x-1 mt-2 justify-end">
                          {apt.type === 'Teleconsult' ? (
                            <Video className="w-4 h-4 text-purple-500" />
                          ) : (
                            <MapPin className="w-4 h-4 text-blue-500" />
                          )}
                          <span className="text-sm text-gray-500">{apt.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    {activeTab === 'upcoming' && (
                      <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
                        {apt.type === 'Teleconsult' ? (
                          <button className="flex-1 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2">
                            <Video className="w-4 h-4" />
                            <span>Join Call</span>
                          </button>
                        ) : (
                          <button className="flex-1 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>Get Directions</span>
                          </button>
                        )}
                        <button 
                          onClick={() => openEditModal(apt)}
                          className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                          Reschedule
                        </button>
                        <button 
                          onClick={() => handleCancelAppointment(apt)}
                          className="py-2 px-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {activeTab === 'cancelled' && (
                      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => handleDeleteAppointment(apt)}
                          className="flex items-center space-x-1 py-2 px-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calendar Sidebar */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">June 2025</h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="py-2 text-gray-400 font-medium">{day}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => (
                  <button
                    key={i}
                    className={`py-2 rounded-lg transition-colors ${
                      i + 1 === 25 ? 'bg-primary-500 text-white' :
                      [10, 15, 28].includes(i + 1) ? 'bg-primary-100 text-primary-600' :
                      'hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Book */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Quick Book</h3>
              <div className="space-y-3">
                {doctors.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.specialty}</p>
                      </div>
                    </div>
                    <button className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      doc.available ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {doc.available ? 'Book' : 'Busy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Appointment Modal */}
        {showNewAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book New Appointment</h2>
                <button onClick={() => setShowNewAppointment(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddAppointment} className="space-y-6">
                {/* Select Child */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
                  <div className="flex space-x-3">
                    {['Ali (3y)', 'Sara (5y)'].map((child) => (
                      <button
                        key={child}
                        type="button"
                        onClick={() => setFormData({...formData, child})}
                        className={`flex-1 flex items-center space-x-3 p-4 border-2 rounded-xl transition-colors ${
                          formData.child === child 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <span className="text-2xl">{child.includes('Ali') ? '👦' : '👧'}</span>
                        <div className="text-left">
                          <p className="font-medium">{child.split(' ')[0]}</p>
                          <p className="text-sm text-gray-500">{child.match(/\(([^)]+)\)/)[1]}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                  <select 
                    value={formData.doctor}
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Dr. Ayesha Khan - Pediatrics">Dr. Ayesha Khan - Pediatrics</option>
                    <option value="Dr. Imran Ali - General Physician">Dr. Imran Ali - General Physician</option>
                    <option value="Dr. Sara Khan - Pediatrics">Dr. Sara Khan - Pediatrics</option>
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'In-Person'})}
                      className={`flex-1 flex items-center justify-center space-x-2 p-4 border-2 rounded-xl transition-colors ${
                        formData.type === 'In-Person' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <MapPin className={`w-5 h-5 ${formData.type === 'In-Person' ? 'text-primary-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${formData.type === 'In-Person' ? 'text-primary-600' : 'text-gray-600'}`}>In-Person</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'Teleconsult'})}
                      className={`flex-1 flex items-center justify-center space-x-2 p-4 border-2 rounded-xl transition-colors ${
                        formData.type === 'Teleconsult' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Video className={`w-5 h-5 ${formData.type === 'Teleconsult' ? 'text-primary-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${formData.type === 'Teleconsult' ? 'text-primary-600' : 'text-gray-600'}`}>Teleconsult</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe the reason for this appointment..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowNewAppointment(false)} 
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Appointment Modal */}
        {showEditModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reschedule Appointment</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEditAppointment} className="space-y-6">
                {/* Patient Info (Read Only) */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Patient</p>
                  <p className="font-medium text-gray-800">{selectedAppointment.patient}</p>
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                  <select 
                    value={formData.doctor}
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Dr. Ayesha Khan - Pediatrics">Dr. Ayesha Khan - Pediatrics</option>
                    <option value="Dr. Imran Ali - General Physician">Dr. Imran Ali - General Physician</option>
                    <option value="Dr. Sara Khan - Pediatrics">Dr. Sara Khan - Pediatrics</option>
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'In-Person'})}
                      className={`flex-1 flex items-center justify-center space-x-2 p-4 border-2 rounded-xl transition-colors ${
                        formData.type === 'In-Person' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <MapPin className={`w-5 h-5 ${formData.type === 'In-Person' ? 'text-primary-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${formData.type === 'In-Person' ? 'text-primary-600' : 'text-gray-600'}`}>In-Person</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, type: 'Teleconsult'})}
                      className={`flex-1 flex items-center justify-center space-x-2 p-4 border-2 rounded-xl transition-colors ${
                        formData.type === 'Teleconsult' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <Video className={`w-5 h-5 ${formData.type === 'Teleconsult' ? 'text-primary-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${formData.type === 'Teleconsult' ? 'text-primary-600' : 'text-gray-600'}`}>Teleconsult</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowEditModal(false)} 
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Update Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Appointments