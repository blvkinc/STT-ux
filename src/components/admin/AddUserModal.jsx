import React, { useState } from 'react'
import { X, User, Mail, Phone, MapPin, Shield, Building, AlertCircle, CheckCircle } from 'lucide-react'

const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Venue Admin',
    location: '',
    assignedVenues: [],
    permissions: [],
    password: '',
    confirmPassword: ''
  })

  const roles = [
    { value: 'Super Admin', label: 'Super Admin', description: 'Full platform access' },
    { value: 'Venue Admin', label: 'Venue Admin', description: 'Venue management access' }
  ]

  const permissions = [
    { id: 'venue_management', label: 'Venue Management', description: 'Create and manage venues' },
    { id: 'event_creation', label: 'Event Creation', description: 'Create and edit events' },
    { id: 'booking_management', label: 'Booking Management', description: 'Manage bookings and reservations' },
    { id: 'user_management', label: 'User Management', description: 'Manage other users (Super Admin only)' },
    { id: 'system_settings', label: 'System Settings', description: 'Access system configuration' },
    { id: 'analytics_access', label: 'Analytics Access', description: 'View detailed analytics' }
  ]

  const venues = [
    { id: 1, name: 'Burj Al Arab - Al Muntaha' },
    { id: 2, name: 'Atlantis The Palm - Ossiano' },
    { id: 3, name: 'Four Seasons Resort' },
    { id: 4, name: 'Sky Lounge Dubai' },
    { id: 5, name: 'Marina Sports Bar' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleRoleChange = (role) => {
    let defaultPermissions = []
    if (role === 'Super Admin') {
      defaultPermissions = permissions.map(p => p.id)
    } else if (role === 'Venue Admin') {
      defaultPermissions = ['venue_management', 'event_creation', 'booking_management']
    }
    
    setFormData(prev => ({
      ...prev,
      role,
      permissions: defaultPermissions
    }))
  }

  const handlePermissionChange = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const handleVenueChange = (venueId) => {
    setFormData(prev => ({
      ...prev,
      assignedVenues: prev.assignedVenues.includes(venueId)
        ? prev.assignedVenues.filter(v => v !== venueId)
        : [...prev.assignedVenues, venueId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await onSubmit(formData)
      setSuccess('User created successfully!')
      setTimeout(() => {
        onClose()
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: 'Venue Admin',
          location: '',
          assignedVenues: [],
          permissions: [],
          password: '',
          confirmPassword: ''
        })
        setSuccess('')
      }, 1500)
    } catch (err) {
      setError('Failed to create user. Please try again.')
    }

    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Add New User</h2>
              <p className="text-neutral-600">Create a new system administrator or venue manager</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-700">{success}</span>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    placeholder="Dubai, UAE"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Role & Permissions</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">User Role *</label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.value}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      formData.role === role.value
                        ? 'border-red-300 bg-red-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    onClick={() => handleRoleChange(role.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.role === role.value
                          ? 'border-red-500 bg-red-500'
                          : 'border-neutral-300'
                      }`}>
                        {formData.role === role.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-800">{role.label}</div>
                        <div className="text-sm text-neutral-600">{role.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className={`p-3 border rounded-xl cursor-pointer transition-colors ${
                      formData.permissions.includes(permission.id)
                        ? 'border-red-300 bg-red-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    } ${formData.role === 'Super Admin' && permission.id === 'user_management' ? '' : 
                       formData.role === 'Venue Admin' && permission.id === 'user_management' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      if (formData.role === 'Venue Admin' && permission.id === 'user_management') return
                      handlePermissionChange(permission.id)
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded border mt-0.5 ${
                        formData.permissions.includes(permission.id)
                          ? 'border-red-500 bg-red-500'
                          : 'border-neutral-300'
                      }`}>
                        {formData.permissions.includes(permission.id) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-800 text-sm">{permission.label}</div>
                        <div className="text-xs text-neutral-600">{permission.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Venue Assignment (only for Venue Admins) */}
          {formData.role === 'Venue Admin' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800">Venue Assignment</h3>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">Assigned Venues</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {venues.map((venue) => (
                    <div
                      key={venue.id}
                      className={`p-3 border rounded-xl cursor-pointer transition-colors ${
                        formData.assignedVenues.includes(venue.id)
                          ? 'border-red-300 bg-red-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                      onClick={() => handleVenueChange(venue.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border ${
                          formData.assignedVenues.includes(venue.id)
                            ? 'border-red-500 bg-red-500'
                            : 'border-neutral-300'
                        }`}>
                          {formData.assignedVenues.includes(venue.id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <Building className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium text-neutral-800">{venue.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">Security</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating User...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal