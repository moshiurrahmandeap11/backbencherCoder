"use client";
import {
    AlertTriangle,
    Award,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Cloud,
    Code,
    DollarSign,
    ExternalLink,
    FileText,
    Headphones,
    Lock,
    Mail,
    Phone,
    RefreshCw,
    Shield,
    Smartphone,
    Target,
    TrendingUp,
    Users,
    XCircle,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ServiceAgreements = () => {
  const [openSections, setOpenSections] = useState({
    agreementOverview: true,
    scopeOfServices: false,
    serviceLevels: false,
    paymentTerms: false,
    intellectualProperty: false,
    confidentiality: false,
    warranties: false,
    termination: false,
    liability: false,
    disputeResolution: false,
    amendments: false,
    contact: false
  });

  const router = useRouter();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAcceptAgreement = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('serviceAgreementAccepted', 'true');
          localStorage.setItem('agreementAcceptanceDate', new Date().toISOString());
          resolve();
        }, 1500);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 animate-pulse" />
            <span>Processing agreement acceptance...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Service agreement accepted! Redirecting...</span>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Failed to accept agreement. Please try again.</span>
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
      }
    ).then(() => {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    });
  };

  const currentYear = new Date().getFullYear();
  const effectiveDate = "January 20, 2024";
  const lastUpdated = "January 20, 2024";

  const serviceTypes = [
    {
      name: 'Custom Web Development',
      icon: <Code className="w-5 h-5" />,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/20',
      features: ['Responsive Design', 'Full Stack Development', 'CMS Integration', 'API Development'],
      timeline: '4-12 weeks',
      price: 'Custom Quote'
    },
    {
      name: 'Mobile App Development',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/20',
      features: ['iOS & Android', 'Cross-Platform', 'App Store Submission', 'Maintenance'],
      timeline: '8-16 weeks',
      price: 'Custom Quote'
    },
    {
      name: 'UI/UX Design',
      icon: <Target className="w-5 h-5" />,
      color: 'text-pink-400',
      bgColor: 'from-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/20',
      features: ['Wireframing', 'Prototyping', 'User Testing', 'Design Systems'],
      timeline: '2-6 weeks',
      price: 'Fixed or Hourly'
    },
    {
      name: 'Cloud Solutions',
      icon: <Cloud className="w-5 h-5" />,
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-500/20',
      features: ['AWS/Azure Setup', 'DevOps', 'Scalability', 'Security'],
      timeline: '2-8 weeks',
      price: 'Monthly Retainer'
    },
    {
      name: 'Technical Support',
      icon: <Headphones className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-transparent',
      borderColor: 'border-green-500/20',
      features: ['24/7 Monitoring', 'Bug Fixes', 'Updates', 'Consultation'],
      timeline: 'Ongoing',
      price: 'Monthly/Annual'
    },
    {
      name: 'Digital Marketing',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-amber-400',
      bgColor: 'from-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/20',
      features: ['SEO', 'Social Media', 'Content Strategy', 'Analytics'],
      timeline: '3+ months',
      price: 'Monthly Retainer'
    }
  ];

  const slaTiers = [
    {
      name: 'Basic',
      responseTime: '24 Business Hours',
      resolutionTime: '3-5 Business Days',
      uptime: '99.5%',
      support: 'Email Only',
      price: 'Free',
      color: 'text-gray-400',
      bgColor: 'from-gray-500/10 to-transparent',
      borderColor: 'border-gray-500/20'
    },
    {
      name: 'Professional',
      responseTime: '4 Business Hours',
      resolutionTime: '1-2 Business Days',
      uptime: '99.7%',
      support: 'Email & Chat',
      price: '$99/month',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/20'
    },
    {
      name: 'Enterprise',
      responseTime: '1 Hour',
      resolutionTime: '4-8 Hours',
      uptime: '99.9%',
      support: '24/7 Phone & Chat',
      price: '$499/month',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/20'
    }
  ];

  const sections = [
    {
      id: 'agreementOverview',
      title: 'Agreement Overview',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-[#D9FDA3] mb-3">Purpose & Parties</h4>
            <p className="text-gray-300 mb-4">
              This Service Agreement ("Agreement") is entered into between Backbencher Coder 
              ("Service Provider") and the Client ("Client"). This Agreement governs the 
              provision of professional services as detailed herein.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">Effective Date</h5>
                <p className="text-gray-300 text-sm">{effectiveDate}</p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-purple-400">Agreement Term</h5>
                <p className="text-gray-300 text-sm">As specified in Service Order Form</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Our Commitment</h4>
              <p className="text-gray-300 text-sm">
                To deliver high-quality services with professionalism and expertise
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Client Responsibility</h4>
              <p className="text-gray-300 text-sm">
                To provide timely feedback, content, and necessary resources
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'scopeOfServices',
      title: 'Scope of Services',
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-4">Available Services</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTypes.map((service, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${service.bgColor} p-4 rounded-lg border ${service.borderColor}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={service.color}>
                      {service.icon}
                    </div>
                    <h5 className={`font-semibold ${service.color}`}>{service.name}</h5>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-400">Timeline:</span>
                      <p className="text-gray-300 text-sm">{service.timeline}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-400">Pricing:</span>
                      <p className="text-gray-300 text-sm">{service.price}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-400">Features:</span>
                      <ul className="space-y-1 mt-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-300 text-xs flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Specific service details, timelines, and pricing will be outlined in a 
                separate Service Order Form (SOF) for each project.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'serviceLevels',
      title: 'Service Level Agreements (SLAs)',
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-4">Support Tiers</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slaTiers.map((sla, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${sla.bgColor} p-4 rounded-lg border ${sla.borderColor}`}
                >
                  <h5 className={`text-xl font-bold ${sla.color} mb-2`}>{sla.name}</h5>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-400">Response Time:</span>
                      <p className="text-gray-300 text-sm">{sla.responseTime}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400">Resolution Time:</span>
                      <p className="text-gray-300 text-sm">{sla.resolutionTime}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400">Uptime Guarantee:</span>
                      <p className="text-gray-300 text-sm">{sla.uptime}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400">Support Channels:</span>
                      <p className="text-gray-300 text-sm">{sla.support}</p>
                    </div>
                    <div className="pt-2">
                      <span className="text-xs text-gray-400">Monthly Price:</span>
                      <p className={`text-lg font-bold ${sla.color}`}>{sla.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Performance Metrics</h4>
              <p className="text-gray-300 text-sm">
                We commit to meeting or exceeding the SLA metrics specified in your chosen tier.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Service Credits</h4>
              <p className="text-gray-300 text-sm">
                If we fail to meet SLA commitments, service credits will be applied as specified.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'paymentTerms',
      title: 'Payment Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Service Type</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Payment Structure</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Milestone Payments</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Late Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Web Development</td>
                  <td className="py-3 px-4 text-gray-300">50% upfront, 50% on delivery</td>
                  <td className="py-3 px-4 text-gray-300">Based on milestones</td>
                  <td className="py-3 px-4 text-gray-300">2% per month</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Monthly Services</td>
                  <td className="py-3 px-4 text-gray-300">Monthly in advance</td>
                  <td className="py-3 px-4 text-gray-300">N/A</td>
                  <td className="py-3 px-4 text-gray-300">Service suspension</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Hourly Consulting</td>
                  <td className="py-3 px-4 text-gray-300">Bi-weekly invoicing</td>
                  <td className="py-3 px-4 text-gray-300">N/A</td>
                  <td className="py-3 px-4 text-gray-300">2% per month</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Annual Contracts</td>
                  <td className="py-3 px-4 text-gray-300">Annual payment</td>
                  <td className="py-3 px-4 text-gray-300">N/A</td>
                  <td className="py-3 px-4 text-gray-300">5% reinstatement fee</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Accepted Payment Methods</h4>
              <div className="space-y-1">
                <p className="text-gray-300 text-sm">• Bank Transfer</p>
                <p className="text-gray-300 text-sm">• Credit/Debit Cards</p>
                <p className="text-gray-300 text-sm">• Digital Payments</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Taxes</h4>
              <p className="text-gray-300 text-sm">
                All prices exclude applicable taxes unless stated otherwise.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-semibold text-amber-400 mb-2">Refund Policy</h4>
              <p className="text-gray-300 text-sm">
                Refunds considered on a case-by-case basis as per project circumstances.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'intellectualProperty',
      title: 'Intellectual Property Rights',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Ownership Transfer</h4>
            <p className="text-gray-300 mb-4">
              Upon full payment of all fees, Backbencher Coder assigns to the Client all 
              intellectual property rights in the deliverables created specifically for the Client.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-green-400">Client Owns</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Custom code developed for the project</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Unique design elements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Project-specific documentation</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">We Retain</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    <span>Proprietary frameworks and tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    <span>Reusable code libraries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400" />
                    <span>General knowledge and expertise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                All source code, design files, and documentation will be delivered to the Client 
                upon project completion and final payment.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Non-Disclosure Agreement</h4>
            <p className="text-gray-300 mb-4">
              Both parties agree to maintain the confidentiality of all proprietary information 
              received from the other party. Confidential information includes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="font-medium text-blue-400">From Client</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Business plans and strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Proprietary technology and processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Customer data and information</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-purple-400">From Us</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Proprietary development methodologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Internal tools and frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Pricing structures and business terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Duration</h4>
              <p className="text-gray-300 text-sm">
                Confidentiality obligations survive for 3 years after termination of this Agreement.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Exceptions</h4>
              <p className="text-gray-300 text-sm">
                Information that becomes publicly available or is required by law to be disclosed.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'warranties',
      title: 'Warranties & Guarantees',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-400">Our Warranties</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Services will be performed with reasonable skill and care</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Deliverables will substantially conform to specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>90-day bug fix warranty from delivery</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-amber-400">Limitations</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>No warranty for third-party products or services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>No guarantee of specific business results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Subject to timely client cooperation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 mb-2">Remedy</h4>
            <p className="text-gray-300 text-sm">
              Our sole obligation for breach of warranty is to re-perform the defective services 
              or refund a proportional amount of fees paid.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <XCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-red-400">For Cause</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Either party may terminate if:</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Material breach not cured within 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Insolvency or bankruptcy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Illegal or unethical activities</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-400">For Convenience</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300 text-sm mb-2">Client may terminate by:</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>30 days written notice for monthly services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Project cancellation with applicable fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Completion of contract term</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Upon termination, Client remains obligated to pay for services rendered and 
                expenses incurred up to the termination date.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Maximum Liability</h4>
            <p className="text-gray-300 mb-4">
              In no event shall Backbencher Coder's total liability to the Client for all claims 
              arising from or related to this Agreement exceed the total fees paid by the Client 
              under this Agreement in the six months preceding the claim.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-red-400">Excluded Damages</h5>
                <p className="text-gray-300 text-sm">
                  We are not liable for indirect, incidental, consequential, special, or 
                  punitive damages, including lost profits or business interruption.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-green-400">Essential Purpose</h5>
                <p className="text-gray-300 text-sm">
                  These limitations apply even if any remedy fails of its essential purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'disputeResolution',
      title: 'Dispute Resolution',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Resolution Process</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">Informal Negotiation</p>
                </div>
                <div className="flex-1 h-px bg-white/10"></div>
                
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">Mediation</p>
                </div>
                <div className="flex-1 h-px bg-white/10"></div>
                
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="text-gray-300 text-xs mt-2">Arbitration</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Parties agree to attempt to resolve disputes through good faith negotiation 
                  for at least 30 days before pursuing other remedies.
                </p>
                
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Mediation is mandatory before litigation</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Governing Law</h4>
              <p className="text-gray-300 text-sm">
                This Agreement shall be governed by the laws of Bangladesh.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Venue</h4>
              <p className="text-gray-300 text-sm">
                Disputes shall be resolved in courts located in Mymensingh, Bangladesh.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'amendments',
      title: 'Amendments & Updates',
      icon: <RefreshCw className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Modification Process</h4>
            <p className="text-gray-300 mb-4">
              This Agreement may be amended only by written agreement signed by both parties. 
              We reserve the right to update these terms periodically.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  Notice of material changes will be provided 30 days in advance
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  Changes will be communicated via email to registered clients
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
              <h4 className="font-semibold text-[#D9FDA3] mb-4">Agreement Inquiries</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a 
                    href="mailto:agreements@backbenchercoder.com" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    agreements@backbenchercoder.com
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
                <p>Service Agreements Department</p>
                <p>Noumohol, Mymensingh</p>
                <p>Bangladesh</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Response Time</h4>
            <p className="text-gray-300 text-sm">
              We aim to respond to all agreement-related inquiries within 1-2 business days.
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
            <span className="text-[#D9FDA3]">Service Agreements</span>
          </div>

          {/* Main Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                <FileText className="w-8 h-8 text-[#D9FDA3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Agreements</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Effective: {effectiveDate}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="hidden md:flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Version 3.0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mb-6">
              This Service Agreement outlines the terms and conditions governing our professional 
              services. By engaging with Backbencher Coder, you agree to be bound by these terms 
              which define our mutual responsibilities and expectations.
            </p>
            
            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-xl border border-blue-500/20">
                <h3 className="font-semibold text-blue-400 mb-2">Professional Services</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive terms for all our development and consulting services
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-xl border border-green-500/20">
                <h3 className="font-semibold text-green-400 mb-2">Clear Expectations</h3>
                <p className="text-gray-300 text-sm">
                  Detailed scope, timelines, and responsibilities for both parties
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-xl border border-purple-500/20">
                <h3 className="font-semibold text-purple-400 mb-2">Legal Protection</h3>
                <p className="text-gray-300 text-sm">
                  Comprehensive terms protecting both client and service provider
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Legal Document</h3>
                <p className="text-gray-300">
                  This is a legally binding agreement. Please read it carefully before accepting. 
                  If you have questions, contact us for clarification.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-4">
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

          {/* Agreement Acceptance Section */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#051320] to-[#0a1a2d] border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Agreement Acceptance</h3>
                <p className="text-gray-300 mb-4">
                  By proceeding, you acknowledge that you have read, understood, and agree to 
                  be bound by this Service Agreement. This agreement becomes effective upon:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Your electronic acceptance below</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Submission of a signed Service Order Form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Payment of initial deposit (if applicable)</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAcceptAgreement}
                  className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-xl hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                >
                  I Accept Agreement
                </button>
              </div>
            </div>
          </div>

          {/* Related Documents */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-6">Related Legal Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  How we handle your personal information and data
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
                  General terms for website usage and services
                </p>
              </Link>
              
              <Link 
                href="/cookie-policy" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-purple-400 transition-colors">
                    Cookie Policy
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Information about our use of cookies and tracking
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAgreements;