import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  TrendingUp, 
  Eye, 
  Target, 
  Zap,
  Star,
  Calendar,
  Users,
  DollarSign,
  Play,
  Pause,
  BarChart3,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const AdvertisingPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('internal')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock advertising data
  const internalPackages = [
    {
      id: 1,
      name: 'Featured Event',
      description: 'Highlight your event at the top of search results',
      price: 299,
      duration: '7 days',
      features: [
        'Top position in search results',
        'Featured badge on event card',
        'Priority in category listings',
        'Enhanced visibility'
      ],
      metrics: {
        impressions: 12500,
        clicks: 890,
        bookings: 23
      },
      isActive: true
    },
    {
      id: 2,
      name: 'Homepage Banner',
      description: 'Display your venue on the homepage banner',
      price: 599,
      duration: '14 days',
      features: [
        'Homepage banner placement',
        'High-resolution image display',
        'Direct link to your events',
        'Maximum exposure'
      ],
      metrics: {
        impressions: 45000,
        clicks: 2100,
        bookings: 67
      },
      isActive: false
    },
    {
      id: 3,
      name: 'Category Spotlight',
      description: 'Feature in specific category sections',
      price: 199,
      duration: '30 days',
      features: [
        'Category page prominence',
        'Spotlight badge',
        'Enhanced listing details',
        'Category-specific targeting'
      ],
      metrics: {
        impressions: 8900,
        clicks: 445,
        bookings: 18
      },
      isActive: true
    }
  ]

  const externalServices = [
    {
      id: 1,
      name: 'Social Media Management',
      description: 'Complete social media marketing across all platforms',
      price: 1299,
      duration: 'Monthly',
      features: [
        'Instagram, Facebook, Twitter management',
        'Content creation and posting',
        'Engagement management',
        'Monthly analytics report'
      ],
      platforms: ['instagram', 'facebook', 'twitter'],
      isActive: true
    },
    {
      id: 2,
      name: 'Influencer Partnerships',
      description: 'Connect with food bloggers and influencers',
      price: 2499,
      duration: 'Campaign',
      features: [
        'Influencer matching and outreach',
        'Campaign coordination',
        'Content approval process',
        'Performance tracking'
      ],
      platforms: ['instagram', 'tiktok'],
      isActive: false
    },
    {
      id: 3,
      name: 'Professional Photography',
      description: 'High-quality food and venue photography',
      price: 899,
      duration: 'One-time',
      features: [
        '4-hour photo session',
        '50+ edited high-res images',
        'Food styling included',
        'Commercial usage rights'
      ],
      platforms: [],
      isActive: false
    }
  ]

  const currentCampaigns = [
    {
      id: 1,
      name: 'Weekend Brunch Promotion',
      type: 'Featured Event',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
      budget: 299,
      spent: 156,
      impressions: 8900,
      clicks: 234,
      bookings: 12,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Holiday Special Campaign',
      type: 'Social Media Management',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      budget: 1299,
      spent: 432,
      impressions: 25600,
      clicks: 1200,
      bookings: 45,
      status: 'Active'
    }
  ]

  const toggleCampaign = (id) => {
    // Mock toggle functionality
    alert(`Campaign ${id} status toggled!`)
  }

  const purchasePackage = (packageId, type) => {
    alert(`Purchasing ${type} package ${packageId}. Redirecting to payment...`)
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return Instagram
      case 'facebook': return Facebook
      case 'twitter': return Twitter
      default: return ExternalLink
    }
  }

  return (
    <MerchantLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Advertising</h1>
            <p className="text-neutral-600">Boost your visibility and reach more customers</p>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Impressions</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">67.4K</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Click-through Rate</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">3.2%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Ad Spend</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">AED 588</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Bookings from Ads</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">57</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-2xl flex items-center justify-center shadow-soft">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Campaigns */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Active Campaigns</h2>
            
            <div className="space-y-4">
              {currentCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-800">{campaign.name}</h3>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {campaign.status}
                        </span>
                      </div>
                      
                      <p className="text-neutral-600 mb-4">{campaign.type}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500">Duration:</span>
                          <div className="font-semibold text-neutral-800">
                            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Budget:</span>
                          <div className="font-semibold text-neutral-800">AED {campaign.budget}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Impressions:</span>
                          <div className="font-semibold text-neutral-800">{campaign.impressions.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Clicks:</span>
                          <div className="font-semibold text-neutral-800">{campaign.clicks}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Bookings:</span>
                          <div className="font-semibold text-neutral-800">{campaign.bookings}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-500">Budget Used</span>
                          <span className="text-neutral-700">{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleCampaign(campaign.id)}
                        className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                      >
                        {campaign.status === 'Active' ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                        <BarChart3 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advertising Packages */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              <button
                onClick={() => setActiveTab('internal')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'internal'
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Platform Advertising
              </button>
              <button
                onClick={() => setActiveTab('external')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  activeTab === 'external'
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Marketing Services
              </button>
            </div>

            {/* Internal Packages */}
            {activeTab === 'internal' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">Platform Advertising Packages</h2>
                  <p className="text-neutral-600">Boost your visibility within the Set The Table platform</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internalPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 border border-neutral-200 hover:shadow-soft-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-neutral-800">{pkg.name}</h3>
                        {pkg.isActive && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-neutral-600 mb-6">{pkg.description}</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-primary-600 mb-1">AED {pkg.price}</div>
                        <div className="text-neutral-500">{pkg.duration}</div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {pkg.isActive && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">Current Performance</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <div className="font-bold text-blue-700">{pkg.metrics.impressions.toLocaleString()}</div>
                              <div className="text-blue-600">Impressions</div>
                            </div>
                            <div>
                              <div className="font-bold text-blue-700">{pkg.metrics.clicks}</div>
                              <div className="text-blue-600">Clicks</div>
                            </div>
                            <div>
                              <div className="font-bold text-blue-700">{pkg.metrics.bookings}</div>
                              <div className="text-blue-600">Bookings</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={() => purchasePackage(pkg.id, 'internal')}
                        className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 ${
                          pkg.isActive
                            ? 'bg-neutral-200 text-neutral-600 cursor-not-allowed'
                            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-soft-lg'
                        }`}
                        disabled={pkg.isActive}
                      >
                        {pkg.isActive ? 'Currently Active' : 'Purchase Package'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Services */}
            {activeTab === 'external' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-2">Marketing Services</h2>
                  <p className="text-neutral-600">Professional marketing services to grow your brand</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {externalServices.map((service) => (
                    <div key={service.id} className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 border border-neutral-200 hover:shadow-soft-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-neutral-800">{service.name}</h3>
                        {service.isActive && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      
                      <p className="text-neutral-600 mb-6">{service.description}</p>
                      
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-primary-600 mb-1">AED {service.price}</div>
                        <div className="text-neutral-500">{service.duration}</div>
                      </div>
                      
                      {service.platforms.length > 0 && (
                        <div className="flex items-center space-x-2 mb-4">
                          {service.platforms.map((platform) => {
                            const PlatformIcon = getPlatformIcon(platform)
                            return (
                              <div key={platform} className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                                <PlatformIcon className="w-4 h-4 text-neutral-600" />
                              </div>
                            )
                          })}
                        </div>
                      )}
                      
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        onClick={() => purchasePackage(service.id, 'external')}
                        className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 ${
                          service.isActive
                            ? 'bg-neutral-200 text-neutral-600 cursor-not-allowed'
                            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-soft-lg'
                        }`}
                        disabled={service.isActive}
                      >
                        {service.isActive ? 'Currently Active' : 'Get Started'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="card border border-neutral-100 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Need Custom Marketing Solutions?</h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Our marketing team can create tailored advertising strategies for your venue. 
              Get in touch to discuss your specific needs and goals.
            </p>
            <button className="btn-primary">
              Contact Marketing Team
            </button>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default AdvertisingPage