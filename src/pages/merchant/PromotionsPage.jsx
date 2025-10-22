import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Plus, 
  Tag, 
  Percent, 
  Calendar, 
  Users, 
  Edit, 
  Trash2, 
  Copy,
  ToggleLeft,
  ToggleRight,
  Gift,
  Clock,
  Target
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const PromotionsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: 'Weekend Special',
      type: 'percentage',
      value: 20,
      code: 'WEEKEND20',
      description: '20% off on weekend brunch bookings',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      usageLimit: 100,
      usedCount: 23,
      minAmount: 200,
      applicableEvents: ['Weekend Brunch Buffet'],
      isActive: true,
      createdAt: '2024-11-15'
    },
    {
      id: 2,
      name: 'Early Bird Discount',
      type: 'fixed',
      value: 50,
      code: 'EARLY50',
      description: 'AED 50 off for bookings made 7 days in advance',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      usageLimit: 200,
      usedCount: 67,
      minAmount: 300,
      applicableEvents: ['All Events'],
      isActive: true,
      createdAt: '2024-10-28'
    },
    {
      id: 3,
      name: 'Group Booking Deal',
      type: 'percentage',
      value: 15,
      code: 'GROUP15',
      description: '15% off for groups of 6 or more',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      usageLimit: 50,
      usedCount: 8,
      minAmount: 500,
      applicableEvents: ['Business Lunch Special', 'Family Gathering'],
      isActive: false,
      createdAt: '2024-11-20'
    }
  ])

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'percentage',
    value: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    minAmount: '',
    applicableEvents: []
  })

  const togglePromotion = (id) => {
    setPromotions(promotions.map(promo => 
      promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
    ))
  }

  const deletePromotion = (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(promotions.filter(promo => promo.id !== id))
    }
  }

  const duplicatePromotion = (promo) => {
    const newPromo = {
      ...promo,
      id: Date.now(),
      name: `${promo.name} (Copy)`,
      code: `${promo.code}COPY`,
      usedCount: 0,
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setPromotions([...promotions, newPromo])
  }

  const handleCreatePromotion = (e) => {
    e.preventDefault()
    const promotion = {
      ...newPromotion,
      id: Date.now(),
      usedCount: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setPromotions([...promotions, promotion])
    setNewPromotion({
      name: '',
      type: 'percentage',
      value: '',
      code: '',
      description: '',
      startDate: '',
      endDate: '',
      usageLimit: '',
      minAmount: '',
      applicableEvents: []
    })
    setShowCreateModal(false)
  }

  const getPromotionTypeIcon = (type) => {
    return type === 'percentage' ? Percent : Tag
  }

  const getPromotionStatus = (promo) => {
    const now = new Date()
    const start = new Date(promo.startDate)
    const end = new Date(promo.endDate)
    
    if (!promo.isActive) return { status: 'Inactive', color: 'bg-neutral-100 text-neutral-700' }
    if (now < start) return { status: 'Scheduled', color: 'bg-blue-100 text-blue-700' }
    if (now > end) return { status: 'Expired', color: 'bg-red-100 text-red-700' }
    if (promo.usedCount >= promo.usageLimit) return { status: 'Limit Reached', color: 'bg-yellow-100 text-yellow-700' }
    return { status: 'Active', color: 'bg-green-100 text-green-700' }
  }

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Promotions</h1>
            <p className="text-neutral-600">Create and manage discounts to boost your sales</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>Create Promotion</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Active Promotions</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">
                    {promotions.filter(p => p.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <Tag className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Usage</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">
                    {promotions.reduce((sum, p) => sum + p.usedCount, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-soft">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Avg. Discount</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">
                    {Math.round(promotions.reduce((sum, p) => sum + (p.type === 'percentage' ? p.value : 0), 0) / promotions.filter(p => p.type === 'percentage').length)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft">
                  <Percent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">
                    {Math.round((promotions.reduce((sum, p) => sum + p.usedCount, 0) / promotions.reduce((sum, p) => sum + p.usageLimit, 0)) * 100)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-400 rounded-2xl flex items-center justify-center shadow-soft">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="space-y-4">
          {promotions.map((promo) => {
            const TypeIcon = getPromotionTypeIcon(promo.type)
            const status = getPromotionStatus(promo)
            
            return (
              <div key={promo.id} className="card border border-neutral-100 hover:shadow-soft-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-neutral-800">{promo.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                            {status.status}
                          </span>
                        </div>
                        
                        <p className="text-neutral-600 mb-3">{promo.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-neutral-500">Code:</span>
                            <div className="font-mono font-semibold text-primary-600">{promo.code}</div>
                          </div>
                          <div>
                            <span className="text-neutral-500">Discount:</span>
                            <div className="font-semibold text-neutral-800">
                              {promo.type === 'percentage' ? `${promo.value}%` : `AED ${promo.value}`}
                            </div>
                          </div>
                          <div>
                            <span className="text-neutral-500">Usage:</span>
                            <div className="font-semibold text-neutral-800">
                              {promo.usedCount} / {promo.usageLimit}
                            </div>
                          </div>
                          <div>
                            <span className="text-neutral-500">Valid Until:</span>
                            <div className="font-semibold text-neutral-800">
                              {new Date(promo.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePromotion(promo.id)}
                        className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                      >
                        {promo.isActive ? (
                          <ToggleRight className="w-6 h-6 text-green-500" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => duplicatePromotion(promo)}
                        className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      
                      <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                        <Edit className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => deletePromotion(promo.id)}
                        className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {promotions.length === 0 && (
          <div className="card border border-neutral-100">
            <div className="p-12 text-center">
              <Tag className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">No promotions yet</h3>
              <p className="text-neutral-600 mb-6">
                Create your first promotion to attract more customers and boost sales
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Promotion
              </button>
            </div>
          </div>
        )}

        {/* Create Promotion Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-neutral-800 mb-6">Create New Promotion</h2>
                
                <form onSubmit={handleCreatePromotion} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Promotion Name *
                      </label>
                      <input
                        type="text"
                        value={newPromotion.name}
                        onChange={(e) => setNewPromotion({...newPromotion, name: e.target.value})}
                        required
                        className="input-field"
                        placeholder="Weekend Special"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Promo Code *
                      </label>
                      <input
                        type="text"
                        value={newPromotion.code}
                        onChange={(e) => setNewPromotion({...newPromotion, code: e.target.value.toUpperCase()})}
                        required
                        className="input-field font-mono"
                        placeholder="WEEKEND20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newPromotion.description}
                      onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Brief description of the promotion..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Discount Type *
                      </label>
                      <select
                        value={newPromotion.type}
                        onChange={(e) => setNewPromotion({...newPromotion, type: e.target.value})}
                        required
                        className="input-field"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        value={newPromotion.value}
                        onChange={(e) => setNewPromotion({...newPromotion, value: e.target.value})}
                        required
                        className="input-field"
                        placeholder={newPromotion.type === 'percentage' ? '20' : '50'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Usage Limit *
                      </label>
                      <input
                        type="number"
                        value={newPromotion.usageLimit}
                        onChange={(e) => setNewPromotion({...newPromotion, usageLimit: e.target.value})}
                        required
                        className="input-field"
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={newPromotion.startDate}
                        onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={newPromotion.endDate}
                        onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                        required
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Minimum Amount
                      </label>
                      <input
                        type="number"
                        value={newPromotion.minAmount}
                        onChange={(e) => setNewPromotion({...newPromotion, minAmount: e.target.value})}
                        className="input-field"
                        placeholder="200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Create Promotion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}

export default PromotionsPage