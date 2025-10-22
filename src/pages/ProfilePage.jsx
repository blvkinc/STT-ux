import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { User, Calendar, Heart, Gift, Star, Clock, Settings, Crown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  const { user, isAuthenticated, updateUser } = useAuth()
  const { bookings, favorites } = useBooking()

  // Redirect to auth if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }



  const rewardHistory = [
    { id: 1, action: "Booking Completed", points: 55, date: "2024-11-28" },
    { id: 2, action: "Friend Referral", points: 100, date: "2024-11-20" },
    { id: 3, action: "Booking Completed", points: 30, date: "2024-11-15" },
    { id: 4, action: "Account Upgrade", points: 200, date: "2024-11-01" }
  ]

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto container-padding py-12">
        {/* Profile Header */}
        <div className="card mb-8 border border-neutral-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center shadow-soft">
                  <User className="w-12 h-12 text-white" />
                </div>
                {user.accountType === "Premium" && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-soft">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">{user.name}</h1>
                    <p className="text-neutral-600 text-lg mb-1">{user.email}</p>
                    <p className="text-neutral-500">Member since {user.memberSince}</p>
                  </div>
                  
                  <div className="mt-6 md:mt-0">
                    <div className="flex flex-col items-start md:items-end space-y-2">
                      <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-soft">
                        {user.accountType} Member
                      </span>
                      {user.accountType === "Premium" && (
                        <div className="text-sm text-neutral-500">
                          {user.pointsToNextTier} points to {user.nextRewardTier}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-neutral-200">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{user.rewardPoints}</div>
                <div className="text-neutral-600 font-medium">Reward Points</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-accent-600 mb-1">{user.totalBookings}</div>
                <div className="text-neutral-600 font-medium">Total Bookings</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">{user.favoriteVenues}</div>
                <div className="text-neutral-600 font-medium">Favorite Venues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-neutral-800">My Bookings</h2>
              <Link to="/premium" className="btn-secondary text-sm">
                Upgrade to Premium
              </Link>
            </div>
            {bookings.map((booking) => (
              <div key={booking.id} className="card border border-neutral-100">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
                    <img
                      src={booking.image}
                      alt={booking.event}
                      className="w-full md:w-40 h-32 object-cover rounded-2xl shadow-soft"
                    />
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-neutral-800 mb-2">{booking.event}</h3>
                          <p className="text-neutral-600 font-medium mb-3">{booking.venue}</p>
                          <div className="flex items-center space-x-6 text-neutral-500">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-5 h-5 text-primary-400" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-primary-400" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right mt-6 md:mt-0">
                          <div className="text-2xl font-bold text-primary-600 mb-2">AED {booking.price}</div>
                          <span className={`inline-block px-4 py-2 rounded-2xl text-sm font-semibold shadow-soft ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {booking.status}
                          </span>
                          {booking.status === 'Completed' && (
                            <div className="mt-3">
                              <Link
                                to={`/review/${booking.id}`}
                                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                              >
                                <Star className="w-4 h-4" />
                                <span>Leave Review</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Favorite Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="card">
                  <div className="p-6">
                    <div className="flex space-x-4">
                      <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{favorite.name}</h3>
                        <p className="text-slate-600 text-sm">{favorite.venue}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{favorite.rating}</span>
                          </div>
                          <div className="text-primary-500 font-bold">AED {favorite.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-8">
            <div className="card border border-neutral-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Reward Points</h2>
                <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-3xl p-8 text-white shadow-soft-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-5xl font-bold mb-2">{user.rewardPoints}</div>
                      <div className="text-primary-100 text-lg">Available Points</div>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 mb-4">
                    <div className="text-primary-100 text-sm mb-1">Progress to {user.nextRewardTier}</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${((user.rewardPoints % 1000) / 1000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-white text-sm mt-1">{user.pointsToNextTier} points to go</div>
                  </div>
                  <div className="text-primary-100">
                    Redeem points for exclusive discounts and perks
                  </div>
                </div>
              </div>
            </div>

            {/* Redemption Options */}
            <div className="card border border-neutral-100">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">Redeem Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-neutral-800">AED 50 Discount</h4>
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">500 pts</span>
                    </div>
                    <p className="text-neutral-600 mb-4">Get AED 50 off your next booking</p>
                    <button className="btn-primary w-full">Redeem</button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-neutral-800">AED 100 Discount</h4>
                      <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">900 pts</span>
                    </div>
                    <p className="text-neutral-600 mb-4">Get AED 100 off your next booking</p>
                    <button className="btn-primary w-full">Redeem</button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-neutral-800">Free Dessert</h4>
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">200 pts</span>
                    </div>
                    <p className="text-neutral-600 mb-4">Complimentary dessert at participating venues</p>
                    <button className="btn-primary w-full">Redeem</button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 border border-accent-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-neutral-800">Priority Booking</h4>
                      <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">300 pts</span>
                    </div>
                    <p className="text-neutral-600 mb-4">Skip the queue for 30 days</p>
                    <button className="btn-primary w-full">Redeem</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border border-neutral-100">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">Points History</h3>
                <div className="space-y-4">
                  {rewardHistory.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-neutral-100 last:border-b-0">
                      <div>
                        <div className="font-semibold text-neutral-800">{item.action}</div>
                        <div className="text-neutral-500">{item.date}</div>
                      </div>
                      <div className="text-green-600 font-bold text-lg">+{item.points} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input type="text" value={user.name} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input type="email" value={user.email} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                        <input type="tel" value={user.phone} className="input-field" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2 text-slate-700">Email notifications for bookings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2 text-slate-700">SMS notifications for reminders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-slate-700">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
