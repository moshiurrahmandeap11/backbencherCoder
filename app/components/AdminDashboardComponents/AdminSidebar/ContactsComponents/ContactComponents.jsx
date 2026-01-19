"use client"
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import {
    AlertCircle,
    Archive,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    Filter,
    Mail,
    MailOpen,
    MessageSquare,
    MoreVertical,
    RefreshCw,
    Reply,
    Search,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ContactComponents = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [stats, setStats] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContactDetails, setSelectedContactDetails] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(null);

  const limit = 10;

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: limit,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      const response = await axiosInstance.get(`/contact?${params}`);
      
      if (response.data.success) {
        setContacts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalContacts(response.data.pagination.totalContacts);
      } else {
        setError('Failed to load contacts');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/contact/stats/summary');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [currentPage, statusFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        fetchContacts();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle contact selection
  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact._id));
    }
  };

  // Handle status update
  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      setStatusUpdateLoading(contactId);
      const response = await axiosInstance.patch(`/contact/${contactId}`, {
        status: newStatus
      });

      if (response.data.success) {
        // Update local state
        setContacts(prev => prev.map(contact => 
          contact._id === contactId 
            ? { ...contact, status: newStatus, updatedAt: new Date().toISOString() }
            : contact
        ));
        
        // Refresh stats
        fetchStats();
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async (contactId) => {
    try {
      const response = await axiosInstance.delete(`/contact/${contactId}`);
      
      if (response.data.success) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => contact._id !== contactId));
        setSelectedContacts(prev => prev.filter(id => id !== contactId));
        setShowDeleteModal(false);
        setContactToDelete(null);
        
        // Refresh stats
        fetchStats();
        
        // If current page becomes empty, go to previous page
        if (contacts.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchContacts();
        }
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Failed to delete contact');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedContacts.length === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedContacts.length} contact(s)?`)) {
      return;
    }

    try {
      const response = await axiosInstance.delete('/contact', {
        data: { ids: selectedContacts }
      });

      if (response.data.success) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact._id)));
        setSelectedContacts([]);
        
        // Refresh stats
        fetchStats();
        
        // Refresh contacts
        fetchContacts();
      }
    } catch (err) {
      console.error('Error bulk deleting:', err);
      alert('Failed to delete contacts');
    }
  };

  // Handle view details
  const handleViewDetails = (contact) => {
    setSelectedContactDetails(contact);
    setShowDetailsModal(true);
    
    // Mark as read if status is pending
    if (contact.status === 'pending') {
      handleStatusUpdate(contact._id, 'read');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'read':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'replied':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'archived':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'read':
        return <MailOpen className="w-3 h-3" />;
      case 'replied':
        return <Reply className="w-3 h-3" />;
      case 'archived':
        return <Archive className="w-3 h-3" />;
      default:
        return <Mail className="w-3 h-3" />;
    }
  };

  // Loading state
  if (loading && contacts.length === 0) {
    return <SimpleLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-300">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: 'Total Contacts', 
                value: stats.total, 
                color: 'from-blue-500 to-cyan-500',
                icon: <Mail className="w-5 h-5" />
              },
              { 
                title: 'Pending', 
                value: stats.byStatus.pending, 
                color: 'from-yellow-500 to-amber-500',
                icon: <Clock className="w-5 h-5" />
              },
              { 
                title: 'Replied', 
                value: stats.byStatus.replied, 
                color: 'from-green-500 to-emerald-500',
                icon: <CheckCircle className="w-5 h-5" />
              },
              { 
                title: 'Today', 
                value: stats.today, 
                color: 'from-purple-500 to-pink-500',
                icon: <MessageSquare className="w-5 h-5" />
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Controls Bar */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#D9FDA3] transition-colors"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D9FDA3] transition-colors appearance-none"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {selectedContacts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete ({selectedContacts.length})</span>
                </button>
              )}
              
              <button
                onClick={fetchContacts}
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#D9FDA3] focus:ring-[#D9FDA3]"
              />
            </div>
            <div className="col-span-4 text-gray-300 font-medium">Contact</div>
            <div className="col-span-3 text-gray-300 font-medium">Subject</div>
            <div className="col-span-2 text-gray-300 font-medium">Status</div>
            <div className="col-span-1 text-gray-300 font-medium">Date</div>
            <div className="col-span-1 text-gray-300 font-medium">Actions</div>
          </div>

          {/* Contacts List */}
          {contacts.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No contacts found</h3>
              <p className="text-gray-300">
                {searchTerm || statusFilter 
                  ? 'Try changing your search or filter criteria' 
                  : 'No contact messages have been submitted yet'}
              </p>
            </div>
          ) : (
            <div>
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`grid grid-cols-12 gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors ${
                    contact.status === 'pending' ? 'bg-white/2' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact._id)}
                      onChange={() => handleSelectContact(contact._id)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#D9FDA3] focus:ring-[#D9FDA3]"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{contact.name}</div>
                        <div className="text-sm text-gray-300">{contact.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="col-span-3">
                    <div className="text-white font-medium truncate" title={contact.subject}>
                      {contact.subject}
                    </div>
                    <div className="text-sm text-gray-300 truncate">
                      {contact.message.replace(/<[^>]*>/g, '').substring(0, 50)}...
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)} flex items-center gap-1.5`}>
                        {getStatusIcon(contact.status)}
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-1">
                    <div className="text-sm text-gray-300">
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(contact)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-300" />
                      </button>
                      
                      <div className="relative">
                        <button
                          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-300" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-1 w-48 bg-[#051320] border border-white/10 rounded-xl shadow-lg z-10 hidden group-hover:block">
                          <div className="py-1">
                            {contact.status !== 'read' && (
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'read')}
                                disabled={statusUpdateLoading === contact._id}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2"
                              >
                                <MailOpen className="w-4 h-4" />
                                Mark as Read
                              </button>
                            )}
                            {contact.status !== 'replied' && (
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'replied')}
                                disabled={statusUpdateLoading === contact._id}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2"
                              >
                                <Reply className="w-4 h-4" />
                                Mark as Replied
                              </button>
                            )}
                            {contact.status !== 'archived' && (
                              <button
                                onClick={() => handleStatusUpdate(contact._id, 'archived')}
                                disabled={statusUpdateLoading === contact._id}
                                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 flex items-center gap-2"
                              >
                                <Archive className="w-4 h-4" />
                                Archive
                              </button>
                            )}
                            <div className="border-t border-white/10 my-1"></div>
                            <button
                              onClick={() => {
                                setContactToDelete(contact);
                                setShowDeleteModal(true);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-gray-300 text-sm">
                  Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalContacts)} of {totalContacts} contacts
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-[#D9FDA3] text-[#051320] font-semibold'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages 
                        ? 'text-gray-500 cursor-not-allowed' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && contactToDelete && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-2xl border border-white/10 p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Delete Contact</h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setContactToDelete(null);
                }}
                className="p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="p-4 bg-white/5 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{contactToDelete.name}</div>
                    <div className="text-sm text-gray-300">{contactToDelete.email}</div>
                  </div>
                </div>
                <div className="text-gray-300">
                  <div className="font-medium mb-1">Subject:</div>
                  <div>{contactToDelete.subject}</div>
                </div>
              </div>
              
              <p className="text-gray-300">
                Are you sure you want to delete this contact? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setContactToDelete(null);
                }}
                className="flex-1 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(contactToDelete._id)}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {showDetailsModal && selectedContactDetails && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-2xl border border-white/10 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Contact Details</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedContactDetails(null);
                }}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Name</div>
                      <div className="text-white font-medium">{selectedContactDetails.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Email</div>
                      <div className="text-white font-medium">{selectedContactDetails.email}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Subject</div>
                      <div className="text-white font-medium">{selectedContactDetails.subject}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Additional Details</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Status</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedContactDetails.status)} flex items-center gap-2`}>
                          {getStatusIcon(selectedContactDetails.status)}
                          {selectedContactDetails.status.charAt(0).toUpperCase() + selectedContactDetails.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Submitted</div>
                      <div className="text-white font-medium">{formatDate(selectedContactDetails.createdAt)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Last Updated</div>
                      <div className="text-white font-medium">{formatDate(selectedContactDetails.updatedAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Message</h4>
                <div 
                  className="text-gray-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedContactDetails.message || 'No message' }}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedContactDetails.email}?subject=Re: ${selectedContactDetails.subject}`;
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300"
                >
                  Reply via Email
                </button>
                
                <button
                  onClick={() => handleStatusUpdate(selectedContactDetails._id, 'replied')}
                  disabled={statusUpdateLoading === selectedContactDetails._id}
                  className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  Mark as Replied
                </button>
                
                <button
                  onClick={() => handleStatusUpdate(selectedContactDetails._id, 'archived')}
                  disabled={statusUpdateLoading === selectedContactDetails._id}
                  className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  Archive
                </button>
                
                <button
                  onClick={() => {
                    setContactToDelete(selectedContactDetails);
                    setShowDeleteModal(true);
                    setShowDetailsModal(false);
                  }}
                  className="px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactComponents;