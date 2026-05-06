// pages/doctor/DoctorTriageReviews.jsx
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { 
  Activity, Search, Filter, Eye, CheckCircle, XCircle,
  Clock, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown,
  FileText, ChevronRight, Baby, Calendar, Stethoscope, Plus
} from 'lucide-react'

// Initial Mock Data
const INITIAL_TRIAGES = {
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
      avatar: '👦',
      notes: ''
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
      avatar: '👧',
      notes: ''
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
      avatar: '👦',
      notes: ''
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
      avatar: '👧',
      notes: 'Monitor temperature every 4 hours'
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
      avatar: '👦',
      notes: 'Check for any allergies'
    },
  ]
}

const DoctorTriageReviews = () => {
  // State Management
  const [triages, setTriages] = useState(INITIAL_TRIAGES)
  const [activeTab, setActiveTab] = useState('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTriage, setSelectedTriage] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reviewAction, setReviewAction] = useState('')

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    verdict: '',
    feedback: '',
    notes: '',
    newResult: ''
  })

  // Stats Calculation
  const stats = [
    {
      label: 'Pending Review',
      value: triages.pending.length,
      icon: Clock,
      color: 'orange',
      bg: 'bg-orange-100',
      text: 'text-orange-600'
    },
    {
      label: 'Reviewed Today',
      value: triages.reviewed.length,
      icon: CheckCircle,
      color: 'green',
      bg: 'bg-green-100',
      text: 'text-green-600'
    },
    {
      label: 'Agreement Rate',
      value: triages.reviewed.length > 0
        ? `${Math.round((triages.reviewed.filter(t => t.doctorVerdict === 'Agreed').length / triages.reviewed.length) * 100)}%`
        : '0%',
      icon: ThumbsUp,
      color: 'blue',
      bg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    {
      label: 'Emergency Flags',
      value: triages.pending.filter(t => t.aiResult === 'Emergency').length,
      icon: AlertTriangle,
      color: 'red',
      bg: 'bg-red-100',
      text: 'text-red-600'
    },
  ]

  // Filter Triages
  const filteredTriages = triages[activeTab].filter(triage =>
    triage.child.toLowerCase().includes(searchQuery.toLowerCase()) ||
    triage.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    triage.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // CRUD Operations
  const handleReviewTriage = (triage, action) => {
    setSelectedTriage(triage)
    setReviewAction(action)
    setReviewForm({
      verdict: action === 'agree' ? 'Agreed' : action === 'upgrade' ? 'Upgraded' : 'Downgraded',
      feedback: '',
      notes: '',
      newResult: action === 'upgrade' 
        ? (triage.aiResult === 'Home Care' ? 'GP Visit' : 'Emergency')
        : action === 'downgrade'
          ? (triage.aiResult === 'Emergency' ? 'GP Visit' : 'Home Care')
          : triage.aiResult
    })
    setShowReviewModal(true)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!selectedTriage) return

    // Remove from pending
    const updatedPending = triages.pending.filter(t => t.id !== selectedTriage.id)

    // Add to reviewed with verdict
    const reviewedTriage = {
      ...selectedTriage,
      doctorVerdict: reviewForm.verdict,
      feedback: reviewForm.feedback,
      notes: reviewForm.notes,
      aiResult: reviewForm.newResult || selectedTriage.aiResult,
      timestamp: 'Just now'
    }

    setTriages({
      pending: updatedPending,
      reviewed: [reviewedTriage, ...triages.reviewed]
    })

    setShowReviewModal(false)
    setSelectedTriage(null)
    resetReviewForm()
    showNotification('Triage review submitted successfully!')
  }

  const handleDeleteReviewed = (triageId) => {
    setTriages({
      ...triages,
      reviewed: triages.reviewed.filter(t => t.id !== triageId)
    })
    showNotification('Review deleted successfully!')
  }

  const resetReviewForm = () => {
    setReviewForm({
      verdict: '',
      feedback: '',
      notes: '',
      newResult: ''
    })
  }

  const openDetailModal = (triage) => {
    setSelectedTriage(triage)
    setShowDetailModal(true)
  }

  const openReportModal = (triage) => {
    setSelectedTriage(triage)
    setShowReportModal(true)
  }

  const showNotification = (message) => {
    alert(message)
  }

  // Badge Helpers
  const getResultBadge = (result) => {
    const resultConfig = {
      'Home Care': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      'GP Visit': { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
      'Emergency': { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle }
    }
    const config = resultConfig[result] || resultConfig['Home Care']
    const Icon = config.icon
    return (
      <span className={`flex items-center space-x-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-sm font-medium`}>
        <Icon className="w-4 h-4" />
        <span>{result}</span>
      </span>
    )
  }

  const getVerdictBadge = (verdict) => {
    const verdictConfig = {
      'Agreed': { bg: 'bg-green-50', text: 'text-green-600', icon: ThumbsUp },
      'Upgraded': { bg: 'bg-orange-50', text: 'text-orange-600', icon: AlertTriangle },
      'Downgraded': { bg: 'bg-blue-50', text: 'text-blue-600', icon: ThumbsDown }
    }
    const config = verdictConfig[verdict] || verdictConfig['Agreed']
    const Icon = config.icon
    return (
      <span className={`flex items-center space-x-1 px-2 py-1 ${config.bg} ${config.text} rounded-lg text-xs font-medium`}>
        <Icon className="w-3 h-3" />
        <span>{verdict}</span>
      </span>
    )
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100'
    if (confidence >= 75) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">AI Triage Reviews</h1>
            <p className="text-gray-500 mt-1">Review and verify AI-generated triage results</p>
          </div>
          <div className="flex items-center space-x-3">
            {triages.pending.filter(t => t.aiResult === 'Emergency').length > 0 && (
              <div className="animate-pulse bg-red-100 text-red-700 px-4 py-2 rounded-xl font-medium flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{triages.pending.filter(t => t.aiResult === 'Emergency').length} Emergency Case!</span>
              </div>
            )}
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-medium flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{triages.pending.length} Pending Reviews</span>
            </div>
          </div>
        </div>

        {/* Stats */}
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
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.text}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by child, parent or symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
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
          {filteredTriages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No {activeTab} triages found</p>
            </div>
          ) : (
            filteredTriages.map((triage) => (
              <div
                key={triage.id}
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-lg ${
                  triage.aiResult === 'Emergency'
                    ? 'border-2 border-red-300 bg-red-50/50'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      triage.aiResult === 'Emergency' ? 'bg-red-100' : 'bg-primary-100'
                    }`}>
                      {triage.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <h3 className="font-bold text-gray-800 text-lg">{triage.child}</h3>
                        <span className="text-gray-500 text-sm">({triage.age})</span>
                        {triage.aiResult === 'Emergency' && (
                          <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            ⚡ URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Parent: <strong>{triage.parent}</strong></p>
                      
                      <div className="p-3 bg-gray-50 rounded-xl mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Reported Symptoms:</p>
                        <p className="text-gray-600 text-sm">{triage.symptoms}</p>
                      </div>

                      <div className="flex items-center flex-wrap gap-3">
                        {getResultBadge(triage.aiResult)}
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(triage.aiConfidence)}`}>
                          AI: {triage.aiConfidence}% confidence
                        </span>
                        <span className="text-sm text-gray-400">{triage.timestamp}</span>
                      </div>

                      {/* Reviewed verdict section */}
                      {activeTab === 'reviewed' && (
                        <div className="mt-3 flex items-start gap-3 flex-wrap">
                          {getVerdictBadge(triage.doctorVerdict)}
                          <span className="text-sm text-gray-600 italic">{triage.feedback}</span>
                        </div>
                      )}

                      {/* Notes */}
                      {triage.notes && (
                        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-xs text-yellow-700">
                            <strong>Notes:</strong> {triage.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {activeTab === 'pending' && (
                    <div className="flex flex-col space-y-2 flex-shrink-0">
                      <button
                        onClick={() => handleReviewTriage(triage, 'agree')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Agree</span>
                      </button>
                      <button
                        onClick={() => handleReviewTriage(triage, 'upgrade')}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors text-sm"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        <span>Upgrade</span>
                      </button>
                      <button
                        onClick={() => handleReviewTriage(triage, 'downgrade')}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span>Downgrade</span>
                      </button>
                      <button
                        onClick={() => openDetailModal(triage)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                    </div>
                  )}

                  {activeTab === 'reviewed' && (
                    <div className="flex flex-col space-y-2 flex-shrink-0">
                      <button
                        onClick={() => openReportModal(triage)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Report</span>
                      </button>
                      <button
                        onClick={() => handleDeleteReviewed(triage.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Modal */}
        {showReviewModal && selectedTriage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Review Triage</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {reviewForm.verdict === 'Agreed' ? '✅ Agreeing with AI assessment' :
                     reviewForm.verdict === 'Upgraded' ? '⬆️ Upgrading AI assessment' :
                     '⬇️ Downgrading AI assessment'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowReviewModal(false)
                    resetReviewForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Patient Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{selectedTriage.avatar}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{selectedTriage.child}</h3>
                    <p className="text-sm text-gray-500">{selectedTriage.age} • Parent: {selectedTriage.parent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">AI Result:</span>
                  {getResultBadge(selectedTriage.aiResult)}
                </div>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* New Result (for upgrade/downgrade) */}
                {reviewForm.verdict !== 'Agreed' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Assessment *
                    </label>
                    <select
                      required
                      value={reviewForm.newResult}
                      onChange={(e) => setReviewForm({...reviewForm, newResult: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Home Care">Home Care</option>
                      <option value="GP Visit">GP Visit</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                )}

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback / Reason *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewForm.feedback}
                    onChange={(e) => setReviewForm({...reviewForm, feedback: e.target.value})}
                    placeholder="Explain your assessment or feedback..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Doctor Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={reviewForm.notes}
                    onChange={(e) => setReviewForm({...reviewForm, notes: e.target.value})}
                    placeholder="Any additional instructions for the parent..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Verdict Summary */}
                <div className={`p-4 rounded-xl border-2 ${
                  reviewForm.verdict === 'Agreed' ? 'bg-green-50 border-green-200' :
                  reviewForm.verdict === 'Upgraded' ? 'bg-orange-50 border-orange-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <p className="text-sm font-semibold text-gray-700">Review Summary:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Verdict: <strong>{reviewForm.verdict}</strong>
                    {reviewForm.verdict !== 'Agreed' && (
                      <span> → New Result: <strong>{reviewForm.newResult}</strong></span>
                    )}
                  </p>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewModal(false)
                      resetReviewForm()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-3 text-white rounded-xl font-medium transition-colors ${
                      reviewForm.verdict === 'Agreed' ? 'bg-green-500 hover:bg-green-600' :
                      reviewForm.verdict === 'Upgraded' ? 'bg-orange-500 hover:bg-orange-600' :
                      'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedTriage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Triage Details</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Child Info */}
                <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-xl">
                  <span className="text-4xl">{selectedTriage.avatar}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{selectedTriage.child}</h3>
                    <p className="text-gray-500 text-sm">{selectedTriage.age}</p>
                    {selectedTriage.aiResult === 'Emergency' && (
                      <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        ⚡ URGENT
                      </span>
                    )}
                  </div>
                </div>

                {/* Parent Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Parent Information</h4>
                  <p className="text-sm text-gray-600">{selectedTriage.parent}</p>
                </div>

                {/* Symptoms */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Reported Symptoms</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedTriage.symptoms}</p>
                </div>

                {/* AI Assessment */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">AI Assessment</h4>
                  <div className="flex items-center gap-3 mb-2">
                    {getResultBadge(selectedTriage.aiResult)}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(selectedTriage.aiConfidence)}`}>
                      Confidence: {selectedTriage.aiConfidence}%
                    </span>
                  </div>
                  {/* Confidence Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>AI Confidence Level</span>
                      <span>{selectedTriage.aiConfidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedTriage.aiConfidence >= 90 ? 'bg-green-500' :
                          selectedTriage.aiConfidence >= 75 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedTriage.aiConfidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Submitted {selectedTriage.timestamp}</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    handleReviewTriage(selectedTriage, 'agree')
                  }}
                  className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  Agree
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    handleReviewTriage(selectedTriage, 'upgrade')
                  }}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                >
                  Upgrade
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false)
                    handleReviewTriage(selectedTriage, 'downgrade')
                  }}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  Downgrade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && selectedTriage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Triage Report</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Report Content */}
              <div className="space-y-5">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-5 text-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{selectedTriage.avatar}</span>
                    <div>
                      <h3 className="font-bold text-lg">{selectedTriage.child}</h3>
                      <p className="text-white/80 text-sm">{selectedTriage.age} • {selectedTriage.parent}</p>
                    </div>
                  </div>
                  <div className="text-white/70 text-sm mt-2">
                    Report generated • {selectedTriage.timestamp}
                  </div>
                </div>

                {/* Symptoms Section */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-primary-500" />
                    <span>Reported Symptoms</span>
                  </h4>
                  <p className="text-gray-600 text-sm">{selectedTriage.symptoms}</p>
                </div>

                {/* AI Result */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4 text-primary-500" />
                    <span>AI Assessment</span>
                  </h4>
                  <div className="flex items-center gap-3 mb-3">
                    {getResultBadge(selectedTriage.aiResult)}
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(selectedTriage.aiConfidence)}`}>
                      {selectedTriage.aiConfidence}% confidence
                    </span>
                  </div>
                </div>

                {/* Doctor Review */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Doctor Review</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Verdict:</span>
                      {getVerdictBadge(selectedTriage.doctorVerdict)}
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Feedback:</span>
                      <p className="text-sm text-gray-700 mt-1">{selectedTriage.feedback}</p>
                    </div>
                    {selectedTriage.notes && (
                      <div>
                        <span className="text-sm text-gray-500">Notes:</span>
                        <p className="text-sm text-gray-700 mt-1">{selectedTriage.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="w-full mt-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DoctorTriageReviews