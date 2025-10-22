import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import EventCard from '../components/EventCard'

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const events = [
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
      category: "Luxury Brunch"
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
      category: "Party"
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
      category: "Beach Brunch"
    },
    {
      id: 4,
      title: "Family Brunch Buffet",
      venue: "Grand Hyatt Dubai",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 203,
      price: 179,
      location: "Bur Dubai",
      time: "12:00 PM - 4:00 PM",
      category: "Family Friendly"
    },
    {
      id: 5,
      title: "Business Lunch Meeting",
      venue: "Four Seasons Resort",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      price: 149,
      location: "DIFC",
      time: "12:00 PM - 3:00 PM",
      category: "Business Lunch"
    },
    {
      id: 6,
      title: "Romantic Dinner Date",
      venue: "Atmosphere Restaurant",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 312,
      price: 399,
      location: "Burj Khalifa",
      time: "7:00 PM - 11:00 PM",
      category: "Date Night"
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Luxury Brunch', label: 'Luxury Brunch' },
    { value: 'Party', label: 'Rooftop Parties' },
    { value: 'Beach Brunch', label: 'Beach Clubs' },
    { value: 'Family Friendly', label: 'Family Friendly' },
    { value: 'Business Lunch', label: 'Business Lunch' },
    { value: 'Date Night', label: 'Date Night' }
  ]

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'Downtown Dubai', label: 'Downtown Dubai' },
    { value: 'Palm Jumeirah', label: 'Palm Jumeirah' },
    { value: 'Burj Al Arab', label: 'Burj Al Arab' },
    { value: 'DIFC', label: 'DIFC' },
    { value: 'Bur Dubai', label: 'Bur Dubai' },
    { value: 'Burj Khalifa', label: 'Burj Khalifa' }
  ]

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-150', label: 'Under AED 150' },
    { value: '150-250', label: 'AED 150 - 250' },
    { value: '250-350', label: 'AED 250 - 350' },
    { value: '350+', label: 'Above AED 350' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''))
      if (max) {
        matchesPrice = event.price >= parseInt(min) && event.price <= parseInt(max)
      } else {
        matchesPrice = event.price >= parseInt(min)
      }
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto container-padding py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-8">Discover Events</h1>
          
          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, venues, or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-neutral-50 focus:bg-white transition-all duration-300 text-lg"
              />
            </div>
            
            {/* Filter Toggle */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-slate-600 hover:text-primary-500"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <div className="text-slate-600">
                {filteredEvents.length} events found
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full input-field"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full input-field"
                  >
                    {locations.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full input-field"
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full input-field"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No events found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage
