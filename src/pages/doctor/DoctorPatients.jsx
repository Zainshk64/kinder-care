// pages/doctor/DoctorPatients.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Users, Search, Filter, Eye, MessageSquare, Calendar,
  Baby, Phone, Mail, MapPin, Activity, FileText,
  ChevronRight, Clock, CheckCircle, AlertTriangle
} from 'lucide-react'

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)

  const patients = [
    { 
      id: 1, 
      parentName: 'Ahmed Khan', 
      children: [
        { name: 'Ali', age: '3 years', gender: 'Male', lastVisit: '2 days ago', triages: 5 },
        { name: 'Sara', age: '5 years', gender: 'Female', lastVisit: '1 week ago', triages: 3 }
      ],
      phone: '+92 300 1234567',
      email: 'ahmed.khan@email.com',
      address: 'Rawalpindi, Pakistan',
      totalVisits: 12,
      lastTriage: 'Home Care',
      status: 'active'
    },
    { 
      id: 2, 
      parentName: 'Fatima Ali', 
      children: [
        { name: 'Hassan', age: '2 years', gender: 'Male', lastVisit: '3 days ago', triages: 8 }
      ],
      phone: '+92 301 2345678',
      email: 'fatima.ali@email.com',
      address: 'Islamabad, Pakistan',
      totalVisits: 8,
      lastTriage: 'GP Visit',
      status: 'active'
    },
    { 
      id: 3, 
      parentName: 'Zainab Hassan', 
      children: [
        { name: 'Aisha', age: '4 years', gender: 'Female', lastVisit: '1 day ago', triages: 4 },
        { name: 'Omar', age: '6 years', gender: 'Male', lastVisit: '5 days ago', triages: 2 },
        { name: 'Yusuf', age: '1 year', gender: 'Male', lastVisit: '1 week ago', triages: 6 }
      ],
      phone: '+92 302 3456789',
      email: 'zainab.h@email.com',
      address: 'Lahore, Pakistan',
      totalVisits: 24,
      lastTriage: 'Home Care',
      status: 'active'
    },
  ]

  const getTriageBadge = (triage) => {
    switch(triage) {
      case 'Home Care':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Home Care</span>
      case 'GP Visit':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">GP Visit</span>
      case 'Emergency':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Emergency</span>
      default:
        return null
    }
  }

  const filteredPatients = patients.filter(patient => 
    patient.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.children.some(child => child.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="doctor" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
            <p className="text-gray-500 mt-1">Manage and view patient information</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium">
              Total: {patients.length} Families
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Patients</p>
                <h3 className="text-3xl font-bold mt-1">156</h3>
              </div>
              <Users className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active This Week</p>
                <h3 className="text-3xl font-bold mt-1">45</h3>
              </div>
              <Activity className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Children Registered</p>
                <h3 className="text-3xl font-bold mt-1">234</h3>
              </div>
              <Baby className="w-10 h-10 text-white/50" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Pending Reviews</p>
                <h3 className="text-3xl font-bold mt-1">12</h3>
              </div>
              <Clock className="w-10 h-10 text-white/50" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="flex items-center space-x-4">
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
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl">
                    👨‍👩‍👧‍👦
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{patient.parentName}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{patient.phone}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{patient.email}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-500">{patient.totalVisits} total visits</span>
                      <span className="text-gray-300">•</span>
                      {getTriageBadge(patient.lastTriage)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </button>
                  <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-primary-600" />
                  </button>
                </div>
              </div>

              {/* Children List */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-600 mb-3">Children ({patient.children.length})</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {patient.children.map((child, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                          {child.gender === 'Male' ? '👦' : '👧'}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{child.name}</h4>
                          <p className="text-xs text-gray-500">{child.age}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Last visit</p>
                        <p className="text-sm font-medium text-gray-700">{child.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default DoctorPatients