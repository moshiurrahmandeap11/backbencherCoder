"use client";
import {
  ChevronRight,
  CreditCard,
  Facebook,
  Github,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links - actual links added
  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      href: "https://facebook.com/backbenchercoder",
      color: "hover:bg-blue-600",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "https://twitter.com/backbenchercoder",
      color: "hover:bg-sky-500",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://instagram.com/backbenchercoder",
      color: "hover:bg-pink-600",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/backbenchercoder",
      color: "hover:bg-blue-700",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/backbenchercoder",
      color: "hover:bg-gray-800",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
      href: "https://youtube.com/@backbenchercoder",
      color: "hover:bg-red-600",
    },
  ];

  // Quick links with actual paths
  const quickLinks = [
    {
      title: "Home",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Tutorials", path: "/tutorials" },
        { name: "Documentation", path: "/docs" },
        { name: "Community", path: "/community" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "Disclaimer", path: "/disclaimer" },
      ],
    },
  ];

  // Features (badges)
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "100% Secure",
      color: "text-green-400",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      text: "Secure Payment",
      color: "text-blue-400",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      text: "24/7 Support",
      color: "text-purple-400",
    },
  ];

  // Payment methods with icons
  const paymentMethods = [
    {
      name: "VisaCard",
      icon: "💳",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
    },
    {
      name: "Pubali Bank",
      icon: "🏦",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
    },
    {
      name: "Binance",
      icon: "₿",
      bgColor: "bg-yellow-500/20",
      textColor: "text-yellow-400",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#051320] to-[#0a1a2d] text-white pt-16 pb-8">
      {/* Top section - Features */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div
                className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <span className="font-medium text-sm md:text-base">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                <span className="text-[#051320] font-bold text-xl">BC</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Backbencher Coder
                </h3>
                <p className="text-gray-400 text-sm">
                  Transforming Ideas into Reality
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We create exceptional digital experiences that drive growth and
              innovation for businesses worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-sm md:text-base">+8809658261909</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-sm md:text-base break-all">
                  backbenchercoder.official@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-[#D9FDA3]" />
                <span className="text-sm md:text-base">
                  Noumohol, Mymensingh, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {quickLinks.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-4 text-white border-l-4 border-[#D9FDA3] pl-3">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.path}
                        className="flex items-center gap-2 text-gray-400 hover:text-[#D9FDA3] transition-colors group"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <span className="text-sm md:text-base truncate">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment & Social */}
          <div className="space-y-8">
            {/* Payment Methods */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white border-l-4 border-cyan-400 pl-3">
                We Accept
              </h4>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${method.bgColor} border border-white/10`}
                    title={method.name}
                  >
                    <span className={`text-lg ${method.textColor}`}>
                      {method.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white border-l-4 border-[#D9FDA3] pl-3">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 border border-white/10`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* All in one line */}
          <div className="text-gray-400 text-center md:text-left order-2 md:order-1 flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© {currentYear} Backbencher Coder. All rights reserved.</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span>
              Developed by{" "}
              <Link
                href="https://backbencher.moshiurrahman.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D9FDA3] hover:text-cyan-400 transition-colors hover:underline"
              >
                Backbencher Coder
              </Link>
            </span>
          </div>

          {/* Quick Links Bottom - Right side */}
          <div className="flex items-center gap-4 order-1 md:order-2 mb-4 md:mb-0">
            <Link
              href="/sitemap"
              className="text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
            >
              Sitemap
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/faq"
              className="text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
            >
              FAQ
            </Link>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
