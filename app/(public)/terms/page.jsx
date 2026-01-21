"use client";
import {
    AlertCircle,
    Award,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    CreditCard,
    ExternalLink,
    FileText,
    Lock,
    Mail,
    Phone,
    Scale,
    Shield,
    User,
    Users,
    XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const TermsAndConditions = () => {
  const [openSections, setOpenSections] = useState({
    acceptance: true,
    accounts: false,
    payments: false,
    intellectual: false,
    userContent: false,
    termination: false,
    liability: false,
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

  const handleAcceptTerms = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('termsAccepted', 'true');
          localStorage.setItem('termsAcceptanceDate', new Date().toISOString());
          resolve();
        }, 1500);
      }),
      {
        loading: (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 animate-pulse" />
            <span>Processing your acceptance...</span>
          </div>
        ),
        success: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Terms accepted! Redirecting to home...</span>
          </div>
        ),
        error: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Failed to accept terms. Please try again.</span>
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

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            By accessing and using Backbencher Coder services, you acknowledge that you have read, 
            understood, and agree to be bound by these Terms and Conditions. If you do not agree 
            with any part of these terms, you must not use our services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">You Must</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Be at least 18 years old</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Provide accurate information</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Comply with applicable laws</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">You Must Not</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <XCircle className="w-3 h-3 text-red-400" />
                  <span>Violate any laws or regulations</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-3 h-3 text-red-400" />
                  <span>Infringe intellectual property rights</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-3 h-3 text-red-400" />
                  <span>Engage in fraudulent activities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'accounts',
      title: 'User Accounts & Registration',
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-[#D9FDA3] mb-3">Account Responsibilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-cyan-400">Security</h5>
                <p className="text-gray-300 text-sm">
                  You are responsible for maintaining the confidentiality of your account 
                  credentials and for all activities that occur under your account.
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-purple-400">Accuracy</h5>
                <p className="text-gray-300 text-sm">
                  You must provide accurate and complete information during registration 
                  and keep it updated.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-1">Account Termination</h4>
                <p className="text-gray-300 text-sm">
                  We reserve the right to suspend or terminate accounts that violate these terms.
                </p>
              </div>
              <AlertCircle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payments',
      title: 'Payments & Refunds',
      icon: <CreditCard className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Service</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Payment Terms</th>
                  <th className="text-left py-3 px-4 text-[#D9FDA3]">Refund Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Web Development</td>
                  <td className="py-3 px-4 text-gray-300">50% upfront, 50% on delivery</td>
                  <td className="py-3 px-4 text-gray-300">Case-by-case basis</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Consultation</td>
                  <td className="py-3 px-4 text-gray-300">100% upfront</td>
                  <td className="py-3 px-4 text-gray-300">No refunds</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-gray-300">Maintenance</td>
                  <td className="py-3 px-4 text-gray-300">Monthly/Annual</td>
                  <td className="py-3 px-4 text-gray-300">Pro-rated refund</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300">Training</td>
                  <td className="py-3 px-4 text-gray-300">Full payment</td>
                  <td className="py-3 px-4 text-gray-300">48-hour cancellation</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Payment Methods</h4>
              <p className="text-gray-300 text-sm">
                We accept major credit cards, bank transfers, and digital payment methods.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Taxes</h4>
              <p className="text-gray-300 text-sm">
                All prices are exclusive of applicable taxes unless stated otherwise.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Late Payments</h4>
              <p className="text-gray-300 text-sm">
                Late payments may incur additional fees as specified in the invoice.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-[#D9FDA3] mb-2">Our Rights</h4>
                <p className="text-gray-300 mb-3">
                  All content, features, and functionality on our platform, including but not 
                  limited to text, graphics, logos, and software, are owned by Backbencher Coder 
                  and are protected by international copyright, trademark, and other laws.
                </p>
              </div>
              <Lock className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-lg border border-amber-500/20">
              <h4 className="font-semibold text-amber-400 mb-2">License Grant</h4>
              <p className="text-gray-300 text-sm">
                We grant you a limited, non-exclusive, non-transferable license to access 
                and use our services for personal or business purposes.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Restrictions</h4>
              <p className="text-gray-300 text-sm">
                You may not modify, distribute, sell, or create derivative works from 
                our proprietary materials without explicit written permission.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'userContent',
      title: 'User Content & Conduct',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Content Standards</h4>
            <p className="text-gray-300 mb-4">
              You are solely responsible for any content you submit, post, or display on our 
              platform. Your content must not:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Contain illegal, defamatory, or obscene material</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Infringe upon intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Contain viruses or malicious code</span>
                </li>
              </ul>
              
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Promote discrimination or harassment</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Misrepresent your identity or affiliation</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>Attempt to gain unauthorized access</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <p className="text-gray-300 text-sm">
                We reserve the right to remove any content that violates these standards 
                and to take appropriate action against violators.
              </p>
            </div>
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
              <h4 className="font-semibold text-[#D9FDA3]">By Us</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">
                  We may suspend or terminate your access to our services immediately, 
                  without prior notice, for conduct that we believe violates these terms 
                  or is harmful to other users, us, or third parties.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-400">By You</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-300 text-sm">
                  You may terminate your account at any time by contacting us. Upon 
                  termination, your right to use our services will immediately cease.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/10 to-transparent p-4 rounded-lg border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">Consequences of Termination</h4>
            <p className="text-gray-300 text-sm">
              Upon termination, all licenses and rights granted to you will immediately cease. 
              We are not liable for any loss of data or content resulting from termination.
            </p>
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
            <h4 className="font-semibold text-white mb-3">Disclaimer</h4>
            <p className="text-gray-300 mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind, 
              either express or implied. We do not warrant that:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  The services will be uninterrupted, timely, secure, or error-free
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  The results obtained from using the services will be accurate or reliable
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  The quality of any products, services, information, or other material 
                  purchased or obtained will meet your expectations
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#051320] to-[#0a1a2d] p-4 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Maximum Liability</h4>
            <p className="text-gray-300">
              In no event shall Backbencher Coder be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Modification Rights</h4>
            <p className="text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms 
              at any time. If a revision is material, we will provide at least 30 days' notice 
              prior to any new terms taking effect.
            </p>
            
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">
                Your continued use of our services after any changes constitutes acceptance 
                of the new Terms and Conditions.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Current Version</h4>
              <p className="text-gray-300 text-sm">Effective: {effectiveDate}</p>
              <p className="text-gray-300 text-sm">Last Updated: {lastUpdated}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">Archive</h4>
              <p className="text-gray-300 text-sm">
                Previous versions are available upon request or in our policy archive.
              </p>
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
              <h4 className="font-semibold text-[#D9FDA3] mb-4">Legal Inquiries</h4>
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
            
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-6 rounded-xl border border-cyan-400/20">
              <h4 className="font-semibold text-cyan-400 mb-4">Mailing Address</h4>
              <div className="space-y-2 text-gray-300">
                <p>Backbencher Coder</p>
                <p>Legal Department</p>
                <p>Noumohol, Mymensingh</p>
                <p>Bangladesh</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Governing Law</h4>
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of 
              Bangladesh, without regard to its conflict of law provisions.
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
            <span className="text-[#D9FDA3]">Terms & Conditions</span>
          </div>

          {/* Main Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                <Scale className="w-8 h-8 text-[#D9FDA3]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Conditions</span>
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Effective: {effectiveDate}</span>
                  </div>
                  <span className="hidden md:inline">•</span>
                  <div className="hidden md:flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Version 2.1</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl">
              These Terms and Conditions govern your use of Backbencher Coder's services. 
              By accessing our website and using our services, you agree to comply with 
              and be bound by these terms. Please read them carefully.
            </p>
          </div>

          {/* Important Notice */}
          <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Legal Notice</h3>
                <p className="text-gray-300">
                  These terms constitute a legally binding agreement between you and Backbencher Coder. 
                  If you are acting on behalf of a company or organization, you represent that you have 
                  the authority to bind that entity to these terms.
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

          {/* Agreement Section */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#051320] to-[#0a1a2d] border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Acceptance of Terms</h3>
                <p className="text-gray-300">
                  By clicking "I Accept", you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and Conditions. If you do not agree 
                  with any part of these terms, please do not use our services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAcceptTerms}
                  className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-xl hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                >
                  I Accept
                </button>
              </div>
            </div>
          </div>

          {/* Related Documents */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-6">Related Documents</h3>
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
                  Information about our use of cookies and tracking technologies
                </p>
              </Link>
              
              <Link 
                href="/service-agreement" 
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-purple-400 transition-colors">
                    Service Agreement
                  </h4>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-300 text-sm">
                  Detailed service terms for our premium offerings
                </p>
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Backbencher Coder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;