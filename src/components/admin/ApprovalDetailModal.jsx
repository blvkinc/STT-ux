import React, { useState } from 'react'
import { X, CheckCircle, XCircle, AlertTriangle, Building, Calendar, UserCheck, FileText, Star, MapPin, DollarSign, Users, Clock } from 'lucide-react'

const ApprovalDetailModal = ({ isOpen, onClose, item, onApprove, onReject }) => {
  const [loading, setLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)

  if (!isOpen || !item) return null

  const getTypeIcon = (type) => {
    switch (type) {
      case 'venue':
        return Building
      case 'event':
        return Calendar
      case 'merchant':
        return UserCheck
      case 'menu':
        return FileText
      case 'promotion':
        return Star
      default:
        return FileText
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
    }
  }

  const handleApprove = async () => {
    setLoading(true)
    try {
      await onApprove(item.id)
      onClose()
    } catch (error) {
      console.error('Failed to approve:', error)
    }
    setLoading(false)
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }
    
    setLoading(true)
    try {
      await onReject(item.id, rejectionReason)
      onClose()
      setShowRejectForm(false)
      setRejectionReason('')
    } catch (error) {
      console.error('Failed to reject:', error)
    }
    setLoading(false)
  }

  const Icon = getTypeIcon(item.type)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPriorityColor(item.priority)}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-800">{item.title}</h2>
                <p className="text-neutral-600">Submitted by {item.submittedBy}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="capitalize text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                    {item.type}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg border ${getPriorityColor(item.priority)}`}>
                    {item.priority} priority
                  </span>
                  <span className="text-xs text-neutral-500">{item.submittedAt}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-3">Description</h3>
            <p className="text-neutral-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Basic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Type:</span>
                  <span className="font-medium text-neutral-800 capitalize">{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Category:</span>
                  <span className="font-medium text-neutral-800">{item.category}</span>
                </div>
                {item.location && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Location:</span>
                    <span className="font-medium text-neutral-800 flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                )}
                {item.price && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Price:</span>
                    <span className="font-medium text-primary-600">AED {item.price}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Submission Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Submitted By:</span>
                  <span className="font-medium text-neutral-800">{item.submittedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Submitted At:</span>
                  <span className="font-medium text-neutral-800">{item.submittedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Priority:</span>
                  <span className={`font-medium px-2 py-1 rounded-lg text-xs ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status:</span>
                  <span className="font-medium text-neutral-800 capitalize">{item.status.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Type-specific Details */}
          {item.type === 'venue' && item.details && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Venue Details</h3>
              <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-neutral-600 text-sm">Capacity:</span>
                    <div className="font-medium text-neutral-800 flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{item.details.capacity} guests</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Cuisine:</span>
                    <div className="font-medium text-neutral-800">{item.details.cuisineType}</div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Price Range:</span>
                    <div className="font-medium text-neutral-800">{item.details.priceRange}</div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Hours:</span>
                    <div className="font-medium text-neutral-800 flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.details.operatingHours}</span>
                    </div>
                  </div>
                </div>
                {item.details.specialFeatures && (
                  <div>
                    <span className="text-neutral-600 text-sm">Special Features:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.details.specialFeatures.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {item.type === 'event' && item.packages && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Event Packages</h3>
              <div className="space-y-4">
                {item.packages.map((pkg, index) => (
                  <div key={index} className="bg-neutral-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-neutral-800">{pkg.name}</h4>
                      <span className="font-bold text-primary-600">AED {pkg.price}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-neutral-600 text-sm">Includes:</span>
                      <ul className="text-sm text-neutral-700 space-y-1">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.type === 'merchant' && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Merchant Details</h3>
              <div className="bg-neutral-50 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-neutral-600 text-sm">Business Type:</span>
                    <div className="font-medium text-neutral-800">{item.businessType}</div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Expected Venues:</span>
                    <div className="font-medium text-neutral-800">{item.expectedVenues}</div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Projected Revenue:</span>
                    <div className="font-medium text-primary-600">AED {item.projectedRevenue?.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-neutral-600 text-sm">Contact Person:</span>
                    <div className="font-medium text-neutral-800">{item.contactPerson}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents/Attachments */}
          {item.documents && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Documents</h3>
              <div className="flex flex-wrap gap-2">
                {item.documents.map((doc, index) => (
                  <span key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rejection Form */}
          {showRejectForm && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-3">Rejection Reason</h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none resize-none"
                placeholder="Please provide a detailed reason for rejection..."
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {(item.status === 'pending' || item.status === 'under_review') && (
          <div className="p-6 border-t border-neutral-100">
            {showRejectForm ? (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRejectForm(false)
                    setRejectionReason('')
                  }}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="btn-primary bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !rejectionReason.trim()}
                >
                  {loading ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
              </div>
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="btn-secondary text-red-600 border-red-200 hover:bg-red-50 flex items-center space-x-2"
                  disabled={loading}
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={handleApprove}
                  className="btn-primary bg-green-600 hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{loading ? 'Approving...' : 'Approve'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApprovalDetailModal