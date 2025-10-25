import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Building } from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'

const MerchantAuthPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { loginMerchant } = useMerchant()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear errors when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await loginMerchant(formData.email, formData.password)
      if (result.success) {
        setSuccess('Login successful! Redirecting to dashboard...')
        // Redirect based on role
        const redirectPath = formData.email === 'admin@stt.com' ? '/admin/dashboard' : '/merchant/dashboard'
        setTimeout(() => navigate(redirectPath), 1500)
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
              <Building className="text-white font-bold text-xl w-6 h-6" />
            </div>
            <span className="font-bold text-3xl text-neutral-800">STT Business</span>
          </Link>
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Welcome Back
          </h2>
          <p className="text-neutral-600 text-lg">
            Sign in to your merchant dashboard
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="p-8">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                    placeholder="business@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                    placeholder="••••••••"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 space-y-4">
              {/* Merchant Credentials */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <h4 className="font-semibold text-blue-800 mb-2">🏢 Merchant Demo</h4>
                <p className="text-blue-700 text-sm mb-2">Regular merchant account:</p>
                <div className="text-blue-600 text-sm font-mono space-y-1">
                  <p>Email: merchant@example.com</p>
                  <p>Password: password123</p>
                </div>
              </div>

              {/* Super Admin Credentials */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <h4 className="font-semibold text-red-800 mb-2">🛡️ Super Admin Demo</h4>
                <p className="text-red-700 text-sm mb-2">Platform administrator access:</p>
                <div className="text-red-600 text-sm font-mono space-y-1">
                  <p>Email: admin@stt.com</p>
                  <p>Password: admin123</p>
                </div>
                <p className="text-red-600 text-xs mt-2">⚠️ Full platform management access</p>
              </div>

              {/* Quick Fill Buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({ email: 'merchant@example.com', password: 'password123' })}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Fill Merchant
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ email: 'admin@stt.com', password: 'admin123' })}
                  className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Fill Admin
                </button>
              </div>

              {/* Debug Clear Storage */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                  className="w-full px-3 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors"
                >
                  🔧 Clear Storage & Refresh (Debug)
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-neutral-600">
                New to Set The Table?
              </span>
              <Link
                to="/merchant/onboarding"
                className="ml-1 text-primary-600 hover:text-primary-500 font-medium"
              >
                Apply to become a partner
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="card">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Why Partner with STT?
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-neutral-600">
              <div>
                <div className="text-2xl mb-1">📈</div>
                <div>Increase Revenue</div>
              </div>
              <div>
                <div className="text-2xl mb-1">👥</div>
                <div>Reach More Customers</div>
              </div>
              <div>
                <div className="text-2xl mb-1">📊</div>
                <div>Analytics & Insights</div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Customer Site */}
        <div className="text-center">
          <Link to="/" className="text-neutral-500 hover:text-primary-500 text-sm">
            ← Back to customer site
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MerchantAuthPage