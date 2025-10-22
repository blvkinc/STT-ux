import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, Heart } from 'lucide-react'

const EventCard = ({ event }) => {
  return (
    <div className="group">
      <div className="card hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 border border-neutral-100 group-hover:border-primary-200">
        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4">
            <button className="p-2.5 bg-white/95 backdrop-blur-sm rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-soft">
              <Heart className="w-4 h-4 text-neutral-600 hover:text-red-500" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-primary-600 px-4 py-2 rounded-2xl text-sm font-semibold shadow-soft">
              {event.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-neutral-800">{event.rating}</span>
              <span className="text-sm text-neutral-500">({event.reviews} reviews)</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">AED {event.price}</div>
              <div className="text-sm text-neutral-500">per person</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors leading-tight">
            {event.title}
          </h3>
          
          <p className="text-neutral-600 mb-4 font-medium">{event.venue}</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <Clock className="w-4 h-4 text-primary-400" />
              <span>{event.time}</span>
            </div>
          </div>
          
          <Link
            to={`/events/${event.id}`}
            className="block w-full text-center btn-primary group-hover:shadow-soft-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
