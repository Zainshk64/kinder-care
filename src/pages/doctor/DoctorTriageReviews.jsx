// pages/doctor/DoctorTriageReviews.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Activity, Search, Filter, Eye, CheckCircle, XCircle,
  Clock, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown,
  FileText, ChevronRight, Baby, Calendar, Stethoscope
} from 'lucide-react'

const DoctorTriageReviews = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedTriage, setSelectedTriage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const triages = {
    pending: [
      { 
        id: 1, 
        child: 'Ali Ahmed', 
        age: '3 years',
        parent: 'Ahmed Khan',
        symptoms: 'High fever (102°F), mild cough, runny nose',
        aiResult: 'GP Visit',
        aiConfidence: 87,
        timestamp: '10 mins ago',
        avatar: '👦'
      },
      { 
        id: 2, 
        child: 'Sara Malik', 
        age: '5 years',
        parent: 'Fatima Malik',
        symptoms: 'Stomach pain, loss of appetite, vomiting',
        aiResult: 'GP Visit',
        aiConfidence: 82,
        timestamp: '25 mins ago',
        avatar: '👧'
      },
      { 
        id: 3, 
        child: 'Hassan Ali', 
        age: '2 years',
        parent: 'Zainab Ali',
        symptoms: 'Severe breathing difficulty, high fever',
        aiResult: 'Emergency',
        aiConfidence: 95,
        timestamp: '30 mins ago',
        avatar: '👦'
      },
    ],
    reviewed: [
      { 
        id: 4, 
        child: 'Ayesha Raza', 
        age: '4 years',
        parent: 'Imran Raza',
        symptoms: 'Mild fever, cold',
        aiResult: 'Home Care',
        aiConfidence: 91,
        doctorVerdict: 'Agreed',
        feedback: 'AI assessment accurate. Home remedies sufficient.',
        timestamp: '2 hours ago',
        avatar: '👧'
      },
      { 
        id: 5, 
        child: 'Omar Hassan', 
        age: '6 years',
        parent: 'Zainab Hassan',
        symptoms: 'Persistent cough, chest congestion',
        aiResult: 'Home Care',
        aiConfidence: 78,
        doctorVerdict: 'Upgraded',
        feedback: 'Recommend GP visit due to duration of symptoms.',
        timestamp: '3 hours ago',
        avatar: '👦'
      },
    ]
  }

  const getResultBadge = (result) => {
    switch(result) {
      case 'Home Care':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          <CheckCircle className="w-4 h-4" /> <span>Home Care</span>
        </span>
      case 'GP Visit':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
          <Clock className="w-4 h-4" /> <span>GP Visit</span>
        </span>
      case 'Emergency':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          <AlertTriangle className="w-4 h-4" /> <span>Emergency</span>
        </span>
      default:
        return null
    }
  }

  const getVerdictBadge = (verdict) => {
    switch(verdict) {
      case 'Agreed':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
          <ThumbsUp className="w-3 h-3" /> <span>Agreed</span>
        </span>
      case 'Upgraded':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-medium">
          <AlertTriangle className="w-3 h-3" /> <span>Upgraded</span>
        </span>
      case 'Downgraded':
        return <span className="flex items-center space-x-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
          <ThumbsDown className="w-3 h-3" /> <span>Downgraded</span>
        </span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="doctor" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">AI Triage Reviews</h1>
            <p className="text-gray-500 mt-1">Review and verify AI-generated triage results</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-medium flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{triages.pending.length} Pending Reviews</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Review</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{triages.pending.length}</h3>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Reviewed Today</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">23</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Agreement Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">89%</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Emergency Flags</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'pending'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Pending ({triages.pending.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reviewed')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'reviewed'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Reviewed ({triages.reviewed.length})</span>
          </button>
        </div>

        {/* Triage Cards */}
        <div className="space-y-4">
          {triages[activeTab].map((triage) => (
            <div 
              key={triage.id} 
              className={`card hover:shadow-lg transition-shadow ${
                triage.aiResult === 'Emergency' ? 'border-2 border-red-300 bg-red-50/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                    triage.aiResult === 'Emergency' ? 'bg-red-100' : 'bg-primary-100'
                  }`}>
                    {triage.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800 text-lg">{triage.child}</h3>
                      <span className="text-gray-500">({triage.age})</span>
                      {triage.aiResult === 'Emergency' && (
                        <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Parent: {triage.parent}</p>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 mb-1">Reported Symptoms:</p>
                      <p className="text-gray-600">{triage.symptoms}</p>
                    </div>

                    <div className="flex items-center space-x-4 mt-3">
                      {getResultBadge(triage.aiResult)}
                      <span className="text-sm text-gray-500">
                        AI Confidence: <strong>{triage.aiConfidence}%</strong>
                      </span>
                      <span className="text-sm text-gray-400">{triage.timestamp}</span>
                    </div>

                    {activeTab === 'reviewed' && (
                      <div className="mt-3 flex items-center space-x-3">
                        {getVerdictBadge(triage.doctorVerdict)}
                        <span className="text-sm text-gray-600">{triage.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>

                {activeTab === 'pending' && (
                  <div className="flex flex-col space-y-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Agree</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Upgrade</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span>Downgrade</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </div>
                )}

                {activeTab === 'reviewed' && (
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>View Report</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default DoctorTriageReviews