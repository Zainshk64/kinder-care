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

// Initial mock data
const INITIAL_USERS = [
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

const AdminUsers = () => {
  // State Management
  const [users, setUsers] = useState(INITIAL_USERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    status: 'active'
  })

  // Stats Calculation
  const stats = [
    { 
      label: 'Total Parents', 
      value: users.length.toLocaleString(), 
      change: '+124', 
      icon: Users, 
      color: 'blue' 
    },
    { 
      label: 'Active Users', 
      value: users.filter(u => u.status === 'active').length, 
      change: '+45', 
      icon: UserCheck, 
      color: 'green' 
    },
    { 
      label: 'Inactive Users', 
      value: users.filter(u => u.status === 'inactive').length, 
      change: '-12', 
      icon: UserX, 
      color: 'orange' 
    },
    { 
      label: 'Pending Verification', 
      value: users.filter(u => u.status === 'pending').length, 
      change: '+8', 
      icon: Clock, 
      color: 'purple' 
    },
  ]

  // Filter Users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery)
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // CRUD Operations
  const handleAddUser = (e) => {
    e.preventDefault()
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      role: 'parent',
      status: formData.status,
      children: 0,
      triages: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActive: 'Just now',
      avatar: formData.name.charAt(0).match(/[a-zA-Z]/) ? '👤' : '👨'
    }
    setUsers([...users, newUser])
    setShowAddModal(false)
    resetForm()
    showNotification('User added successfully!', 'success')
  }

  const handleEditUser = (e) => {
    e.preventDefault()
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...formData }
        : user
    ))
    setShowEditModal(false)
    setSelectedUser(null)
    resetForm()
    showNotification('User updated successfully!', 'success')
  }

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id))
    setShowDeleteModal(false)
    setSelectedUser(null)
    showNotification('User deleted successfully!', 'success')
  }

  const handleBulkDelete = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
    showNotification(`${selectedUsers.length} users deleted successfully!`, 'success')
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ))
    showNotification('User status updated!', 'success')
  }

  // Helper Functions
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      status: 'active'
    })
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: '',
      status: user.status
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const showNotification = (message, type) => {
    // You can implement a toast notification here
    alert(message)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        icon: CheckCircle,
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'Active'
      },
      inactive: {
        icon: XCircle,
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        label: 'Inactive'
      },
      suspended: {
        icon: Ban,
        bg: 'bg-red-100',
        text: 'text-red-700',
        label: 'Suspended'
      },
      pending: {
        icon: Clock,
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        label: 'Pending'
      }
    }

    const config = statusConfig[status] || statusConfig.inactive
    const Icon = config.icon

    return (
      <span className={`flex items-center space-x-1 px-3 py-1 ${config.bg} ${config.text} rounded-full text-xs font-medium`}>
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} this month
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
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
            {selectedUsers.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete ({selectedUsers.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300"
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                      onChange={handleSelectAll}
                    />
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
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Users className="w-12 h-12 mb-2" />
                        <p>No users found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                        />
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
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => openEditModal(user)}
                            className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4 text-primary-600" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(user)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
              </p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-primary-500 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="text-gray-400">...</span>
                  }
                  return null
                })}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="example@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+92 300 1234567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="City, Pakistan"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password *</label>
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter temporary password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      resetForm()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedUser(null)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEditUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setSelectedUser(null)
                      resetForm()
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View User Modal */}
        {showViewModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                <button 
                  onClick={() => {
                    setShowViewModal(false)
                    setSelectedUser(null)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl">
                  {selectedUser.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <div className="mt-2">
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>Address</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Join Date</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <Baby className="w-4 h-4" />
                      <span>Registered Children</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.children} children</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Total Triages</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.triages} triages</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center space-x-1 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Last Active</span>
                    </p>
                    <p className="font-medium text-gray-800">{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setShowViewModal(false)
                    openEditModal(selectedUser)
                  }}
                  className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  Edit User
                </button>
                {selectedUser.status === 'active' ? (
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                    className="flex-1 py-3 bg-orange-100 text-orange-700 rounded-xl font-medium hover:bg-orange-200 transition-colors"
                  >
                    Suspend User
                  </button>
                ) : selectedUser.status === 'suspended' ? (
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
                  >
                    Activate User
                  </button>
                ) : (
                  <button 
                    onClick={() => handleStatusChange(selectedUser.id, 'active')}
                    className="flex-1 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
                  >
                    Activate User
                  </button>
                )}
                <button 
                  onClick={() => {
                    setShowViewModal(false)
                    openDeleteModal(selectedUser)
                  }}
                  className="py-3 px-6 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete User</h2>
                <p className="text-gray-500">
                  Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowDeleteModal(false)
                    setSelectedUser(null)
                  }}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteUser}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete User
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