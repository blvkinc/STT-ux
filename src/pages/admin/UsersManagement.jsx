import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Ban, 
  CheckCircle,
  XCircle,
  Shield,
  UserCheck,
  Users,
  Building,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Download,
  Upload,
  Crown,
  User
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'
import AddUserModal from '../../components/admin/AddUserModal'

const UsersManagement = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Check if user is super admin
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@jumeirah.com',
      phone: '+971 4 366 8888',
      role: 'Venue Admin',
      status: 'Active',
      assignedVenues: 8,
      totalEvents: 45,
      totalRevenue: 2847392,
      lastLogin: '2024-12-18T10:30:00Z',
      joinDate: '2023-01-15',
      permissions: ['venue_management', 'event_creation', 'booking_management'],
      location: 'Dubai, UAE'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@atlantis.com',
      phone: '+971 4 426 2000',
      role: 'Venue Admin',
      status: 'Active',
      assignedVenues: 5,
      totalEvents: 28,
      totalRevenue: 1923847,
      lastLogin: '2024-12-17T14:20:00Z',
      joinDate: '2023-03-22',
      permissions: ['venue_management', 'event_creation', 'booking_management'],
      location: 'Palm Jumeirah, Dubai'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@skyhospitality.ae',
      phone: '+971 50 123 4567',
      role: 'Venue Admin',
      status: 'Pending Approval',
      assignedVenues: 2,
      totalEvents: 8,
      totalRevenue: 234567,
      lastLogin: '2024-12-16T09:15:00Z',
      joinDate: '2024-11-10',
      permissions: ['venue_management'],
      location: 'Downtown Dubai'
    },
    {
      id: 4,
      name: 'Fatima Al-Zahra',
      email: 'fatima@coastaldining.ae',
      phone: '+971 52 456 7890',
      role: 'Super Admin',
      status: 'Active',
      assignedVenues: 0,
      totalEvents: 0,
      totalRevenue: 0,
      lastLogin: '2024-12-18T08:45:00Z',
      joinDate: '2023-01-01',
      permissions: ['full_access', 'user_management', 'system_settings'],
      location: 'Dubai, UAE'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@marinaent.com',
      phone: '+971 55 987 6543',
      role: 'Venue Admin',
      status: 'Suspended',
      assignedVenues: 3,
      totalEvents: 12,
      totalRevenue: 456789,
      lastLogin: '2024-12-10T16:30:00Z',
      joinDate: '2023-08-05',
      permissions: [],
      location: 'Dubai Marina'
    }
  ]

  const roles = ['All', 'Super Admin', 'Venue Admin']
  const statuses = ['All', 'Active', 'Pending Approval', 'Suspended', 'Inactive']

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-700'
      case 'Suspended':
        return 'bg-red-100 text-red-700'
      case 'Inactive':
        return 'bg-neutral-100 text-neutral-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-100 text-red-700'
      case 'Venue Admin':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getRoleIcon = (role) => {
    return role === 'Super Admin' ? Crown : UserCheck
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const StatCard = ({ title, value, icon: Icon, color = "primary" }) => (
    <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-neutral-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center shadow-soft`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">User Management</h1>
            <p className="text-neutral-600">Manage system administrators and venue managers</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Users</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Import Users</span>
            </button>
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={Users}
            color="red"
          />
          <StatCard
            title="Super Admins"
            value={users.filter(u => u.role === 'Super Admin').length}
            icon={Crown}
            color="purple"
          />
          <StatCard
            title="Venue Admins"
            value={users.filter(u => u.role === 'Venue Admin').length}
            icon={UserCheck}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={users.filter(u => u.status === 'Active').length}
            icon={CheckCircle}
            color="green"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              >
                <option value="all">All Roles</option>
                {roles.slice(1).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              >
                <option value="all">All Status</option>
                {statuses.slice(1).map(status => (
                  <option key={status} value={status.toLowerCase()}>{status}</option>
                ))}
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-800">
                System Users ({filteredUsers.length})
              </h2>
              {selectedUsers.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-neutral-600">
                    {selectedUsers.length} selected
                  </span>
                  <button className="btn-secondary text-sm">Bulk Actions</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">User</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Role & Status</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Assigned Venues</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Performance</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Last Activity</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role)
                  return (
                    <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            user.role === 'Super Admin' ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            <RoleIcon className={`w-6 h-6 ${
                              user.role === 'Super Admin' ? 'text-red-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <div className="font-medium text-neutral-800">{user.name}</div>
                            <div className="text-sm text-neutral-600">{user.email}</div>
                            <div className="text-xs text-neutral-500 flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{user.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-2">
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                          <div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-neutral-800">{user.assignedVenues}</div>
                          <div className="text-xs text-neutral-600">venues</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-neutral-800">{user.totalEvents} events</div>
                          <div className="text-sm text-primary-600">
                            AED {user.totalRevenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-neutral-500">total revenue</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-neutral-600">
                          {formatDate(user.lastLogin)}
                        </div>
                        <div className="text-xs text-neutral-500">
                          Joined {user.joinDate}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-neutral-600 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {user.status === 'Active' && user.role !== 'Super Admin' && (
                            <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800">{selectedUser.name}</h2>
                    <p className="text-neutral-600">{selectedUser.role} Details</p>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-neutral-500 hover:text-neutral-700 p-2"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* User Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedUser.assignedVenues}</div>
                    <div className="text-sm text-neutral-600">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedUser.totalEvents}</div>
                    <div className="text-sm text-neutral-600">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">AED {selectedUser.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">Revenue</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedUser.location}</span>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Permissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((permission, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {permission.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Account Details</h3>
                  <div className="space-y-2">
                    <div><strong>Status:</strong> {selectedUser.status}</div>
                    <div><strong>Role:</strong> {selectedUser.role}</div>
                    <div><strong>Join Date:</strong> {selectedUser.joinDate}</div>
                    <div><strong>Last Login:</strong> {formatDate(selectedUser.lastLogin)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        <AddUserModal
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSubmit={async (userData) => {
            console.log('Creating user:', userData)
            // Here you would typically make an API call to create the user
            // For now, we'll just simulate success
            return Promise.resolve()
          }}
        />
      </div>
    </SuperAdminLayout>
  )
}

export default UsersManagement