import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  DollarSign, 
  Eye, 
  Download,
  Phone,
  Mail,
  Clock,
  MapPin,
  Star
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const BookingsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      bookingRef: 'STT-001234',
      customerName: 'Sarah Ahmed',
      customerEmail: 'sarah.ahmed@email.com',
      customerPhone: '+971 50 123 4567',
      event: 'Weekend Brunch Buffet',
      date: '2024-12-15',
      time: '11:00 AM - 3:00 PM',
      guests: 2,
      package: 'Couple Package',
      amount: 549,
      commission: 82.35,
      status: 'Confirmed',
      bookingDate: '2024-12-01',
      specialRequests: 'Window table preferred, celebrating anniversary',
      rating: null
    },
    {
      id: 2,
      bookingRef: 'STT-001235',
      customerName: 'Michael Johnson',
      customerEmail: 'michael.j@email.com',
      customerPhone: '+971 55 987 6543',
      event: 'Business Lunch Special',
      date: '2024-12-14',
      time: '12:00 PM - 3:00 PM',
      guests: 4,
      package: 'Group Package',
      amount: 596,
      commission: 89.40,
      status: 'Completed',
      bookingDate: '2024-11-28',
      specialRequests: 'Quiet area for business discussion',
      rating: 4.5
    },
    {
      id: 3,
      bookingRef: 'STT-001236',
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima.az@email.com',
      customerPhone: '+971 52 456 7890',
      event: 'Romantic Dinner Experience',
      date: '2024-12-20',
      time: '7:00 PM - 11:00 PM',
      guests: 2,
      package: 'Couple Package',
      amount: 798,
      commission: 119.70,
      status: 'Confirmed',
      bookingDate: '2024-12-05',
      specialRequests: 'Surprise birthday setup requested',
      rating: null
    },
    {
      id: 4,
      bookingRef: 'STT-001237',
      customerName: 'Ahmed Hassan',
      customerEmail: 'ahmed.hassan@email.com',
      customerPhone: '+971 56 234 5678',
      event: 'Weekend Brunch Buffet',
      date: '2024-12-10',
      time: '11:00 AM - 3:00 PM',
      guests: 6,
      package: 'Group Package',
      amount: 1494,
      commission: 224.10,
      status: 'Cancelled',
      bookingDate: '2024-11-25',
      specialRequests: 'High chairs needed for children',
      rating: null
    }
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase()
    
    let matchesDate = true
    if (dateFilter !== 'all') {
      const bookingDate = new Date(booking.date)
      const today = new Date()
      
      switch (dateFilter) {
        case 'today':
          matchesDate = bookingDate.toDateString() === today.toDateString()
          break
        case 'upcoming':
          matchesDate = bookingDate >= today
          break
        case 'past':
          matchesDate = bookingDate < today
          break
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const totalRevenue = filteredBookings.reduce((sum, booking) => 
    booking.status !== 'Cancelled' ? sum + booking.amount : sum, 0
  )
  
  const totalCommission = filteredBookings.reduce((sum, booking) => 
    booking.status !== 'Cancelled' ? sum + booking.commission : sum, 0
  )

  const exportBookings = () => {
    // Mock export functionality
    alert('Booking data exported successfully!')
  }

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Bookings</h1>
            <p className="text-neutral-600">Manage customer bookings and reservations</p>
          </div>
          <button 
            onClick={exportBookings}
            className="btn-secondary flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">{filteredBookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">AED {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Commission Earned</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">AED {totalCommission.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Guests</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">
                    {filteredBookings.reduce((sum, booking) => sum + booking.guests, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-2xl flex items-center justify-center shadow-soft">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>

              <div className="text-right">
                <span className="text-neutral-600 text-sm">
                  {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Booking</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Customer</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Event</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Date & Time</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Guests</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Amount</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Status</th>
                    <th className="text-left py-4 px-2 font-semibold text-neutral-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-semibold text-neutral-800">{booking.bookingRef}</div>
                          <div className="text-sm text-neutral-500">
                            Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-semibold text-neutral-800">{booking.customerName}</div>
                          <div className="text-sm text-neutral-500 flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{booking.customerEmail}</span>
                          </div>
                          <div className="text-sm text-neutral-500 flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{booking.customerPhone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-semibold text-neutral-800">{booking.event}</div>
                          <div className="text-sm text-neutral-500">{booking.package}</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-semibold text-neutral-800 flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-primary-400" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="text-sm text-neutral-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-primary-400" />
                          <span className="font-semibold text-neutral-800">{booking.guests}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-bold text-primary-600">AED {booking.amount}</div>
                          <div className="text-sm text-neutral-500">
                            Commission: AED {booking.commission}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        {booking.rating && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-neutral-500">{booking.rating}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-2">
                        <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">No bookings found</h3>
                <p className="text-neutral-600">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Your bookings will appear here once customers start making reservations'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default BookingsPage