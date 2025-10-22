import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar, 
  Eye,
  Star,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const AnalyticsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [timeRange, setTimeRange] = useState('30days')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock analytics data
  const analytics = {
    overview: {
      totalRevenue: 45680,
      revenueGrowth: 12.5,
      totalBookings: 234,
      bookingsGrowth: 8.3,
      totalViews: 12450,
      viewsGrowth: -2.1,
      avgRating: 4.6,
      ratingChange: 0.2
    },
    revenueData: [
      { month: 'Jan', revenue: 3200, bookings: 18 },
      { month: 'Feb', revenue: 3800, bookings: 22 },
      { month: 'Mar', revenue: 4200, bookings: 25 },
      { month: 'Apr', revenue: 3900, bookings: 21 },
      { month: 'May', revenue: 4800, bookings: 28 },
      { month: 'Jun', revenue: 5200, bookings: 32 },
      { month: 'Jul', revenue: 4900, bookings: 29 },
      { month: 'Aug', revenue: 5600, bookings: 35 },
      { month: 'Sep', revenue: 5100, bookings: 31 },
      { month: 'Oct', revenue: 5800, bookings: 38 },
      { month: 'Nov', revenue: 6200, bookings: 42 },
      { month: 'Dec', revenue: 4500, bookings: 28 }
    ],
    topEvents: [
      { name: 'Weekend Brunch Buffet', revenue: 12450, bookings: 45, views: 1250, rating: 4.8 },
      { name: 'Business Lunch Special', revenue: 8900, bookings: 32, views: 890, rating: 4.5 },
      { name: 'Romantic Dinner', revenue: 15600, bookings: 28, views: 1100, rating: 4.9 },
      { name: 'Family Gathering', revenue: 6700, bookings: 22, views: 650, rating: 4.4 },
      { name: 'High Tea Experience', revenue: 4200, bookings: 18, views: 420, rating: 4.6 }
    ],
    customerDemographics: {
      ageGroups: [
        { range: '18-25', percentage: 15, count: 35 },
        { range: '26-35', percentage: 35, count: 82 },
        { range: '36-45', percentage: 28, count: 66 },
        { range: '46-55', percentage: 15, count: 35 },
        { range: '55+', percentage: 7, count: 16 }
      ],
      bookingTypes: [
        { type: 'Individual', percentage: 25, count: 59 },
        { type: 'Couple', percentage: 45, count: 105 },
        { type: 'Group', percentage: 30, count: 70 }
      ]
    },
    peakTimes: [
      { time: '11:00 AM', bookings: 25 },
      { time: '12:00 PM', bookings: 45 },
      { time: '1:00 PM', bookings: 38 },
      { time: '7:00 PM', bookings: 52 },
      { time: '8:00 PM', bookings: 41 },
      { time: '9:00 PM', bookings: 33 }
    ]
  }

  const StatCard = ({ title, value, change, icon: Icon, color = "primary", prefix = "", suffix = "" }) => (
    <div className="card border border-neutral-100 hover:shadow-soft-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-neutral-800 mt-2">{prefix}{value}{suffix}</p>
            {change !== undefined && (
              <div className="flex items-center mt-2">
                {change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(change)}%
                </span>
                <span className="text-neutral-500 text-sm ml-1">vs last period</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center shadow-soft`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )

  const exportReport = () => {
    alert('Analytics report exported successfully!')
  }

  return (
    <MerchantLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Analytics</h1>
            <p className="text-neutral-600">Track your performance and business insights</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <button 
              onClick={exportReport}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={analytics.overview.totalRevenue.toLocaleString()}
            change={analytics.overview.revenueGrowth}
            icon={DollarSign}
            color="primary"
            prefix="AED "
          />
          <StatCard
            title="Total Bookings"
            value={analytics.overview.totalBookings}
            change={analytics.overview.bookingsGrowth}
            icon={Calendar}
            color="accent"
          />
          <StatCard
            title="Profile Views"
            value={analytics.overview.totalViews.toLocaleString()}
            change={analytics.overview.viewsGrowth}
            icon={Eye}
            color="primary"
          />
          <StatCard
            title="Average Rating"
            value={analytics.overview.avgRating}
            change={analytics.overview.ratingChange > 0 ? analytics.overview.ratingChange * 10 : undefined}
            icon={Star}
            color="accent"
          />
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Revenue Trend</h2>
                <BarChart3 className="w-5 h-5 text-neutral-400" />
              </div>
              
              <div className="space-y-4">
                {analytics.revenueData.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span className="font-medium text-neutral-700">{data.month}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-neutral-800">AED {data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-neutral-500">{data.bookings} bookings</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Events */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Top Performing Events</h2>
                <TrendingUp className="w-5 h-5 text-neutral-400" />
              </div>
              
              <div className="space-y-4">
                {analytics.topEvents.slice(0, 5).map((event, index) => (
                  <div key={event.name} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-800">{event.name}</div>
                        <div className="text-sm text-neutral-500">
                          {event.bookings} bookings • {event.views} views
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-600">AED {event.revenue.toLocaleString()}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-neutral-500">{event.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Customer Age Groups</h2>
                <PieChart className="w-5 h-5 text-neutral-400" />
              </div>
              
              <div className="space-y-4">
                {analytics.customerDemographics.ageGroups.map((group) => (
                  <div key={group.range} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                      <span className="font-medium text-neutral-700">{group.range} years</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${group.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-neutral-600 w-12 text-right">
                        {group.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Booking Types</h2>
                <Users className="w-5 h-5 text-neutral-400" />
              </div>
              
              <div className="space-y-6">
                {analytics.customerDemographics.bookingTypes.map((type) => (
                  <div key={type.type} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft">
                      <span className="text-white font-bold text-lg">{type.percentage}%</span>
                    </div>
                    <div className="font-semibold text-neutral-800">{type.type}</div>
                    <div className="text-sm text-neutral-500">{type.count} bookings</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Peak Times */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-800">Peak Booking Times</h2>
              <BarChart3 className="w-5 h-5 text-neutral-400" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {analytics.peakTimes.map((time) => (
                <div key={time.time} className="text-center p-4 bg-neutral-50 rounded-2xl">
                  <div className="text-lg font-bold text-neutral-800 mb-1">{time.time}</div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">{time.bookings}</div>
                  <div className="text-sm text-neutral-500">bookings</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Key Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Revenue Growth</span>
                </div>
                <p className="text-green-700 text-sm">
                  Your revenue increased by 12.5% compared to last period. Weekend brunches are your top performer.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Customer Preference</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Couple bookings make up 45% of your reservations. Consider creating more romantic packages.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Rating Improvement</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  Your average rating improved to 4.6. Keep focusing on service quality to reach 4.8+.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default AnalyticsPage