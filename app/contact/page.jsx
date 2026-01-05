"use client"
import {
    ArrowRight,
    CheckCircle,
    Clock,
    Globe, HeadphonesIcon as Headphones,
    Mail, MapPin,
    MessageSquare,
    Phone,
    Send,
    Sparkles,
    User
} from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const services = [
    { value: 'web-dev', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'ecommerce', label: 'E-commerce Solutions' },
    { value: 'cloud', label: 'Cloud Services' },
    { value: 'consulting', label: 'IT Consulting' }
  ];

  const contactTabs = [
    { id: 'general', label: 'General Inquiry', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'support', label: 'Technical Support', icon: <Headphones className="w-4 h-4" /> },
    { id: 'quote', label: 'Get a Quote', icon: <Send className="w-4 h-4" /> },
    { id: 'career', label: 'Career Opportunity', icon: <User className="w-4 h-4" /> }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-blue-500 to-cyan-500",
      action: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: ["hello@backbenchercoder.com", "support@backbenchercoder.com"],
      color: "from-purple-500 to-pink-500",
      action: "Send Email"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Location",
      details: ["123 Tech Street", "San Francisco, CA 94107"],
      color: "from-green-500 to-emerald-500",
      action: "Get Directions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
      color: "from-orange-500 to-yellow-500",
      action: "Schedule Meeting"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <MessageSquare className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">Get in Touch</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Connect</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Contact Form */}
          <div className="lg:col-span-2">
            {/* Contact Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {contactTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Message Sent Successfully!</h4>
                    <p className="text-gray-300">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Service Interested In
                      </span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D9FDA3] transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Subject *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Your Message *
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Typically replies within 2 hours</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group px-8 py-3.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-3 ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] hover:shadow-2xl hover:shadow-[#D9FDA3]/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#051320] border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div>
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} p-3 flex items-center justify-center`}>
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm mb-1">{detail}</p>
                      ))}
                      <button className="mt-3 text-[#D9FDA3] text-sm font-medium hover:text-cyan-400 transition-colors">
                        {info.action} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-[#D9FDA3]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D9FDA3] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#051320]" />
                </div>
                <h4 className="text-xl font-bold text-white">Quick Response</h4>
              </div>
              <p className="text-gray-300 mb-6">
                Need immediate assistance? Our team is available for quick calls and live chat.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10">
                  Start Live Chat
                </button>
                <button className="w-full py-3 bg-[#D9FDA3] hover:bg-[#D9FDA3]/90 text-[#051320] rounded-xl font-semibold transition-colors">
                  Schedule a Call
                </button>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-4">Frequently Asked</h4>
              <div className="space-y-4">
                {[
                  { q: "What's your typical response time?", a: "Within 2 hours for urgent matters" },
                  { q: "Do you offer free consultations?", a: "Yes, 30-minute free consultation" },
                  { q: "What are your working hours?", a: "Mon-Fri 9 AM - 6 PM PST" }
                ].map((faq, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-white font-medium mb-1">{faq.q}</div>
                    <div className="text-gray-300 text-sm">{faq.a}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-[#D9FDA3] text-sm font-medium hover:text-cyan-400 transition-colors">
                View All FAQs →
              </button>
            </div>
          </div>
        </div>

        {/* Map/Office Section */}
        <div className="mt-16 md:mt-24">
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Office Info */}
              <div className="lg:col-span-1 p-8 bg-gradient-to-br from-[#051320] to-[#0a1a2d]">
                <h3 className="text-2xl font-bold text-white mb-6">Visit Our Office</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Headquarters</h4>
                    <p className="text-gray-300">123 Tech Street, San Francisco</p>
                    <p className="text-gray-300">California, CA 94107, USA</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Opening Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Parking & Access</h4>
                    <p className="text-gray-300">Free parking available in the building</p>
                    <p className="text-gray-300">Wheelchair accessible</p>
                  </div>
                </div>
                <button className="mt-8 w-full py-3 bg-[#D9FDA3] text-[#051320] rounded-xl font-semibold hover:bg-[#D9FDA3]/90 transition-colors">
                  Get Directions
                </button>
              </div>
              
              {/* Map Placeholder */}
              <div className="lg:col-span-2 relative min-h-[400px] bg-gradient-to-br from-gray-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D9FDA3]/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10 text-[#D9FDA3]" />
                    </div>
                    <h4 className="text-white text-xl font-bold mb-2">Interactive Map</h4>
                    <p className="text-gray-300">Office location map would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Connect With Us</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Twitter", color: "from-blue-400 to-cyan-400" },
              { name: "LinkedIn", color: "from-blue-500 to-blue-700" },
              { name: "GitHub", color: "from-gray-700 to-gray-900" },
              { name: "Instagram", color: "from-purple-500 to-pink-500" },
              { name: "YouTube", color: "from-red-500 to-red-700" }
            ].map((social, index) => (
              <button
                key={index}
                className={`group px-6 py-3 rounded-full bg-gradient-to-r ${social.color} text-white font-medium hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                {social.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;