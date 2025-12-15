import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { 
  Stethoscope, Calendar, FileText, Bell, Baby, 
  Clock, TrendingUp, Activity, Heart, AlertTriangle,
  CheckCircle, ArrowRight, Video, MessageSquare
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ParentDashboard = () => {
  const [children] = useState([
    { id: 1, name: 'Ali Ahmed', age: '3 years', lastCheckup: '2 days ago', status: 'healthy' },
    { id: 2, name: 'Sara Ahmed', age: '7 years', lastCheckup: '1 week ago', status: 'attention' },
  ])

  const [recentActivities] = useState([
    { id: 1, type: 'triage', title: 'Fever Check - Ali', result: 'Home Care', time: '2 hours ago', color: 'green' },
    { id: 2, type: 'appointment', title: 'Dr. Hassan - Consultation', result: 'Completed', time: 'Yesterday', color: 'blue' },
    { id: 3, type: 'triage', title: 'Cough Symptoms - Sara', result: 'See GP', time: '3 days ago', color: 'orange' },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="parent" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Parent! 👋</h1>
              <p className="text-white/80 text-lg">Monitor your children's health and get AI-powered guidance.</p>
            </div>
            <Link to="/ai-triage" className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
              <Stethoscope className="w-5 h-5" />
              <span>Start AI Triage</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Baby} 
            title="Children" 
            value="2" 
            color="blue" 
          />
          <StatCard 
            icon={Stethoscope} 
            title="Triage Sessions" 
            value="12" 
            change="+3 this week"
            changeType="positive"
            color="green" 
          />
          <StatCard 
            icon={Calendar} 
            title="Appointments" 
            value="3" 
            color="purple" 
          />
          <StatCard 
            icon={Bell} 
            title="Notifications" 
            value="5" 
            color="orange" 
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Children Cards */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Children</h2>
                <button className="text-primary-600 font-medium flex items-center space-x-1 hover:text-primary-700">
                  <span>Add Child</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {children.map((child) => (
                  <div key={child.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        child.status === 'healthy' 
                          ? 'bg-gradient-to-br from-green-400 to-green-500' 
                          : 'bg-gradient-to-br from-orange-400 to-orange-500'
                      } text-white`}>
                        <Baby className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{child.name}</h3>
                        <p className="text-gray-500 text-sm">{child.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Last checkup: {child.lastCheckup}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        child.status === 'healthy' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {child.status === 'healthy' ? 'Healthy' : 'Needs Attention'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/ai-triage" className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-5 text-center hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">AI Triage</span>
                </Link>
                <Link to="/appointments" className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 text-center hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">Book Appointment</span>
                </Link>
                <Link to="/teleconsultation" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-center hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">Teleconsult</span>
                </Link>
                <Link to="/records" className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-center hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">Health Records</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.color === 'green' ? 'bg-green-100' :
                      activity.color === 'blue' ? 'bg-blue-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'triage' ? (
                        <Activity className={`w-5 h-5 ${
                          activity.color === 'green' ? 'text-green-600' :
                          activity.color === 'orange' ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      ) : (
                        <Calendar className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          activity.color === 'green' ? 'bg-green-100 text-green-600' :
                          activity.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {activity.result}
                        </span>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="card bg-gradient-to-br from-primary-500 to-accent-500 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6" />
                <h2 className="text-xl font-bold">Health Tip</h2>
              </div>
              <p className="text-white/90 leading-relaxed mb-4">
                Ensure your child drinks plenty of water during summer. Dehydration can cause fatigue and concentration issues.
              </p>
              <button className="text-white font-medium flex items-center space-x-1 hover:underline">
                <span>View More Tips</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Dr. Ayesha Khan</h4>
                    <p className="text-sm text-gray-500">Pediatrician</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tomorrow, 10:00 AM</span>
                  <button className="text-blue-600 font-medium">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ParentDashboard