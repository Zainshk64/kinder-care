// ParentDashboard.jsx
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { 
  Baby, Calendar, FileText, Clock, Heart, 
  AlertTriangle, CheckCircle, MessageCircle, Plus,
  Stethoscope, Thermometer, Shield, Bell, 
  Mic, Camera, Type, Phone, Video, ChevronRight,
  Activity, TrendingUp, Star, BookOpen
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0)

  // Children profiles
  const children = [
    { id: 1, name: 'Ali', age: '3 years', avatar: '👦', lastCheckup: '2 days ago', healthScore: 92 },
    { id: 2, name: 'Sara', age: '5 years', avatar: '👧', lastCheckup: '1 week ago', healthScore: 88 },
  ]

  // Health history data
  const healthHistory = [
    { name: 'Jan', checkups: 2 },
    { name: 'Feb', checkups: 1 },
    { name: 'Mar', checkups: 3 },
    { name: 'Apr', checkups: 1 },
    { name: 'May', checkups: 2 },
    { name: 'Jun', checkups: 4 },
  ]

  // Triage results distribution
  const triageHistory = [
    { name: 'Home Care', value: 8, color: '#22c55e' },
    { name: 'GP Visit', value: 3, color: '#f59e0b' },
    { name: 'Emergency', value: 1, color: '#ef4444' },
  ]

  // Recent AI triage sessions
  const recentTriages = [
    { 
      id: 1, 
      child: 'Ali', 
      symptoms: 'Mild fever, runny nose',
      result: 'Home Care', 
      date: 'Today, 10:30 AM',
      recommendation: 'Rest and fluids recommended'
    },
    { 
      id: 2, 
      child: 'Sara', 
      symptoms: 'Stomach pain, vomiting',
      result: 'GP Visit', 
      date: 'Yesterday, 3:15 PM',
      recommendation: 'Schedule appointment within 24 hours'
    },
    { 
      id: 3, 
      child: 'Ali', 
      symptoms: 'Cough, mild temperature',
      result: 'Home Care', 
      date: '3 days ago',
      recommendation: 'Monitor symptoms, give warm fluids'
    },
  ]

  // Upcoming appointments
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Ayesha Khan', specialty: 'Pediatrician', date: 'Tomorrow', time: '10:00 AM', type: 'In-Person' },
    { id: 2, doctor: 'Dr. Imran Ali', specialty: 'General Physician', date: 'June 28', time: '2:30 PM', type: 'Teleconsult' },
  ]

  // Health tips
  const healthTips = [
    { id: 1, title: 'Summer Hydration', content: 'Ensure your child drinks 6-8 glasses of water daily.', icon: '💧' },
    { id: 2, title: 'Vaccination Reminder', content: 'Ali\'s next vaccination is due in 2 weeks.', icon: '💉' },
    { id: 3, title: 'Sleep Schedule', content: 'Children aged 3-5 need 10-13 hours of sleep.', icon: '😴' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="parent" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-blue-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full translate-y-1/2"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed! 👋</h1>
              <p className="text-white/80 text-lg">Your children are doing great. Keep monitoring their health!</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">2 Children Protected</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">12 Health Checks Completed</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-white/90 transition-all shadow-lg">
                <Plus className="w-5 h-5" />
                <span>New Symptom Check</span>
              </button>
              <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-white/30 transition-all">
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="flex space-x-4 mb-8">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(index)}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                selectedChild === index 
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                selectedChild === index ? 'bg-white/20' : 'bg-primary-100'
              }`}>
                {child.avatar}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">{child.name}</h3>
                <p className={`text-sm ${selectedChild === index ? 'text-white/80' : 'text-gray-500'}`}>
                  {child.age}
                </p>
              </div>
              <div className={`text-right ml-4 ${selectedChild === index ? 'text-white/80' : 'text-gray-500'}`}>
                <div className="flex items-center space-x-1">
                  <Heart className={`w-4 h-4 ${selectedChild === index ? 'text-red-300' : 'text-red-500'}`} />
                  <span className="font-semibold">{child.healthScore}%</span>
                </div>
                <p className="text-xs">Health Score</p>
              </div>
            </button>
          ))}
          <button className="flex items-center justify-center w-14 h-full bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Stethoscope} 
            title="Total Checkups" 
            value="12" 
            change="+3 this month"
            changeType="positive"
            color="blue" 
          />
          <StatCard 
            icon={Calendar} 
            title="Appointments" 
            value="2" 
            subtitle="Upcoming"
            color="green" 
          />
          <StatCard 
            icon={CheckCircle} 
            title="Home Care Cases" 
            value="8" 
            color="emerald" 
          />
          <StatCard 
            icon={AlertTriangle} 
            title="Alerts" 
            value="0" 
            subtitle="All clear!"
            color="orange" 
          />
        </div>

        {/* Quick Symptom Input */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Symptom Check</h2>
          <p className="text-gray-500 mb-6">Describe your child's symptoms using any method you prefer</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all group border border-blue-200">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Type className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">Type Symptoms</h3>
                <p className="text-sm text-gray-500">Describe in text</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all group border border-green-200">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">Voice Input</h3>
                <p className="text-sm text-gray-500">Speak symptoms (EN/UR)</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:from-purple-100 hover:to-purple-200 transition-all group border border-purple-200">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800">Upload Photo</h3>
                <p className="text-sm text-gray-500">Rash, injury, etc.</p>
              </div>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Triage History */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent AI Triage History</h2>
                <button className="text-primary-600 font-medium hover:text-primary-700 flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTriages.map((triage) => (
                  <div key={triage.id} className="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          triage.result === 'Home Care' ? 'bg-green-100' :
                          triage.result === 'GP Visit' ? 'bg-orange-100' : 'bg-red-100'
                        }`}>
                          {triage.result === 'Home Care' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : triage.result === 'GP Visit' ? (
                            <Clock className="w-6 h-6 text-orange-600" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800">{triage.child}</h4>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              triage.result === 'Home Care' ? 'bg-green-100 text-green-700' :
                              triage.result === 'GP Visit' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {triage.result}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{triage.symptoms}</p>
                          <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                            <Stethoscope className="w-4 h-4" />
                            <span>{triage.recommendation}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{triage.date}</p>
                        <button className="text-primary-600 text-sm font-medium mt-2 hover:text-primary-700">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Timeline Chart */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Health Check Timeline</h2>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={healthHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="checkups" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Triage Distribution */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Triage Results Overview</h2>
              <div className="flex justify-center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={triageHistory}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {triageHistory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {triageHistory.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                <button className="text-primary-600 hover:text-primary-700">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{apt.doctor}</h4>
                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span className="text-sm text-gray-600">{apt.date}, {apt.time}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.type === 'Teleconsult' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {apt.type === 'Teleconsult' ? <Video className="w-3 h-3 inline mr-1" /> : null}
                        {apt.type}
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="flex-1 py-2 text-center text-primary-600 font-medium bg-white rounded-lg hover:bg-primary-50 transition-colors text-sm">
                        Reschedule
                      </button>
                      <button className="flex-1 py-2 text-center text-white font-medium bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors text-sm">
                        {apt.type === 'Teleconsult' ? 'Join Call' : 'Get Directions'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Health Tips</h2>
                <BookOpen className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {healthTips.map((tip) => (
                  <div key={tip.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Emergency?</h2>
                  <p className="text-white/80 text-sm">Call your doctor immediately</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Emergency: 115</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Doctor Summaries Access */}
        <div className="mt-8 card bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Doctor-Ready Summaries</h2>
                <p className="text-gray-400">View AI-generated health reports to share with your pediatrician</p>
              </div>
            </div>
            <button className="bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <span>View Reports</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ParentDashboard