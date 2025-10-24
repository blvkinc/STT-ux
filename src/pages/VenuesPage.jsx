import React, { useState } from 'react'
import { Search, Filter, MapPin, Star, Grid, List } from 'lucide-react'
import VenueCard from '../components/VenueCard'

const VenuesPage = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    location: '',
    amenities: []
  })

  const venues = [
    {
      id: 1,
      name: "Azure Beach Club",
      description: "Luxury beachfront dining with ocean views",
      address: "Palm Jumeirah, Dubai",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      priceRange: "AED 200-500",
      category: "Beach Club",
      amenities: ["Ocean View", "Pool", "Valet Parking"],
      upcomingEvents: 3
    },
    {
      id: 2,
      name: "Sky Lounge Dubai",
      description: "Rooftop dining with city skyline views",
      address: "Downtown Dubai",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      priceRange: "AED 150-400",
      category: "Rooftop Bar",
      amenities: ["City View", "Live Music", "Cocktail Bar"],
      upcomingEvents: 5
    },
    {
      id: 3,
      name: "Al Muntaha Restaurant",
      description: "Fine dining at Burj Al Arab",
      address: "Burj Al Arab, Dubai",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      priceRange: "AED 300-800",
      category: "Fine Dining",
      amenities: ["Michelin Star", "Ocean View", "Valet Parking"],
      upcomingEvents: 2
    },
    {
      id: 4,
      name: "Marina Sports Bar",
      description: "Sports viewing with great food and drinks",
      address: "Dubai Marina",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      priceRange: "AED 100-250",
      category: "Sports Bar",
      amenities: ["Multiple Screens", "Live Sports", "Happy Hour"],
      upcomingEvents: 8
    }
  ]

  const categories = [
    "All Categories",
    "Beach Club",
    "Rooftop Bar", 
    "Fine Dining",
    "Sports Bar",
    "Night Club",
    "Casual Dining"
  ]

  const priceRanges = [
    "All Prices",
    "AED 0-150",
    "AED 150-300",
    "AED 300-500",
    "AED 500+"
  ]

  const locations = [
    "All Locations",
    "Downtown Dubai",
    "Dubai Marina",
    "Palm Jumeirah",
    "Burj Al Arab",
    "JBR",
    "DIFC"
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-neutral-100">
        <div className="max-w-7xl mx-auto container-padding py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-neutral-800 mb-2">Discover Venues</h1>
              <p className="text-neutral-600 text-lg">Find the perfect venue for your next dining experience</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-neutral-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-soft text-primary-600' : 'text-neutral-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-soft text-primary-600' : 'text-neutral-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-neutral-500 hover:text-neutral-700"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Search Venues</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or cuisine..."
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Minimum Rating</label>
                  <div className="flex items-center space-x-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({...filters, rating: rating})}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                          filters.rating === rating
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({category: '', priceRange: '', rating: '', location: '', amenities: []})}
                  className="w-full btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-neutral-600">
                  Showing <span className="font-semibold">{venues.length}</span> venues
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden btn-secondary flex items-center space-x-2"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                
                <select className="p-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none">
                  <option>Sort by Relevance</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Price (Low to High)</option>
                  <option>Sort by Price (High to Low)</option>
                  <option>Sort by Distance</option>
                </select>
              </div>
            </div>

            {/* Venues Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-6'
            }>
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} viewMode={viewMode} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-secondary px-8 py-3">
                Load More Venues
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenuesPage