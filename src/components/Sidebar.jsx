// components/Sidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'  // ← add this
import { 
  LayoutDashboard, Stethoscope, Calendar, FileText, 
  Settings, HelpCircle, Users, BarChart3, Bell, Baby,
  Activity, Heart, MessageSquare, Shield, LogOut,
  ClipboardList, UserCog, PieChart
} from 'lucide-react'

const Sidebar = () => {
  const { user, logout: contextLogout } = useAuth()   // ← get real user + logout
  const location = useLocation()
  const navigate = useNavigate()

  // Use real role from auth context / localStorage
  const userType = user?.role || user?.userType || 'parent'   // fallback

  const parentMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/parent-dashboard' },
    { icon: Activity, label: 'AI Triage', path: '/ai-triage' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: FileText, label: 'Health Records', path: '/health-records' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ]

  const doctorMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor-dashboard' },
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: ClipboardList, label: 'Triage Reviews', path: '/doctor/triage-reviews' },
    { icon: FileText, label: 'Health Records', path: '/health-records' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ]

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Stethoscope, label: 'Doctors', path: '/admin/doctors' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const menuItems = userType === 'parent' 
    ? parentMenuItems 
    : userType === 'doctor' 
    ? doctorMenuItems 
    : adminMenuItems

  // Get user display info based on real role
  const getUserInfo = () => {
    switch(userType) {
      case 'parent':
        return { icon: Baby, title: 'Parent Portal', color: 'from-primary-500 to-primary-600' }
      case 'doctor':
        return { icon: Stethoscope, title: 'Doctor Portal', color: 'from-green-500 to-green-600' }
      case 'admin':
        return { icon: Shield, title: 'Admin Portal', color: 'from-purple-500 to-purple-600' }
      default:
        return { icon: Baby, title: 'Welcome', color: 'from-primary-500 to-primary-600' }
    }
  }

  const userInfo = getUserInfo()
  const UserIcon = userInfo.icon

  // Real logout handler
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    contextLogout()           // clear context state
    navigate('/login')        // redirect
  }

  // If no user → maybe show loading or redirect, but for now we render safely
  if (!user && !localStorage.getItem('token')) {
    // Optional: could redirect here, but let's keep sidebar renderable
    // navigate('/login')
  }

  return (
    <aside className="fixed left-0  h-[calc(100vh-80px)] w-64 bg-white border-r border-gray-100 shadow-sm z-40">
      <div className="flex flex-col h-full p-4">
        {/* User Info - now with real name */}
        <div className={`bg-gradient-to-br ${userInfo.color} rounded-2xl p-4 mb-6`}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {user?.fullName ? `Hi, ${user.fullName}` : 'Welcome Back!'}
              </h3>
              <p className="text-sm text-white/80">{userInfo.title}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {item.label === 'Notifications' && (
                  <span className={`ml-auto w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                    isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                  }`}>
                    3
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Quick Actions for Parent */}
        {userType === 'parent' && (
          <Link 
            to="/ai-triage"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl mb-4 hover:shadow-lg hover:shadow-green-500/30 transition-all"
          >
            <Activity className="w-5 h-5" />
            <span className="font-semibold">Quick Symptom Check</span>
          </Link>
        )}

        {/* Quick Actions for Doctor */}
        {userType === 'doctor' && (
          <Link 
            to="/doctor/triage-reviews"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl mb-4 hover:shadow-lg hover:shadow-green-500/30 transition-all"
          >
            <ClipboardList className="w-5 h-5" />
            <span className="font-semibold">Review Triages</span>
          </Link>
        )}

        {/* Help Card */}
        {userType !== 'admin' && (
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-4 text-white">
            <h4 className="font-semibold mb-2">Need Help?</h4>
            <p className="text-sm text-white/80 mb-3">
              Our support team is here to help you 24/7.
            </p>
            <Link 
              to="/help"
              className="block w-full bg-white text-secondary-600 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Get Support
            </Link>
          </div>
        )}

        {/* Admin System Status */}
        {userType === 'admin' && (
          <div className="bg-gray-900 rounded-2xl p-4 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Status</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="text-green-400">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Users</span>
                <span className="text-white">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Today's Triages</span>
                <span className="text-white">89</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button - now functional */}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 mt-4 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar