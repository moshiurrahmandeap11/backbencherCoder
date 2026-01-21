"use client";
import {
    AlertCircle,
    AlertTriangle,
    Bell,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Cookie,
    Database,
    ExternalLink,
    Eye,
    FileText,
    Globe,
    Lock,
    Mail,
    Phone,
    Settings,
    Shield,
    ShieldCheck,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({
    dataCollection: true,
    dataUsage: false,
    dataSharing: false,
    userRights: false,
    cookies: false,
    security: false,
    changes: false,
    contact: false
  });
    const router = useRouter();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

const handleUnderStand = () => {
    toast.success('Thank you for accepting our Privacy Policy!', {
      duration: 1000,
      style: {
        background: '#051320',
        color: '#D9FDA3',
        border: '1px solid #D9FDA3',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '500',
      },
      icon: "",
    });


    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

const handleAcceptAllCookies = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Save cookie preferences
          localStorage.setItem('cookieConsent', 'accepted');
          localStorage.setItem('cookiePreferences', JSON.stringify({
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true
          }));
          resolve();
        }, 1500);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <Cookie className="w-4 h-4 animate-bounce" />
            <span>Processing cookie preferences...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>All cookies accepted! Redirecting to home...</span>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Failed to save preferences. Please try again.</span>
          </div>
        ),
      },
      {
        style: {
          background: 'linear-gradient(135deg, #051320 0%, #0a1a2d 100%)',
          color: '#D9FDA3',
          border: '1px solid rgba(217, 253, 163, 0.3)',
          borderRadius: '10px',
          padding: '16px 20px',
        },
        success: {
          duration: 2000,
          iconTheme: {
            primary: '#051320',
            secondary: '#4ade80',
          },
        },
        error: {
          duration: 3000,
          iconTheme: {
            primary: '#051320',
            secondary: '#ef4444',
          },
        },
      }
    ).then(() => {
      // Navigate to home after success toast
      setTimeout(() => {
        router.push('/');
      }, 2000); // Toast duration এর সমান
    });
  };

  const handleRejectCookies = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          // Save cookie preferences
          const userConfirmed = window.confirm(
            'Are you sure you want to reject non-essential cookies? This may affect some website features.'
          );
          
          if (userConfirmed) {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('cookiePreferences', JSON.stringify({
              essential: true,
              analytics: false,
              marketing: false,
              preferences: false
            }));
            resolve();
          } else {
            reject(new Error('User cancelled'));
          }
        }, 1000);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 animate-spin" />
            <span>Processing your cookie rejection...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <div>
              <p className="font-medium">Cookies rejected! Redirecting...</p>
              <p className="text-sm text-gray-300">Essential cookies remain active</p>
            </div>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Cookie rejection cancelled by user</span>
          </div>
        ),
      },
      {
        style: {
          background: 'linear-gradient(135deg, #051320 0%, #0a1a2d 100%)',
          color: '#D9FDA3',
          border: '1px solid rgba(217, 253, 163, 0.3)',
          borderRadius: '10px',
          padding: '16px 20px',
        },
        success: {
          duration: 2000,
          iconTheme: {
            primary: '#051320',
            secondary: '#10b981',
          },
        },
        error: {
          duration: 2000,
          iconTheme: {
            primary: '#051320',
            secondary: '#f59e0b',
          },
        },
      }
    ).then(() => {
      // Navigate to home after success toast
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }).catch(() => {
      // User cancelled, no navigation
    });
  };

  const lastUpdated = "January 20, 2024";

  const policySections = [
    {
      id: 'dataCollection',
      title: 'Information We Collect',
      icon: <Database className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-[#D9FDA3] mb-2">Personal Information</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Name, email address, and contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Account credentials and authentication data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Profile information and preferences</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-cyan-400 mb-2">Usage Data</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Browser type and device information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>IP address and location data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Usage patterns and interaction data</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-400 mb-2">Technical Information</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Cookies and tracking technologies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Log files and diagnostic data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Performance metrics and error reports</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'dataUsage',
      title: 'How We Use Your Information',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-4 rounded-lg border border-[#D9FDA3]/20">
              <h4 className="font-semibold text-[#D9FDA3] mb-2">Service Delivery</h4>
              <p className="text-gray-300 text-sm">
                To provide, maintain, and improve our services and features
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-4 rounded-lg border border-cyan-400/20">
              <h4 className="font-semibold text-cyan-400 mb-2">Communication</h4>
              <p className="text-gray-300 text-sm">
                To respond to inquiries and send important notifications
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400/10 to-transparent p-4 rounded-lg border border-purple-400/20">
              <h4 className="font-semibold text-purple-400 mb-2">Personalization</h4>
              <p className="text-gray-300 text-sm">
                To customize your experience and content recommendations
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400/10 to-transparent p-4 rounded-lg border border-green-400/20">
              <h4 className="font-semibold text-green-400 mb-2">Security</h4>
              <p className="text-gray-300 text-sm">
                To protect against fraud and ensure platform security
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dataSharing',
      title: 'Information Sharing & Disclosure',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">We Do Not Sell Your Data</h4>
            <p className="text-gray-300 mb-4">
              Backbencher Coder does not sell, rent, or trade your personal information 
              to third parties for marketing purposes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-[#D9FDA3]">Legitimate Sharing</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>With service providers under strict contracts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>For legal compliance and protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>With your explicit consent</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">International Transfers</h5>
                <p className="text-sm text-gray-300">
                  Data may be transferred to countries with adequate data protection standards 
                  as defined by applicable laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'userRights',
      title: 'Your Rights & Choices',
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-4 rounded-lg border border-[#D9FDA3]/20">
              <h4 className="font-semibold text-[#D9FDA3] mb-2">Access</h4>
              <p className="text-gray-300 text-sm">
                Right to access your personal data
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-4 rounded-lg border border-cyan-400/20">
              <h4 className="font-semibold text-cyan-400 mb-2">Rectification</h4>
              <p className="text-gray-300 text-sm">
                Right to correct inaccurate data
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400/10 to-transparent p-4 rounded-lg border border-purple-400/20">
              <h4 className="font-semibold text-purple-400 mb-2">Deletion</h4>
              <p className="text-gray-300 text-sm">
                Right to request data deletion
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400/10 to-transparent p-4 rounded-lg border border-green-400/20">
              <h4 className="font-semibold text-green-400 mb-2">Opt-Out</h4>
              <p className="text-gray-300 text-sm">
                Right to opt-out of marketing
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">How to Exercise Your Rights</h4>
            <p className="text-gray-300 text-sm mb-3">
              To exercise any of your rights, please contact us through the information 
              provided in the "Contact Us" section below.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <AlertCircle className="w-4 h-4" />
              <span>Response time: Within 30 days of receipt of request</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      icon: <Bell className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Types of Cookies We Use</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Cookie Type</th>
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Purpose</th>
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Essential</td>
                    <td className="py-3 px-4 text-gray-300">Site functionality</td>
                    <td className="py-3 px-4 text-gray-300">Session</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Analytics</td>
                    <td className="py-3 px-4 text-gray-300">Usage analysis</td>
                    <td className="py-3 px-4 text-gray-300">2 years</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Preference</td>
                    <td className="py-3 px-4 text-gray-300">Remember settings</td>
                    <td className="py-3 px-4 text-gray-300">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Marketing</td>
                    <td className="py-3 px-4 text-gray-300">Advertising</td>
                    <td className="py-3 px-4 text-gray-300">6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Cookie Management</h4>
            <p className="text-gray-300 text-sm mb-3">
              You can control cookies through your browser settings. However, disabling 
              essential cookies may affect site functionality.
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleAcceptAllCookies} className="px-4 py-2 bg-[#D9FDA3] text-[#051320] text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Accept All Cookies
              </button>
              <button onClick={handleRejectCookies} className="px-4 py-2 bg-white/5 text-gray-400 text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Reject Non-Essential
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-400/10 to-transparent p-4 rounded-lg border border-green-400/20">
              <h4 className="font-semibold text-green-400 mb-2">Encryption</h4>
              <p className="text-gray-300 text-sm">
                End-to-end encryption for sensitive data transmission
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-400/10 to-transparent p-4 rounded-lg border border-blue-400/20">
              <h4 className="font-semibold text-blue-400 mb-2">Access Control</h4>
              <p className="text-gray-300 text-sm">
                Strict access controls and authentication mechanisms
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400/10 to-transparent p-4 rounded-lg border border-purple-400/20">
              <h4 className="font-semibold text-purple-400 mb-2">Regular Audits</h4>
              <p className="text-gray-300 text-sm">
                Security assessments and vulnerability testing
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Incident Response</h4>
            <p className="text-gray-300 text-sm">
              We have implemented procedures to handle data breaches, including 
              notification to affected individuals and authorities as required by law.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      title: 'Policy Updates',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Update Notification</h4>
            <p className="text-gray-300 text-sm mb-3">
              We will notify you of any material changes to this Privacy Policy through:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D9FDA3]" />
                <span>Email notification to registered users</span>
              </li>
              <li className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D9FDA3]" />
                <span>Prominent notice on our website</span>
              </li>
              <li className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D9FDA3]" />
                <span>Updated "Last Updated" date</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">Current Version</h4>
                <p className="text-gray-300 text-sm">Effective from: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Mail className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-6 rounded-xl border border-[#D9FDA3]/20">
              <h4 className="font-semibold text-[#D9FDA3] mb-4">Data Protection Officer</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a 
                    href="mailto:privacy@backbenchercoder.com" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    backbenchercoder.official@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">+880 9658 261909</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-6 rounded-xl border border-cyan-400/20">
              <h4 className="font-semibold text-cyan-400 mb-4">Mailing Address</h4>
              <div className="space-y-2 text-gray-300">
                <p>Backbencher Coder</p>
                <p>Privacy Compliance Team</p>
                <p>Noumohol, Mymensingh</p>
                <p>Bangladesh</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Complaints</h4>
            <p className="text-gray-300 text-sm">
              If you have concerns about our data handling practices, you have the right 
              to lodge a complaint with your local data protection authority.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-[#051320] to-[#0a1a2d] text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#D9FDA3]">Privacy Policy</span>
          </div>

          {/* Main Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                <Shield className="w-8 h-8 text-[#D9FDA3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Policy</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="hidden md:flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Version 3.2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl">
              This Privacy Policy explains how Backbencher Coder collects, uses, discloses, 
              and safeguards your information when you use our services. Please read this 
              policy carefully to understand our views and practices regarding your personal data.
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-6 rounded-xl border border-[#D9FDA3]/20">
              <h3 className="font-semibold text-[#D9FDA3] mb-2">Transparency</h3>
              <p className="text-gray-300 text-sm">
                We believe in clear communication about how we handle your data.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-6 rounded-xl border border-cyan-400/20">
              <h3 className="font-semibold text-cyan-400 mb-2">Control</h3>
              <p className="text-gray-300 text-sm">
                You have control over your personal information and privacy settings.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400/10 to-transparent p-6 rounded-xl border border-purple-400/20">
              <h3 className="font-semibold text-purple-400 mb-2">Security</h3>
              <p className="text-gray-300 text-sm">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-4">
            {policySections.map((section) => (
              <div 
                key={section.id}
                className="bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-[#D9FDA3]">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  {openSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {openSections[section.id] && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Agreement Section */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#051320] to-[#0a1a2d] border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Your Consent</h3>
                <p className="text-gray-300">
                  By using our website and services, you consent to our Privacy Policy 
                  and agree to its terms. If you do not agree with this policy, please 
                  discontinue use of our services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleUnderStand} className="px-8 py-3 cursor-pointer bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  I Understand
                </button>
              </div>
            </div>
          </div>

          {/* Related Policies */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-6">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/terms" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-[#D9FDA3] transition-colors">
                    Terms of Service
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Legal terms governing the use of our services
                </p>
              </Link>
              
              <Link 
                href="/cookie-policy" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-cyan-400 transition-colors">
                    Cookie Policy
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Detailed information about our use of cookies
                </p>
              </Link>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;