// pages/HealthRecords.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  FileText, Download, Upload, Search, Filter, Plus,
  Calendar, User, Stethoscope, Pill, Syringe, Activity,
  Eye, Trash2, Share2, Clock, CheckCircle, AlertTriangle,
  Heart, Thermometer, Weight, Ruler, ChevronRight
} from 'lucide-react'

const HealthRecords = ({ userType = 'parent' }) => {
  const [selectedChild, setSelectedChild] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')

  const children = [
    { id: 1, name: 'Ali', age: '3 years', avatar: '👦' },
    { id: 2, name: 'Sara', age: '5 years', avatar: '👧' },
  ]

  const categories = [
    { id: 'all', label: 'All Records', icon: FileText },
    { id: 'triage', label: 'AI Triages', icon: Activity },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'vaccinations', label: 'Vaccinations', icon: Syringe },
    { id: 'reports', label: 'Lab Reports', icon: FileText },
  ]

  const records = [
    { id: 1, title: 'AI Triage Report - Fever', type: 'triage', date: 'June 20, 2025', doctor: 'AI System', status: 'Home Care', child: 'Ali' },
    { id: 2, title: 'Prescription - Antibiotics', type: 'prescriptions', date: 'June 18, 2025', doctor: 'Dr. Ayesha Khan', child: 'Sara' },
    { id: 3, title: 'Vaccination - MMR Booster', type: 'vaccinations', date: 'June 15, 2025', doctor: 'Dr. Imran Ali', child: 'Ali' },
    { id: 4, title: 'Blood Test Results', type: 'reports', date: 'June 10, 2025', doctor: 'City Lab', child: 'Sara' },
    { id: 5, title: 'AI Triage Report - Cough', type: 'triage', date: 'June 8, 2025', doctor: 'AI System', status: 'GP Visit', child: 'Ali' },
    { id: 6, title: 'Prescription - Vitamins', type: 'prescriptions', date: 'June 5, 2025', doctor: 'Dr. Sara Khan', child: 'Ali' },
  ]

  const vitalStats = [
    { label: 'Height', value: '98 cm', icon: Ruler, color: 'blue' },
    { label: 'Weight', value: '15 kg', icon: Weight, color: 'green' },
    { label: 'Last Temp', value: '98.6°F', icon: Thermometer, color: 'orange' },
    { label: 'Heart Rate', value: '95 bpm', icon: Heart, color: 'red' },
  ]

  const vaccinations = [
    { name: 'BCG', date: 'At Birth', status: 'completed' },
    { name: 'Hepatitis B', date: '1 Month', status: 'completed' },
    { name: 'DTP', date: '2 Months', status: 'completed' },
    { name: 'Polio', date: '4 Months', status: 'completed' },
    { name: 'MMR', date: '12 Months', status: 'completed' },
    { name: 'Booster DTP', date: 'July 2025', status: 'upcoming' },
  ]

  const filteredRecords = activeCategory === 'all' 
    ? records 
    : records.filter(r => r.type === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType={userType} />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>
            <p className="text-gray-500 mt-1">Complete medical history and documents</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5 text-gray-500" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-500" />
              <span>Export All</span>
            </button>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex space-x-4 mb-8">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(index)}
              className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${
                selectedChild === index 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="text-2xl">{child.avatar}</span>
              <div className="text-left">
                <h3 className="font-bold">{child.name}</h3>
                <p className={`text-sm ${selectedChild === index ? 'text-white/80' : 'text-gray-500'}`}>{child.age}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Vital Stats */}
            <div className="grid grid-cols-4 gap-4">
              {vitalStats.map((stat) => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  <span className="font-medium">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Records List */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Medical Records</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        record.type === 'triage' ? 'bg-green-100' :
                        record.type === 'prescriptions' ? 'bg-blue-100' :
                        record.type === 'vaccinations' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        {record.type === 'triage' ? <Activity className="w-6 h-6 text-green-600" /> :
                         record.type === 'prescriptions' ? <Pill className="w-6 h-6 text-blue-600" /> :
                         record.type === 'vaccinations' ? <Syringe className="w-6 h-6 text-purple-600" /> :
                         <FileText className="w-6 h-6 text-orange-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{record.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{record.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{record.doctor}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {record.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'Home Care' ? 'bg-green-100 text-green-700' :
                          record.status === 'GP Visit' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {record.status}
                        </span>
                      )}
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vaccination Schedule */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Vaccination Schedule</h3>
              <div className="space-y-3">
                {vaccinations.map((vac, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        vac.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {vac.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{vac.name}</p>
                        <p className="text-xs text-gray-500">{vac.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vac.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {vac.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies & Conditions */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Allergies & Conditions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-700">Peanut Allergy</span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Severe</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-yellow-700">Dust Sensitivity</span>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Mild</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors flex items-center justify-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Add Allergy</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HealthRecords