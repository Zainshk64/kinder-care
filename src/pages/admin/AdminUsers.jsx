// pages/admin/AdminUsers.jsx
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { 
  Users, Search, Filter, Plus, Download, Upload,
  Eye, Edit2, Trash2, MoreVertical, Mail, Phone,
  MapPin, Calendar, CheckCircle, XCircle, Clock,
  UserPlus, UserCheck, UserX, Shield, ChevronLeft,
  ChevronRight, Baby, AlertTriangle, Ban, Unlock
} from 'lucide-react'

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const users = [
    { 
      id: 1, 
      name: 'Ahmed Khan', 
      email: 'ahmed.khan@email.com', 
      phone: '+92 300 1234567',
      role: 'parent', 
      status: 'active', 
      children: 2, 
      triages: 12,
      joinDate: 'Jan 15, 2025',
      lastActive: '2 mins ago', 
      avatar: '👨',
      address: 'Rawalpindi, Pakistan'
    },
    { 
      id: 2, 
      name: 'Fatima Ali', 
      email: 'fatima.ali@email.com', 
      phone: '+92 301 2345678',
      role: 'parent', 
      status: 'active', 
      children: 1, 
      triages: 8,
      joinDate: 'Feb 20, 2025',
      lastActive: '1 hour ago', 
      avatar: '👩',
      address: 'Islamabad, Pakistan'
    },
    { 
      id: 3, 
      name: 'Zainab Hassan', 
      email: 'zainab.h@email.com', 
      phone: '+92 302 3456789',
      role: 'parent', 
      status: 'active', 
      children: 3, 
      triages: 24,
      joinDate: 'Mar 5, 2025',
      lastActive: '30 mins ago', 
      avatar: '👩',
      address: 'Lahore, Pakistan'
    },
    { 
      id: 4, 
      name: 'Imran Raza', 
      email: 'imran.raza@email.com', 
      phone: '+92 303 4567890',
      role: 'parent', 
      status: 'inactive', 
      children: 1, 
      triages: 3,
      joinDate: 'Apr 10, 2025',
      lastActive: '2 weeks ago', 
      avatar: '👨',
      address: 'Karachi, Pakistan'
    },
    { 
      id: 5, 
      name: 'Sara Malik', 
      email: 'sara.malik@email.com', 
      phone: '+92 304 5678901',
      role: 'parent', 
      status: 'suspended', 
      children: 2, 
      triages: 5,
      joinDate: 'May 1, 2025',
      lastActive: '1 month ago', 
      avatar: '👩',
      address: 'Peshawar, Pakistan'
    },
    { 
      id: 6, 
      name: 'Ali Hassan', 
      email: 'ali.hassan@email.com', 
      phone: '+92 305 6789012',
      role: 'parent', 
      status: 'active', 
      children: 2, 
      triages: 15,
      joinDate: 'May 15, 2025',
      lastActive: '5 mins ago', 
      avatar: '👨',
      address: 'Multan, Pakistan'
    },
    { 
      id: 7, 
      name: 'Ayesha Begum', 
      email: 'ayesha.b@email.com', 
      phone: '+92 306 7890123',
      role: 'parent', 
      status: 'pending', 
      children: 1, 
      triages: 0,
      joinDate: 'Jun 20, 2025',
      lastActive: 'Never', 
      avatar: '👩',
      address: 'Faisalabad, Pakistan'
    },
  ]

  const stats = [
    { label: 'Total Parents', value: '1,248', change: '+124', icon: Users, color: 'blue' },
    { label: 'Active Users', value: '892', change: '+45', icon: UserCheck, color: 'green' },
    { label: 'Inactive Users', value: '312', change: '-12', icon: UserX, color: 'orange' },
    { label: 'Pending Verification', value: '44', change: '+8', icon: Clock, color: 'purple' },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" /> <span>Active</span>
        </span>
      case 'inactive':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
          <XCircle className="w-3 h-3" /> <span>Inactive</span>
        </span>
      case 'suspended':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
          <Ban className="w-3 h-3" /> <span>Suspended</span>
        </span>
      case 'pending':
        return <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" /> <span>Pending</span>
        </span>
      default:
        return null
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar userType="admin" />
      
      <main className="ml-64 pt-20 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-500 mt-1">Manage all parent accounts in the system</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5 text-gray-500" />
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-500" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} this month
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-500" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">User</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Children</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Triages</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Last Active</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-xl">
                          {user.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{user.name}</h4>
                          <p className="text-sm text-gray-500">Joined {user.joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </p>
                        <p className="text-sm text-gray-500 flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{user.phone}</span>
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Baby className="w-4 h-4 text-primary-500" />
                        <span className="font-medium text-gray-800">{user.children}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-800">{user.triages}</span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{user.lastActive}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-primary-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">2</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">3</button>
              <span className="text-gray-400">...</span>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">10</button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* View User Modal */}
        {showViewModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-800">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">{selectedUser.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="font-medium text-gray-800">{selectedUser.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Registered Children</p>
                    <p className="font-medium text-gray-800">{selectedUser.children} children</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Triages</p>
                    <p className="font-medium text-gray-800">{selectedUser.triages} triages</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Active</p>
                    <p className="font-medium text-gray-800">{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-100">
                <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  Edit User
                </button>
                {selectedUser.status === 'active' ? (
                  <button className="flex-1 py-3 bg-orange-100 text-orange-700 rounded-xl font-medium hover:bg-orange-200 transition-colors">
                    Suspend User
                  </button>
                ) : (
                  <button className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors">
                    Activate User
                  </button>
                )}
                <button className="py-3 px-6 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                  <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminUsers