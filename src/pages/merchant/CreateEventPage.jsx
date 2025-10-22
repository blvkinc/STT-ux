import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Calendar, Clock, Users, DollarSign, Plus, X, AlertCircle, CheckCircle } from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const CreateEventPage = () => {
  const { merchant, addEvent, isMerchantAuthenticated } = useMerchant()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    images: [],
    packages: [
      {
        id: 1,
        name: 'Individual Package',
        type: 'individual',
        price: '',
        guestCount: 1,
        description: '',
        includes: ['']
      }
    ],
    tags: [],
    specialRequirements: '',
    cancellationPolicy: '',
    isDraft: true
  })

  const eventTypes = [
    'Brunch',
    'Lunch',
    'Dinner',
    'High Tea',
    'Business Meeting',
    'Private Event',
    'Celebration',
    'Date Night',
    'Family Gathering',
    'Other'
  ]

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setEventData({
      ...eventData,
      images: [...eventData.images, ...files.slice(0, 5 - eventData.images.length)]
    })
  }

  const removeImage = (index) => {
    setEventData({
      ...eventData,
      images: eventData.images.filter((_, i) => i !== index)
    })
  }

  const addPackage = () => {
    const newPackage = {
      id: Date.now(),
      name: '',
      type: 'individual',
      price: '',
      guestCount: 1,
      description: '',
      includes: ['']
    }
    setEventData({
      ...eventData,
      packages: [...eventData.packages, newPackage]
    })
  }

  const updatePackage = (packageId, field, value) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId ? { ...pkg, [field]: value } : pkg
      )
    })
  }

  const removePackage = (packageId) => {
    if (eventData.packages.length > 1) {
      setEventData({
        ...eventData,
        packages: eventData.packages.filter(pkg => pkg.id !== packageId)
      })
    }
  }

  const addIncludeItem = (packageId) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, includes: [...pkg.includes, ''] }
          : pkg
      )
    })
  }

  const updateIncludeItem = (packageId, index, value) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId 
          ? { 
              ...pkg, 
              includes: pkg.includes.map((item, i) => i === index ? value : item)
            }
          : pkg
      )
    })
  }

  const removeIncludeItem = (packageId, index) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, includes: pkg.includes.filter((_, i) => i !== index) }
          : pkg
      )
    })
  }

  const handleSubmit = async (e, isDraft = true) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const newEvent = addEvent({
        ...eventData,
        status: isDraft ? 'Draft' : 'Pending Approval'
      })

      setSuccess(`Event ${isDraft ? 'saved as draft' : 'submitted for approval'} successfully!`)
      setTimeout(() => {
        navigate('/merchant/events')
      }, 2000)
    } catch (err) {
      setError('Failed to create event. Please try again.')
    }

    setLoading(false)
  }

  return (
    <MerchantLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link to="/merchant/events" className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Events</span>
            </Link>
            <h1 className="text-3xl font-bold text-neutral-800">Create New Event</h1>
            <p className="text-neutral-600">Create a new dining experience for your customers</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-8">
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
          <div className="card border border-neutral-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="e.g., Weekend Brunch Buffet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Describe your event, cuisine, ambiance, and what makes it special..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={eventData.eventType}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Capacity (guests)
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="number"
                        name="capacity"
                        value={eventData.capacity}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                        placeholder="Maximum guests"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleInputChange}
                        required
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Start Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="time"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleInputChange}
                        required
                        className="input-field pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      End Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="time"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleInputChange}
                        required
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card border border-neutral-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Event Images</h2>
              
              <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center hover:border-primary-400 transition-colors mb-6">
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="event-images"
                />
                <label htmlFor="event-images" className="cursor-pointer">
                  <span className="text-primary-600 font-medium text-lg">Upload Event Images</span>
                  <p className="text-neutral-500 mt-2">JPG, PNG up to 5MB each. Maximum 5 images.</p>
                </label>
              </div>

              {eventData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {eventData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Event ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Packages */}
          <div className="card border border-neutral-100">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">Packages</h2>
                <button
                  type="button"
                  onClick={addPackage}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Package</span>
                </button>
              </div>

              <div className="space-y-6">
                {eventData.packages.map((pkg, index) => (
                  <div key={pkg.id} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-800">Package {index + 1}</h3>
                      {eventData.packages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePackage(pkg.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Package Name *
                        </label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                          required
                          className="input-field"
                          placeholder="e.g., Individual Package"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Package Type *
                        </label>
                        <select
                          value={pkg.type}
                          onChange={(e) => updatePackage(pkg.id, 'type', e.target.value)}
                          required
                          className="input-field"
                        >
                          <option value="individual">Individual</option>
                          <option value="couple">Couple</option>
                          <option value="group">Group</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Price (AED) *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                            required
                            className="input-field pl-12"
                            placeholder="299"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Guest Count
                        </label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="number"
                            value={pkg.guestCount}
                            onChange={(e) => updatePackage(pkg.id, 'guestCount', parseInt(e.target.value))}
                            className="input-field pl-12"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Package Description
                      </label>
                      <textarea
                        value={pkg.description}
                        onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                        rows={2}
                        className="input-field resize-none"
                        placeholder="Brief description of what's included..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        What's Included
                      </label>
                      <div className="space-y-2">
                        {pkg.includes.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateIncludeItem(pkg.id, itemIndex, e.target.value)}
                              className="flex-1 input-field"
                              placeholder="e.g., Buffet access, Welcome drink"
                            />
                            {pkg.includes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeIncludeItem(pkg.id, itemIndex)}
                                className="text-red-600 hover:text-red-700 p-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addIncludeItem(pkg.id)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="card border border-neutral-100">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={eventData.specialRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Dress code, age restrictions, dietary accommodations, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    name="cancellationPolicy"
                    value={eventData.cancellationPolicy}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Cancellation and refund policy for this event..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>
        </form>
      </div>
    </MerchantLayout>
  )
}

export default CreateEventPage