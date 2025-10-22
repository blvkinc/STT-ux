import React, { createContext, useContext, useState, useEffect } from 'react'

const MerchantContext = createContext()

export const useMerchant = () => {
  const context = useContext(MerchantContext)
  if (!context) {
    throw new Error('useMerchant must be used within a MerchantProvider')
  }
  return context
}

export const MerchantProvider = ({ children }) => {
  const [merchant, setMerchant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])
  const [bookings, setBookings] = useState([])

  // Check for existing merchant on app load
  useEffect(() => {
    const savedMerchant = localStorage.getItem('stt_merchant')
    if (savedMerchant) {
      setMerchant(JSON.parse(savedMerchant))
      loadMerchantData()
    }
    setLoading(false)
  }, [])

  const loadMerchantData = () => {
    // Load venues
    const savedVenues = localStorage.getItem('stt_merchant_venues')
    if (savedVenues) {
      setVenues(JSON.parse(savedVenues))
    }

    // Load events
    const savedEvents = localStorage.getItem('stt_merchant_events')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }

    // Load bookings
    const savedBookings = localStorage.getItem('stt_merchant_bookings')
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }

  const registerMerchant = async (merchantData) => {
    const { businessName, email, phone, password, venueData } = merchantData
    
    if (businessName && email && phone && password.length >= 6) {
      const newMerchant = {
        id: Date.now(),
        email,
        businessName,
        phone,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        status: 'Pending Approval',
        subscriptionType: 'Free',
        totalRevenue: 0,
        totalBookings: 0,
        totalEvents: 0,
        rating: 0,
        venueData
      }
      
      setMerchant(newMerchant)
      localStorage.setItem('stt_merchant', JSON.stringify(newMerchant))
      return { success: true }
    }
    
    return { success: false, error: 'Please fill all required fields' }
  }

  const loginMerchant = async (email, password) => {
    // Simple validation - in real app this would be API call
    if (email && password.length >= 6) {
      const merchantData = {
        id: Date.now(),
        email,
        businessName: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Restaurant',
        phone: '+971 4 123 4567',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        status: 'Approved',
        subscriptionType: 'Free',
        totalRevenue: 15420,
        totalBookings: 89,
        totalEvents: 12,
        rating: 4.6
      }
      
      setMerchant(merchantData)
      localStorage.setItem('stt_merchant', JSON.stringify(merchantData))
      loadMerchantData()
      return { success: true }
    }
    
    return { success: false, error: 'Invalid credentials' }
  }

  const logoutMerchant = () => {
    setMerchant(null)
    setVenues([])
    setEvents([])
    setBookings([])
    localStorage.removeItem('stt_merchant')
  }

  const updateMerchant = (updates) => {
    const updatedMerchant = { ...merchant, ...updates }
    setMerchant(updatedMerchant)
    localStorage.setItem('stt_merchant', JSON.stringify(updatedMerchant))
  }

  const addVenue = (venueData) => {
    const newVenue = {
      id: Date.now(),
      ...venueData,
      merchantId: merchant.id,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    }
    
    const updatedVenues = [...venues, newVenue]
    setVenues(updatedVenues)
    localStorage.setItem('stt_merchant_venues', JSON.stringify(updatedVenues))
    return newVenue
  }

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      merchantId: merchant.id,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      views: 0,
      bookings: 0
    }
    
    const updatedEvents = [...events, newEvent]
    setEvents(updatedEvents)
    localStorage.setItem('stt_merchant_events', JSON.stringify(updatedEvents))
    return newEvent
  }

  const updateEvent = (eventId, updates) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    )
    setEvents(updatedEvents)
    localStorage.setItem('stt_merchant_events', JSON.stringify(updatedEvents))
  }

  const cloneEvent = (eventId) => {
    const originalEvent = events.find(e => e.id === eventId)
    if (originalEvent) {
      const clonedEvent = {
        ...originalEvent,
        id: Date.now(),
        title: `${originalEvent.title} (Copy)`,
        status: 'Draft',
        createdAt: new Date().toISOString(),
        views: 0,
        bookings: 0
      }
      
      const updatedEvents = [...events, clonedEvent]
      setEvents(updatedEvents)
      localStorage.setItem('stt_merchant_events', JSON.stringify(updatedEvents))
      return clonedEvent
    }
  }

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId)
    setEvents(updatedEvents)
    localStorage.setItem('stt_merchant_events', JSON.stringify(updatedEvents))
  }

  const value = {
    merchant,
    venues,
    events,
    bookings,
    loading,
    registerMerchant,
    loginMerchant,
    logoutMerchant,
    updateMerchant,
    addVenue,
    addEvent,
    updateEvent,
    cloneEvent,
    deleteEvent,
    isMerchantAuthenticated: !!merchant
  }

  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  )
}