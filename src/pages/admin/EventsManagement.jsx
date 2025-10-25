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
  Calendar,
  MapPin,
  Star,
  Users,
  DollarSign,
  Clock,
  Building,
  Download,
  Upload
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'

const EventsManagement = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  // Check if user is super admin
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'New Year Gala Dinner 2025',
      venue: 'Burj Al Arab - Al Muntaha',
      merchant: 'Jumeirah Group',
      category: 'Special Event',
      date: '2024-12-31',
      time: '19:00 - 02:00',
      price: 1299,
      capacity: 200,
      bookings: 156,
      status: 'Active',
      rating: 4.9,
      reviews: 45,
      location: 'Burj Al Arab, Dubai'
    },
    {
      id: 2,
      title: 'Weekend Brunch Buffet',
      venue: 'Atlantis The Palm - Ossiano',
      merchant: 'Atlantis Resort',
      category: 'Brunch',
      date: '2024-12-22',
      time: '12:00 - 16:00',
      price: 449,
      capacity: 120,
      bookings: 98,
      status: 'Active',
      rating: 4.8,
      reviews: 67,
      location: 'Palm Jumeirah, Dubai'
    },
    {
      id: 3,
      title: 'Rooftop Sunset Experience',
      venue: 'Sky Lounge Dubai',
      merchant: 'Sky Hospitality LLC',
      category: 'Party',
      date: '2024-12-25',
      time: '18:00 - 23:00',
      price: 299,
      capacity: 80,
      bookings: 23,
      status: 'Pending Approval',
      rating: 4.6,
      reviews: 12,
      location: 'Downtown Dubai'
    }
  ]

  const categories = ['All', 'Brunch', 'Dinner', 'Party', 'Special Event', 'Business']
  const statuses = ['All', 'Active', 'Pending Approval', 'Draft', 'Suspended']

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || event.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-700'
      case 'Draft':
        return 'bg-blue-100 text-blue-700'
      case 'Suspended':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Events Management</h1>
            <p className="text-neutral-600">Manage all events across the platform</p>
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
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Events"
            value={events.length}
            icon={Calendar}
            color="blue"
          />
          <StatCard
            title="Active Events"
            value={events.filter(e => e.status === 'Active').length}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Pending Approval"
            value={events.filter(e => e.status === 'Pending Approval').length}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            title="Total Bookings"
            value={events.reduce((sum, e) => sum + e.bookings, 0)}
            icon={Users}
            color="purple"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, venues, or merchants..."
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

        {/* Events Table */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">
              Events ({filteredEvents.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Event</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Venue & Merchant</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Date & Time</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Performance</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{event.title}</div>
                          <div className="text-sm text-neutral-600">{event.category}</div>
                          <div className="text-sm text-neutral-500 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-neutral-800 flex items-center space-x-1">
                          <Building className="w-4 h-4 text-neutral-500" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="text-sm text-neutral-600">{event.merchant}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-neutral-800">{event.date}</div>
                        <div className="text-sm text-neutral-600 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{event.rating}</span>
                          <span className="text-xs text-neutral-500">({event.reviews})</span>
                        </div>
                        <div className="text-sm text-neutral-600">
                          {event.bookings}/{event.capacity} booked
                        </div>
                        <div className="text-sm font-medium text-primary-600">
                          AED {event.price}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/events/${event.id}`}
                          className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="text-neutral-600 hover:text-neutral-700 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {event.status === 'Active' ? (
                          <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : event.status === 'Pending Approval' ? (
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
      </div>
    </SuperAdminLayout>
  )
}

export default EventsManagement