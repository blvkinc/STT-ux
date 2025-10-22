import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-2xl">Set The Table</span>
            </div>
            <p className="text-neutral-300 mb-8 max-w-md text-lg leading-relaxed">
              Dubai&apos;s premier marketplace for curated brunch and party experiences. 
              Discover amazing venues and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-neutral-700 hover:bg-primary-500 rounded-2xl transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-neutral-700 hover:bg-primary-500 rounded-2xl transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-neutral-700 hover:bg-primary-500 rounded-2xl transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/events" className="text-neutral-300 hover:text-primary-400 transition-colors text-lg">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-300 hover:text-primary-400 transition-colors text-lg">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-300 hover:text-primary-400 transition-colors text-lg">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-300 hover:text-primary-400 transition-colors text-lg">
                  Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-700 rounded-xl">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-neutral-300 text-lg">Dubai, UAE</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-700 rounded-xl">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-neutral-300 text-lg">+971 XX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-700 rounded-xl">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-neutral-300 text-lg">hello@setthetable.ae</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-lg">
            © 2024 Set The Table. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link to="#" className="text-neutral-400 hover:text-primary-400 text-lg transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-neutral-400 hover:text-primary-400 text-lg transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
