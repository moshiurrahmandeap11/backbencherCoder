"use client";
import {
    AlertTriangle,
    Briefcase,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Eye,
    FileText,
    Globe,
    Lock,
    Mail,
    Phone,
    Shield,
    TrendingUp,
    Users,
    XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Disclaimer = () => {
  const [openSections, setOpenSections] = useState({
    generalDisclaimer: true,
    professionalAdvice: false,
    externalLinks: false,
    testimonials: false,
    financialInformation: false,
    affiliateDisclaimer: false,
    liabilityLimitation: false,
    jurisdiction: false,
    updates: false
  });

  const router = useRouter();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAcknowledge = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('disclaimerAcknowledged', 'true');
          localStorage.setItem('disclaimerDate', new Date().toISOString());
          resolve();
        }, 1500);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 animate-pulse" />
            <span>Processing your acknowledgment...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Disclaimer acknowledged! Redirecting to home...</span>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Failed to process. Please try again.</span>
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

  const sections = [
    {
      id: 'generalDisclaimer',
      title: 'General Disclaimer',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The information provided by Backbencher Coder ("we," "us," or "our") on our website 
            (backbenchercoder.com) is for general informational purposes only. All information 
            on the site is provided in good faith, however we make no representation or warranty 
            of any kind, express or implied, regarding the accuracy, adequacy, validity, 
            reliability, availability, or completeness of any information on the site.
          </p>
          
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE 
                OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY 
                INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY 
                INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'professionalAdvice',
      title: 'No Professional Advice',
      icon: <Briefcase className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-[#D9FDA3] mb-3">Educational Purpose Only</h4>
            <p className="text-gray-300 mb-4">
              The content on our website is provided for educational and informational purposes 
              only and is not intended as professional advice. We are not:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">Legal Advice</h5>
                <p className="text-gray-300 text-sm">
                  We do not provide legal advice. Always consult with a qualified attorney 
                  for legal matters.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-purple-400">Financial Advice</h5>
                <p className="text-gray-300 text-sm">
                  We are not financial advisors. Investment decisions should be made in 
                  consultation with a financial professional.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-green-400">Medical Advice</h5>
                <p className="text-gray-300 text-sm">
                  We do not provide medical advice. Consult healthcare professionals for 
                  medical concerns.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-amber-400">Technical Support</h5>
                <p className="text-gray-300 text-sm">
                  While we provide tutorials, we cannot guarantee specific results for 
                  your projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'externalLinks',
      title: 'External Links Disclaimer',
      icon: <ExternalLink className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Third-Party Links</h4>
            <p className="text-gray-300 mb-4">
              Our website may contain links to external websites that are not provided or 
              maintained by or in any way affiliated with Backbencher Coder. Please note that 
              we do not guarantee the accuracy, relevance, timeliness, or completeness of any 
              information on these external websites.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
                <h5 className="font-medium text-blue-400 mb-2">No Endorsement</h5>
                <p className="text-gray-300 text-sm">
                  Links to external sites do not constitute an endorsement or recommendation 
                  by Backbencher Coder.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
                <h5 className="font-medium text-red-400 mb-2">No Control</h5>
                <p className="text-gray-300 text-sm">
                  We have no control over the content, privacy policies, or practices of 
                  any third-party sites.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                We strongly advise you to review the Privacy Policies and Terms of Service 
                of any site you visit from our links.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'testimonials',
      title: 'Testimonials Disclaimer',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Individual Results May Vary</h4>
            <p className="text-gray-300 mb-4">
              The site may contain testimonials by users of our products and/or services. 
              These testimonials reflect the real-life experiences and opinions of such users. 
              However, the experiences are personal to those particular users, and may not 
              necessarily be representative of all users of our products and/or services.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-green-400">Not Guaranteed</h5>
                  <p className="text-gray-300 text-sm">
                    We do not claim, and you should not assume, that all users will have 
                    the same experiences.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-amber-400">Individual Factors</h5>
                  <p className="text-gray-300 text-sm">
                    Your individual results may vary based on your background, dedication, 
                    motivation, and other factors.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
                <h5 className="font-medium text-purple-400 mb-2">Verification</h5>
                <p className="text-gray-300 text-sm">
                  Testimonials appear on the site verbatim as given by users, except for 
                  correction of grammatical or typing errors. Some testimonials may have 
                  been shortened for brevity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'financialInformation',
      title: 'Financial Information Disclaimer',
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Not Financial Advice</h4>
            <p className="text-gray-300 mb-4">
              Any financial information provided on our website, including but not limited to 
              pricing, revenue projections, or business advice, is for informational purposes 
              only and should not be considered financial advice.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Information Type</th>
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Disclaimer</th>
                    <th className="text-left py-3 px-4 text-[#D9FDA3]">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Pricing Information</td>
                    <td className="py-3 px-4 text-gray-300">Subject to change without notice</td>
                    <td className="py-3 px-4 text-gray-300">Contact for current rates</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Revenue Projections</td>
                    <td className="py-3 px-4 text-gray-300">Estimates only, not guarantees</td>
                    <td className="py-3 px-4 text-gray-300">Past performance ≠ future results</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 text-gray-300">Investment Information</td>
                    <td className="py-3 px-4 text-gray-300">Educational purposes only</td>
                    <td className="py-3 px-4 text-gray-300">Consult financial advisor</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Business Strategies</td>
                    <td className="py-3 px-4 text-gray-300">May not work for all businesses</td>
                    <td className="py-3 px-4 text-gray-300">Adapt to your situation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                We are not responsible for any financial losses incurred based on information 
                provided on our website. All investments carry risk.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'affiliateDisclaimer',
      title: 'Affiliate Disclaimer',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Transparency Disclosure</h4>
            <p className="text-gray-300 mb-4">
              This website may contain links to affiliate websites, and we receive an affiliate 
              commission for any purchases made by you on the affiliate website using such links. 
              Our affiliates include, but are not limited to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-green-400">Product Recommendations</h5>
                <p className="text-gray-300 text-sm">
                  We only recommend products and services that we believe will provide value 
                  to our readers.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">Commissions</h5>
                <p className="text-gray-300 text-sm">
                  We may earn commissions when you purchase through our affiliate links, 
                  at no extra cost to you.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-amber-400">No Extra Cost</h5>
                <p className="text-gray-300 text-sm">
                  Using our affiliate links does not increase the price you pay.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-purple-400">Influence</h5>
                <p className="text-gray-300 text-sm">
                  Affiliate commissions do not influence our content, reviews, or recommendations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                Our primary goal is to provide helpful information. We will always disclose 
                affiliate relationships transparently.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'liabilityLimitation',
      title: 'Limitation of Liability',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Maximum Liability</h4>
            <p className="text-gray-300 mb-4">
              To the fullest extent permitted by applicable law, in no event shall Backbencher Coder, 
              its directors, employees, partners, agents, suppliers, or affiliates, be liable for any 
              indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Your access to or use of or inability to access or use the service
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Any conduct or content of any third party on the service
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Any content obtained from the service
                </p>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  Unauthorized access, use or alteration of your transmissions or content
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Important Notice</h4>
                <p className="text-gray-300 text-sm">
                  This limitation of liability applies regardless of the legal theory 
                  (contract, tort, or otherwise) and even if we have been advised of 
                  the possibility of such damages.
                </p>
              </div>
              <Lock className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'jurisdiction',
      title: 'Jurisdiction & Governing Law',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Governing Law</h4>
              <p className="text-gray-300 text-sm">
                These disclaimers shall be governed by and construed in accordance with the laws of 
                Bangladesh, without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Jurisdiction</h4>
              <p className="text-gray-300 text-sm">
                Any legal action or proceeding relating to your access to, or use of, the website 
                shall be instituted in a state or federal court in Mymensingh, Bangladesh.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Severability</h4>
            <p className="text-gray-300">
              If any provision of this Disclaimer is held to be unenforceable or invalid, such 
              provision will be changed and interpreted to accomplish the objectives of such 
              provision to the greatest extent possible under applicable law and the remaining 
              provisions will continue in full force and effect.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Updates & Changes',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Policy Updates</h4>
            <p className="text-gray-300 mb-4">
              We reserve the right to make changes or revisions to this disclaimer at any time 
              without prior notice. By using our website, you agree to be bound by the current 
              version of this disclaimer.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  You are responsible for periodically reviewing this disclaimer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-gray-300">
                  The "Last Updated" date at the top indicates when changes were made
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">Current Version</h4>
                <p className="text-gray-300 text-sm">Effective from: {effectiveDate}</p>
              </div>
            </div>
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
            <span className="text-[#D9FDA3]">Disclaimer</span>
          </div>

          {/* Warning Banner */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Legal Notice</h3>
                <p className="text-gray-300">
                  This disclaimer contains important information about the limitations of our 
                  services and your responsibilities as a user. Please read it carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                <FileText className="w-8 h-8 text-[#D9FDA3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Disclaimer</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last Updated: {effectiveDate}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="hidden md:flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Version 1.2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl">
              This Disclaimer governs the use of Backbencher Coder's website and services. 
              By accessing our website, you accept this disclaimer in full. If you disagree 
              with any part of this disclaimer, you must not use our website or services.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-6 rounded-xl border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-2">No Warranties</h3>
              <p className="text-gray-300 text-sm">
                We provide information "as is" without warranties of any kind
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-6 rounded-xl border border-amber-500/20">
              <h3 className="font-semibold text-amber-400 mb-2">Use at Your Risk</h3>
              <p className="text-gray-300 text-sm">
                Your use of our website is entirely at your own risk
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-xl border border-blue-500/20">
              <h3 className="font-semibold text-blue-400 mb-2">Professional Advice</h3>
              <p className="text-gray-300 text-sm">
                Our content does not constitute professional advice
              </p>
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

          {/* Agreement Section */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#051320] to-[#0a1a2d] border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Your Acknowledgment</h3>
                <p className="text-gray-300 mb-4">
                  By using our website and services, you acknowledge that you have read, 
                  understood, and agree to be bound by this Disclaimer. You understand that:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Our content is for informational purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>You use our services at your own risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>We are not liable for any damages or losses</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAcknowledge}
                  className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-xl hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                >
                  I Acknowledge & Agree
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#051320] to-[#0a1a2d] border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#D9FDA3] mb-3">For Legal Inquiries</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a 
                      href="mailto:legal@backbenchercoder.com" 
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
              
              <div>
                <h4 className="font-semibold text-cyan-400 mb-3">Mailing Address</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Backbencher Coder</p>
                  <p>Legal Department</p>
                  <p>Noumohol, Mymensingh</p>
                  <p>Bangladesh</p>
                </div>
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
                  How we collect, use, and protect your personal information
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
                  Legal terms governing the use of our services
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

export default Disclaimer;