"use client"
import RichTextEditor from "@/app/components/sharedItems/RichTextEditor/RichTextEditor";
import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Image as ImageIcon,
  Package,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const ServicesComponents = () => {
  // State Management
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Form States
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    price: "",
    deliveryTime: "",
    images: [],
  });
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch Data
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/services");
      setServices(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to fetch services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter Services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.features?.some(feature => 
                           typeof feature === 'string' && 
                           feature.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    return matchesSearch;
  });

  // Sort Services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch(sortBy) {
      case "title-asc": return a.title.localeCompare(b.title);
      case "title-desc": return b.title.localeCompare(a.title);
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
      default: return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = sortedServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleFeaturesChange = (e) => {
    setFormData(prev => ({
      ...prev,
      features: e.target.value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previewUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // CRUD Operations
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("features", formData.features);
      formDataObj.append("price", formData.price);
      formDataObj.append("deliveryTime", formData.deliveryTime);
      
      // Append images
      selectedImages.forEach(image => {
        formDataObj.append("images", image);
      });
      
      await axiosInstance.post("/services", formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchServices();
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding service:", err);
      alert("Failed to add service");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("features", formData.features);
      formDataObj.append("price", formData.price);
      formDataObj.append("deliveryTime", formData.deliveryTime);
      
      // Append new images
      selectedImages.forEach(image => {
        formDataObj.append("images", image);
      });
      
      await axiosInstance.put(`/services/${selectedService._id}`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      await fetchServices();
      resetForm();
      setShowEditModal(false);
      setSelectedService(null);
    } catch (err) {
      console.error("Error updating service:", err);
      alert("Failed to update service");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteService = async () => {
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/services/${selectedService._id}`);
      await fetchServices();
      setShowDeleteModal(false);
      setSelectedService(null);
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service");
    } finally {
      setActionLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: "",
      price: "",
      deliveryTime: "",
      images: [],
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      features: Array.isArray(service.features) ? service.features.join('\n') : "",
      price: service.price || "",
      deliveryTime: service.deliveryTime || "",
      images: service.images || []
    });
    setImagePreviews(service.images || []);
    setShowEditModal(true);
  };

  const openDeleteModal = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const openViewModal = (service) => {
    setSelectedService(service);
    setShowViewModal(true);
  };

  // Utility Functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Loading State
  if (loading) {
    return <SimpleLoader />
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Services</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchServices}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Service Management</h1>
          <p className="text-gray-600 mt-1">
            {services.length} services • {filteredServices.length} filtered
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services by title, description, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
            <button
              onClick={fetchServices}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid - Mobile */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentServices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search' : 'Add your first service'}
            </p>
          </div>
        ) : (
          currentServices.map(service => (
            <ServiceCard
              key={service._id}
              service={service}
              onView={openViewModal}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))
        )}
      </div>

      {/* Services Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentServices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? 'Try adjusting your search' : 'Add your first service'}
                    </p>
                  </td>
                </tr>
              ) : (
                currentServices.map(service => (
                  <ServiceRow
                    key={service._id}
                    service={service}
                    onView={openViewModal}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedServices.length)} of {sortedServices.length} services
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* Add Service Modal */}
      {showAddModal && (
        <ServiceFormModal
          show={showAddModal}
          onClose={() => {
            resetForm();
            setShowAddModal(false);
          }}
          onSubmit={handleAddService}
          formData={formData}
          handleInputChange={handleInputChange}
          handleDescriptionChange={handleDescriptionChange}
          handleFeaturesChange={handleFeaturesChange}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          imagePreviews={imagePreviews}
          loading={actionLoading}
          isEdit={false}
        />
      )}

      {/* Edit Service Modal */}
      {showEditModal && selectedService && (
        <ServiceFormModal
          show={showEditModal}
          onClose={() => {
            resetForm();
            setShowEditModal(false);
            setSelectedService(null);
          }}
          onSubmit={handleEditService}
          formData={formData}
          handleInputChange={handleInputChange}
          handleDescriptionChange={handleDescriptionChange}
          handleFeaturesChange={handleFeaturesChange}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          imagePreviews={imagePreviews}
          loading={actionLoading}
          isEdit={true}
          service={selectedService}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedService && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedService(null);
          }}
          onConfirm={handleDeleteService}
          title="Delete Service"
          itemName={selectedService.title}
          message="This action cannot be undone."
          loading={actionLoading}
        />
      )}

      {/* View Service Modal */}
      {showViewModal && selectedService && (
        <ServiceViewModal
          show={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}
    </div>
  );
};

// Service Card Component (Mobile)
const ServiceCard = ({ service, onView, onEdit, onDelete }) => {
      // Add formatPrice function inside ServiceCard
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {service.images?.[0] ? (
          <img 
            src={`${axiosInstance.defaults.baseURL}${service.images[0]}`}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center">
                  <Package class="w-12 h-12 text-gray-400" />
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={() => onView(service)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => onEdit(service)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(service)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Service Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {service.description?.replace(/<[^>]*>/g, '').substring(0, 60)}...
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-bold text-gray-900">{formatPrice(service.price)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">{service.deliveryTime}</span>
          </div>
        </div>
        
        {service.features && service.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {service.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
              >
                {typeof feature === 'string' ? feature.substring(0, 15) : 'Feature'}
              </span>
            ))}
            {service.features.length > 2 && (
              <span className="text-xs text-gray-500">+{service.features.length - 2} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Service Row Component (Desktop)
const ServiceRow = ({ service, onView, onEdit, onDelete }) => {
    const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  return (
    <tr key={service._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {service.images?.[0] ? (
              <img 
                className="h-10 w-10 rounded-full object-cover" 
                src={`${axiosInstance.defaults.baseURL}${service.images[0]}`} 
                alt={service.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Package class="w-5 h-5 text-gray-400" />
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{service.title}</div>
            <div className="text-sm text-gray-500 truncate max-w-xs">
              {service.description?.replace(/<[^>]*>/g, '').substring(0, 50)}...
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-semibold flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          {formatPrice(service.price)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-900">
          <Clock className="w-4 h-4 mr-2 text-blue-600" />
          {service.deliveryTime || "Not specified"}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">
          {service.features?.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="truncate max-w-xs">• {typeof feature === 'string' ? feature.substring(0, 20) : 'Feature'}</div>
          ))}
          {service.features?.length > 2 && (
            <div className="text-gray-500">+{service.features.length - 2} more</div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onView(service)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(service)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(service)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Service Form Modal Component
const ServiceFormModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  formData, 
  handleInputChange, 
  handleDescriptionChange,
  handleFeaturesChange,
  handleImageUpload,
  removeImage,
  imagePreviews,
  loading,
  isEdit,
  service 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {isEdit ? `Edit Service: ${service?.title}` : 'Add New Service'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="px-6 py-4 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Price and Delivery Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 24 hours, 3-5 days"
                  />
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (one per line)
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleFeaturesChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter each feature on a new line..."
              />
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter service description..."
              />
            </div>
            
            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              
              {/* Image Preview */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview.includes('blob:') ? preview : `${axiosInstance.defaults.baseURL}${preview}`}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Service' : 'Create Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  itemName,
  message,
  loading 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            {itemName ? `"${itemName}" - ` : ''} {message}
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service View Modal Component
const ServiceViewModal = ({ show, onClose, service }) => {
  if (!show || !service) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Service Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div>
              <div className="rounded-lg overflow-hidden bg-gray-100">
                {service.images?.[0] ? (
                  <img
                    src={`${axiosInstance.defaults.baseURL}${service.images[0]}`}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-64 flex items-center justify-center">
                          <Package class="w-16 h-16 text-gray-400" />
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {service.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {service.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={`${axiosInstance.defaults.baseURL}${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-20 w-full object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(service.price)}
                  </span>
                  {service.deliveryTime && (
                    <div className="flex items-center text-blue-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">{service.deliveryTime}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {service.features && service.features.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{typeof feature === 'string' ? feature : JSON.stringify(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
                <div 
                  className="prose max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesComponents;