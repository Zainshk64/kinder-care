// App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'

// Parent Pages
import ParentDashboard from './pages/ParentDashboard'
import AITriage from './pages/AITriage'

// Doctor Pages
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorPatients from './pages/doctor/DoctorPatients'
import DoctorTriageReviews from './pages/doctor/DoctorTriageReviews'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminAnalytics from './pages/admin/AdminAnalytics'

// Shared Pages
import Profile from './pages/Profile'
import Appointments from './pages/Appointments'
import HealthRecords from './pages/HealthRecords'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import HelpSupport from './pages/HelpSupport'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Parent Routes */}
      <Route path="/parent-dashboard" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
      <Route path="/ai-triage" element={<ProtectedRoute><AITriage /></ProtectedRoute>} />
      
      {/* Doctor Routes */}
      <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/patients" element={<ProtectedRoute><DoctorPatients /></ProtectedRoute>} />
      <Route path="/doctor/triage-reviews" element={<ProtectedRoute><DoctorTriageReviews /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute><AdminDoctors /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
      
      {/* Shared Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
      <Route path="/health-records" element={<ProtectedRoute><HealthRecords /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
    </Routes>
  )
}

export default App