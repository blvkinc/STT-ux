import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Users, ArrowRight, Calendar, Gift } from 'lucide-react'
import EventCard from '../components/EventCard'

const HomePage = () => {
  const featuredEvents = [
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
    }
  ]

  const categories = [
    { name: "Luxury Brunch", icon: "🥂", count: 45 },
    { name: "Rooftop Parties", icon: "🌃", count: 32 },
    { name: "Beach Clubs", icon: "🏖️", count: 28 },
    { name: "Sports Bars", icon: "⚽", count: 22 },
    { name: "Ladies Night", icon: "💃", count: 18 },
    { name: "Ocean View", icon: "🌊", count: 35 }
  ]

  const topVenues = [
    {
      id: 1,
      name: "Azure Beach Club",
      category: "Beach Club",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Palm Jumeirah",
      upcomingEvents: 3
    },
    {
      id: 2,
      name: "Sky Lounge Dubai",
      category: "Rooftop Bar",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      location: "Downtown Dubai",
      upcomingEvents: 5
    },
    {
      id: 3,
      name: "Marina Sports Grill",
      category: "Sports Bar",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      location: "Dubai Marina",
      upcomingEvents: 8
    }
  ]

  const bucketListExperiences = [
    {
      id: 1,
      title: "Burj Al Arab Gold Brunch",
      venue: "Al Muntaha Restaurant",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      price: 899,
      category: "Ultra Luxury",
      exclusive: true
    },
    {
      id: 2,
      title: "Private Yacht Brunch",
      venue: "Dubai Marina Yacht Club",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      price: 1299,
      category: "Exclusive Experience",
      exclusive: true
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-accent-100/20"></div>
        <div className="relative max-w-7xl mx-auto container-padding section-padding">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-700 mb-8 shadow-soft">
              ✨ Dubai&apos;s Premier Dining Experience Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-800 leading-tight">
              Discover Dubai&apos;s Best
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Brunch & Party Experiences
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Curated venues, exclusive packages, and unforgettable moments await you in the heart of Dubai
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-3 shadow-soft-lg border border-neutral-100">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events, venues, or cuisine..."
                    className="w-full pl-12 pr-4 py-4 text-neutral-800 rounded-2xl bg-neutral-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all duration-300"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="date"
                    className="w-full md:w-auto pl-12 pr-4 py-4 text-neutral-800 rounded-2xl bg-neutral-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all duration-300"
                  />
                </div>
                <Link to="/explore" className="btn-primary whitespace-nowrap px-8 py-4 text-center">
                  Find Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Browse by Category</h2>
            <p className="text-neutral-600 text-xl max-w-2xl mx-auto">Find the perfect experience for any occasion in Dubai&apos;s finest venues</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/events?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 text-center hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 border border-neutral-100 group-hover:border-primary-200">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="font-semibold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors text-lg">
                    {category.name}
                  </h3>
                  <p className="text-neutral-500 text-sm">{category.count} venues</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Featured Events</h2>
              <p className="text-neutral-600 text-xl">Handpicked experiences you'll love, curated by our experts</p>
            </div>
            <Link to="/events" className="btn-secondary flex items-center space-x-2 px-6 py-3">
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Top Venues</h2>
              <p className="text-neutral-600 text-xl">Dubai's most popular dining destinations</p>
            </div>
            <Link to="/venues" className="btn-secondary flex items-center space-x-2 px-6 py-3">
              <span>View All Venues</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topVenues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
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
                  
                  <div className="flex items-center space-x-1 text-neutral-500 mb-4">
                    <span className="text-sm">{venue.location}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-sm">{venue.upcomingEvents} events</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Bucket List Experiences */}
      <section className="section-padding bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Bucket List Experiences</h2>
            <p className="text-neutral-600 text-xl max-w-2xl mx-auto">Once-in-a-lifetime dining experiences that define luxury in Dubai</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bucketListExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-2xl overflow-hidden shadow-soft-lg border border-neutral-100 hover:shadow-soft-xl transition-all duration-300 hover:-translate-y-2 group relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-accent-500 to-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Exclusive
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
                    <p className="text-neutral-200">{experience.venue}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                      {experience.category}
                    </span>
                    <span className="text-3xl font-bold text-primary-600">AED {experience.price}</span>
                  </div>
                  
                  <Link 
                    to={`/events/${experience.id}`}
                    className="w-full btn-primary text-center"
                  >
                    Reserve Experience
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Unlock Premium Benefits</h2>
            <p className="text-neutral-600 text-xl max-w-2xl mx-auto">Join our loyalty program and earn rewards with every booking experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">Earn Rewards</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">Get points for every booking and referral to unlock exclusive discounts</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">Exclusive Access</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">Early access to new venues and special events before anyone else</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-3">Priority Support</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">Dedicated customer service and priority booking assistance</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/auth" className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2">
              <span>Upgrade to Premium</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-br from-primary-100 via-accent-50 to-neutral-100">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="bg-white rounded-3xl p-12 shadow-soft-lg border border-neutral-100">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">Stay in the Loop</h2>
            <p className="text-neutral-600 text-xl mb-8 max-w-2xl mx-auto">
              Get the latest updates on new venues, exclusive events, and special offers delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-neutral-50 focus:bg-white transition-all duration-300"
              />
              <button className="btn-primary px-8 py-4 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <p className="text-neutral-500 text-sm mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>

      {/* Merchant CTA */}
      <section className="section-padding bg-gradient-to-br from-neutral-800 to-neutral-900 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Partner with Dubai's Premier Dining Platform
              </h2>
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                Join 150+ top venues and restaurants. Increase your revenue, reach more customers, and grow your business with Set The Table.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-primary-400 font-bold text-lg">+40%</div>
                  <div className="text-neutral-400 text-sm">Average Revenue Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-primary-400 font-bold text-lg">50K+</div>
                  <div className="text-neutral-400 text-sm">Active Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-primary-400 font-bold text-lg">4.8/5</div>
                  <div className="text-neutral-400 text-sm">Partner Satisfaction</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/merchant/onboarding" className="btn-primary text-lg px-8 py-4">
                  Become a Partner
                </Link>
                <Link to="/merchant/auth" className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Partner Login
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose STT?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-neutral-200">Zero setup fees - start earning immediately</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-neutral-200">Comprehensive analytics and insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-neutral-200">Marketing and promotional support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-neutral-200">Dedicated account management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-neutral-800 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
            <p className="text-neutral-300 text-xl">Join our growing community of food and experience lovers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">150+</div>
              <div className="text-neutral-300 text-lg">Partner Venues</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-neutral-300 text-lg">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">25K+</div>
              <div className="text-neutral-300 text-lg">Events Hosted</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-primary-400 mb-3 group-hover:scale-110 transition-transform duration-300">4.8</div>
              <div className="text-neutral-300 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
