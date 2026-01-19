"use client"
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import {
  ArrowRight,
  BarChart,
  CheckCircle,
  Clock,
  Cloud,
  Code2,
  Database,
  Globe,
  HeadphonesIcon as Headphones,
  Palette,
  Server, Shield,
  Smartphone,
  Target, Users,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Helper function to get icon based on title
  const getIcon = (title) => {
    const iconMap = {
      'web': <Code2 className="w-8 h-8" />,
      'design': <Palette className="w-8 h-8" />,
      'mobile': <Smartphone className="w-8 h-8" />,
      'ecommerce': <Globe className="w-8 h-8" />,
      'cloud': <Cloud className="w-8 h-8" />,
      'security': <Shield className="w-8 h-8" />,
      'database': <Database className="w-8 h-8" />,
      'api': <Server className="w-8 h-8" />,
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
    
    return <Code2 className="w-8 h-8" />;
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

  // Service categories based on actual services
  const serviceCategories = [
    { name: "All", count: services.length },
    { name: "Development", count: services.filter(s => 
      s.title?.toLowerCase().includes('web') || 
      s.title?.toLowerCase().includes('mobile') || 
      s.title?.toLowerCase().includes('api')).length 
    },
    { name: "Design", count: services.filter(s => 
      s.title?.toLowerCase().includes('design') || 
      s.title?.toLowerCase().includes('ui')).length 
    },
    { name: "Infrastructure", count: services.filter(s => 
      s.title?.toLowerCase().includes('cloud') || 
      s.title?.toLowerCase().includes('database')).length 
    },
    { name: "Security", count: services.filter(s => 
      s.title?.toLowerCase().includes('security')).length 
    }
  ];

  const processSteps = [
    { step: 1, title: "Consultation", description: "Understand your requirements", icon: <Users className="w-6 h-6" /> },
    { step: 2, title: "Planning", description: "Create project roadmap", icon: <Target className="w-6 h-6" /> },
    { step: 3, title: "Development", description: "Build with modern tech", icon: <Code2 className="w-6 h-6" /> },
    { step: 4, title: "Testing", description: "Quality assurance", icon: <CheckCircle className="w-6 h-6" /> },
    { step: 5, title: "Delivery", description: "Deploy & handover", icon: <Zap className="w-6 h-6" /> },
    { step: 6, title: "Support", description: "Ongoing maintenance", icon: <Headphones className="w-6 h-6" /> }
  ];

  const selectedService = services.find(service => service._id === activeService);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9FDA3] mx-auto"></div>
          <p className="text-gray-300 mt-4">Loading services...</p>
        </div>
      </section>
    );
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

  return (
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

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {serviceCategories.map((category) => (
            <button
              key={category.name}
              className="group relative px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-gray-300 group-hover:text-white font-medium">
                {category.name}
              </span>
              <span className="ml-2 px-2 py-1 rounded-full bg-[#D9FDA3]/10 text-[#D9FDA3] text-xs font-semibold">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 md:mb-16">
          {services.map((service, index) => {
            const color = getColor(index);
            const icon = getIcon(service.title);
            const projectsCount = getProjectsCount(index);
            const deliveryTime = service.deliveryTime || getDeliveryTime(service.price);
            const priceDisplay = service.price ? formatPrice(service.price) : "Custom Quote";
            
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
                  {/* Icon */}
                  <div className="p-6">
                    <div className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center mb-4`}>
                      <div className={`bg-gradient-to-br ${color.gradient} bg-clip-text text-transparent`}>
                        {icon}
                      </div>
                    </div>
                    
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
                    <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeService === service._id
                        ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] hover:shadow-lg hover:shadow-[#D9FDA3]/20'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Service Details */}
        {selectedService && (
          <div className="mb-12 md:mb-16">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Side - Details */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${getColor(services.findIndex(s => s._id === selectedService._id)).bg} flex items-center justify-center`}>
                      <div className={`bg-gradient-to-br ${getColor(services.findIndex(s => s._id === selectedService._id)).gradient} bg-clip-text text-transparent`}>
                        {getIcon(selectedService.title)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedService.title || "Unnamed Service"}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#D9FDA3]" />
                          <span className="text-gray-300 text-sm">
                            {selectedService.deliveryTime || getDeliveryTime(selectedService.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart className="w-4 h-4 text-[#D9FDA3]" />
                          <span className="text-gray-300 text-sm">
                            {getProjectsCount(services.findIndex(s => s._id === selectedService._id))} projects
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p 
                    className="text-gray-300 text-lg mb-6"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedService.description?.replace(/<[^>]*>/g, '') || "No description available" 
                    }}
                  />
                  
                  {selectedService.features && selectedService.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {selectedService.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                          <CheckCircle className="w-5 h-5 text-[#D9FDA3]" />
                          <span className="text-white">{typeof feature === 'string' ? feature.substring(0, 30) : 'Feature'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300">
                      Get Started Now
                    </button>
                    <button className="px-6 py-3 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10">
                      Request Quote
                    </button>
                  </div>
                </div>
                
                {/* Right Side - Process */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-6">Our Process</h4>
                  <div className="space-y-4">
                    {processSteps.map((step) => (
                      <div key={step.step} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center font-bold text-[#051320]">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-white">{step.title}</h5>
                            <div className="text-[#D9FDA3]">
                              {step.icon}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechVision",
                content: "The web development service exceeded our expectations. Professional team, on-time delivery, and exceptional quality.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Product Manager, InnovateCo",
                content: "Outstanding UI/UX design work. They understood our vision perfectly and delivered beyond what we imagined.",
                rating: 5
              },
              {
                name: "Emma Williams",
                role: "CTO, CloudScale",
                content: "Their cloud migration services saved us 40% in infrastructure costs. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#051320] rounded-full" />
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-[#D9FDA3]/20 p-1 mb-8">
            <div className="rounded-xl bg-[#051320] px-8 py-6">
              <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Business?</h3>
              <p className="text-gray-300 mb-6">Let's discuss your project and create something amazing together</p>
              <button className="group px-8 py-3.5 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-full font-semibold hover:shadow-2xl hover:shadow-[#D9FDA3]/30 transition-all duration-300 flex items-center gap-3 mx-auto">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
  );
};

export default Services;