"use client"

import RichTextEditor from '@/app/components/sharedItems/RichTextEditor/RichTextEditor';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import { ArrowRight, CheckCircle, Mail, MessageSquare, Send, Sparkles, User } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      const response = await axiosInstance.post('/contact', {
        ...formData,
        // Strip HTML tags if your backend expects plain text
        message: formData.message.replace(/<[^>]*>/g, '') // Optional: convert to plain text
      });
      
      if (response.data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(response.data.message || 'Failed to send message');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMessageChange = (value) => {
    setFormData({
      ...formData,
      message: value
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

        <div className="max-w-2xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-xl font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Error!</h4>
                  <p className="text-gray-300">{error}</p>
                </div>
              </div>
            </div>
          )}

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
                <RichTextEditor
                  value={formData.message}
                  onChange={handleMessageChange}
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

          {/* Quick Contact Info */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-[#D9FDA3]/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D9FDA3] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#051320]" />
              </div>
              <h4 className="text-xl font-bold text-white">Need Quick Help?</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Our team is available Tuesday through Monday, 9 AM to 2 AM.
            </p>
            <p className="text-[#D9FDA3] text-sm font-medium">
              Email: backbenchercoder.official@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;