// pages/admin/AdminAnalytics.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Activity,
  Calendar, Download, Filter, RefreshCw, Target, Award,
  Clock, CheckCircle, AlertTriangle, Stethoscope, Baby,
  Globe, Smartphone, Monitor, PieChart as PieChartIcon
} from 'lucide-react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, ComposedChart, Legend, RadialBarChart, RadialBar
} from 'recharts'

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('7days')
  const [activeMetric, setActiveMetric] = useState('triages')

  // User Growth Data
  const userGrowthData = [
    { month: 'Jan', users: 520, doctors: 12 },
    { month: 'Feb', users: 680, doctors: 18 },
    { month: 'Mar', users: 890, doctors: 25 },
    { month: 'Apr', users: 1050, doctors: 32 },
    { month: 'May', users: 1180, doctors: 38 },
    { month: 'Jun', users: 1248, doctors: 45 },
  ]

  // Daily Triages Data
  const dailyTriagesData = [
    { day: 'Mon', homeCare: 45, gpVisit: 23, emergency: 5, total: 73 },
    { day: 'Tue', homeCare: 52, gpVisit: 28, emergency: 3, total: 83 },
    { day: 'Wed', homeCare: 48, gpVisit: 31, emergency: 7, total: 86 },
    { day: 'Thu', homeCare: 61, gpVisit: 25, emergency: 4, total: 90 },
    { day: 'Fri', homeCare: 55, gpVisit: 29, emergency: 6, total: 90 },
    { day: 'Sat', homeCare: 38, gpVisit: 18, emergency: 2, total: 58 },
    { day: 'Sun', homeCare: 25, gpVisit: 12, emergency: 1, total: 38 },
  ]

  // Triage Distribution
  const triageDistribution = [
    { name: 'Home Care', value: 65, color: '#22c55e' },
    { name: 'GP Visit', value: 28, color: '#f59e0b' },
    { name: 'Emergency', value: 7, color: '#ef4444' },
  ]

  // Top Symptoms
  const topSymptoms = [
    { symptom: 'Fever', count: 456, percentage: 28 },
    { symptom: 'Cough', count: 389, percentage: 24 },
    { symptom: 'Stomach Pain', count: 267, percentage: 16 },
    { symptom: 'Runny Nose', count: 234, percentage: 14 },
    { symptom: 'Rash', count: 178, percentage: 11 },
    { symptom: 'Vomiting', count: 112, percentage: 7 },
  ]

  // Age Group Distribution
  const ageGroupData = [
    { age: '0-1 yr', children: 234, fill: '#3b82f6' },
    { age: '1-3 yr', children: 456, fill: '#8b5cf6' },
    { age: '3-5 yr', children: 389, fill: '#ec4899' },
    { age: '5-10 yr', children: 312, fill: '#f59e0b' },
    { age: '10+ yr', children: 156, fill: '#22c55e' },
  ]

  // Hourly Usage
  const hourlyUsage = [
    { hour: '6AM', usage: 12 },
    { hour: '8AM', usage: 45 },
    { hour: '10AM', usage: 78 },
    { hour: '12PM', usage: 65 },
    { hour: '2PM', usage: 82 },
    { hour: '4PM', usage: 95 },
    { hour: '6PM', usage: 88 },
    { hour: '8PM', usage: 72 },
    { hour: '10PM', usage: 45 },
    { hour: '12AM', usage: 15 },
  ]

  // AI Performance
  const aiPerformance = [
    { name: 'Accuracy', value: 94.5, fill: '#22c55e' },
    { name: 'Verification', value: 89, fill: '#3b82f6' },
    { name: 'Satisfaction', value: 92, fill: '#8b5cf6' },
  ]

  // Device Usage
  const deviceUsage = [
    { name: 'Mobile', value: 68, color: '#3b82f6' },
    { name: 'Desktop', value: 24, color: '#8b5cf6' },
    { name: 'Tablet', value: 8, color: '#22c55e' },
  ]

  // Location Data
  const locationData = [
    { city: 'Rawalpindi', users: 342, percentage: 27 },
    { city: 'Islamabad', users: 289, percentage: 23 },
    { city: 'Lahore', users: 234, percentage: 19 },
    { city: 'Karachi', users: 198, percentage: 16 },
    { city: 'Others', users: 185, percentage: 15 },
  ]

  const stats = [
    { label: 'Total Triages', value: '3,567', change: '+12.5%', trend: 'up', icon: Activity },
    { label: 'Avg Response Time', value: '1.2s', change: '-0.3s', trend: 'up', icon: Clock },
    { label: 'User Satisfaction', value: '92%', change: '+2%', trend: 'up', icon: Award },
    { label: 'Emergency Cases', value: '89', change: '-5%', trend: 'up', icon: AlertTriangle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="admin" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Comprehensive insights and AI performance metrics</p>
          </div>
          <div className="flex space-x-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-500" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-1 flex items-center space-x-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{stat.change}</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Triages Chart */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Daily Triage Distribution</h2>
              <div className="flex space-x-2">
                {['triages', 'users', 'doctors'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setActiveMetric(metric)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      activeMetric === metric
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={dailyTriagesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="homeCare" fill="#22c55e" name="Home Care" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gpVisit" fill="#f59e0b" name="GP Visit" radius={[4, 4, 0, 0]} />
                <Bar dataKey="emergency" fill="#ef4444" name="Emergency" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Triage Distribution Pie */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Triage Categories</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
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
              </PieChart>
            </ResponsiveContainer>
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
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* User Growth */}
          <div className="lg:col-span-2 card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">User Growth Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Parents" />
                <Area type="monotone" dataKey="doctors" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Doctors" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Performance */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">AI Performance</h2>
            <div className="space-y-6">
              {aiPerformance.map((metric) => (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.name}</span>
                    <span className="font-bold text-gray-800">{metric.value}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${metric.value}%`, backgroundColor: metric.fill }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">All metrics within target</span>
              </div>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Top Symptoms */}
          <div className="lg:col-span-2 card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Reported Symptoms</h2>
            <div className="space-y-4">
              {topSymptoms.map((item, index) => (
                <div key={item.symptom}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      {index + 1}. {item.symptom}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{item.count} cases</span>
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

          {/* Age Distribution */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Age Groups</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageGroupData} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="age" type="category" stroke="#94a3b8" width={60} />
                <Tooltip />
                <Bar dataKey="children" radius={[0, 8, 8, 0]}>
                  {ageGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Device Usage */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Device Usage</h2>
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={deviceUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {deviceUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {deviceUsage.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fourth Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hourly Usage */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Peak Usage Hours</h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#8b5cf6" 
                  fill="url(#colorUsage)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-500 text-center mt-4">
              Peak usage at <strong>4:00 PM</strong> with 95 active sessions
            </p>
          </div>

          {/* Location Distribution */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">User Locations</h2>
            <div className="space-y-4">
              {locationData.map((item, index) => (
                <div key={item.city} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{item.city}</span>
                      <span className="text-sm text-gray-500">{item.users} users</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${item.percentage * 3}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.percentage}%</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-center space-x-3">
              <Globe className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Expanding Coverage</p>
                <p className="text-sm text-blue-700">Active in 5 major cities across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminAnalytics