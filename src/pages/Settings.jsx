// pages/Settings.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  Settings as SettingsIcon, Bell, Lock, Globe, Moon, Sun,
  User, Shield, Smartphone, Mail, Eye, EyeOff, Save,
  ChevronRight, ToggleLeft, ToggleRight, Palette, Volume2,
  Database, Trash2, Download, HelpCircle, LogOut
} from 'lucide-react'

const Settings = ({ userType = 'parent' }) => {
  const [activeSection, setActiveSection] = useState('general')
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    triageAlerts: true,
    appointmentReminders: true,
    newsletter: false
  })

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Database },
  ]

  const Toggle = ({ enabled, onChange }) => (
    <button onClick={() => onChange(!enabled)} className="focus:outline-none">
      {enabled ? (
        <ToggleRight className="w-10 h-6 text-primary-500" />
      ) : (
        <ToggleLeft className="w-10 h-6 text-gray-300" />
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType={userType} />
      
      <main className="ml-64 pt-20 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences</p>
        </div>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div className="w-64 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === section.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">Email Address</h4>
                      <p className="text-sm text-gray-500">ahmed.khan@email.com</p>
                    </div>
                    <button className="text-primary-600 font-medium hover:text-primary-700">Change</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">Phone Number</h4>
                      <p className="text-sm text-gray-500">+92 300 1234567</p>
                    </div>
                    <button className="text-primary-600 font-medium hover:text-primary-700">Change</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">Time Zone</h4>
                      <p className="text-sm text-gray-500">Pakistan Standard Time (PKT)</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>PKT (UTC+5)</option>
                      <option>IST (UTC+5:30)</option>
                      <option>GMT (UTC+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                    </div>
                    <Toggle enabled={notifications.email} onChange={(v) => setNotifications({...notifications, email: v})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                        <p className="text-sm text-gray-500">Receive SMS alerts</p>
                      </div>
                    </div>
                    <Toggle enabled={notifications.sms} onChange={(v) => setNotifications({...notifications, sms: v})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">Push Notifications</h4>
                        <p className="text-sm text-gray-500">Browser & mobile push alerts</p>
                      </div>
                    </div>
                    <Toggle enabled={notifications.push} onChange={(v) => setNotifications({...notifications, push: v})} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-800">AI Triage Alerts</h4>
                        <p className="text-sm text-gray-500">Get notified about triage results</p>
                      </div>
                    </div>
                    <Toggle enabled={notifications.triageAlerts} onChange={(v) => setNotifications({...notifications, triageAlerts: v})} />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy & Security</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">Change Password</h4>
                          <p className="text-sm text-gray-500">Update your account password</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Add extra security to your account</p>
                        </div>
                      </div>
                      <Toggle enabled={false} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">Profile Visibility</h4>
                          <p className="text-sm text-gray-500">Control who can see your profile</p>
                        </div>
                      </div>
                      <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option>Doctors Only</option>
                        <option>Everyone</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Language Settings */}
            {activeSection === 'language' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Language & Region</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Language</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setLanguage('en')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          language === 'en' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">🇬🇧</span>
                        <p className="font-medium mt-2">English</p>
                      </button>
                      <button
                        onClick={() => setLanguage('ur')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          language === 'ur' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">🇵🇰</span>
                        <p className="font-medium mt-2">اردو (Urdu)</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Appearance</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`p-4 rounded-xl border-2 flex items-center space-x-3 transition-all ${
                          !darkMode ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}
                      >
                        <Sun className="w-6 h-6 text-yellow-500" />
                        <span className="font-medium">Light Mode</span>
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={`p-4 rounded-xl border-2 flex items-center space-x-3 transition-all ${
                          darkMode ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}
                      >
                        <Moon className="w-6 h-6 text-indigo-500" />
                        <span className="font-medium">Dark Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeSection === 'data' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Data Management</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <h4 className="font-medium text-gray-800">Download My Data</h4>
                          <p className="text-sm text-gray-500">Export all your health records</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <div className="text-left">
                          <h4 className="font-medium text-red-700">Delete Account</h4>
                          <p className="text-sm text-red-500">Permanently delete your account</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <button className="mt-6 w-full py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2">
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings