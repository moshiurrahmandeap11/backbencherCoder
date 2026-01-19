"use client"
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Code2,
  Database,
  Globe,
  HeadphonesIcon as Headphones,
  Palette,
  Server, Shield,
  Smartphone,
  Target, Users,
  X,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/services");
        setServices(response.data.data || []);
        
        // Set first service as active if available
        if (response.data.data && response.data.data.length > 0) {
          setActiveService(response.data.data[0]._id);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Helper function to get icon component based on title
  const getIcon = (title) => {
    const iconMap = {
      'web': Code2,
      'design': Palette,
      'mobile': Smartphone,
      'ecommerce': Globe,
      'cloud': Cloud,
      'security': Shield,
      'database': Database,
      'api': Server,
    };

    const titleLower = title?.toLowerCase() || '';
    
    if (titleLower.includes('web') || titleLower.includes('development')) return iconMap.web;
    if (titleLower.includes('ui') || titleLower.includes('design')) return iconMap.design;
    if (titleLower.includes('mobile') || titleLower.includes('app')) return iconMap.mobile;
    if (titleLower.includes('ecommerce') || titleLower.includes('shop')) return iconMap.ecommerce;
    if (titleLower.includes('cloud')) return iconMap.cloud;
    if (titleLower.includes('security') || titleLower.includes('cyber')) return iconMap.security;
    if (titleLower.includes('database')) return iconMap.database;
    if (titleLower.includes('api')) return iconMap.api;
    
    return Code2;
  };

  // Helper function to render icon
  const renderIcon = (IconComponent, className = "w-8 h-8") => {
    return <IconComponent className={className} />;
  };

  // Helper function to get color based on index
  const getColor = (index) => {
    const colors = [
      { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
      { gradient: "from-purple-500 to-pink-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
      { gradient: "from-green-500 to-emerald-500", bg: "bg-green-500/10", border: "border-green-500/30" },
      { gradient: "from-orange-500 to-yellow-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
      { gradient: "from-indigo-500 to-purple-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
      { gradient: "from-red-500 to-rose-500", bg: "bg-red-500/10", border: "border-red-500/30" },
      { gradient: "from-amber-500 to-yellow-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
      { gradient: "from-teal-500 to-cyan-500", bg: "bg-teal-500/10", border: "border-teal-500/30" },
    ];
    
    return colors[index % colors.length];
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "Custom Quote";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get estimated projects count (random for demo)
  const getProjectsCount = (index) => {
    const baseCount = [120, 85, 65, 92, 47, 38, 56, 73];
    return baseCount[index % baseCount.length];
  };

  // Get estimated delivery time based on price
  const getDeliveryTime = (price) => {
    if (!price || price <= 500) return "1-2 Weeks";
    if (price <= 1000) return "2-3 Weeks";
    if (price <= 2000) return "3-4 Weeks";
    return "4-6 Weeks";
  };

  // Get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Remove leading slash if present and construct full URL
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${axiosInstance.defaults.baseURL}${cleanPath}`;
  };

  // Handle view details click
  const handleViewDetails = (service, e) => {
    e?.stopPropagation();
    setSelectedService(service);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const processSteps = [
    { step: 1, title: "Consultation", description: "Understand your requirements", icon: <Users className="w-6 h-6" /> },
    { step: 2, title: "Planning", description: "Create project roadmap", icon: <Target className="w-6 h-6" /> },
    { step: 3, title: "Development", description: "Build with modern tech", icon: <Code2 className="w-6 h-6" /> },
    { step: 4, title: "Testing", description: "Quality assurance", icon: <CheckCircle className="w-6 h-6" /> },
    { step: 5, title: "Delivery", description: "Deploy & handover", icon: <Zap className="w-6 h-6" /> },
    { step: 6, title: "Support", description: "Ongoing maintenance", icon: <Headphones className="w-6 h-6" /> }
  ];

  const featuredService = services.find(service => service._id === activeService);

  // Loading state
  if (loading) {
    return <SimpleLoader />
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-red-400 text-sm font-medium">Error</span>
          </div>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // If no services
  if (services.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <Zap className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">No Services</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Check back soon for our latest services
          </p>
        </div>
      </section>
    );
  }

  // Service Modal Component
  const ServiceModal = () => {
    if (!selectedService) return null;

    const color = getColor(services.findIndex(s => s._id === selectedService._id));
    const IconComponent = getIcon(selectedService.title);
    const hasImage = selectedService.images && selectedService.images.length > 0;
    const imageUrl = hasImage ? getImageUrl(selectedService.images[0]) : null;
    const deliveryTime = selectedService.deliveryTime || getDeliveryTime(selectedService.price);
    const projectsCount = getProjectsCount(services.findIndex(s => s._id === selectedService._id));

    return (
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4"
        onClick={closeModal}
      >
        <div 
          className="bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${color.bg} flex items-center justify-center`}>
                  <div className={`bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent`}>
                    {renderIcon(IconComponent, "w-6 h-6 md:w-8 md:h-8")}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-1">
                    {selectedService.title || "Unnamed Service"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1">
                    <span className="text-gray-400 text-xs md:text-sm">Service Details</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* Service Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Left Column - Images */}
              <div>
                <div className="rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black mb-3 md:mb-4">
                  {hasImage && imageUrl ? (
                    <img 
                      src={imageUrl}
                      alt={selectedService.title}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        // Create a new div with icon fallback
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'w-full h-48 md:h-56 flex flex-col items-center justify-center';
                        fallbackDiv.innerHTML = `
                          <div class="w-16 h-16 rounded-xl ${color.bg} flex items-center justify-center mb-3">
                            <div class="bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent">
                              ${renderIcon(IconComponent, "w-10 h-10").props ? '' : '<Code2 className="w-10 h-10" />'}
                            </div>
                          </div>
                          <div class="text-white text-lg font-bold">${selectedService.title}</div>
                        `;
                        e.target.parentElement.appendChild(fallbackDiv);
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 md:h-56 flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-xl ${color.bg} flex items-center justify-center mb-3`}>
                        <div className={`bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent`}>
                          {renderIcon(IconComponent, "w-10 h-10")}
                        </div>
                      </div>
                      <div className="text-white text-lg font-bold">{selectedService.title}</div>
                    </div>
                  )}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-3 md:mb-4">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg md:text-xl font-bold text-white">{projectsCount}</div>
                    <div className="text-gray-400 text-xs">Projects Done</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg md:text-xl font-bold text-white">{deliveryTime}</div>
                    <div className="text-gray-400 text-xs">Delivery Time</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg md:text-xl font-bold text-white">
                      {selectedService.price ? formatPrice(selectedService.price) : "Custom"}
                    </div>
                    <div className="text-gray-400 text-xs">Starting Price</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-4 md:space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Description</h3>
                  <div 
                    className="text-gray-300 text-sm md:text-base"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedService.description || "No description available" 
                    }}
                  />
                </div>

                {/* Features */}
                {selectedService.features && selectedService.features.length > 0 && (
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Features</h3>
                    <div className="space-y-1.5 md:space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 md:p-3 rounded-lg bg-white/5">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D9FDA3] shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Steps */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Our Process</h3>
                  <div className="space-y-2">
                    {processSteps.slice(0, 4).map((step) => (
                      <div key={step.step} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center font-bold text-[#051320] text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-white text-sm">{step.title}</h5>
                            <div className="text-[#D9FDA3]">
                              {step.icon}
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/contact" className="flex-1">
                      <button className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-lg md:rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300 text-sm md:text-base">
                        Get Started Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
              <Zap className="w-4 h-4 text-[#D9FDA3]" />
              <span className="text-[#D9FDA3] text-sm font-medium">Our Services</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Solutions That <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Drive Growth</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to meet your business needs and exceed expectations
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 md:mb-16">
            {services.map((service, index) => {
              const color = getColor(index);
              const IconComponent = getIcon(service.title);
              const projectsCount = getProjectsCount(index);
              const deliveryTime = service.deliveryTime || getDeliveryTime(service.price);
              const priceDisplay = service.price ? formatPrice(service.price) : "Custom Quote";
              const hasImage = service.images && service.images.length > 0;
              const imageUrl = hasImage ? getImageUrl(service.images[0]) : null;
              
              return (
                <div
                  key={service._id}
                  className="group"
                  onMouseEnter={() => setHoveredCard(service._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setActiveService(service._id)}
                >
                  <div className={`h-full rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    activeService === service._id 
                      ? `${color.border} bg-gradient-to-br from-white/10 to-transparent scale-[1.02] shadow-2xl shadow-current/10` 
                      : hoveredCard === service._id 
                        ? 'border-white/20 bg-white/5 scale-[1.01]' 
                        : 'border-white/10 bg-white/5'
                  }`}>
                    {/* Image Section */}
                    <div className="relative h-40 overflow-hidden rounded-t-2xl">
                      {hasImage && imageUrl ? (
                        <>
                          <img 
                            src={imageUrl}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              // Show icon fallback
                              const fallbackDiv = document.createElement('div');
                              fallbackDiv.className = 'absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center';
                              fallbackDiv.innerHTML = `
                                <div class="w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center">
                                  <div class="bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent">
                                    ${renderIcon(IconComponent, "w-10 h-10").props ? '' : '<Code2 className="w-10 h-10" />'}
                                  </div>
                                </div>
                              `;
                              e.target.parentElement.appendChild(fallbackDiv);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                          <div className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center`}>
                            <div className={`bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent`}>
                              {renderIcon(IconComponent, "w-10 h-10")}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Icon (only show if no image) */}
                      {!hasImage && (
                        <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-4`}>
                          <div className={`bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent`}>
                            {renderIcon(IconComponent, "w-6 h-6")}
                          </div>
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2">{service.title || "Unnamed Service"}</h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {service.description?.replace(/<[^>]*>/g, '').substring(0, 100) || "No description available"}
                      </p>
                      
                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color.gradient}`} />
                              <span className="text-gray-300 text-sm">
                                {typeof feature === 'string' ? feature.substring(0, 20) : 'Feature'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-white font-bold">{projectsCount}</div>
                          <div className="text-gray-400 text-xs">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">{deliveryTime}</div>
                          <div className="text-gray-400 text-xs">Delivery</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold">{priceDisplay}</div>
                          <div className="text-gray-400 text-xs">Price</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="px-6 pb-6">
                      <button 
                        onClick={(e) => handleViewDetails(service, e)}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeService === service._id
                            ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] hover:shadow-lg hover:shadow-[#D9FDA3]/20'
                            : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block rounded-2xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-[#D9FDA3]/20 p-1 mb-8">
              <div className="rounded-xl bg-[#051320] px-8 py-6">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Business?</h3>
                <p className="text-gray-300 mb-6">Let's discuss your project and create something amazing together</p>
                <Link href="/contact">
                  <button className="group px-8 py-3.5 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-full font-semibold hover:shadow-2xl hover:shadow-[#D9FDA3]/30 transition-all duration-300 flex items-center gap-3 mx-auto">
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: "24/7", label: "Support", icon: <Headphones className="w-6 h-6" /> },
                { value: "100%", label: "Satisfaction", icon: <CheckCircle className="w-6 h-6" /> },
                { value: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> },
                { value: `${services.length * 10}+`, label: "Happy Clients", icon: <Users className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 mb-3">
                    <div className="text-[#D9FDA3]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {showModal && <ServiceModal />}
    </>
  );
};

export default Services;