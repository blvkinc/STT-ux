import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { MerchantProvider } from './context/MerchantContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailsPage from './pages/EventDetailsPage'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import PremiumUpgradePage from './pages/PremiumUpgradePage'
import ReviewPage from './pages/ReviewPage'

// Merchant Pages
import MerchantAuthPage from './pages/merchant/MerchantAuthPage'
import MerchantOnboardingPage from './pages/merchant/MerchantOnboardingPage'
import MerchantDashboard from './pages/merchant/MerchantDashboard'
import MerchantEventsPage from './pages/merchant/EventsPage'
import CreateEventPage from './pages/merchant/CreateEventPage'
import BookingsPage from './pages/merchant/BookingsPage'
import AnalyticsPage from './pages/merchant/AnalyticsPage'
import PromotionsPage from './pages/merchant/PromotionsPage'
import AdvertisingPage from './pages/merchant/AdvertisingPage'
import SettingsPage from './pages/merchant/SettingsPage'

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MerchantProvider>
          <Router>
            <Routes>
              {/* Customer Routes */}
              <Route path="/*" element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/events" element={<EventsPage />} />
                      <Route path="/events/:id" element={<EventDetailsPage />} />
                      <Route path="/booking/:id" element={<BookingPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/premium" element={<PremiumUpgradePage />} />
                      <Route path="/review/:bookingId" element={<ReviewPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />

              {/* Merchant Routes */}
              <Route path="/merchant/auth" element={<MerchantAuthPage />} />
              <Route path="/merchant/onboarding" element={<MerchantOnboardingPage />} />
              <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
              <Route path="/merchant/events" element={<MerchantEventsPage />} />
              <Route path="/merchant/events/create" element={<CreateEventPage />} />
              <Route path="/merchant/bookings" element={<BookingsPage />} />
              <Route path="/merchant/analytics" element={<AnalyticsPage />} />
              <Route path="/merchant/promotions" element={<PromotionsPage />} />
              <Route path="/merchant/advertising" element={<AdvertisingPage />} />
              <Route path="/merchant/settings" element={<SettingsPage />} />
            </Routes>
          </Router>
        </MerchantProvider>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
