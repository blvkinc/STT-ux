import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, MapPin, Star, Calendar, Clock, Users, Grid, List, SlidersHorizontal, ArrowRight } from 'lucide-react'
import EventCard from '../components/EventCard'
import VenueCard from '../components/VenueCard'

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Filters
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || 'all',
    priceRange: searchParams.get('price') || 'all',
    date: searchParams.get('date') || '',
    rating: searchParams.get('rating') || 'all',
    availability: searchParams.get('availability') || 'all'
  })

  // Mock data
  const [results, setResults] = useState({
    events: [],
    venues: [],
    packages: [],
    total: 0
  })

  useEffect(() => {
    performSearch()
  }, [searchTerm, activeTab, filters])

  const performSearch = async () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 124,
          price: 299,
          location: "Burj Al Arab",
          time: "11:00 AM - 3:00 PM",
          category: "Luxury Brunch",
          date: "2024-02-20",
          availability: "available"
        },
        {
          id: 2,
          title: "Rooftop Party Experience",
          venue: "Sky Lounge Dubai",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 89,
          price: 199,
          location: "Downtown Dubai",
          time: "7:00 PM - 12:00 AM",
          category: "Party",
          date: "2024-02-22",
          availability: "limited"
        },
        {
          id: 3,
          title: "Beach Club Brunch",
          venue: "Azure Beach Club",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 156,
          price: 249,
          location: "Palm Jumeirah",
          time: "12:00 PM - 4:00 PM",
          category: "Beach Brunch",
          date: "2024-02-25",
          availability: "available"
        }
      ]

      const mockVenues = [
        {
          id: 1,
          name: "Azure Beach Club",
          category: "Beach Club",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 156,
          location: "Palm Jumeirah",
          address: "Palm Jumeirah, Dubai",
          description: "Luxury beachfront club with stunning ocean views and world-class dining",
          upcomingEvents: 3,
          priceRange: "AED 200-400",
          amenities: ["Beach Access", "Pool", "Valet Parking", "WiFi", "Live Music"]
        },
        {
          id: 2,
          name: "Sky Lounge Dubai",
          category: "Rooftop Bar",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 89,
          location: "Downtown Dubai",
          address: "Downtown Dubai, UAE",
          description: "Sophisticated rooftop bar with panoramic city views and craft cocktails",
          upcomingEvents: 5,
          priceRange: "AED 150-300",
          amenities: ["City Views", "Cocktail Bar", "Outdoor Seating", "DJ", "VIP Area"]
        }
      ]

      const mockPackages = [
        {
          id: 1,
          name: "Classic Brunch Package",
          event: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          price: 299,
          originalPrice: 349,
          rating: 4.8,
          reviews: 124,
          features: ["Welcome drink", "International buffet", "Soft beverages", "2-hour dining"],
          category: "Luxury Brunch",
          location: "Burj Al Arab",
          maxGuests: 2
        },
        {
          id: 2,
          name: "Premium Brunch Package",
          event: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          price: 449,
          originalPrice: 529,
          rating: 4.8,
          reviews: 124,
          features: ["Premium cocktail", "International buffet", "Premium beverages", "Ocean view"],
          category: "Luxury Brunch",
          location: "Burj Al Arab",
          maxGuests: 4,
          popular: true
        },
        {
          id: 3,
          name: "Rooftop Party Package",
          event: "Rooftop Party Experience",
          venue: "Sky Lounge Dubai",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          price: 199,
          originalPrice: 249,
          rating: 4.6,
          reviews: 89,
          features: ["Welcome drinks", "DJ entertainment", "City views", "Dancing area"],
          category: "Party",
          location: "Downtown Dubai",
          maxGuests: 6
        }
      ]

      // Apply filters
      let filteredEvents = mockEvents
      let filteredVenues = mockVenues
      let filteredPackages = mockPackages

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        filteredEvents = filteredEvents.filter(event => 
          event.title.toLowerCase().includes(searchLower) ||
          event.venue.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower)
        )
        filteredVenues = filteredVenues.filter(venue =>
          venue.name.toLowerCase().includes(searchLower) ||
          venue.category.toLowerCase().includes(searchLower) ||
          venue.location.toLowerCase().includes(searchLower)
        )
        filteredPackages = filteredPackages.filter(pkg =>
          pkg.name.toLowerCase().includes(searchLower) ||
          pkg.event.toLowerCase().includes(searchLower) ||
          pkg.venue.toLowerCase().includes(searchLower)
        )
      }

      if (filters.category !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === filters.category)
        filteredPackages = filteredPackages.filter(pkg => pkg.category === filters.category)
      }

      if (filters.location !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.location === filters.location)
        filteredVenues = filteredVenues.filter(venue => venue.location === filters.location)
        filteredPackages = filteredPackages.filter(pkg => pkg.location === filters.location)
      }

      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''))
        filteredEvents = filteredEvents.filter(event => {
          if (max) return event.price >= parseInt(min) && event.price <= parseInt(max)
          return event.price >= parseInt(min)
        })
        filteredPackages = filteredPackages.filter(pkg => {
          if (max) return pkg.price >= parseInt(min) && pkg.price <= parseInt(max)
          return pkg.price >= parseInt(min)
        })
      }

      setResults({
        events: filteredEvents,
        venues: filteredVenues,
        packages: filteredPackages,
        total: filteredEvents.length + filteredVenues.length + filteredPackages.length
      })
      setLoading(false)
    }, 500)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams)
    if (searchTerm) {
      newSearchParams.set('q', searchTerm)
    } else {
      newSearchParams.delete('q')
    }
    setSearchParams(newSearchParams)
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    const newSearchParams = new URLSearchParams(searchParams)
    if (value && value !== 'all') {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    setSearchParams(newSearchParams)
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      location: 'all',
      priceRange: 'all',
      date: '',
      rating: 'all',
      availability: 'all'
    })
    setSearchParams(new URLSearchParams({ q: searchTerm, tab: activeTab }))
  }

  const categories = [
    'Luxury Brunch', 'Party', 'Beach Brunch', 'Family Friendly', 'Business Lunch', 'Date Night'
  ]

  const locations = [
    'Downtown Dubai', 'Palm Jumeirah', 'Burj Al Arab', 'DIFC', 'Bur Dubai', 'Dubai Marina'
  ]

  const priceRanges = [
    { value: '0-150', label: 'Under AED 150' },
    { value: '150-250', label: 'AED 150 - 250' },
    { value: '250-350', label: 'AED 250 - 350' },
    { value: '350+', label: 'Above AED 350' }
  ]

  const getActiveResults = () => {
    switch (activeTab) {
      case 'events': return results.events
      case 'venues': return results.venues
      case 'packages': return results.packages
      default: return [...results.events, ...results.venues, ...results.packages]
    }
  }

  const renderResults = () => {
    const activeResults = getActiveResults()
    
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-soft animate-pulse">
              <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )
    }

    if (activeResults.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
          <button
            onClick={clearFilters}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )
    }

    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {activeResults.map((item, index) => {
          if (item.title) {
            // Event
            return <EventCard key={`event-${item.id}`} event={item} />
          } else if (item.name && item.upcomingEvents !== undefined) {
            // Venue
            return <VenueCard key={`venue-${item.id}`} venue={item} viewMode={viewMode} />
          } else {
            // Package
            return (
              <div key={`package-${item.id}`} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 mb-3">{item.event}</p>
                  <p className="text-sm text-neutral-500 mb-4">{item.venue} • {item.location}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-600">Up to {item.maxGuests} guests</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary-600">AED {item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-neutral-500 line-through">AED {item.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-500">per person</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/packages/${item.id}`}
                      className="flex-1 btn-primary text-center text-sm"
                    >
                      View Package
                    </Link>
                    <Link 
                      to={`/events/${item.event.toLowerCase().replace(/\s+/g, '-')}`}
                      className="btn-secondary px-4 text-sm"
                    >
                      Event
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-neutral-100">
        <div className="max-w-7xl mx-auto container-padding py-8">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
              Explore Dubai's Best Experiences
            </h1>
            <p className="text-xl text-neutral-600">
              Discover events, venues, and packages tailored to your preferences
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search events, venues, packages, or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-neutral-50 focus:bg-white transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
              >
                Search
              </button>
            </div>
          </form>

          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1 bg-neutral-100 rounded-2xl p-1">
              {[
                { key: 'all', label: 'All Results', count: results.total },
                { key: 'events', label: 'Events', count: results.events.length },
                { key: 'venues', label: 'Venues', count: results.venues.length },
                { key: 'packages', label: 'Packages', count: results.packages.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key)
                    const newSearchParams = new URLSearchParams(searchParams)
                    newSearchParams.set('tab', tab.key)
                    setSearchParams(newSearchParams)
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-white text-primary-600 shadow-soft'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                  showFilters
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>

              <div className="flex space-x-1 bg-neutral-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-soft'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-soft'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    <option value="all">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    <option value="all">All Prices</option>
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => updateFilter('date', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-neutral-600 hover:text-neutral-800 font-medium"
                >
                  Clear All Filters
                </button>
                <span className="text-sm text-neutral-600">
                  {getActiveResults().length} results found
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto container-padding py-8">
        {renderResults()}
      </div>
    </div>
  )
}

export default ExplorePage