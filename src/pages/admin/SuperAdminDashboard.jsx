import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MapPin,
  Eye,
  Edit3,
  Ban,
  UserCheck,
  Shield,
  Database,
  Activity,
  FileText,
  Settings,
  Bell,
  ArrowUpRight,
  Plus
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'

const SuperAdminDashboard = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [timeRange, setTimeRange] = useState('7d')

  // Check if user is authenticated
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock platform-wide data
  const platformStats = {
    totalVenues: 156,
    totalMerchants: 89,
    totalCustomers: 12847,
    totalEvents: 342,
    totalBookings: 5678,
    totalRevenue: 2847392,
    totalUsers: 45, // Super Admin specific
    pendingApprovals: 12, // Super Admin specific
    systemHealth: 98.5, // Super Admin specific
    activeAlerts: 3, // Super Admin specific
    monthlyGrowth: {
      venues: 12.5,
      merchants: 8.3,
      customers: 23.7,
      revenue: 18.9,
      users: 15.2,
      approvals: -8.7
    },
    conversionRate: 14.2,
    averageOrderValue: 287
  }

  // Super Admin specific data
  const systemAlerts = [
    {
      id: 1,
      type: 'security',
      title: 'Multiple Failed Login Attempts',
      description: 'Unusual login activity detected from IP 192.168.1.100',
      severity: 'high',
      timestamp: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'performance',
      title: 'Database Query Performance',
      description: 'Slow query detected on venues table',
      severity: 'medium',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'system',
      title: 'Backup Completed Successfully',
      description: 'Daily system backup completed at 02:00 AM',
      severity: 'info',
      timestamp: '6 hours ago',
      status: 'resolved'
    }
  ]

  const userManagement = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@jumeirah.com',
      role: 'Venue Admin',
      assignedVenues: 8,
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@atlantis.com',
      role: 'Venue Admin',
      assignedVenues: 5,
      lastActive: '1 day ago',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@skyhospitality.ae',
      role: 'Venue Admin',
      assignedVenues: 2,
      lastActive: '3 days ago',
      status: 'Pending Approval'
    }
  ]

  const approvalQueue = [
    {
      id: 1,
      type: 'venue',
      title: 'Atlantis The Palm - Nobu',
      submittedBy: 'Nobu Hospitality',
      submittedAt: '2024-12-18',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event',
      title: 'New Year Gala Dinner',
      submittedBy: 'Burj Al Arab',
      submittedAt: '2024-12-17',
      priority: 'critical',
      status: 'pending'
    },
    {
      id: 3,
      type: 'package',
      title: 'Premium Brunch Package',
      submittedBy: 'Four Seasons Resort',
      submittedAt: '2024-12-16',
      priority: 'medium',
      status: 'under_review'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'venue_approval',
      title: 'New Venue Application',
      description: 'Azure Beach Club submitted for approval',
      timestamp: '2 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'merchant_signup',
      title: 'New Merchant Registration',
      description: 'Sky Lounge Dubai completed onboarding',
      timestamp: '4 hours ago',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'event_flagged',
      title: 'Event Flagged for Review',
      description: 'Luxury Brunch reported by customer',
      timestamp: '6 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 4,
      type: 'payment_issue',
      title: 'Payment Processing Issue',
      description: 'Failed payment for Marina Sports Bar',
      timestamp: '8 hours ago',
      status: 'resolved',
      priority: 'critical'
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: 'venue',
      name: 'Atlantis The Palm - Nobu',
      submittedBy: 'Nobu Hospitality',
      submittedAt: '2024-12-18',
      category: 'Fine Dining',
      location: 'Palm Jumeirah',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event',
      name: 'New Year Gala Dinner',
      submittedBy: 'Burj Al Arab',
      submittedAt: '2024-12-17',
      category: 'Special Event',
      price: 1299,
      status: 'pending'
    },
    {
      id: 3,
      type: 'merchant',
      name: 'Dubai Marina Yacht Club',
      submittedBy: 'Marina Holdings LLC',
      submittedAt: '2024-12-16',
      category: 'Yacht Club',
      location: 'Dubai Marina',
      status: 'under_review'
    }
  ]

  const topPerformingVenues = [
    {
      id: 1,
      name: 'Burj Al Arab - Al Muntaha',
      revenue: 145670,
      bookings: 89,
      rating: 4.9,
      growth: 23.5
    },
    {
      id: 2,
      name: 'Atlantis The Palm - Ossiano',
      revenue: 132450,
      bookings: 76,
      rating: 4.8,
      growth: 18.2
    },
    {
      id: 3,
      name: 'Four Seasons - Al Hadheerah',
      revenue: 98320,
      bookings: 124,
      rating: 4.7,
      growth: 15.8
    }
  ]

  const StatCard = ({ title, value, icon: Icon, change, color = "primary", subtitle }) => (
    <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-neutral-800 mt-2">{value}</p>
          {subtitle && <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 text-sm font-medium ml-1">+{change}%</span>
              <span className="text-neutral-500 text-sm ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center shadow-soft`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  )

  const getActivityIcon = (type) => {
    switch (type) {
      case 'venue_approval':
        return Building
      case 'merchant_signup':
        return UserCheck
      case 'event_flagged':
        return AlertTriangle
      case 'payment_issue':
        return DollarSign
      default:
        return Clock
    }
  }

  const getActivityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50'
      case 'high':
        return 'text-orange-600 bg-orange-50'
      case 'medium':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-neutral-600 bg-neutral-50'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'under_review':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-2">
              System Administration Center
            </h1>
            <p className="text-neutral-600 text-lg">
              Complete platform oversight and management
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            {/* System Health Indicator */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Health: {platformStats.systemHealth}%</span>
            </div>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* System Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Platform Users"
            value={platformStats.totalUsers}
            subtitle="Admins & Merchants"
            icon={Shield}
            change={platformStats.monthlyGrowth.users}
            color="red"
          />
          <StatCard
            title="Pending Approvals"
            value={platformStats.pendingApprovals}
            subtitle="Awaiting review"
            icon={Clock}
            change={platformStats.monthlyGrowth.approvals}
            color="yellow"
          />
          <StatCard
            title="Active Venues"
            value={platformStats.totalVenues}
            subtitle="Operational venues"
            icon={Building}
            change={platformStats.monthlyGrowth.venues}
            color="blue"
          />
          <StatCard
            title="System Alerts"
            value={platformStats.activeAlerts}
            subtitle="Require attention"
            icon={AlertTriangle}
            color="orange"
          />
          <StatCard
            title="Total Revenue"
            value={`AED ${(platformStats.totalRevenue / 1000000).toFixed(1)}M`}
            subtitle="Platform earnings"
            icon={DollarSign}
            change={platformStats.monthlyGrowth.revenue}
            color="green"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Bookings"
            value={platformStats.totalBookings.toLocaleString()}
            icon={Calendar}
            change={12.8}
            color="primary"
          />
          <StatCard
            title="Conversion Rate"
            value={`${platformStats.conversionRate}%`}
            icon={TrendingUp}
            change={2.3}
            color="accent"
          />
          <StatCard
            title="Avg Order Value"
            value={`AED ${platformStats.averageOrderValue}`}
            icon={DollarSign}
            change={8.7}
            color="primary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Alerts & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Alerts */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-neutral-800">System Alerts</h2>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      {systemAlerts.filter(a => a.status === 'active').length} active
                    </span>
                    <Link to="/admin/system" className="text-red-600 hover:text-red-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {alert.type === 'security' ? <Shield className="w-5 h-5" /> :
                         alert.type === 'performance' ? <Activity className="w-5 h-5" /> :
                         <Database className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-800">{alert.title}</h3>
                        <p className="text-neutral-600 text-sm">{alert.description}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-neutral-500 text-xs">{alert.timestamp}</span>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            alert.status === 'active' ? 'bg-red-100 text-red-700' :
                            alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                      </div>
                      <button className="text-neutral-400 hover:text-neutral-600 p-2">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Management Preview */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-neutral-800">User Management</h2>
                  <Link to="/admin/users" className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Manage All Users
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {userManagement.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-800">{user.name}</h3>
                          <p className="text-neutral-600 text-sm">{user.email}</p>
                          <div className="flex items-center space-x-2 text-xs text-neutral-500">
                            <span>{user.role}</span>
                            <span>•</span>
                            <span>{user.assignedVenues} venues</span>
                            <span>•</span>
                            <span>Active {user.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.status}
                        </span>
                        <button className="text-neutral-600 hover:text-neutral-700 p-2">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Approval Queue */}
          <div>
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-neutral-800">Approval Queue</h2>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                    {approvalQueue.length} pending
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {approvalQueue.map((item) => (
                    <div key={item.id} className="border border-neutral-200 rounded-xl p-4 hover:shadow-soft transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-neutral-800 text-sm">{item.title}</h3>
                          <p className="text-neutral-600 text-xs">{item.submittedBy}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className="capitalize text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                            {item.type}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                            item.priority === 'critical' ? 'bg-red-100 text-red-700' :
                            item.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-neutral-500">{item.submittedAt}</span>
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-700 p-1">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1">
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button className="text-neutral-600 hover:text-neutral-700 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/admin/approvals" className="w-full mt-4 btn-secondary text-sm block text-center">
                  View All Approvals
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Venues */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-800">Top Performing Venues</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Venues
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Venue</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Revenue</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Bookings</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Rating</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Growth</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingVenues.map((venue, index) => (
                  <tr key={venue.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{venue.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-primary-600">AED {venue.revenue.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-neutral-800">{venue.bookings}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-neutral-800">{venue.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">+{venue.growth}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Administrative Actions */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">Administrative Actions</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/users" className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">User Management</h3>
                <p className="text-neutral-600 text-sm">Manage admin users and roles</p>
              </Link>

              <Link to="/admin/venues" className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">All Venues</h3>
                <p className="text-neutral-600 text-sm">System-wide venue oversight</p>
              </Link>

              <Link to="/admin/approvals" className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Approval Queue</h3>
                <p className="text-neutral-600 text-sm">Review pending submissions</p>
              </Link>

              <Link to="/admin/system" className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">System Settings</h3>
                <p className="text-neutral-600 text-sm">Platform configuration</p>
              </Link>
            </div>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Platform Performance */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-800">Platform Performance</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Server Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Response Time</span>
                <span className="font-semibold text-blue-600">145ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Active Sessions</span>
                <span className="font-semibold text-neutral-800">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Database Health</span>
                <span className="font-semibold text-green-600">Optimal</span>
              </div>
            </div>
          </div>

          {/* Recent System Changes */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-800">Recent System Changes</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Database backup completed</span>
                <span className="text-xs text-neutral-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Security patch deployed</span>
                <span className="text-xs text-neutral-500 ml-auto">6h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">Performance optimization</span>
                <span className="text-xs text-neutral-500 ml-auto">1d ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-neutral-700">New feature deployment</span>
                <span className="text-xs text-neutral-500 ml-auto">2d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard