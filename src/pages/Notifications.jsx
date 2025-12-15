// pages/Notifications.jsx
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { 
  Bell, Calendar, Activity, MessageSquare, AlertTriangle,
  CheckCircle, Clock, Trash2, MailOpen, Mail, Settings,
  Filter, Search, Check, X, Stethoscope, Syringe, FileText
} from 'lucide-react'

const Notifications = ({ userType = 'parent' }) => {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'triage', title: 'AI Triage Complete', message: 'Ali\'s symptom check result: Home Care recommended', time: '5 mins ago', read: false, priority: 'normal' },
    { id: 2, type: 'appointment', title: 'Appointment Reminder', message: 'Upcoming appointment with Dr. Ayesha tomorrow at 10:00 AM', time: '1 hour ago', read: false, priority: 'high' },
    { id: 3, type: 'vaccination', title: 'Vaccination Due', message: 'Ali\'s DTP booster is due next week', time: '3 hours ago', read: false, priority: 'high' },
    { id: 4, type: 'message', title: 'New Message from Dr. Ayesha', message: 'Your prescription is ready for pickup', time: '5 hours ago', read: true, priority: 'normal' },
    { id: 5, type: 'alert', title: 'Emergency Alert Resolved', message: 'The triage case for Sara has been reviewed', time: '1 day ago', read: true, priority: 'normal' },
    { id: 6, type: 'system', title: 'Profile Updated', message: 'Your profile information has been updated successfully', time: '2 days ago', read: true, priority: 'low' },
  ])

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'triage', label: 'Triages', count: notifications.filter(n => n.type === 'triage').length },
    { id: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'triage': return { icon: Activity, color: 'green' }
      case 'appointment': return { icon: Calendar, color: 'blue' }
      case 'vaccination': return { icon: Syringe, color: 'purple' }
      case 'message': return { icon: MessageSquare, color: 'indigo' }
      case 'alert': return { icon: AlertTriangle, color: 'orange' }
      default: return { icon: Bell, color: 'gray' }
    }
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType={userType} />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-500 mt-1">Stay updated with important alerts</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            >
              <Check className="w-5 h-5" />
              <span>Mark all read</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-500" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="card">
          <div className="space-y-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const { icon: Icon, color } = getIcon(notification.type)
                return (
                  <div 
                    key={notification.id}
                    className={`flex items-start justify-between p-4 rounded-xl transition-all cursor-pointer ${
                      notification.read ? 'bg-white hover:bg-gray-50' : 'bg-primary-50 hover:bg-primary-100'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                          {notification.priority === 'high' && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Important</span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-sm text-gray-400 mt-2 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id) }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600">No notifications</h3>
                <p className="text-gray-400 mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Notifications