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
  UserCheck,
  Star,
  Building,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  Download,
  Upload,
  TrendingUp,
  Users
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'

const MerchantsManagement = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTier, setFilterTier] = useState('all')
  const [selectedMerchants, setSelectedMerchants] = useState([])
  const [selectedMerchant, setSelectedMerchant] = useState(null)

  // Check if user is super admin
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock merchants data
  const merchants = [
    {
      id: 1,
      businessName: "Jumeirah Group",
      contactName: "Ahmed Al-Rashid",
      email: "ahmed@jumeirah.com",
      phone: "+971 4 366 8888",
      location: "Dubai, UAE",
      status: "Active",
      tier: "Premium",
      joinDate: "2023-01-15",
      lastLogin: "2024-12-18",
      totalVenues: 8,
      totalEvents: 45,
      totalRevenue: 2847392,
      monthlyRevenue: 145670,
      totalBookings: 1234,
      averageRating: 4.9,
      compliance: "Excellent",
      riskLevel: "Low",
      subscriptionType: "Enterprise",
      commissionRate: 8.5
    },
    {
      id: 2,
      businessName: "Atlantis Resort",
      contactName: "Sarah Johnson",
      email: "sarah@atlantis.com",
      phone: "+971 4 426 2000",
      location: "Palm Jumeirah, Dubai",
      status: "Active",
      tier: "Premium",
      joinDate: "2023-03-22",
      lastLogin: "2024-12-17",
      totalVenues: 5,
      totalEvents: 28,
      totalRevenue: 1923847,
      monthlyRevenue: 132450,
      totalBookings: 876,
      averageRating: 4.8,
      compliance: "Good",
      riskLevel: "Low",
      subscriptionType: "Premium",
      commissionRate: 10.0
    },
    {
      id: 3,
      businessName: "Sky Hospitality LLC",
      contactName: "Michael Chen",
      email: "michael@skyhospitality.ae",
      phone: "+971 50 123 4567",
      location: "Downtown Dubai",
      status: "Pending Approval",
      tier: "Standard",
      joinDate: "2024-11-10",
      lastLogin: "2024-12-16",
      totalVenues: 2,
      totalEvents: 8,
      totalRevenue: 234567,
      monthlyRevenue: 45230,
      totalBookings: 156,
      averageRating: 4.6,
      compliance: "Under Review",
      riskLevel: "Medium",
      subscriptionType: "Standard",
      commissionRate: 12.0
    },
    {
      id: 4,
      businessName: "Marina Entertainment",
      contactName: "David Wilson",
      email: "david@marinaent.com",
      phone: "+971 55 987 6543",
      location: "Dubai Marina",
      status: "Suspended",
      tier: "Basic",
      joinDate: "2023-08-05",
      lastLogin: "2024-12-10",
      totalVenues: 3,
      totalEvents: 12,
      totalRevenue: 456789,
      monthlyRevenue: 23450,
      totalBookings: 234,
      averageRating: 4.2,
      compliance: "Issues Found",
      riskLevel: "High",
      subscriptionType: "Basic",
      commissionRate: 15.0
    },
    {
      id: 5,
      businessName: "Coastal Dining Group",
      contactName: "Fatima Al-Zahra",
      email: "fatima@coastaldining.ae",
      phone: "+971 52 456 7890",
      location: "Palm Jumeirah, Dubai",
      status: "Under Review",
      tier: "Standard",
      joinDate: "2024-10-20",
      lastLogin: "2024-12-15",
      totalVenues: 1,
      totalEvents: 6,
      totalRevenue: 123456,
      monthlyRevenue: 78920,
      totalBookings: 89,
      averageRating: 4.7,
      compliance: "Pending",
      riskLevel: "Medium",
      subscriptionType: "Standard",
      commissionRate: 12.0
    }
  ]

  const tiers = ['All', 'Premium', 'Standard', 'Basic']
  const statuses = ['All', 'Active', 'Pending Approval', 'Under Review', 'Suspended', 'Rejected']

  const filteredMerchants = merchants.filter(merch => {
    const matchesSearch = merch.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merch.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merch.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || merch.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesTier = filterTier === 'all' || merch.tier === filterTier
    return matchesSearch && matchesStatus && matchesTier
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-700'
      case 'Under Review':
        return 'bg-blue-100 text-blue-700'
      case 'Suspended':
        return 'bg-red-100 text-red-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Premium':
        return 'bg-purple-100 text-purple-700'
      case 'Standard':
        return 'bg-blue-100 text-blue-700'
      case 'Basic':
        return 'bg-neutral-100 text-neutral-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-green-600'
      case 'Medium':
        return 'text-yellow-600'
      case 'High':
        return 'text-red-600'
      default:
        return 'text-neutral-600'
    }
  }

  const StatCard = ({ title, value, icon: Icon, color = "primary", subtitle }) => (
    <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-neutral-800 mt-1">{value}</p>
          {subtitle && <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>}
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Merchants Management</h1>
            <p className="text-neutral-600">Manage all merchant partners and their accounts</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Import</span>
            </button>
            <Link to="/admin/merchants/invite" className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Invite Merchant</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Merchants"
            value={merchants.length}
            icon={UserCheck}
            color="primary"
          />
          <StatCard
            title="Active Merchants"
            value={merchants.filter(m => m.status === 'Active').length}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Total Revenue"
            value={`AED ${(merchants.reduce((sum, m) => sum + m.totalRevenue, 0) / 1000000).toFixed(1)}M`}
            subtitle="All-time earnings"
            icon={DollarSign}
            color="primary"
          />
          <StatCard
            title="Avg Commission"
            value={`${(merchants.reduce((sum, m) => sum + m.commissionRate, 0) / merchants.length).toFixed(1)}%`}
            subtitle="Platform average"
            icon={TrendingUp}
            color="accent"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search merchants by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              >
                <option value="all">All Tiers</option>
                {tiers.slice(1).map(tier => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Merchants Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-800">
                Merchants ({filteredMerchants.length})
              </h2>
              {selectedMerchants.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-neutral-600">
                    {selectedMerchants.length} selected
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
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Merchant</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Contact</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Status & Tier</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Business</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Performance</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Commission</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((merch) => (
                  <tr key={merch.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{merch.businessName}</div>
                          <div className="text-sm text-neutral-600 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{merch.location}</span>
                          </div>
                          <div className="text-xs text-neutral-500">Since {merch.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="font-medium text-neutral-800">{merch.contactName}</div>
                        <div className="flex items-center space-x-1 text-sm text-neutral-600">
                          <Mail className="w-3 h-3" />
                          <span>{merch.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-neutral-600">
                          <Phone className="w-3 h-3" />
                          <span>{merch.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(merch.status)}`}>
                          {merch.status}
                        </span>
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getTierColor(merch.tier)}`}>
                            {merch.tier}
                          </span>
                        </div>
                        <div className={`text-xs font-medium ${getRiskColor(merch.riskLevel)}`}>
                          {merch.riskLevel} Risk
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Building className="w-3 h-3 text-neutral-500" />
                          <span className="text-neutral-800">{merch.totalVenues} venues</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          <span className="text-neutral-800">{merch.totalEvents} events</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="w-3 h-3 text-neutral-500" />
                          <span className="text-neutral-800">{merch.totalBookings} bookings</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{merch.averageRating}</span>
                        </div>
                        <div className="text-sm font-medium text-primary-600">
                          AED {merch.monthlyRevenue.toLocaleString()}/mo
                        </div>
                        <div className="text-xs text-neutral-600">
                          AED {(merch.totalRevenue / 1000000).toFixed(1)}M total
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-neutral-800">{merch.commissionRate}%</div>
                        <div className="text-xs text-neutral-600">{merch.subscriptionType}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedMerchant(merch)}
                          className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/admin/merchants/${merch.id}/edit`}
                          className="text-neutral-600 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        {merch.status === 'Active' ? (
                          <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : merch.status === 'Pending Approval' ? (
                          <div className="flex space-x-1">
                            <button className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Merchant Detail Modal */}
        {selectedMerchant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800">{selectedMerchant.businessName}</h2>
                    <p className="text-neutral-600">Merchant Details & Analytics</p>
                  </div>
                  <button
                    onClick={() => setSelectedMerchant(null)}
                    className="text-neutral-500 hover:text-neutral-700 p-2"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedMerchant.totalVenues}</div>
                    <div className="text-sm text-neutral-600">Venues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedMerchant.totalEvents}</div>
                    <div className="text-sm text-neutral-600">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">AED {selectedMerchant.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedMerchant.averageRating}</div>
                    <div className="text-sm text-neutral-600">Avg Rating</div>
                  </div>
                </div>

                {/* Contact & Business Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div><strong>Contact:</strong> {selectedMerchant.contactName}</div>
                      <div><strong>Email:</strong> {selectedMerchant.email}</div>
                      <div><strong>Phone:</strong> {selectedMerchant.phone}</div>
                      <div><strong>Location:</strong> {selectedMerchant.location}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-3">Business Details</h3>
                    <div className="space-y-2">
                      <div><strong>Subscription:</strong> {selectedMerchant.subscriptionType}</div>
                      <div><strong>Commission Rate:</strong> {selectedMerchant.commissionRate}%</div>
                      <div><strong>Compliance:</strong> {selectedMerchant.compliance}</div>
                      <div><strong>Risk Level:</strong> {selectedMerchant.riskLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  )
}

export default MerchantsManagement