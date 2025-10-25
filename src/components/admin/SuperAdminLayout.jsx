import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotificationCenter from './NotificationCenter'
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  Plus,
  Bell,
  Search,
  Calendar,
  AlertTriangle,
  UserCheck,
  Globe,
  Database,
  CreditCard,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'

const SuperAdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { merchant, logoutMerchant } = useMerchant()

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Venues', href: '/admin/venues', icon: Building },
    { name: 'Merchants', href: '/admin/merchants', icon: UserCheck },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Approvals', href: '/admin/approvals', icon: AlertTriangle },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'System', href: '/admin/system', icon: Database },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'System Logs', href: '/admin/logs', icon: FileText },
    { name: 'Reports', href: '/admin/reports', icon: TrendingUp },
    { name: 'Approval Queue', href: '/admin/approvals/queue', icon: Clock },
  ]

  const handleLogout = () => {
    logoutMerchant()
    navigate('/merchant/auth')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-soft-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100 flex-shrink-0">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-soft">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-neutral-800">STT Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Info */}
          <div className="p-6 border-b border-neutral-100 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-800 truncate">
                  Super Administrator
                </p>
                <p className="text-sm text-neutral-600 truncate">Platform Management</p>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-red-100 text-red-700">
                  Full Access
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-6 border-t border-neutral-100 flex-shrink-0">
            <div className="space-y-3">
              <Link
                to="/admin/venues/create"
                className="w-full btn-primary flex items-center justify-center space-x-2 mb-3"
              >
                <Plus className="w-5 h-5" />
                <span>Add Venue</span>
              </Link>
              
              <Link
                to="/admin/system/backup"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200"
              >
                <Database className="w-5 h-5" />
                <span>System Backup</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-soft border-b border-neutral-100 sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search venues, merchants, events..."
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none bg-neutral-50 focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              {/* System Status */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Healthy</span>
              </div>

              {/* Notifications */}
              <button 
                onClick={() => setNotificationOpen(true)}
                className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Global Actions */}
              <button className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200">
                <Globe className="w-6 h-6" />
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-neutral-800 text-sm">
                    Super Admin
                  </p>
                  <p className="text-neutral-600 text-xs">Platform Manager</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)} 
      />
    </div>
  )
}

export default SuperAdminLayout