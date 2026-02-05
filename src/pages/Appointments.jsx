// pages/Appointments.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  Calendar, Clock, Video, MapPin, User, Phone,
  Plus, Filter, Search, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertCircle, MoreVertical,
  CalendarDays, Users, Stethoscope
} from 'lucide-react'

const Appointments = ({ userType = 'parent' }) => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  const appointments = {
    upcoming: [
      { id: 1, doctor: 'Dr. Ayesha Khan', patient: 'Ali (3y)', specialty: 'Pediatrics', date: 'June 25, 2025', time: '10:00 AM', type: 'In-Person', status: 'confirmed', avatar: '👩‍⚕️' },
      { id: 2, doctor: 'Dr. Imran Ali', patient: 'Sara (5y)', specialty: 'General', date: 'June 28, 2025', time: '2:30 PM', type: 'Teleconsult', status: 'pending', avatar: '👨‍⚕️' },
      { id: 3, doctor: 'Dr. Sara Khan', patient: 'Ali (3y)', specialty: 'Pediatrics', date: 'July 2, 2025', time: '11:00 AM', type: 'In-Person', status: 'confirmed', avatar: '👩‍⚕️' },
    ],
    past: [
      { id: 4, doctor: 'Dr. Ayesha Khan', patient: 'Sara (5y)', specialty: 'Pediatrics', date: 'June 15, 2025', time: '9:00 AM', type: 'In-Person', status: 'completed', avatar: '👩‍⚕️' },
      { id: 5, doctor: 'Dr. Hassan Ali', patient: 'Ali (3y)', specialty: 'Child Specialist', date: 'June 10, 2025', time: '3:00 PM', type: 'Teleconsult', status: 'completed', avatar: '👨‍⚕️' },
    ],
    cancelled: [
      { id: 6, doctor: 'Dr. Imran Ali', patient: 'Ali (3y)', specialty: 'General', date: 'June 8, 2025', time: '10:00 AM', type: 'In-Person', status: 'cancelled', avatar: '👨‍⚕️' },
    ]
  }

  const doctors = [
    { id: 1, name: 'Dr. Ayesha Khan', specialty: 'Pediatrics', rating: 4.9, available: true },
    { id: 2, name: 'Dr. Imran Ali', specialty: 'General Physician', rating: 4.7, available: true },
    { id: 3, name: 'Dr. Sara Khan', specialty: 'Pediatrics', rating: 4.8, available: false },
  ]

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Sidebar userType={userType} />
      
      <main className="ml-64  p-8">
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
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Appointments</p>
                <h3 className="text-3xl font-bold mt-1">24</h3>
              </div>
              <CalendarDays className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Upcoming</p>
                <h3 className="text-3xl font-bold mt-1">3</h3>
              </div>
              <Clock className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completed</p>
                <h3 className="text-3xl font-bold mt-1">19</h3>
              </div>
              <CheckCircle className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Cancelled</p>
                <h3 className="text-3xl font-bold mt-1">2</h3>
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
              {appointments[activeTab].map((apt) => (
                <div key={apt.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl">
                        {apt.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{userType === 'parent' ? apt.doctor : apt.patient}</h3>
                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{apt.date}</span>
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
                      <div className="flex items-center space-x-1 mt-2">
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
                      <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                        Reschedule
                      </button>
                      <button className="py-2 px-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Sidebar */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <div className="card">
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
            <div className="card">
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
                      doc.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book New Appointment</h2>
                <button onClick={() => setShowNewAppointment(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Select Child */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
                  <div className="flex space-x-3">
                    {[{ name: 'Ali', age: '3y', avatar: '👦' }, { name: 'Sara', age: '5y', avatar: '👧' }].map((child) => (
                      <button key={child.name} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors">
                        <span className="text-2xl">{child.avatar}</span>
                        <div className="text-left">
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-gray-500">{child.age}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Dr. Ayesha Khan - Pediatrics</option>
                    <option>Dr. Imran Ali - General Physician</option>
                    <option>Dr. Sara Khan - Pediatrics</option>
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                  <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 p-4 border-2 border-primary-500 bg-primary-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <span className="font-medium text-primary-600">In-Person</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-600">Teleconsult</span>
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
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
                  <button onClick={() => setShowNewAppointment(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Appointments