import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
  Building,
  Calendar,
  UserCheck,
  FileText,
  MapPin,
  DollarSign,
  Star,
  MessageSquare,
  Download
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'
import ApprovalDetailModal from '../../components/admin/ApprovalDetailModal'

const ApprovalsManagement = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Check if user is super admin
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock approvals data
  const approvals = [
    {
      id: 1,
      type: 'venue',
      title: 'Atlantis The Palm - Nobu',
      submittedBy: 'Nobu Hospitality',
      submittedAt: '2024-12-18T10:30:00Z',
      status: 'pending',
      priority: 'high',
      category: 'Fine Dining',
      location: 'Palm Jumeirah, Dubai',
      description: 'World-renowned Japanese restaurant seeking approval for luxury dining experiences',
      documents: ['Business License', 'Food Safety Certificate', 'Insurance Certificate'],
      estimatedRevenue: 250000,
      requestedCommission: 8.5,
      details: {
        capacity: 120,
        cuisineType: 'Japanese Fine Dining',
        priceRange: 'AED 400-800',
        operatingHours: '6:00 PM - 12:00 AM',
        specialFeatures: ['Michelin Star Chef', 'Ocean View', 'Private Dining Rooms']
      }
    },
    {
      id: 2,
      type: 'event',
      title: 'New Year Gala Dinner 2025',
      submittedBy: 'Burj Al Arab',
      submittedAt: '2024-12-17T14:20:00Z',
      status: 'pending',
      priority: 'critical',
      category: 'Special Event',
      location: 'Burj Al Arab, Dubai',
      description: 'Exclusive New Year celebration with world-class entertainment and dining',
      eventDate: '2024-12-31',
      price: 1299,
      capacity: 200,
      packages: [
        { name: 'Premium Package', price: 1299, includes: ['7-course dinner', 'Premium beverages', 'Live entertainment'] },
        { name: 'VIP Package', price: 1899, includes: ['Private table', 'Champagne service', 'Meet & greet'] }
      ]
    },
    {
      id: 3,
      type: 'merchant',
      title: 'Dubai Marina Yacht Club',
      submittedBy: 'Marina Holdings LLC',
      submittedAt: '2024-12-16T09:15:00Z',
      status: 'under_review',
      priority: 'medium',
      category: 'Yacht Club',
      location: 'Dubai Marina',
      description: 'Premium yacht club offering exclusive dining and entertainment experiences',
      businessType: 'Hospitality',
      expectedVenues: 2,
      projectedRevenue: 180000,
      contactPerson: 'Captain Ahmed Al-Mansoori',
      phone: '+971 50 123 4567',
      email: 'ahmed@marinaclub.ae'
    },
    {
      id: 4,
      type: 'menu',
      title: 'Winter Seasonal Menu',
      submittedBy: 'Four Seasons Resort',
      submittedAt: '2024-12-15T16:45:00Z',
      status: 'approved',
      priority: 'low',
      category: 'Seasonal Menu',
      location: 'Jumeirah Beach, Dubai',
      description: 'New winter menu featuring seasonal ingredients and festive specialties',
      menuItems: 15,
      priceRange: 'AED 85-320',
      validFrom: '2024-12-20',
      validTo: '2025-03-20'
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Ladies Night Special Offer',
      submittedBy: 'Sky Lounge Dubai',
      submittedAt: '2024-12-14T11:30:00Z',
      status: 'rejected',
      priority: 'medium',
      category: 'Promotional Campaign',
      location: 'Downtown Dubai',
      description: 'Weekly ladies night promotion with special pricing and complimentary services',
      discount: 50,
      validDays: ['Tuesday'],
      duration: '3 months',
      rejectionReason: 'Pricing structure conflicts with platform guidelines'
    }
  ]

  const types = ['All', 'Venue', 'Event', 'Merchant', 'Menu', 'Promotion']
  const statuses = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected']

  const filteredApprovals = approvals.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType.toLowerCase()
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus.toLowerCase().replace(' ', '_')
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'under_review':
        return 'bg-blue-100 text-blue-700'
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50'
      case 'high':
        return 'text-orange-600 bg-orange-50'
      case 'medium':
        return 'text-blue-600 bg-blue-50'
      case 'low':
        return 'text-neutral-600 bg-neutral-50'
      default:
        return 'text-neutral-600 bg-neutral-50'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'venue':
        return Building
      case 'event':
        return Calendar
      case 'merchant':
        return UserCheck
      case 'menu':
        return FileText
      case 'promotion':
        return Star
      default:
        return FileText
    }
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

  const handleApprove = (id) => {
    console.log('Approving item:', id)
    // Add approval logic here
  }

  const handleReject = (id) => {
    console.log('Rejecting item:', id)
    // Add rejection logic here
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Approvals Management</h1>
            <p className="text-neutral-600">Review and manage all pending approvals</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Pending Approvals"
            value={approvals.filter(a => a.status === 'pending').length}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Under Review"
            value={approvals.filter(a => a.status === 'under_review').length}
            icon={Eye}
            color="blue"
          />
          <StatCard
            title="Critical Priority"
            value={approvals.filter(a => a.priority === 'critical').length}
            icon={AlertTriangle}
            color="red"
          />
          <StatCard
            title="Approved Today"
            value={approvals.filter(a => a.status === 'approved').length}
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
                placeholder="Search by title or submitter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              >
                <option value="all">All Types</option>
                {types.slice(1).map(type => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
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

        {/* Approvals List */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">
              Approval Queue ({filteredApprovals.length})
            </h2>
          </div>
          
          <div className="divide-y divide-neutral-100">
            {filteredApprovals.map((item) => {
              const Icon = getTypeIcon(item.type)
              return (
                <div key={item.id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPriorityColor(item.priority)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-neutral-800 text-lg">{item.title}</h3>
                          <span className="capitalize text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                            {item.type}
                          </span>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(item.priority)}`}>
                            {item.priority} priority
                          </span>
                        </div>
                        
                        <p className="text-neutral-600 mb-3">{item.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                          <div className="flex items-center space-x-1">
                            <UserCheck className="w-4 h-4" />
                            <span>By {item.submittedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(item.submittedAt)}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                          )}
                          {item.price && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>AED {item.price}</span>
                            </div>
                          )}
                        </div>
                        
                        {item.status === 'rejected' && item.rejectionReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-800">Rejection Reason:</span>
                            </div>
                            <p className="text-sm text-red-700 mt-1">{item.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setSelectedItem(item)
                          setShowDetailModal(true)
                        }}
                        className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      
                      {(item.status === 'pending' || item.status === 'under_review') && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Approval Detail Modal */}
        <ApprovalDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false)
            setSelectedItem(null)
          }}
          item={selectedItem}
          onApprove={async (id) => {
            console.log('Approving item:', id)
            // Here you would make an API call to approve the item
            return Promise.resolve()
          }}
          onReject={async (id, reason) => {
            console.log('Rejecting item:', id, 'Reason:', reason)
            // Here you would make an API call to reject the item
            return Promise.resolve()
          }}
        />
      </div>
    </SuperAdminLayout>
  )
}

export default ApprovalsManagement