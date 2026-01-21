"use client"
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const response = await axiosInstance.post('/subscribe', { email });
      
      if (response.data.success) {
        setMessage('Successfully subscribed to our newsletter!');
        setMessageType('success');
        setEmail('');
        
        // Clear message after 5 seconds
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      
      if (error.response?.status === 409) {
        setMessage('This email is already subscribed');
      } else if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to subscribe. Please try again later.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!email || !window.confirm('Are you sure you want to unsubscribe?')) {
      return;
    }

    try {
      setLoading(true);
      
      // URL encode the email
      const encodedEmail = encodeURIComponent(email);
      await axiosInstance.delete(`/subscribe/${encodedEmail}`);
      
      setMessage('Successfully unsubscribed from newsletter');
      setMessageType('success');
      setEmail('');
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    } catch (error) {
      console.error('Unsubscribe error:', error);
      
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to unsubscribe. Please try again.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckSubscription = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    try {
      setLoading(true);
      
      const encodedEmail = encodeURIComponent(email);
      const response = await axiosInstance.get(`/subscribe/check/${encodedEmail}`);
      
      if (response.data.data.isSubscribed) {
        setMessage(`You are subscribed since ${new Date(response.data.data.subscriptionDate).toLocaleDateString()}`);
        setMessageType('success');
      } else {
        setMessage('This email is not subscribed to our newsletter');
        setMessageType('info');
      }
    } catch (error) {
      console.error('Check subscription error:', error);
      setMessage('Failed to check subscription status');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] rounded-3xl border border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Updated</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Get the latest tutorials, tips, and resources directly in your inbox. 
            No spam, just valuable content.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D9FDA3] focus:border-transparent transition-all duration-300"
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-linear-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-bold rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#051320] border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe Now
                  </>
                )}
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                messageType === 'success' 
                  ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                  : messageType === 'error'
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span className="text-sm md:text-base">{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;