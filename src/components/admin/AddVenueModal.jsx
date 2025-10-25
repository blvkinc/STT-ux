import React, { useState } from 'react'
import { X, Building, Mail, Phone, MapPin, User, Upload, AlertCircle, CheckCircle } from 'lucide-react'

const AddVenueModal = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  
  const [formData, setFormData] = useState({
    // Basic Information
    venueName: '',
    category: '',
    description: '',
    
    // Location
    address: '',
    city: 'Dubai',
    country: 'UAE',
    
    // Contact
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Venue Details
    capacity: '',
    priceRange: '',
    cuisineType: '',
    operatingHours: {
      monday: { open: '10:00', close: '23:00', closed: false },
      tuesday: { open: '10:00', close: '23:00', closed: false },
      wednesday: { open: '10:00', close: '23:00', closed: false },
      thursday: { open: '10:00', close: '23:00', closed: false },
      friday: { open: '10:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '23:00', closed: false }
    },
    
    // Features
    amenities: [],
    specialFeatures: [],
    
    // Assignment
    assignedAdmin: '',
    
    // Images
    images: []
  })

  const categories = [
    'Fine Dining',
    'Casual Dining', 
    'Rooftop Bar',
    'Beach Club',
    'Sports Bar',
    'Night Club',
    'Cafe',
    'Fast Food',
    'Food Court'
  ]

  const cuisineTypes = [
    'International',
    'Arabic',
    'Italian',
    'Japanese',
    'Chinese',
    'Indian',
    'French',
    'Mediterranean',
    'American',
    'Thai',
    'Mexican'
  ]

  const amenitiesList = [
    'Valet Parking',
    'Free WiFi',
    'Live Music',
    'Outdoor Seating',
    'Private Dining',
    'Kids Area',
    'Wheelchair Accessible',
    'Air Conditioning',
    'Smoking Area',
    'Pet Friendly'
  ]

  const specialFeaturesList = [
    'Ocean View',
    'City View',
    'Rooftop Terrace',
    'Private Beach',
    'Pool Access',
    'Spa Services',
    'Conference Rooms',
    'Event Space',
    'Live Entertainment',
    'Celebrity Chef'
  ]

  const venueAdmins = [
    { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@jumeirah.com' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@atlantis.com' },
    { id: 3, name: 'Michael Chen', email: 'michael@skyhospitality.ae' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }))
  }

  const handleArrayToggle = (array, item) => {
    setFormData(prev => ({
      ...prev,
      [array]: prev[array].includes(item)
        ? prev[array].filter(i => i !== item)
        : [...prev[array], item]
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.slice(0, 5 - prev.images.length)]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (!formData.venueName || !formData.category || !formData.contactEmail) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      await onSubmit(formData)
      setSuccess('Venue created successfully!')
      setTimeout(() => {
        onClose()
        // Reset form
        setFormData({
          venueName: '',
          category: '',
          description: '',
          address: '',
          city: 'Dubai',
          country: 'UAE',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          capacity: '',
          priceRange: '',
          cuisineType: '',
          operatingHours: {
            monday: { open: '10:00', close: '23:00', closed: false },
            tuesday: { open: '10:00', close: '23:00', closed: false },
            wednesday: { open: '10:00', close: '23:00', closed: false },
            thursday: { open: '10:00', close: '23:00', closed: false },
            friday: { open: '10:00', close: '23:00', closed: false },
            saturday: { open: '10:00', close: '23:00', closed: false },
            sunday: { open: '10:00', close: '23:00', closed: false }
          },
          amenities: [],
          specialFeatures: [],
          assignedAdmin: '',
          images: []
        })
        setCurrentStep(1)
        setSuccess('')
      }, 1500)
    } catch (err) {
      setError('Failed to create venue. Please try again.')
    }

    setLoading(false)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Add New Venue</h2>
              <p className="text-neutral-600">Create a new venue in the platform</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-red-600 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-red-600' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-neutral-600 mt-2">
            <span>Basic Info</span>
            <span>Location</span>
            <span>Details</span>
            <span>Assignment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-700">{success}</span>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Venue Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      name="venueName"
                      value={formData.venueName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                      placeholder="e.g., Burj Al Arab - Al Muntaha"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none resize-none"
                  placeholder="Describe the venue, its atmosphere, and unique features..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cuisine Type
                  </label>
                  <select
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                  >
                    <option value="">Select cuisine type</option>
                    {cuisineTypes.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price Range
                  </label>
                  <select
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                  >
                    <option value="">Select price range</option>
                    <option value="AED 50-150">AED 50-150</option>
                    <option value="AED 150-300">AED 150-300</option>
                    <option value="AED 300-500">AED 300-500</option>
                    <option value="AED 500+">AED 500+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Location & Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-neutral-800">Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Contact Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                        placeholder="Manager name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                        placeholder="contact@venue.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                        placeholder="+971 4 123 4567"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-neutral-100 mt-6">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary bg-red-600 hover:bg-red-700"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Creating Venue...' : 'Create Venue'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVenueModal