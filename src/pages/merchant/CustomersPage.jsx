import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Download, 
  Users, 
  Star, 
  Calendar, 
  DollarSign,
  Eye,
  Mail,
  Phone,
  MapPin,
  TrendingUp
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const CustomersPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "Sarah Ahmed",
      email: "sarah.ahmed@email.com",
      phone: "+971 50 123 4567",
      location: "Dubai Marina",
      totalBookings: 8,
      totalSpent: 2394,
      averageRating: 4.8,
      lastBooking: "2024-12-15",
      status: "VIP",
      joinDate: "2023-06-15",
      favoriteEvents: ["Weekend Brunch", "Business Lunch"],
      bookingHistory: [
        { date: "2024-12-15", event: "Weekend Brunch", amount: 299, status: "Completed" },
        { date: "2024-11-28", event: "Business Lunch", amount: 149, status: "Completed" },
        { date: "2024-11-10", event: "Anniversary Dinner", amount: 399, status: "Completed" }
      ]
    },
    {
      id: 2,
      name: "Michael Johnson",
      email: "michael.j@email.com",
      phone: "+971 55 987 6543",
      location: "Downtown Dubai",
      totalBookings: 5,
      totalSpent: 1247,
      averageRating: 4.6,
      lastBooking: "2024-12-10",
      status: "Regular",
      joinDate: "2023-09-22",
      favoriteEvents: ["Rooftop Party", "Date Night"],
      bookingHistory: [
        { date: "2024-12-10", event: "Rooftop Party", amount: 199, status: "Completed" },
        { date: "2024-11-25", event: "Date Night", amount: 349, status: "Completed" }
      ]
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      email: "fatima.az@email.com",
      phone: "+971 52 456 7890",
      location: "Jumeirah",
      totalBookings: 12,
      totalSpent: 3567,
      averageRating: 4.9,
      lastBooking: "2024-12-18",
      status: "VIP",
      joinDate: "2023-03-10",
      favoriteEvents: ["Luxury Brunch", "Family Gathering"],
      bookingHistory: [
        { date: "2024-12-18", event: "Luxury Brunch", amount: 449, status: "Confirmed" },
        { date: "2024-12-05", event: "Family Gathering", amount: 599, status: "Completed" }
      ]
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+971 56 234 5678",
      location: "Business Bay",
      totalBookings: 3,
      totalSpent: 897,
      averageRating: 4.3,
      lastBooking: "2024-12-08",
      status: "New",
      joinDate: "2024-10-15",
      favoriteEvents: ["Business Lunch"],
      bookingHistory: [
        { date: "2024-12-08", event: "Business Lunch", amount: 149, status: "Completed" },
        { date: "2024-11-20", event: "Weekend Brunch", amount: 299, status: "Completed" }
      ]
    }
  ]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-700'
      case 'Regular':
        return 'bg-blue-100 text-blue-700'
      case 'New':
        return 'bg-green-100 text-green-700'
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
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Customer Management</h1>
            <p className="text-neutral-600">Manage your customer relationships and insights</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value={customers.length}
            icon={Users}
            color="primary"
          />
          <StatCard
            title="VIP Customers"
            value={customers.filter(c => c.status === 'VIP').length}
            icon={Star}
            color="accent"
          />
          <StatCard
            title="Avg. Customer Value"
            value={`AED ${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}`}
            icon={DollarSign}
            color="primary"
          />
          <StatCard
            title="Retention Rate"
            value="87%"
            icon={TrendingUp}
            color="accent"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
              >
                <option value="all">All Status</option>
                <option value="vip">VIP</option>
                <option value="regular">Regular</option>
                <option value="new">New</option>
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-neutral-800">
              Customers ({filteredCustomers.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Customer</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Contact</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Bookings</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Total Spent</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Rating</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Last Booking</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-600">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-neutral-800">{customer.name}</div>
                          <div className="text-sm text-neutral-600 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{customer.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm text-neutral-600">
                          <Mail className="w-3 h-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-neutral-600">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-neutral-800">{customer.totalBookings}</div>
                      <div className="text-sm text-neutral-600">bookings</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-primary-600">AED {customer.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-neutral-800">{customer.averageRating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-neutral-600">{customer.lastBooking}</div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-800">{selectedCustomer.name}</h2>
                    <p className="text-neutral-600">Customer since {selectedCustomer.joinDate}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-neutral-500 hover:text-neutral-700 p-2"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Customer Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedCustomer.totalBookings}</div>
                    <div className="text-sm text-neutral-600">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">AED {selectedCustomer.totalSpent.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">Total Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{selectedCustomer.averageRating}</div>
                    <div className="text-sm text-neutral-600">Avg Rating</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span className="text-neutral-700">{selectedCustomer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Favorite Events */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Favorite Events</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favoriteEvents.map((event, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking History */}
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-3">Recent Bookings</h3>
                  <div className="space-y-3">
                    {selectedCustomer.bookingHistory.map((booking, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl">
                        <div>
                          <div className="font-medium text-neutral-800">{booking.event}</div>
                          <div className="text-sm text-neutral-600">{booking.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-primary-600">AED {booking.amount}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'Completed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}

export default CustomersPage