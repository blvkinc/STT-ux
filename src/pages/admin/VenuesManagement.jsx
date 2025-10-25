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
  MapPin,
  Star,
  Users,
  Calendar,
  DollarSign,
  Building,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'
import AddVenueModal from '../../components/admin/AddVenueModal'

const VenuesManagement = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedVenues, setSelectedVenues] = useState([])
  const [showAddVenueModal, setShowAddVenueModal] = useState(false)

  // Check if user is super admin
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock venues data
  const venues = [
    {
      id: 1,
      name: "Burj Al Arab - Al Muntaha",
      merchantName: "Jumeirah Group",
      category: "Fine Dining",
      location: "Burj Al Arab, Dubai",
      status: "Active",
      rating: 4.9,
      reviews: 234,
      totalEvents: 12,
      totalBookings: 456,
      monthlyRevenue: 145670,
      joinDate: "2023-01-15",
      lastActivity: "2024-12-18",
      compliance: "Excellent",
      riskLevel: "Low"
    },
    {
      id: 2,
      name: "Atlantis The Palm - Ossiano",
      merchantName: "Atlantis Resort",
      category: "Underwater Dining",
      location: "Palm Jumeirah, Dubai",
      status: "Active",
      rating: 4.8,
      reviews: 189,
      totalEvents: 8,
      totalBookings: 324,
      monthlyRevenue: 132450,
      joinDate: "2023-03-22",
      lastActivity: "2024-12-17",
      compliance: "Good",
      riskLevel: "Low"
    },
    {
      id: 3,
      name: "Sky Lounge Dubai",
      merchantName: "Sky Hospitality LLC",
      category: "Rooftop Bar",
      location: "Downtown Dubai",
      status: "Pending Approval",
      rating: 4.6,
      reviews: 67,
      totalEvents: 5,
      totalBookings: 123,
      monthlyRevenue: 45230,
      joinDate: "2024-11-10",
      lastActivity: "2024-12-16",
      compliance: "Under Review",
      riskLevel: "Medium"
    },
    {
      id: 4,
      name: "Marina Sports Bar",
      merchantName: "Marina Entertainment",
      category: "Sports Bar",
      location: "Dubai Marina",
      status: "Suspended",
      rating: 4.2,
      reviews: 89,
      totalEvents: 15,
      totalBookings: 234,
      monthlyRevenue: 23450,
      joinDate: "2023-08-05",
      lastActivity: "2024-12-10",
      compliance: "Issues Found",
      riskLevel: "High"
    },
    {
      id: 5,
      name: "Azure Beach Club",
      merchantName: "Coastal Dining Group",
      category: "Beach Club",
      location: "Palm Jumeirah, Dubai",
      status: "Under Review",
      rating: 4.7,
      reviews: 156,
      totalEvents: 9,
      totalBookings: 287,
      monthlyRevenue: 78920,
      joinDate: "2024-10-20",
      lastActivity: "2024-12-15",
      compliance: "Pending",
      riskLevel: "Medium"
    }
  ]

  const categories = ['All', 'Fine Dining', 'Rooftop Bar', 'Beach Club', 'Sports Bar', 'Casual Dining', 'Night Club']
  const statuses = ['All', 'Active', 'Pending Approval', 'Under Review', 'Suspended', 'Rejected']

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || venue.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesCategory = filterCategory === 'all' || venue.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
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

  const getComplianceColor = (compliance) => {
    switch (compliance) {
      case 'Excellent':
        return 'bg-green-100 text-green-700'
      case 'Good':
        return 'bg-blue-100 text-blue-700'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Issues Found':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const handleSelectVenue = (venueId) => {
    setSelectedVenues(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    )
  }

  const handleSelectAll = () => {
    setSelectedVenues(
      selectedVenues.length === filteredVenues.length 
        ? [] 
        : filteredVenues.map(v => v.id)
    )
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Venues Management</h1>
            <p className="text-neutral-600">Manage all venues across the platform</p>
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
            <button 
              onClick={() => setShowAddVenueModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Venue</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Venues"
            value={venues.length}
            icon={Building}
            color="primary"
          />
          <StatCard
            title="Active Venues"
            value={venues.filter(v => v.status === 'Active').length}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Pending Approval"
            value={venues.filter(v => v.status === 'Pending Approval').length}
            icon={AlertTriangle}
            color="yellow"
          />
          <StatCard
            title="Total Revenue"
            value={`AED ${(venues.reduce((sum, v) => sum + v.monthlyRevenue, 0) / 1000).toFixed(0)}K`}
            icon={DollarSign}
            color="primary"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search venues, merchants, or locations..."
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
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Venues Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-neutral-800">
                Venues ({filteredVenues.length})
              </h2>
              {selectedVenues.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-neutral-600">
                    {selectedVenues.length} selected
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
                  <th className="text-left py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedVenues.length === filteredVenues.length}
                      onChange={handleSelectAll}
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Venue</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Merchant</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Performance</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Compliance</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVenues.map((venue) => (
                  <tr key={venue.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedVenues.includes(venue.id)}
                        onChange={() => handleSelectVenue(venue.id)}
                        className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{venue.name}</div>
                          <div className="text-sm text-neutral-600 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{venue.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-neutral-800">{venue.merchantName}</div>
                      <div className="text-sm text-neutral-600">Since {venue.joinDate}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm">
                        {venue.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(venue.status)}`}>
                        {venue.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{venue.rating}</span>
                          <span className="text-xs text-neutral-500">({venue.reviews})</span>
                        </div>
                        <div className="text-xs text-neutral-600">
                          AED {venue.monthlyRevenue.toLocaleString()}/mo
                        </div>
                        <div className="text-xs text-neutral-600">
                          {venue.totalBookings} bookings
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(venue.compliance)}`}>
                          {venue.compliance}
                        </span>
                        <div className={`text-xs font-medium ${getRiskColor(venue.riskLevel)}`}>
                          {venue.riskLevel} Risk
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/venues/${venue.id}`}
                          className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="text-neutral-600 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {venue.status === 'Active' ? (
                          <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : venue.status === 'Pending Approval' ? (
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

        {/* Add Venue Modal */}
        <AddVenueModal
          isOpen={showAddVenueModal}
          onClose={() => setShowAddVenueModal(false)}
          onSubmit={async (venueData) => {
            console.log('Creating venue:', venueData)
            // Here you would typically make an API call to create the venue
            // For now, we'll just simulate success
            return Promise.resolve()
          }}
        />
      </div>
    </SuperAdminLayout>
  )
}

export default VenuesManagement