"use client"
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('/');
  const [hoveredNav, setHoveredNav] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active nav based on current path
  useEffect(() => {
    setActiveNav(pathname);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Blur overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 mt-2 mx-4 rounded-3xl bg-[#051320] shadow-lg'
            : 'py-4 bg-[#051320]'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="shrink-0">
              <Link href="/" className="text-2xl font-bold text-[#D9FDA3] hover:opacity-90 transition-opacity">
                Backbencher Coder
              </Link>
            </div>

            {/* Center Items - Desktop */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-2 py-1 transition-all duration-200"
                  onMouseEnter={() => setHoveredNav(item.path)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => setActiveNav(item.path)}
                >
                  <span
                    className={`text-lg font-medium transition-colors duration-200 ${
                      activeNav === item.path
                        ? 'text-[#D9FDA3]'
                        : 'text-white hover:text-[#D9FDA3]'
                    }`}
                  >
                    {item.name}
                  </span>
                  
                  {/* Animated underline on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
                    <div
                      className={`absolute bottom-0 left-0 h-full bg-[#D9FDA3] transition-all duration-300 ease-out ${
                        hoveredNav === item.path || activeNav === item.path
                          ? 'w-full translate-x-0'
                          : 'w-0 translate-x-full'
                      }`}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Grab It Button - Right */}
            <div className="hidden md:block">
              <button className="bg-[#D9FDA3] text-[#051320] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 active:scale-95">
                Grab It
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Left Side Slide */}
        <div className={`md:hidden fixed top-0 left-0 h-full w-3/4 max-w-sm z-50 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
        }`}>
          <div className="h-full bg-[#051320] border-r border-white/10 shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Logo in mobile menu */}
              <div className="mb-8">
                <Link 
                  href="/" 
                  className="text-2xl font-bold text-[#D9FDA3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Backbencher Coder
                </Link>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeNav === item.path
                        ? 'bg-[#D9FDA3] text-[#051320] transform scale-[1.02]'
                        : 'text-white hover:bg-white/10 hover:text-[#D9FDA3]'
                    }`}
                    onClick={() => {
                      setActiveNav(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{item.name}</span>
                      {activeNav === item.path && (
                        <div className="w-2 h-2 rounded-full bg-[#051320] animate-pulse" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Grab It Button in Mobile Menu */}
              <button className="w-full bg-[#D9FDA3] text-[#051320] px-6 py-3 rounded-full font-semibold mt-8 hover:bg-opacity-90 transition-all duration-200 active:scale-95">
                Grab It
              </button>

              {/* Close Menu Info */}
              <div className="mt-12 text-center">
                <p className="text-white/60 text-sm">
                  Click outside or swipe left to close
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;