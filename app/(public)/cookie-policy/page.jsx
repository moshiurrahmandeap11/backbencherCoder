"use client";
import {
    AlertTriangle,
    BarChart,
    Bell,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Cookie,
    Download,
    ExternalLink,
    Eye,
    Globe,
    Info,
    Lock,
    Mail,
    Phone,
    RefreshCw,
    Settings,
    Shield,
    XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CookiePolicy = () => {
  const [openSections, setOpenSections] = useState({
    whatAreCookies: true,
    typesOfCookies: false,
    howWeUse: false,
    thirdParty: false,
    management: false,
    specificTechnologies: false,
    updates: false,
    contact: false
  });

  const router = useRouter();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSavePreferences = (type) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('cookiePreferences', JSON.stringify({
            essential: true,
            analytics: type === 'all',
            marketing: type === 'all',
            preferences: type === 'all',
            savedAt: new Date().toISOString()
          }));
          resolve();
        }, 1000);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <Cookie className="w-4 h-4 animate-spin" />
            <span>Saving your cookie preferences...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Cookie preferences saved successfully!</span>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
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
          duration: 3000,
          iconTheme: {
            primary: '#051320',
            secondary: '#4ade80',
          },
        },
      }
    );
  };

  const handleAcceptAll = () => {
    handleSavePreferences('all');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const handleRejectNonEssential = () => {
    handleSavePreferences('essential');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const effectiveDate = "January 20, 2024";
  const lastUpdated = "January 20, 2024";

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for basic website functionality',
      purpose: 'Authentication, security, session management',
      duration: 'Session / Persistent',
      examples: 'Login sessions, shopping cart, security tokens',
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-transparent',
      borderColor: 'border-green-500/20',
      mandatory: true
    },
    {
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact',
      purpose: 'Website analytics, performance measurement',
      duration: 'Up to 2 years',
      examples: 'Google Analytics, visitor tracking',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/20'
    },
    {
      name: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      purpose: 'Personalization, language settings',
      duration: 'Up to 1 year',
      examples: 'Language preferences, theme settings',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/20'
    },
    {
      name: 'Marketing Cookies',
      description: 'Used for advertising and retargeting',
      purpose: 'Advertising, marketing campaigns',
      duration: 'Up to 6 months',
      examples: 'Facebook Pixel, AdWords tracking',
      color: 'text-amber-400',
      bgColor: 'from-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/20'
    }
  ];

  const sections = [
    {
      id: 'whatAreCookies',
      title: 'What Are Cookies?',
      icon: <Info className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Cookies are small text files that are placed on your device (computer, tablet, or mobile) 
            when you visit our website. They are widely used to make websites work more efficiently 
            and provide a better user experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-4 rounded-lg border border-[#D9FDA3]/20">
              <h4 className="font-semibold text-[#D9FDA3] mb-2">First-Party Cookies</h4>
              <p className="text-gray-300 text-sm">
                Set by our website directly. These are essential for basic functionality.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-4 rounded-lg border border-cyan-400/20">
              <h4 className="font-semibold text-cyan-400 mb-2">Third-Party Cookies</h4>
              <p className="text-gray-300 text-sm">
                Set by external services we use (like analytics or advertising).
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Cookies are not viruses and cannot execute code. They are simple text files that 
                cannot access other information on your computer.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'typesOfCookies',
      title: 'Types of Cookies We Use',
      icon: <Cookie className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cookieTypes.map((cookie, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${cookie.bgColor} p-4 rounded-lg border ${cookie.borderColor}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-semibold ${cookie.color}`}>{cookie.name}</h4>
                  {cookie.mandatory && (
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-3">{cookie.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-400">Purpose:</span>
                    <p className="text-gray-300 text-sm">{cookie.purpose}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Duration:</span>
                    <p className="text-gray-300 text-sm">{cookie.duration}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Examples:</span>
                    <p className="text-gray-300 text-sm">{cookie.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Essential cookies cannot be disabled as they are necessary for the website 
                to function properly. You can control other types through your browser settings.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'howWeUse',
      title: 'How We Use Cookies',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Authentication</h4>
              <p className="text-gray-300 text-sm">
                Keep you signed in and maintain your session
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Performance</h4>
              <p className="text-gray-300 text-sm">
                Monitor and improve website performance
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Personalization</h4>
              <p className="text-gray-300 text-sm">
                Remember your preferences and settings
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-semibold text-amber-400 mb-2">Analytics</h4>
              <p className="text-gray-300 text-sm">
                Understand how visitors use our website
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-4 rounded-lg border border-cyan-500/20">
              <h4 className="font-semibold text-cyan-400 mb-2">Security</h4>
              <p className="text-gray-300 text-sm">
                Detect and prevent security threats
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Advertising</h4>
              <p className="text-gray-300 text-sm">
                Deliver relevant advertisements
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'thirdParty',
      title: 'Third-Party Cookies',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Service</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Provider</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Purpose</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Privacy Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Google Analytics</td>
                  <td className="py-3 px-4 text-gray-300">Google LLC</td>
                  <td className="py-3 px-4 text-gray-300">Website analytics</td>
                  <td className="py-3 px-4 text-gray-300">
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Facebook Pixel</td>
                  <td className="py-3 px-4 text-gray-300">Meta Platforms</td>
                  <td className="py-3 px-4 text-gray-300">Advertising</td>
                  <td className="py-3 px-4 text-gray-300">
                    <a 
                      href="https://www.facebook.com/privacy/policy/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Hotjar</td>
                  <td className="py-3 px-4 text-gray-300">Hotjar Ltd</td>
                  <td className="py-3 px-4 text-gray-300">User behavior</td>
                  <td className="py-3 px-4 text-gray-300">
                    <a 
                      href="https://www.hotjar.com/legal/policies/privacy/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Stripe</td>
                  <td className="py-3 px-4 text-gray-300">Stripe Inc.</td>
                  <td className="py-3 px-4 text-gray-300">Payment processing</td>
                  <td className="py-3 px-4 text-gray-300">
                    <a 
                      href="https://stripe.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Third-party cookies are subject to the privacy policies of their respective providers. 
                We recommend reviewing their policies to understand how they handle your data.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'management',
      title: 'Cookie Management',
      icon: <Settings className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Browser Settings</h4>
            <p className="text-gray-300 mb-4">
              Most web browsers allow you to control cookies through their settings. Here's how to 
              manage cookies in popular browsers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-[#D9FDA3] mb-2">Google Chrome</h5>
                <p className="text-gray-300 text-sm">
                  Settings → Privacy and security → Cookies and other site data
                </p>
              </div>
              
              <div>
                <h5 className="font-medium text-cyan-400 mb-2">Mozilla Firefox</h5>
                <p className="text-gray-300 text-sm">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>
              
              <div>
                <h5 className="font-medium text-purple-400 mb-2">Safari</h5>
                <p className="text-gray-300 text-sm">
                  Preferences → Privacy → Cookies and website data
                </p>
              </div>
              
              <div>
                <h5 className="font-medium text-amber-400 mb-2">Microsoft Edge</h5>
                <p className="text-gray-300 text-sm">
                  Settings → Cookies and site permissions → Cookies and site data
                </p>
              </div>
            </div>
          </div>
          
          {/* Cookie Preference Management */}
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-6 rounded-lg border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-[#D9FDA3]" />
              <h4 className="font-semibold text-white">Manage Your Cookie Preferences</h4>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${cookie.bgColor} border ${cookie.borderColor}`}>
                        <div className={`w-3 h-3 rounded-full ${cookie.color.replace('text-', 'bg-')}`} />
                      </div>
                      <div>
                        <h5 className={`font-medium ${cookie.color}`}>{cookie.name}</h5>
                        <p className="text-gray-400 text-xs">{cookie.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${cookie.mandatory ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {cookie.mandatory ? 'Always On' : 'Optional'}
                      </span>
                      {!cookie.mandatory && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <button 
                  onClick={handleAcceptAll}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 font-semibold rounded-lg hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 border border-green-500/30 hover:scale-105 active:scale-95"
                >
                  <CheckCircle className="w-5 h-5" />
                  Accept All Cookies
                </button>
                
                <button 
                  onClick={handleRejectNonEssential}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-400 font-semibold rounded-lg hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 border border-amber-500/30 hover:scale-105 active:scale-95"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Non-Essential
                </button>
                
                <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 font-semibold rounded-lg hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 border border-blue-500/30 hover:scale-105 active:scale-95">
                  <Settings className="w-5 h-5" />
                  Save Custom Preferences
                </button>
              </div>
              
              <p className="text-gray-400 text-xs pt-2">
                Your preferences will be saved for 365 days. You can update them at any time.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'specificTechnologies',
      title: 'Specific Technologies',
      icon: <BarChart className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Local Storage</h4>
              <p className="text-gray-300 text-sm mb-3">
                Similar to cookies but stores larger amounts of data on your device.
              </p>
              <div className="text-xs text-gray-400">
                <span className="block">Purpose: Store user preferences</span>
                <span className="block">Duration: Until cleared</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Session Storage</h4>
              <p className="text-gray-300 text-sm mb-3">
                Temporary storage that lasts only for the duration of a session.
              </p>
              <div className="text-xs text-gray-400">
                <span className="block">Purpose: Temporary data</span>
                <span className="block">Duration: Session only</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Web Beacons</h4>
              <p className="text-gray-300 text-sm mb-3">
                Tiny transparent images used to track user activity.
              </p>
              <div className="text-xs text-gray-400">
                <span className="block">Purpose: Analytics tracking</span>
                <span className="block">Duration: Varies</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Fingerprinting</h4>
              <p className="text-gray-300 text-sm mb-3">
                Collecting browser and device characteristics for identification.
              </p>
              <div className="text-xs text-gray-400">
                <span className="block">Purpose: Fraud prevention</span>
                <span className="block">Duration: Persistent</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Policy Updates',
      icon: <RefreshCw className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Change Notification</h4>
            <p className="text-gray-300 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our 
              practices or for other operational, legal, or regulatory reasons.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  We will notify you of significant changes through email or website notice
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  The "Last Updated" date at the top will indicate when changes were made
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">Current Version</h4>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Effective: {effectiveDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                </div>
              </div>
              <button className="text-[#D9FDA3] hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact & Questions',
      icon: <Mail className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#D9FDA3]/10 to-transparent p-6 rounded-xl border border-[#D9FDA3]/20">
              <h4 className="font-semibold text-[#D9FDA3] mb-4">Cookie Inquiries</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a 
                    href="mailto:cookies@backbenchercoder.com" 
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
                <p>Privacy & Cookie Compliance</p>
                <p>Noumohol, Mymensingh</p>
                <p>Bangladesh</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Response Time</h4>
            <p className="text-gray-300 text-sm">
              We aim to respond to all cookie-related inquiries within 3-5 business days.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentYear = new Date().getFullYear();

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
            <span className="text-[#D9FDA3]">Cookie Policy</span>
          </div>

          {/* Main Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                <Cookie className="w-8 h-8 text-[#D9FDA3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Policy</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="hidden md:flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>GDPR & CCPA Compliant</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mb-6">
              This Cookie Policy explains how Backbencher Coder uses cookies and similar 
              technologies to recognize you when you visit our website. It explains what 
              these technologies are and why we use them, as well as your rights to control 
              our use of them.
            </p>
            
            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-2">Transparent</h3>
                <p className="text-gray-300 text-sm">
                  Clear information about all cookies used on our website
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-400 mb-2">Control</h3>
                <p className="text-gray-300 text-sm">
                  Full control over which cookies you accept or reject
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
                <h3 className="font-semibold text-purple-400 mb-2">Compliance</h3>
                <p className="text-gray-300 text-sm">
                  Adherence to global privacy regulations
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-4 mb-12">
            {sections.map((section) => (
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

          {/* Related Documents */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-6">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/privacy-policy" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-[#D9FDA3] transition-colors">
                    Privacy Policy
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Comprehensive information about data protection
                </p>
              </Link>
              
              <Link 
                href="/terms" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-cyan-400 transition-colors">
                    Terms & Conditions
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Legal terms governing website usage
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;