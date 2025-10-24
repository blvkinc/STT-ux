import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react'

const VenueCard = ({ venue, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
            <img 
              src={venue.image} 
              alt={venue.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-700">
                {venue.category}
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-2 hover:text-primary-600 transition-colors">
                  <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
                </h3>
                <p className="text-neutral-600 mb-3">{venue.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{venue.upcomingEvents} upcoming events</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600 mb-1">{venue.priceRange}</div>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{venue.rating}</span>
                  <span className="text-neutral-500 text-sm">({venue.reviews})</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {venue.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
              {venue.amenities.length > 3 && (
                <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm">
                  +{venue.amenities.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                to={`/venues/${venue.id}`}
                className="btn-primary flex items-center space-x-2"
              >
                <span>View Venue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to={`/venues/${venue.id}#events`}
                className="btn-secondary"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-700">
            {venue.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
        </h3>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">{venue.description}</p>
        
        <div className="flex items-center space-x-1 text-neutral-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{venue.address}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.amenities.slice(0, 2).map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs">
              {amenity}
            </span>
          ))}
          {venue.amenities.length > 2 && (
            <span className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs">
              +{venue.amenities.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-primary-600">{venue.priceRange}</div>
          <div className="text-sm text-neutral-500">
            {venue.upcomingEvents} events
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to={`/venues/${venue.id}`}
            className="flex-1 btn-primary text-center"
          >
            View Venue
          </Link>
          <Link 
            to={`/venues/${venue.id}#events`}
            className="btn-secondary px-4"
          >
            Events
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueCard