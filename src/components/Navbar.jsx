import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, Heart, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-2xl text-neutral-800">Set The Table</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 ${
                isActive('/') ? 'text-primary-600 font-semibold' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`font-medium transition-all duration-300 ${
                isActive('/events') ? 'text-primary-600 font-semibold' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/venues" 
              className={`font-medium transition-all duration-300 ${
                isActive('/venues') ? 'text-primary-600 font-semibold' : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              Venues
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, venues..."
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-neutral-50 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/merchant/auth" 
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors"
            >
              For Businesses
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="p-3 text-neutral-600 hover:text-primary-500 hover:bg-primary-50 rounded-2xl transition-all duration-300">
                  <Heart className="w-5 h-5" />
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-3 text-neutral-600 hover:text-primary-500 hover:bg-primary-50 rounded-2xl transition-all duration-300"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-neutral-100 py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/premium"
                        className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Upgrade to Premium
                      </Link>
                      <hr className="my-2 border-neutral-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-neutral-100">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, venues..."
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-neutral-50"
                />
              </div>
              <Link to="/" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                Home
              </Link>
              <Link to="/events" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                Events
              </Link>
              <Link to="/venues" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                Venues
              </Link>
              <Link to="/merchant/auth" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                For Businesses
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                    Favorites
                  </Link>
                  <Link to="/profile" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                    Profile
                  </Link>
                  <Link to="/premium" className="text-neutral-600 hover:text-primary-500 font-medium py-2">
                    Upgrade to Premium
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-medium py-2 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="btn-primary text-center mt-4">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
