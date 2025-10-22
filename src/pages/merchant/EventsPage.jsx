import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Calendar,
  Users,
  DollarSign,
  MoreVertical,
  Star
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const EventsPage = () => {
  const { merchant, events, cloneEvent, deleteEvent, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState(null)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock events data if none exist
  const mockEvents = events.length > 0 ? events : [
    {
      id: 1,
      title: "Weekend Brunch Buffet",
      description: "All-you-can-eat brunch with live cooking stations",
      status: "Published",
      date: "2024-12-15",
      time: "11:00 AM - 3:00 PM",
      price: 299,
      capacity: 50,
      bookings: 24,
      views: 156,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
      createdAt: "2024-11-01"
    },
    {
      id: 2,
      title: "Business Lunch Special",
      description: "Perfect for corporate meetings and business discussions",
      status: "Draft",
      date: "2024-12-20",
      time: "12:00 PM - 3:00 PM",
      price: 149,
      capacity: 30,
      bookings: 0,
      views: 23,
      rating: 0,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      createdAt: "2024-11-15"
    },
    {
      id: 3,
      title: "Romantic Dinner Experience",
      description: "Intimate dining experience for couples",
      status: "Published",
      date: "2024-12-25",
      time: "7:00 PM - 11:00 PM",
      price: 399,
      capacity: 20,
      bookings: 15,
      views: 89,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
      createdAt: "2024-10-20"
    }
  ]

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleCloneEvent = (eventId) => {
    cloneEvent(eventId)
    setShowDropdown(null)
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId)
      setShowDropdown(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-700'
      case 'draft':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending approval':
        return 'bg-blue-100 text-blue-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Events</h1>
            <p className="text-neutral-600">Manage your dining experiences and events</p>
          </div>
          <Link to="/merchant/events/create" className="btn-primary flex items-center space-x-2 mt-4 md:mt-0">
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
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
                  className="pl-12 pr-8 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending approval">Pending Approval</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === event.id ? null : event.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-colors shadow-soft"
                      >
                        <MoreVertical className="w-4 h-4 text-neutral-600" />
                      </button>
                      
                      {showDropdown === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 py-2 z-10">
                          <Link
                            to={`/merchant/events/${event.id}/edit`}
                            className="flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                            onClick={() => setShowDropdown(null)}
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleCloneEvent(event.id)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Clone</span>
                          </button>
                          <Link
                            to={`/events/${event.id}`}
                            className="flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                            onClick={() => setShowDropdown(null)}
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Public</span>
                          </Link>
                          <hr className="my-2 border-neutral-100" />
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 text-primary-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-neutral-600">
                      <DollarSign className="w-4 h-4 text-primary-400" />
                      <span>AED {event.price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600">{event.bookings}</div>
                      <div className="text-xs text-neutral-500">Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600">{event.views}</div>
                      <div className="text-xs text-neutral-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-primary-600">
                          {event.rating || 'N/A'}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border border-neutral-100">
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">No events found</h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first event to start attracting customers'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/merchant/events/create" className="btn-primary">
                  Create Your First Event
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}

export default EventsPage