// pages/AdminDashboard.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { 
  Users, UserCheck, UserPlus, Activity, Shield, Server,
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown,
  Settings, Bell, Database, Cpu, HardDrive, Wifi,
  Eye, Edit2, Trash2, Search, Filter, Download,
  Mail, Phone, Calendar, MapPin, MoreVertical,
  BarChart3, PieChart, FileText, RefreshCw, Power,
  Lock, Unlock, ChevronRight, ChevronDown, Plus,
  MessageSquare, Stethoscope, Baby, Building2, Globe
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, 
  Pie, Cell, AreaChart, Area 
} from 'recharts'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserType, setSelectedUserType] = useState('all')
  const [showUserModal, setShowUserModal] = useState(false)

  // Statistics Data
  const systemStats = {
    totalUsers: 1248,
    activeUsers: 892,
    totalDoctors: 45,
    totalTriages: 3567,
    systemUptime: '99.9%',
    avgResponseTime: '1.2s'
  }

  // User Growth Data
  const userGrowthData = [
    { month: 'Jan', parents: 120, doctors: 5 },
    { month: 'Feb', parents: 180, doctors: 8 },
    { month: 'Mar', parents: 250, doctors: 12 },
    { month: 'Apr', parents: 320, doctors: 18 },
    { month: 'May', parents: 450, doctors: 25 },
    { month: 'Jun', parents: 580, doctors: 35 },
  ]

  // Triage Analytics Data
  const triageAnalytics = [
    { name: 'Mon', homeCare: 45, gpVisit: 23, emergency: 5 },
    { name: 'Tue', homeCare: 52, gpVisit: 28, emergency: 3 },
    { name: 'Wed', homeCare: 48, gpVisit: 31, emergency: 7 },
    { name: 'Thu', homeCare: 61, gpVisit: 25, emergency: 4 },
    { name: 'Fri', homeCare: 55, gpVisit: 29, emergency: 6 },
    { name: 'Sat', homeCare: 38, gpVisit: 18, emergency: 2 },
    { name: 'Sun', homeCare: 25, gpVisit: 12, emergency: 1 },
  ]

  // Triage Distribution
  const triageDistribution = [
    { name: 'Home Care', value: 65, color: '#22c55e' },
    { name: 'GP Visit', value: 28, color: '#f59e0b' },
    { name: 'Emergency', value: 7, color: '#ef4444' },
  ]

  // System Performance Data
  const systemPerformance = [
    { time: '00:00', cpu: 45, memory: 62, requests: 120 },
    { time: '04:00', cpu: 32, memory: 58, requests: 80 },
    { time: '08:00', cpu: 68, memory: 75, requests: 350 },
    { time: '12:00', cpu: 82, memory: 85, requests: 520 },
    { time: '16:00', cpu: 75, memory: 80, requests: 480 },
    { time: '20:00', cpu: 58, memory: 70, requests: 280 },
  ]

  // Users List
  const users = [
    { id: 1, name: 'Ahmed Khan', email: 'ahmed@email.com', role: 'parent', status: 'active', children: 2, lastActive: '2 mins ago', avatar: '👨' },
    { id: 2, name: 'Dr. Ayesha Malik', email: 'ayesha@clinic.com', role: 'doctor', status: 'active', specialty: 'Pediatrics', lastActive: '5 mins ago', avatar: '👩‍⚕️' },
    { id: 3, name: 'Fatima Ali', email: 'fatima@email.com', role: 'parent', status: 'active', children: 1, lastActive: '1 hour ago', avatar: '👩' },
    { id: 4, name: 'Dr. Imran Raza', email: 'imran@hospital.com', role: 'doctor', status: 'inactive', specialty: 'General', lastActive: '2 days ago', avatar: '👨‍⚕️' },
    { id: 5, name: 'Zainab Hassan', email: 'zainab@email.com', role: 'parent', status: 'active', children: 3, lastActive: '30 mins ago', avatar: '👩' },
    { id: 6, name: 'Dr. Sara Khan', email: 'sara@clinic.com', role: 'doctor', status: 'active', specialty: 'Pediatrics', lastActive: 'Just now', avatar: '👩‍⚕️' },
  ]

  // Doctors List
  const doctors = [
    { id: 1, name: 'Dr. Ayesha Malik', specialty: 'Pediatrics', patients: 156, rating: 4.9, status: 'online', availability: 'Available' },
    { id: 2, name: 'Dr. Imran Raza', specialty: 'General Physician', patients: 89, rating: 4.7, status: 'offline', availability: 'Busy' },
    { id: 3, name: 'Dr. Sara Khan', specialty: 'Pediatrics', patients: 124, rating: 4.8, status: 'online', availability: 'Available' },
    { id: 4, name: 'Dr. Hassan Ali', specialty: 'Child Specialist', patients: 201, rating: 4.9, status: 'online', availability: 'In Consultation' },
  ]

  // Recent Activity Logs
  const activityLogs = [
    { id: 1, action: 'New user registered', user: 'Zara Malik', type: 'user', time: '2 mins ago', icon: UserPlus },
    { id: 2, action: 'AI Triage completed', user: 'Ahmed Khan', type: 'triage', time: '5 mins ago', icon: Activity },
    { id: 3, action: 'Doctor login', user: 'Dr. Ayesha', type: 'auth', time: '10 mins ago', icon: UserCheck },
    { id: 4, action: 'Emergency alert flagged', user: 'System', type: 'alert', time: '15 mins ago', icon: AlertTriangle },
    { id: 5, action: 'Teleconsultation started', user: 'Dr. Sara', type: 'consult', time: '20 mins ago', icon: Stethoscope },
    { id: 6, action: 'Report downloaded', user: 'Admin', type: 'report', time: '25 mins ago', icon: Download },
  ]

  // System Alerts
  const systemAlerts = [
    { id: 1, message: 'High CPU usage detected', severity: 'warning', time: '10 mins ago' },
    { id: 2, message: 'Database backup completed', severity: 'success', time: '1 hour ago' },
    { id: 3, message: 'New security patch available', severity: 'info', time: '3 hours ago' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'doctors', label: 'Doctor Management', icon: Stethoscope },
    { id: 'analytics', label: 'AI Analytics', icon: PieChart },
    { id: 'system', label: 'System Health', icon: Server },
    { id: 'logs', label: 'Activity Logs', icon: FileText },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedUserType === 'all' || user.role === selectedUserType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Sidebar userType="admin" />
      
      <main className="ml-64  p-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full translate-y-1/2"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-gray-400">KinderCare AI System Management</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">System Online</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Last updated: Just now</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              <button className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors">
                <RefreshCw className="w-5 h-5" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-2xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                icon={Users} 
                title="Total Users" 
                value={systemStats.totalUsers.toLocaleString()} 
                change="+124 this month"
                changeType="positive"
                color="blue" 
              />
              <StatCard 
                icon={UserCheck} 
                title="Active Users" 
                value={systemStats.activeUsers.toLocaleString()} 
                change="71% active rate"
                changeType="positive"
                color="green" 
              />
              <StatCard 
                icon={Stethoscope} 
                title="Registered Doctors" 
                value={systemStats.totalDoctors} 
                change="+5 this month"
                changeType="positive"
                color="purple" 
              />
              <StatCard 
                icon={Activity} 
                title="Total Triages" 
                value={systemStats.totalTriages.toLocaleString()} 
                change="+456 this week"
                changeType="positive"
                color="orange" 
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">System Uptime</p>
                    <h3 className="text-3xl font-bold mt-1">{systemStats.systemUptime}</h3>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Server className="w-7 h-7" />
                  </div>
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Avg Response Time</p>
                    <h3 className="text-3xl font-bold mt-1">{systemStats.avgResponseTime}</h3>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Clock className="w-7 h-7" />
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Today's Triages</p>
                    <h3 className="text-3xl font-bold mt-1">89</h3>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Activity className="w-7 h-7" />
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-orange-500 to-red-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Emergency Alerts</p>
                    <h3 className="text-3xl font-bold mt-1">3</h3>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* User Growth Chart */}
              <div className="lg:col-span-2 card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">User Growth</h2>
                  <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="parents" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="Parents"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="doctors" 
                      stackId="1"
                      stroke="#22c55e" 
                      fill="#22c55e"
                      fillOpacity={0.6}
                      name="Doctors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Parents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Doctors</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {activityLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        log.type === 'alert' ? 'bg-red-100' :
                        log.type === 'user' ? 'bg-blue-100' :
                        log.type === 'triage' ? 'bg-green-100' :
                        log.type === 'auth' ? 'bg-purple-100' :
                        'bg-gray-100'
                      }`}>
                        <log.icon className={`w-5 h-5 ${
                          log.type === 'alert' ? 'text-red-600' :
                          log.type === 'user' ? 'text-blue-600' :
                          log.type === 'triage' ? 'text-green-600' :
                          log.type === 'auth' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.user} • {log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 text-center text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors">
                  View All Activity
                </button>
              </div>
            </div>

            {/* Triage Analytics & System Alerts */}
            <div className="grid lg:grid-cols-3 gap-8 mt-8">
              {/* Weekly Triage Chart */}
              <div className="lg:col-span-2 card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Triage Distribution</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={triageAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="homeCare" fill="#22c55e" name="Home Care" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="gpVisit" fill="#f59e0b" name="GP Visit" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="emergency" fill="#ef4444" name="Emergency" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* System Alerts */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">System Alerts</h2>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-xl ${
                      alert.severity === 'warning' ? 'bg-orange-50 border border-orange-200' :
                      alert.severity === 'success' ? 'bg-green-50 border border-green-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          alert.severity === 'warning' ? 'bg-orange-100' :
                          alert.severity === 'success' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          {alert.severity === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                          ) : alert.severity === 'success' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Bell className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 w-80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Users</option>
                    <option value="parent">Parents</option>
                    <option value="doctor">Doctors</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span>More Filters</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Export</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">User</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Details</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Last Active</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{user.name}</h4>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          user.role === 'doctor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {user.role === 'parent' ? `${user.children} Children` : user.specialty}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`flex items-center space-x-1 text-sm ${
                          user.status === 'active' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{user.lastActive}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Showing 1-6 of {filteredUsers.length} users</p>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">1</button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">2</button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">3</button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Management Tab */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
              <button className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                <Plus className="w-5 h-5" />
                <span>Add Doctor</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                      {doctor.name.includes('Ayesha') || doctor.name.includes('Sara') ? '👩‍⚕️' : '👨‍⚕️'}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {doctor.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{doctor.specialty}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-center mb-4">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-lg font-bold text-gray-800">{doctor.patients}</p>
                      <p className="text-xs text-gray-500">Patients</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-lg font-bold text-gray-800">⭐ {doctor.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>

                  <div className={`text-center py-2 rounded-xl text-sm font-medium ${
                    doctor.availability === 'Available' ? 'bg-green-100 text-green-700' :
                    doctor.availability === 'Busy' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {doctor.availability}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 py-2 text-center text-primary-600 font-medium bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="py-2 px-3 text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Doctor Schedule Management */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Availability Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Mon</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Tue</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Wed</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Thu</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Fri</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Sat</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-medium text-gray-800">{doctor.name}</td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <X className="w-4 h-4 text-red-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-4 h-4 text-orange-600" />
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <X className="w-4 h-4 text-red-600" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Triage Distribution Pie Chart */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Triage Distribution</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width={220} height={220}>
                    <RechartsPie>
                      <Pie
                        data={triageDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {triageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                  {triageDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Accuracy Stats */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-6">AI Performance</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Model Accuracy</span>
                      <span className="font-semibold text-gray-800">94.5%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '94.5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Doctor Verification Rate</span>
                      <span className="font-semibold text-gray-800">89%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">User Satisfaction</span>
                      <span className="font-semibold text-gray-800">92%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">False Positive Rate</span>
                      <span className="font-semibold text-gray-800">3.2%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '3.2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Symptoms */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Top Reported Symptoms</h3>
                <div className="space-y-4">
                  {[
                    { symptom: 'Fever', count: 234, percentage: 28 },
                    { symptom: 'Cough', count: 189, percentage: 22 },
                    { symptom: 'Stomach Pain', count: 156, percentage: 18 },
                    { symptom: 'Runny Nose', count: 134, percentage: 16 },
                    { symptom: 'Rash', count: 98, percentage: 12 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{item.symptom}</span>
                        <span className="text-sm text-gray-800">{item.count} cases</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full" 
                          style={{ width: `${item.percentage * 3}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Triage Trend Analysis</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">Weekly</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Monthly</button>
                  <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Yearly</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={triageAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="homeCare" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} name="Home Care" />
                  <Line type="monotone" dataKey="gpVisit" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="GP Visit" />
                  <Line type="monotone" dataKey="emergency" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Emergency" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            {/* System Status Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">Normal</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">65%</h4>
                <p className="text-sm text-gray-500">CPU Usage</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-blue-600 text-sm font-medium">Good</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">72%</h4>
                <p className="text-sm text-gray-500">Memory Usage</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-purple-600 text-sm font-medium">Healthy</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">45 GB</h4>
                <p className="text-sm text-gray-500">Storage Used</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">Active</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">24ms</h4>
                <p className="text-sm text-gray-500">API Latency</p>
              </div>
            </div>

            {/* System Performance Chart */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-6">System Performance (24 Hours)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={systemPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="CPU %" />
                  <Area type="monotone" dataKey="memory" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Memory %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Service Status */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Service Status</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'AI Triage Engine', status: 'operational', uptime: '99.99%' },
                  { name: 'MongoDB Database', status: 'operational', uptime: '99.95%' },
                  { name: 'PostgreSQL Database', status: 'operational', uptime: '99.98%' },
                  { name: 'Authentication Service', status: 'operational', uptime: '100%' },
                  { name: 'WhatsApp API', status: 'operational', uptime: '99.90%' },
                  { name: 'Twilio SMS Service', status: 'maintenance', uptime: '99.85%' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="font-medium text-gray-800">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium capitalize ${
                        service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'
                      }`}>{service.status}</span>
                      <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">System Activity Logs</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
                    <option>All Activities</option>
                    <option>User Actions</option>
                    <option>AI Triages</option>
                    <option>System Events</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Export Logs</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {activityLogs.concat(activityLogs).map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        log.type === 'alert' ? 'bg-red-100' :
                        log.type === 'user' ? 'bg-blue-100' :
                        log.type === 'triage' ? 'bg-green-100' :
                        log.type === 'auth' ? 'bg-purple-100' :
                        'bg-gray-100'
                      }`}>
                        <log.icon className={`w-5 h-5 ${
                          log.type === 'alert' ? 'text-red-600' :
                          log.type === 'user' ? 'text-blue-600' :
                          log.type === 'triage' ? 'text-green-600' :
                          log.type === 'auth' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{log.action}</p>
                        <p className="text-sm text-gray-500">By: {log.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{log.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        log.type === 'alert' ? 'bg-red-100 text-red-600' :
                        log.type === 'user' ? 'bg-blue-100 text-blue-600' :
                        log.type === 'triage' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <button className="w-full mt-6 py-3 text-center text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors border border-primary-200">
                Load More Logs
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Missing X icon import - add this at the top
const X = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

export default AdminDashboard