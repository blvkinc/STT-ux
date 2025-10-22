import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const SettingsPage = () => {
  const { merchant, updateMerchant, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [formData, setFormData] = useState({
    // Profile
    businessName: merchant?.businessName || '',
    email: merchant?.email || '',
    phone: merchant?.phone || '',
    website: '',
    description: '',
    
    // Venue
    venueName: '',
    address: '',
    city: 'Dubai',
    capacity: '',
    
    // Banking
    bankName: '',
    accountNumber: '',
    iban: '',
    
    // Notifications
    emailBookings: true,
    emailPromotions: false,
    smsReminders: true,
    pushNotifications: true,
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handleSave = async (section) => {
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Mock save functionality
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (section === 'profile') {
        updateMerchant({
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone
        })
      }
      
      setMessage({ type: 'success', text: `${section} settings saved successfully!` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
    }
    
    setLoading(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'venue', label: 'Venue', icon: Building },
    { id: 'banking', label: 'Banking', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your account and business preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-4 rounded-2xl flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            <span className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
              {message.text}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card border border-neutral-100 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card border border-neutral-100">
              <div className="p-8">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Profile Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Business Name *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Business Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300 resize-none"
                        placeholder="Tell customers about your business..."
                      />
                    </div>

                    <button
                      onClick={() => handleSave('profile')}
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}

                {/* Venue Settings */}
                {activeTab === 'venue' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Venue Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Venue Name *
                        </label>
                        <input
                          type="text"
                          name="venueName"
                          value={formData.venueName}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Capacity
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Maximum guests"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300 resize-none"
                          placeholder="Full venue address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <button
                      onClick={() => handleSave('venue')}
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}

                {/* Banking Settings */}
                {activeTab === 'banking' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Banking Information</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Secure Information</span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Your banking information is encrypted and secure. This is used for payment processing only.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Emirates NBD"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Account number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        IBAN *
                      </label>
                      <input
                        type="text"
                        name="iban"
                        value={formData.iban}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="AE07 0331 2345 6789 0123 456"
                      />
                    </div>

                    <button
                      onClick={() => handleSave('banking')}
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                        <div>
                          <h3 className="font-semibold text-neutral-800">Email Notifications for Bookings</h3>
                          <p className="text-neutral-600 text-sm">Get notified when customers make new bookings</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailBookings"
                            checked={formData.emailBookings}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                        <div>
                          <h3 className="font-semibold text-neutral-800">Promotional Emails</h3>
                          <p className="text-neutral-600 text-sm">Receive marketing tips and platform updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailPromotions"
                            checked={formData.emailPromotions}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                        <div>
                          <h3 className="font-semibold text-neutral-800">SMS Reminders</h3>
                          <p className="text-neutral-600 text-sm">Get SMS alerts for important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="smsReminders"
                            checked={formData.smsReminders}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                        <div>
                          <h3 className="font-semibold text-neutral-800">Push Notifications</h3>
                          <p className="text-neutral-600 text-sm">Receive push notifications in your browser</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="pushNotifications"
                            checked={formData.pushNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave('notifications')}
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-neutral-800">Security Settings</h2>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Password Security</span>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Use a strong password with at least 8 characters, including numbers and special characters.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Current Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="input-field pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          New Password *
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Confirm New Password *
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave('security')}
                      disabled={loading}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>{loading ? 'Saving...' : 'Update Password'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default SettingsPage