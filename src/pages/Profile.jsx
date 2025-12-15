// pages/Profile.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Bell,
  Camera, Edit2, Save, X, Plus, Trash2, Baby,
  Lock, Eye, EyeOff, CheckCircle, AlertTriangle,
  Globe, Moon, Sun, FileText, Download, Settings
} from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [userProfile, setUserProfile] = useState({
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92 300 1234567',
    address: 'Rawalpindi, Pakistan',
    dateJoined: 'January 15, 2025',
    role: 'parent',
    avatar: null,
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      push: true
    }
  })

  const [children, setChildren] = useState([
    { id: 1, name: 'Ali', age: '3 years', gender: 'Male', bloodType: 'O+', allergies: 'None', avatar: '👦' },
    { id: 2, name: 'Sara', age: '5 years', gender: 'Female', bloodType: 'A+', allergies: 'Peanuts', avatar: '👧' },
  ])

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [editingChild, setEditingChild] = useState(null)

  const triageHistory = [
    { id: 1, child: 'Ali', date: 'June 20, 2025', result: 'Home Care', symptoms: 'Mild fever' },
    { id: 2, child: 'Sara', date: 'June 18, 2025', result: 'GP Visit', symptoms: 'Stomach ache' },
    { id: 3, child: 'Ali', date: 'June 15, 2025', result: 'Home Care', symptoms: 'Cough' },
    { id: 4, child: 'Sara', date: 'June 10, 2025', result: 'Home Care', symptoms: 'Runny nose' },
    { id: 5, child: 'Ali', date: 'June 5, 2025', result: 'Emergency', symptoms: 'High fever, difficulty breathing' },
  ]

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'children', label: 'Children', icon: Baby },
    { id: 'history', label: 'Triage History', icon: FileText },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save to backend
    alert('Profile saved successfully!')
  }

  const handleAddChild = () => {
    const newChild = {
      id: Date.now(),
      name: '',
      age: '',
      gender: 'Male',
      bloodType: '',
      allergies: 'None',
      avatar: '👶',
      isNew: true
    }
    setChildren([...children, newChild])
    setEditingChild(newChild.id)
  }

  const handleRemoveChild = (id) => {
    if (confirm('Are you sure you want to remove this child?')) {
      setChildren(children.filter(child => child.id !== id))
    }
  }

  const handleSaveChild = (id) => {
    setChildren(children.map(child => 
      child.id === id ? { ...child, isNew: false } : child
    ))
    setEditingChild(null)
  }

  const handleUpdateChild = (id, field, value) => {
    setChildren(children.map(child =>
      child.id === id ? { ...child, [field]: value } : child
    ))
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!')
      return
    }
    if (passwords.new.length < 8) {
      alert('Password must be at least 8 characters!')
      return
    }
    alert('Password changed successfully!')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="parent" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex items-center space-x-6 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  '👨'
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-white/80">{userProfile.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                  {userProfile.role}
                </span>
                <span className="text-white/60 text-sm">
                  Member since {userProfile.dateJoined}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <X className="w-5 h-5" />
                        <span>Cancel</span>
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Edit2 className="w-5 h-5" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span>{userProfile.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>{userProfile.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium flex items-center space-x-2">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span>{userProfile.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userProfile.address}
                        onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>{userProfile.address}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Email Verified</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Account Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Children Tab */}
            {activeTab === 'children' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Registered Children</h2>
                  <button
                    onClick={handleAddChild}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Child</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {children.map((child) => (
                    <div key={child.id} className="card">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl">
                            {child.avatar}
                          </div>
                          <div>
                            {editingChild === child.id ? (
                              <input
                                type="text"
                                value={child.name}
                                onChange={(e) => handleUpdateChild(child.id, 'name', e.target.value)}
                                placeholder="Child's name"
                                className="text-lg font-bold text-gray-800 border-b border-primary-500 focus:outline-none"
                              />
                            ) : (
                              <h3 className="text-lg font-bold text-gray-800">{child.name || 'New Child'}</h3>
                            )}
                            <p className="text-gray-500">{child.age} • {child.gender}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {editingChild === child.id ? (
                            <button 
                              onClick={() => handleSaveChild(child.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Save className="w-5 h-5" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => setEditingChild(child.id)}
                              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleRemoveChild(child.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          {editingChild === child.id ? (
                            <input
                              type="text"
                              value={child.age}
                              onChange={(e) => handleUpdateChild(child.id, 'age', e.target.value)}
                              className="font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-primary-500 w-full"
                            />
                          ) : (
                            <p className="font-medium text-gray-800">{child.age}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          {editingChild === child.id ? (
                            <select
                              value={child.gender}
                              onChange={(e) => handleUpdateChild(child.id, 'gender', e.target.value)}
                              className="font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-primary-500 w-full bg-transparent"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          ) : (
                            <p className="font-medium text-gray-800">{child.gender}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Blood Type</p>
                          {editingChild === child.id ? (
                            <input
                              type="text"
                              value={child.bloodType}
                              onChange={(e) => handleUpdateChild(child.id, 'bloodType', e.target.value)}
                              className="font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-primary-500 w-full"
                            />
                          ) : (
                            <p className="font-medium text-gray-800">{child.bloodType}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Allergies</p>
                          {editingChild === child.id ? (
                            <input
                              type="text"
                              value={child.allergies}
                              onChange={(e) => handleUpdateChild(child.id, 'allergies', e.target.value)}
                              className="font-medium text-gray-800 border-b border-gray-300 focus:outline-none focus:border-primary-500 w-full"
                            />
                          ) : (
                            <p className="font-medium text-gray-800">{child.allergies}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Triage History Tab */}
            {activeTab === 'history' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Triage History</h2>
                  <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Export All</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Child</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Symptoms</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Result</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {triageHistory.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-4 px-4 text-gray-600">{item.date}</td>
                          <td className="py-4 px-4 text-gray-800 font-medium">{item.child}</td>
                          <td className="py-4 px-4 text-gray-600">{item.symptoms}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.result === 'Home Care' ? 'bg-green-100 text-green-700' :
                              item.result === 'GP Visit' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.result}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-center">
                  <nav className="flex space-x-2">
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">Previous</button>
                    <button className="px-3 py-1 rounded-lg bg-primary-500 text-white">1</button>
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
                    <button className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">Next</button>
                  </nav>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 pr-12"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Two-Factor Authentication</h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">SMS Verification</h3>
                        <p className="text-sm text-gray-500">Add extra security with SMS codes</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="card border-red-200 bg-red-50">
                  <h2 className="text-xl font-bold text-red-800 mb-4">Danger Zone</h2>
                  <p className="text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userProfile.notifications.email}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            notifications: {...userProfile.notifications, email: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Phone className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-800">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Receive updates via SMS</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userProfile.notifications.sms}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            notifications: {...userProfile.notifications, sms: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <Bell className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                          <p className="text-sm text-gray-500">Receive push notifications</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userProfile.notifications.push}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            notifications: {...userProfile.notifications, push: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Language & Region</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Language</label>
                      <select
                        value={userProfile.language}
                        onChange={(e) => setUserProfile({...userProfile, language: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="en">English</option>
                        <option value="ur">اردو (Urdu)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="PKT">Pakistan Standard Time (PKT)</option>
                        <option value="UTC">UTC</option>
                        <option value="GMT">GMT</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Appearance</h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      {darkMode ? <Moon className="w-6 h-6 text-gray-600" /> : <Sun className="w-6 h-6 text-gray-600" />}
                      <div>
                        <h3 className="font-semibold text-gray-800">Dark Mode</h3>
                        <p className="text-sm text-gray-500">Switch to dark theme</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile