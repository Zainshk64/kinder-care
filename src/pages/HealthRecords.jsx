// pages/HealthRecords.jsx
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  FileText, Download, Upload, Search, Filter, Plus,
  Calendar, User, Stethoscope, Pill, Syringe, Activity,
  Eye, Trash2, Share2, Clock, CheckCircle, AlertTriangle,
  Heart, Thermometer, Weight, Ruler, ChevronRight, XCircle,
  Edit2
} from 'lucide-react'

// Initial Mock Data
const INITIAL_CHILDREN = [
  { 
    id: 1, name: 'Ali', age: '3 years', avatar: '👦',
    vitals: { height: '98 cm', weight: '15 kg', temp: '98.6°F', heartRate: '95 bpm' }
  },
  { 
    id: 2, name: 'Sara', age: '5 years', avatar: '👧',
    vitals: { height: '110 cm', weight: '19 kg', temp: '98.4°F', heartRate: '90 bpm' }
  },
]

const INITIAL_RECORDS = [
  { id: 1, title: 'AI Triage Report - Fever', type: 'triage', date: 'June 20, 2025', doctor: 'AI System', status: 'Home Care', childId: 1 },
  { id: 2, title: 'Prescription - Antibiotics', type: 'prescriptions', date: 'June 18, 2025', doctor: 'Dr. Ayesha Khan', status: null, childId: 2 },
  { id: 3, title: 'Vaccination - MMR Booster', type: 'vaccinations', date: 'June 15, 2025', doctor: 'Dr. Imran Ali', status: null, childId: 1 },
  { id: 4, title: 'Blood Test Results', type: 'reports', date: 'June 10, 2025', doctor: 'City Lab', status: null, childId: 2 },
  { id: 5, title: 'AI Triage Report - Cough', type: 'triage', date: 'June 8, 2025', doctor: 'AI System', status: 'GP Visit', childId: 1 },
  { id: 6, title: 'Prescription - Vitamins', type: 'prescriptions', date: 'June 5, 2025', doctor: 'Dr. Sara Khan', status: null, childId: 1 },
]

const INITIAL_VACCINATIONS = [
  { id: 1, name: 'BCG', date: 'At Birth', status: 'completed', childId: 1 },
  { id: 2, name: 'Hepatitis B', date: '1 Month', status: 'completed', childId: 1 },
  { id: 3, name: 'DTP', date: '2 Months', status: 'completed', childId: 1 },
  { id: 4, name: 'Polio', date: '4 Months', status: 'completed', childId: 1 },
  { id: 5, name: 'MMR', date: '12 Months', status: 'completed', childId: 1 },
  { id: 6, name: 'Booster DTP', date: 'July 2025', status: 'upcoming', childId: 1 },
  { id: 7, name: 'BCG', date: 'At Birth', status: 'completed', childId: 2 },
  { id: 8, name: 'Hepatitis B', date: '1 Month', status: 'completed', childId: 2 },
  { id: 9, name: 'MMR Booster', date: 'Aug 2025', status: 'upcoming', childId: 2 },
]

const INITIAL_ALLERGIES = [
  { id: 1, name: 'Peanut Allergy', severity: 'Severe', childId: 1 },
  { id: 2, name: 'Dust Sensitivity', severity: 'Mild', childId: 1 },
  { id: 3, name: 'Lactose Intolerance', severity: 'Moderate', childId: 2 },
]

const categories = [
  { id: 'all', label: 'All Records', icon: FileText },
  { id: 'triage', label: 'AI Triages', icon: Activity },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
  { id: 'vaccinations', label: 'Vaccinations', icon: Syringe },
  { id: 'reports', label: 'Lab Reports', icon: FileText },
]

const HealthRecords = ({ userType = 'parent' }) => {
  // State Management
  const [children, setChildren] = useState(INITIAL_CHILDREN)
  const [records, setRecords] = useState(INITIAL_RECORDS)
  const [vaccinations, setVaccinations] = useState(INITIAL_VACCINATIONS)
  const [allergies, setAllergies] = useState(INITIAL_ALLERGIES)

  const [selectedChild, setSelectedChild] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal States
  const [showAddRecordModal, setShowAddRecordModal] = useState(false)
  const [showEditRecordModal, setShowEditRecordModal] = useState(false)
  const [showViewRecordModal, setShowViewRecordModal] = useState(false)
  const [showDeleteRecordModal, setShowDeleteRecordModal] = useState(false)
  const [showAddVaccinationModal, setShowAddVaccinationModal] = useState(false)
  const [showAddAllergyModal, setShowAddAllergyModal] = useState(false)
  const [showEditVitalsModal, setShowEditVitalsModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const [selectedRecord, setSelectedRecord] = useState(null)

  // Form States
  const [recordForm, setRecordForm] = useState({
    title: '', type: 'triage', date: '', doctor: '', status: ''
  })

  const [vaccinationForm, setVaccinationForm] = useState({
    name: '', date: '', status: 'upcoming'
  })

  const [allergyForm, setAllergyForm] = useState({
    name: '', severity: 'Mild'
  })

  const [vitalsForm, setVitalsForm] = useState({
    height: '', weight: '', temp: '', heartRate: ''
  })

  // Current child data
  const currentChild = children[selectedChild]
  const currentChildId = currentChild?.id

  // Filtered records
  const filteredRecords = records
    .filter(r => r.childId === currentChildId)
    .filter(r => activeCategory === 'all' || r.type === activeCategory)
    .filter(r =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const currentVaccinations = vaccinations.filter(v => v.childId === currentChildId)
  const currentAllergies = allergies.filter(a => a.childId === currentChildId)

  // Vital Stats Display
  const vitalStats = [
    { label: 'Height', value: currentChild?.vitals?.height, icon: Ruler, color: 'blue' },
    { label: 'Weight', value: currentChild?.vitals?.weight, icon: Weight, color: 'green' },
    { label: 'Last Temp', value: currentChild?.vitals?.temp, icon: Thermometer, color: 'orange' },
    { label: 'Heart Rate', value: currentChild?.vitals?.heartRate, icon: Heart, color: 'red' },
  ]

  // CRUD - Records
  const handleAddRecord = (e) => {
    e.preventDefault()
    const newRecord = {
      id: Date.now(),
      ...recordForm,
      childId: currentChildId
    }
    setRecords([newRecord, ...records])
    setShowAddRecordModal(false)
    resetRecordForm()
    showNotification('Record added successfully!')
  }

  const handleEditRecord = (e) => {
    e.preventDefault()
    setRecords(records.map(r =>
      r.id === selectedRecord.id ? { ...r, ...recordForm } : r
    ))
    setShowEditRecordModal(false)
    setSelectedRecord(null)
    resetRecordForm()
    showNotification('Record updated successfully!')
  }

  const handleDeleteRecord = () => {
    setRecords(records.filter(r => r.id !== selectedRecord.id))
    setShowDeleteRecordModal(false)
    setSelectedRecord(null)
    showNotification('Record deleted successfully!')
  }

  const openEditRecord = (record) => {
    setSelectedRecord(record)
    setRecordForm({
      title: record.title,
      type: record.type,
      date: record.date,
      doctor: record.doctor,
      status: record.status || ''
    })
    setShowEditRecordModal(true)
  }

  const openViewRecord = (record) => {
    setSelectedRecord(record)
    setShowViewRecordModal(true)
  }

  const openDeleteRecord = (record) => {
    setSelectedRecord(record)
    setShowDeleteRecordModal(true)
  }

  // CRUD - Vaccinations
  const handleAddVaccination = (e) => {
    e.preventDefault()
    const newVac = {
      id: Date.now(),
      ...vaccinationForm,
      childId: currentChildId
    }
    setVaccinations([...vaccinations, newVac])
    setShowAddVaccinationModal(false)
    setVaccinationForm({ name: '', date: '', status: 'upcoming' })
    showNotification('Vaccination added successfully!')
  }

  const handleDeleteVaccination = (vacId) => {
    setVaccinations(vaccinations.filter(v => v.id !== vacId))
    showNotification('Vaccination removed!')
  }

  // CRUD - Allergies
  const handleAddAllergy = (e) => {
    e.preventDefault()
    const newAllergy = {
      id: Date.now(),
      ...allergyForm,
      childId: currentChildId
    }
    setAllergies([...allergies, newAllergy])
    setShowAddAllergyModal(false)
    setAllergyForm({ name: '', severity: 'Mild' })
    showNotification('Allergy added successfully!')
  }

  const handleDeleteAllergy = (allergyId) => {
    setAllergies(allergies.filter(a => a.id !== allergyId))
    showNotification('Allergy removed!')
  }

  // CRUD - Vitals
  const handleEditVitals = (e) => {
    e.preventDefault()
    setChildren(children.map((child, idx) =>
      idx === selectedChild
        ? { ...child, vitals: { ...child.vitals, ...vitalsForm } }
        : child
    ))
    setShowEditVitalsModal(false)
    showNotification('Vitals updated successfully!')
  }

  const openEditVitals = () => {
    setVitalsForm({
      height: currentChild.vitals.height,
      weight: currentChild.vitals.weight,
      temp: currentChild.vitals.temp,
      heartRate: currentChild.vitals.heartRate
    })
    setShowEditVitalsModal(true)
  }

  // Helpers
  const resetRecordForm = () => {
    setRecordForm({ title: '', type: 'triage', date: '', doctor: '', status: '' })
  }

  const showNotification = (message) => alert(message)

  const getRecordIcon = (type) => {
    switch (type) {
      case 'triage': return { bg: 'bg-green-100', icon: Activity, iconColor: 'text-green-600' }
      case 'prescriptions': return { bg: 'bg-blue-100', icon: Pill, iconColor: 'text-blue-600' }
      case 'vaccinations': return { bg: 'bg-purple-100', icon: Syringe, iconColor: 'text-purple-600' }
      default: return { bg: 'bg-orange-100', icon: FileText, iconColor: 'text-orange-600' }
    }
  }

  const getStatusBadge = (status) => {
    if (!status) return null
    const config = {
      'Home Care': 'bg-green-100 text-green-700',
      'GP Visit': 'bg-orange-100 text-orange-700',
      'Emergency': 'bg-red-100 text-red-700',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    )
  }

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'Severe': return { bg: 'bg-red-50 border-red-100', text: 'text-red-700', icon: 'text-red-500', badge: 'bg-red-100 text-red-600' }
      case 'Moderate': return { bg: 'bg-orange-50 border-orange-100', text: 'text-orange-700', icon: 'text-orange-500', badge: 'bg-orange-100 text-orange-600' }
      default: return { bg: 'bg-yellow-50 border-yellow-100', text: 'text-yellow-700', icon: 'text-yellow-500', badge: 'bg-yellow-100 text-yellow-600' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userType={userType} />

      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Health Records</h1>
            <p className="text-gray-500 mt-1">Complete medical history and documents</p>
          </div>
          <div className="flex space-x-3">
            {/* <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-5 h-5 text-gray-500" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-500" />
              <span>Export All</span>
            </button> */}
            <button
              onClick={() => setShowAddRecordModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Record</span>
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
                <p className={`text-sm ${selectedChild === index ? 'text-white/80' : 'text-gray-500'}`}>
                  {child.age}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vital Stats */}
            <div className="grid grid-cols-4 gap-4">
              {vitalStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                  </div>
                )
              })}
            </div>

            {/* Edit Vitals Button */}
            <button
              onClick={openEditVitals}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>Update Vitals for {currentChild?.name}</span>
            </button>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Records List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Medical Records
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({filteredRecords.length} records)
                  </span>
                </h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3" />
                    <p>No records found</p>
                  </div>
                ) : (
                  filteredRecords.map((record) => {
                    const { bg, icon: Icon, iconColor } = getRecordIcon(record.type)
                    return (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${iconColor}`} />
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
                          {getStatusBadge(record.status)}
                          <button
                            onClick={() => openViewRecord(record)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => openEditRecord(record)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-primary-500" />
                          </button>
                          {/* <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button> */}
                          <button
                            onClick={() => openDeleteRecord(record)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Vaccination Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Vaccinations</h3>
                <button
                  onClick={() => setShowAddVaccinationModal(true)}
                  className="p-2 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                  title="Add Vaccination"
                >
                  <Plus className="w-4 h-4 text-primary-600" />
                </button>
              </div>
              <div className="space-y-3">
                {currentVaccinations.length === 0 ? (
                  <p className="text-center text-gray-400 py-4 text-sm">No vaccinations recorded</p>
                ) : (
                  currentVaccinations.map((vac) => (
                    <div key={vac.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
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
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          vac.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {vac.status}
                        </span>
                        <button
                          onClick={() => handleDeleteVaccination(vac.id)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Allergies & Conditions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Allergies & Conditions</h3>
              </div>
              <div className="space-y-3">
                {currentAllergies.length === 0 ? (
                  <p className="text-center text-gray-400 py-4 text-sm">No allergies recorded</p>
                ) : (
                  currentAllergies.map((allergy) => {
                    const config = getSeverityConfig(allergy.severity)
                    return (
                      <div
                        key={allergy.id}
                        className={`flex items-center justify-between p-3 ${config.bg} rounded-xl border`}
                      >
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className={`w-5 h-5 ${config.icon}`} />
                          <span className={`font-medium ${config.text} text-sm`}>{allergy.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`text-xs ${config.badge} px-2 py-1 rounded-full`}>
                            {allergy.severity}
                          </span>
                          <button
                            onClick={() => handleDeleteAllergy(allergy.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <button
                onClick={() => setShowAddAllergyModal(true)}
                className="w-full mt-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Allergy</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ─── MODALS ─────────────────────────────────────────────── */}

      {/* Add / Edit Record Modal (shared form) */}
      {(showAddRecordModal || showEditRecordModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {showAddRecordModal ? 'Add New Record' : 'Edit Record'}
              </h2>
              <button
                onClick={() => {
                  setShowAddRecordModal(false)
                  setShowEditRecordModal(false)
                  setSelectedRecord(null)
                  resetRecordForm()
                }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={showAddRecordModal ? handleAddRecord : handleEditRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Record Title *</label>
                <input
                  type="text"
                  required
                  value={recordForm.title}
                  onChange={(e) => setRecordForm({...recordForm, title: e.target.value})}
                  placeholder="e.g., AI Triage Report - Fever"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={recordForm.type}
                    onChange={(e) => setRecordForm({...recordForm, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="triage">AI Triage</option>
                    <option value="prescriptions">Prescription</option>
                    <option value="vaccinations">Vaccination</option>
                    <option value="reports">Lab Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={recordForm.date}
                    onChange={(e) => setRecordForm({...recordForm, date: e.target.value})}
                    placeholder="e.g., June 20, 2025"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor / Source *</label>
                <input
                  type="text"
                  required
                  value={recordForm.doctor}
                  onChange={(e) => setRecordForm({...recordForm, doctor: e.target.value})}
                  placeholder="e.g., Dr. Ayesha Khan"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {recordForm.type === 'triage' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Triage Result</label>
                  <select
                    value={recordForm.status}
                    onChange={(e) => setRecordForm({...recordForm, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select result</option>
                    <option value="Home Care">Home Care</option>
                    <option value="GP Visit">GP Visit</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddRecordModal(false)
                    setShowEditRecordModal(false)
                    setSelectedRecord(null)
                    resetRecordForm()
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  {showAddRecordModal ? 'Add Record' : 'Update Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Record Modal */}
      {showViewRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Record Details</h2>
              <button
                onClick={() => { setShowViewRecordModal(false); setSelectedRecord(null) }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {(() => {
              const { bg, icon: Icon, iconColor } = getRecordIcon(selectedRecord.type)
              return (
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{selectedRecord.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">{selectedRecord.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="font-medium text-gray-800 text-sm">{selectedRecord.date}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Doctor / Source</p>
                      <p className="font-medium text-gray-800 text-sm">{selectedRecord.doctor}</p>
                    </div>
                    {selectedRecord.status && (
                      <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                        <p className="text-xs text-gray-500 mb-2">Triage Result</p>
                        {getStatusBadge(selectedRecord.status)}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setShowViewRecordModal(false)
                        openEditRecord(selectedRecord)
                      }}
                      className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                    >
                      Edit Record
                    </button>
                    <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Delete Record Modal */}
      {showDeleteRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Record</h2>
              <p className="text-gray-500">
                Are you sure you want to delete <strong>{selectedRecord.title}</strong>? This cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => { setShowDeleteRecordModal(false); setSelectedRecord(null) }}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRecord}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vaccination Modal */}
      {showAddVaccinationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Vaccination</h2>
              <button
                onClick={() => setShowAddVaccinationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddVaccination} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Name *</label>
                <input
                  type="text"
                  required
                  value={vaccinationForm.name}
                  onChange={(e) => setVaccinationForm({...vaccinationForm, name: e.target.value})}
                  placeholder="e.g., MMR Booster"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date / Age *</label>
                <input
                  type="text"
                  required
                  value={vaccinationForm.date}
                  onChange={(e) => setVaccinationForm({...vaccinationForm, date: e.target.value})}
                  placeholder="e.g., July 2025 or At Birth"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={vaccinationForm.status}
                  onChange={(e) => setVaccinationForm({...vaccinationForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddVaccinationModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Add Vaccination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Allergy Modal */}
      {showAddAllergyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Allergy</h2>
              <button
                onClick={() => setShowAddAllergyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddAllergy} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergy / Condition *</label>
                <input
                  type="text"
                  required
                  value={allergyForm.name}
                  onChange={(e) => setAllergyForm({...allergyForm, name: e.target.value})}
                  placeholder="e.g., Peanut Allergy"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severity *</label>
                <select
                  required
                  value={allergyForm.severity}
                  onChange={(e) => setAllergyForm({...allergyForm, severity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddAllergyModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Add Allergy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Vitals Modal */}
      {showEditVitalsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Update Vitals</h2>
              <button
                onClick={() => setShowEditVitalsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleEditVitals} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="text"
                    value={vitalsForm.height}
                    onChange={(e) => setVitalsForm({...vitalsForm, height: e.target.value})}
                    placeholder="e.g., 98 cm"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={vitalsForm.weight}
                    onChange={(e) => setVitalsForm({...vitalsForm, weight: e.target.value})}
                    placeholder="e.g., 15 kg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                  <input
                    type="text"
                    value={vitalsForm.temp}
                    onChange={(e) => setVitalsForm({...vitalsForm, temp: e.target.value})}
                    placeholder="e.g., 98.6°F"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
                  <input
                    type="text"
                    value={vitalsForm.heartRate}
                    onChange={(e) => setVitalsForm({...vitalsForm, heartRate: e.target.value})}
                    placeholder="e.g., 95 bpm"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowEditVitalsModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Update Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center mb-6 hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Drag & drop files here</p>
              <p className="text-gray-400 text-sm mt-1">or click to browse</p>
              <p className="text-gray-400 text-xs mt-2">PDF, JPG, PNG up to 10MB</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false)
                  showNotification('File upload simulated successfully!')
                }}
                className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HealthRecords