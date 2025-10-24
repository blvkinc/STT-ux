import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Star, Clock, Phone, Globe, Calendar, ArrowRight, Heart, Share2 } from 'lucide-react'
import EventCard from '../components/EventCard'

const VenueDetailsPage = () => {
  const { id } = useParams()
  const [venue, setVenue] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock venue data - replace with actual API call
    const mockVenue = {
      id: parseInt(id),
      name: "Azure Beach Club",
      description: "Experience luxury dining with breathtaking ocean views at Dubai's premier beachfront destination. Our award-winning chefs create culinary masterpieces while you enjoy the pristine beach setting.",
      address: "Palm Jumeirah, Dubai, UAE",
      phone: "+971 4 123 4567",
      website: "www.azurebeachclub.ae",
      rating: 4.7,
      reviews: 156,
      priceRange: "AED 200-500",
      images: [
        "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop"
      ],
      amenities: [
        "Ocean View Terrace",
        "Private Beach Access",
        "Infinity Pool",
        "Valet Parking",
        "Live Entertainment",
        "Kids Area"
      ],
      dressCode: "Smart Casual",
      highlights: [
        "Award-winning cuisine",
        "Sunset views",
        "Private cabanas available",
        "Live DJ weekends"
      ],
      openingHours: {
        monday: "10:00 AM - 12:00 AM",
        tuesday: "10:00 AM - 12:00 AM",
        wednesday: "10:00 AM - 12:00 AM",
        thursday: "10:00 AM - 1:00 AM",
        friday: "10:00 AM - 2:00 AM",
        saturday: "10:00 AM - 2:00 AM",
        sunday: "10:00 AM - 12:00 AM"
      },
      upcomingEvents: [
        {
          id: 1,
          title: "Beach Club Brunch",
          date: "2024-01-15",
          time: "12:00 PM - 4:00 PM",
          price: 249,
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop"
        },
        {
          id: 2,
          title: "Sunset Pool Party",
          date: "2024-01-20",
          time: "6:00 PM - 11:00 PM",
          price: 199,
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop"
        }
      ]
    }
    setVenue(mockVenue)
  }, [id])

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img 
          src={venue.images[0]} 
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-end">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{venue.name}</h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{venue.rating}</span>
                  <span className="text-neutral-300">({venue.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>{venue.address}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-8 border-b border-neutral-200 mb-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'events', label: 'Events' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'gallery', label: 'Gallery' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">About {venue.name}</h2>
                  <p className="text-neutral-600 text-lg leading-relaxed">{venue.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-neutral-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Dress Code</h3>
                    <p className="text-neutral-600">{venue.dressCode}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Highlights</h3>
                    <ul className="space-y-2">
                      {venue.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                          <span className="text-neutral-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {venue.upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100">
                      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-neutral-800 mb-2">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-neutral-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary-600">AED {event.price}</span>
                          <Link to={`/events/${event.id}`} className="btn-primary">
                            View Event
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link to="/events" className="btn-secondary">
                    See All Events
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-primary-600">JD</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-neutral-800">John Doe</span>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral-600">
                            Amazing experience! The food was exceptional and the ocean view was breathtaking. 
                            Staff was very attentive and the atmosphere was perfect for our celebration.
                          </p>
                          <span className="text-sm text-neutral-500 mt-2 block">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-2xl overflow-hidden">
                      <img src={image} alt={`${venue.name} ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-700">{venue.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-700">{venue.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-700">{venue.website}</span>
                </div>
              </div>
              <button className="w-full btn-primary mt-6">
                Get Directions
              </button>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Opening Hours</h3>
              <div className="space-y-2">
                {Object.entries(venue.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize text-neutral-600">{day}</span>
                    <span className="text-neutral-800">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Price Range</h3>
              <p className="text-2xl font-bold text-primary-600">{venue.priceRange}</p>
              <p className="text-neutral-600 text-sm mt-2">Per person (average)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueDetailsPage