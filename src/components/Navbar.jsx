import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Menu, X, Baby, Home, Info, Phone, LogIn, UserPlus, 
  LogOut, User, LayoutDashboard, Stethoscope 
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
              <Baby className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                KinderCare
              </span>
              <span className="text-sm font-medium text-gray-500 block -mt-1">AI Assistant</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/ai-triage" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  <Stethoscope className="w-4 h-4" />
                  <span>AI Triage</span>
                </Link>
                <Link to="/parent-dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 btn-primary text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center space-x-2 btn-outline text-sm">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center space-x-2 btn-primary text-sm">
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                <Home className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Home</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                <Info className="w-5 h-5 text-primary-500" />
                <span className="font-medium">About</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="font-medium">Contact</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/ai-triage" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    <Stethoscope className="w-5 h-5 text-primary-500" />
                    <span className="font-medium">AI Triage</span>
                  </Link>
                  <Link to="/parent-dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-primary-500" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                  <Link to="/login" className="btn-outline text-center">Login</Link>
                  <Link to="/register" className="btn-primary text-center">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar