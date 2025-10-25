import React, { useState, useEffect } from 'react'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'
import ApprovalDetailModal from '../../components/admin/ApprovalDetailModal'

const ApprovalQueuePage = () => {
  const [approvals, setApprovals] = useState([])
  const [filteredApprovals, setFilteredApprovals] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'pending',
    priority: 'all',
    dateRange: 'all'
  })
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchApprovals = async () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const mockApprovals = [
          {
            id: 1,
            type: 'event',
            title: 'Corporate Annual Meeting 2024',
            submittedBy: 'John Smith',
            venue: 'Grand Convention Center',
            submittedAt: '2024-02-10T10:30:00Z',
            status: 'pending',
            priority: 'high',
            category: 'Corporate',
            description: 'Annual corporate meeting with 200+ attendees',
            estimatedRevenue: 15000,
            requestedDate: '2024-03-15',
            changes: []
          },
          {
            id: 2,
            type: 'venue',
            title: 'Riverside Conference Center',
            submittedBy: 'Jane Doe',
            venue: 'New Venue Application',
            submittedAt: '2024-02-09T14:20:00Z',
            status: 'pending',
            priority: 'medium',
            category: 'Venue Registration',
            description: 'New venue application for conference center',
            estimatedRevenue: 0,
            requestedDate: null,
            changes: []
          },
          {
            id: 3,
            type: 'event',
            title: 'Summer Music Festival',
            submittedBy: 'Mike Johnson',
            venue: 'Downtown Event Hall',
            submittedAt: '2024-02-08T16:45:00Z',
            status: 'approved',
            priority: 'high',
            category: 'Entertainment',
            description: 'Large outdoor music festival',
            estimatedRevenue: 50000,
            requestedDate: '2024-06-20',
            changes: []
          },
          {
            id: 4,
            type: 'merchant',
            title: 'Elite Catering Services',
            submittedBy: 'Sarah Wilson',
            venue: 'Merchant Application',
            submittedAt: '2024-02-07T11:15:00Z',
            status: 'rejected',
            priority: 'low',
            category: 'Merchant Registration',
            description: 'Catering service provider application',
            estimatedRevenue: 0,
            requestedDate: null,
            changes: ['Missing business license', 'Incomplete insurance documentation']
          },
          {
            id: 5,
            type: 'event',
            title: 'Wedding Reception - Johnson',
            submittedBy: 'Alice Brown',
            venue: 'Garden Pavilion',
            submittedAt: '2024-02-06T09:30:00Z',
            status: 'pending',
            priority: 'medium',
            category: 'Wedding',
            description: 'Elegant wedding reception for 150 guests',
            estimatedRevenue: 8000,
            requestedDate: '2024-04-12',
            changes: []
          }
        ]
        setApprovals(mockApprovals)
        setFilteredApprovals(mockApprovals)
        setLoading(false)
      }, 1000)
    }

    fetchApprovals()
  }, [])

  // Filter approvals based on current filters and search term
  useEffect(() => {
    let filtered = approvals

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(approval => approval.type === filters.type)
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(approval => approval.status === filters.status)
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(approval => approval.priority === filters.priority)
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(approval =>
        approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.venue.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredApprovals(filtered)
  }, [approvals, filters, searchTerm])

  const handleApprove = async (approvalId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setApprovals(prev => prev.map(approval =>
        approval.id === approvalId
          ? { ...approval, status: 'approved' }
          : approval
      ))
    } catch (error) {
      console.error('Error approving:', error)
    }
  }

  const handleReject = async (approvalId, reason) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setApprovals(prev => prev.map(approval =>
        approval.id === approvalId
          ? { ...approval, status: 'rejected', rejectionReason: reason }
          : approval
      ))
    } catch (error) {
      console.error('Error rejecting:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'venue':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'merchant':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </SuperAdminLayout>
    )
  }

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Approval Queue</h1>
            <p className="text-gray-600">Review and manage pending approvals</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Bulk Actions
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              Export Queue
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvals.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvals.filter(a => a.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvals.filter(a => a.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvals.filter(a => a.priority === 'high' && a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search approvals..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Types</option>
                <option value="event">Events</option>
                <option value="venue">Venues</option>
                <option value="merchant">Merchants</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ type: 'all', status: 'all', priority: 'all', dateRange: 'all' })
                  setSearchTerm('')
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Approvals Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-gray-500 mr-2">
                          {getTypeIcon(approval.type)}
                        </div>
                        <span className="text-sm font-medium text-gray-900 capitalize">{approval.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{approval.title}</div>
                      <div className="text-sm text-gray-500">{approval.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{approval.submittedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{approval.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(approval.priority)}`}>
                        {approval.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(approval.status)}`}>
                        {approval.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(approval.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApproval(approval)
                          setShowDetailModal(true)
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        View
                      </button>
                      {approval.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(approval.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(approval.id, 'Rejected by admin')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApprovals.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No approvals found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Approval Detail Modal */}
        {showDetailModal && selectedApproval && (
          <ApprovalDetailModal
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false)
              setSelectedApproval(null)
            }}
            approval={selectedApproval}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </div>
    </SuperAdminLayout>
  )
}

export default ApprovalQueuePage