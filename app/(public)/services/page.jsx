"use client"
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
import { useState } from 'react';

const Services = () => {
  const [activeService, setActiveService] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Build responsive, high-performance websites and web applications with modern technologies.",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      features: ["React/Next.js", "Responsive Design", "SEO Optimized", "Fast Loading"],
      price: "From $999",
      delivery: "2-4 Weeks",
      projects: 120
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Create stunning user interfaces and seamless user experiences that drive engagement.",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      features: ["Figma/Adobe XD", "User Research", "Wireframing", "Prototyping"],
      price: "From $799",
      delivery: "1-3 Weeks",
      projects: 85
    },
    {
      id: 3,
      title: "Mobile Apps",
      description: "Develop cross-platform mobile applications for iOS and Android with native performance.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      features: ["React Native", "iOS & Android", "App Store Ready", "Push Notifications"],
      price: "From $1499",
      delivery: "4-6 Weeks",
      projects: 65
    },
    {
      id: 4,
      title: "E-commerce Solutions",
      description: "Complete online store setup with payment integration, inventory management, and analytics.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      features: ["Shopify/WordPress", "Payment Gateway", "Inventory Management", "Analytics"],
      price: "From $1299",
      delivery: "3-5 Weeks",
      projects: 92
    },
    {
      id: 5,
      title: "Cloud Services",
      description: "Cloud infrastructure setup, migration, and management for scalable applications.",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      features: ["AWS/Azure", "Server Setup", "Migration", "24/7 Monitoring"],
      price: "From $499/month",
      delivery: "1-2 Weeks",
      projects: 47
    },
    {
      id: 6,
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security audits and protection systems.",
      icon: <Shield className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      features: ["Security Audit", "Penetration Testing", "Firewall Setup", "SSL Certificates"],
      price: "From $899",
      delivery: "2-3 Weeks",
      projects: 38
    },
    {
      id: 7,
      title: "Database Solutions",
      description: "Design, optimize, and maintain high-performance database systems for your applications.",
      icon: <Database className="w-8 h-8" />,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      features: ["MySQL/MongoDB", "Database Design", "Optimization", "Backup & Recovery"],
      price: "From $699",
      delivery: "1-2 Weeks",
      projects: 56
    },
    {
      id: 8,
      title: "API Development",
      description: "Build robust RESTful APIs and microservices architecture for seamless integration.",
      icon: <Server className="w-8 h-8" />,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/30",
      features: ["REST/GraphQL", "Documentation", "Authentication", "Rate Limiting"],
      price: "From $599",
      delivery: "2-3 Weeks",
      projects: 73
    }
  ];

  const serviceCategories = [
    { name: "All", count: services.length },
    { name: "Development", count: 3 },
    { name: "Design", count: 1 },
    { name: "Infrastructure", count: 4 },
    { name: "Security", count: 1 }
  ];

  const processSteps = [
    { step: 1, title: "Consultation", description: "Understand your requirements", icon: <Users className="w-6 h-6" /> },
    { step: 2, title: "Planning", description: "Create project roadmap", icon: <Target className="w-6 h-6" /> },
    { step: 3, title: "Development", description: "Build with modern tech", icon: <Code2 className="w-6 h-6" /> },
    { step: 4, title: "Testing", description: "Quality assurance", icon: <CheckCircle className="w-6 h-6" /> },
    { step: 5, title: "Delivery", description: "Deploy & handover", icon: <Zap className="w-6 h-6" /> },
    { step: 6, title: "Support", description: "Ongoing maintenance", icon: <Headphones className="w-6 h-6" /> }
  ];

  const selectedService = services.find(service => service.id === activeService);

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
          {services.map((service) => (
            <div
              key={service.id}
              className="group"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveService(service.id)}
            >
              <div className={`h-full rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                activeService === service.id 
                  ? `${service.borderColor} bg-gradient-to-br from-white/10 to-transparent scale-[1.02] shadow-2xl shadow-current/10` 
                  : hoveredCard === service.id 
                    ? 'border-white/20 bg-white/5 scale-[1.01]' 
                    : 'border-white/10 bg-white/5'
              }`}>
                {/* Icon */}
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-4`}>
                    <div className={`bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}>
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-white font-bold">{service.projects}</div>
                      <div className="text-gray-400 text-xs">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{service.delivery}</div>
                      <div className="text-gray-400 text-xs">Delivery</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{service.price}</div>
                      <div className="text-gray-400 text-xs">Starting Price</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="px-6 pb-6">
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] hover:shadow-lg hover:shadow-[#D9FDA3]/20'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Service Details */}
        {selectedService && (
          <div className="mb-12 md:mb-16">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Side - Details */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${selectedService.bgColor} flex items-center justify-center`}>
                      <div className={`bg-gradient-to-br ${selectedService.color} bg-clip-text text-transparent`}>
                        {selectedService.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#D9FDA3]" />
                          <span className="text-gray-300 text-sm">{selectedService.delivery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart className="w-4 h-4 text-[#D9FDA3]" />
                          <span className="text-gray-300 text-sm">{selectedService.projects} projects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg mb-6">{selectedService.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                        <CheckCircle className="w-5 h-5 text-[#D9FDA3]" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
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
              { value: "50+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> }
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