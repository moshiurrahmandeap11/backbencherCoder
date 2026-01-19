"use client"
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import useAuth from '@/app/lib/useAuth/useAuth';
import { ChevronDown, LayoutDashboard, LogOut, Menu, Settings, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import SimpleLoader from '../SimpleLoader/SimpleLoader';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('/');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  const pathname = usePathname();
  const { user, logOut, loading } = useAuth();
  const router = useRouter();
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      // Close mobile menu when clicking outside
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    };
  }, [isMobileMenuOpen]);

  // Fetch user profile image from database when user changes
  useEffect(() => {
    const fetchUserProfileImage = async () => {
      if (!user?.uid) {
        setUserProfileImage(null);
        return;
      }

      try {
        setIsLoadingProfile(true);
        console.log('Fetching profile image for UID:', user.uid);
        const response = await axiosInstance.get(`/users/uid/${user.uid}`);
        
        console.log('User profile response:', response.data);
        
        if (response.data.success && response.data.data?.profileImage) {
          const profileImage = response.data.data.profileImage;
          
          if (profileImage && !profileImage.startsWith('http')) {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            setUserProfileImage(`${baseUrl}${profileImage}`);
          } else {
            setUserProfileImage(profileImage);
          }
          
          console.log('Profile image set to:', profileImage);
        } else {
          console.log('No profile image found in database');
          setUserProfileImage(null);
        }
      } catch (error) {
        console.error('Error fetching user profile image:', error);
        setUserProfileImage(null);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfileImage();
  }, [user?.uid]); 

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  // Handle logout
  const handleLogOut = async () => {
    try {
      await logOut();
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      setUserProfileImage(null); 
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user UID
  const getUserId = () => {
    if (!user) return '';
    return user.uid || user.email?.split('@')[0] || 'unknown-user';
  };

  // User profile dropdown items with UID
  const profileItems = [
    { 
      icon: <User className="w-4 h-4" />, 
      label: 'Profile', 
      path: `/profile/${getUserId()}` 
    },
    { 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      label: 'Dashboard', 
      path: `/dashboard/${getUserId()}`  
    },
    { 
      icon: <Settings className="w-4 h-4" />, 
      label: 'Settings', 
      path: `/settings/${getUserId()}`   
    },
  ];

  // Function to handle profile link click
  const handleProfileLinkClick = (path) => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  // Get avatar component with fixed image sizes
  const renderAvatar = (sizeType = 'medium', className = '') => {
    const sizes = {
      small: { container: 'w-8 h-8', icon: 'w-4 h-4' },
      medium: { container: 'w-10 h-10', icon: 'w-5 h-5' },
      large: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    };

    const { container, icon } = sizes[sizeType] || sizes.medium;

    if (isLoadingProfile) {
      return (
        <div className={`${container} rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center ${className}`}>
          <div className="w-4 h-4 border-2 border-[#051320] border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (userProfileImage) {
      return (
        <div className={`${container} rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 p-0.5 ${className}`}>
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image 
              src={userProfileImage} 
              alt={user?.displayName || 'User'} 
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-cover"
              priority
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>
        </div>
      );
    }

    // Firebase photoURL (fallback)
    if (user?.photoURL) {
      return (
        <div className={`${container} rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 p-0.5 ${className}`}>
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      );
    }

    // Default avatar
    return (
      <div className={`${container} rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center ${className}`}>
        <div className={`${icon} text-[#051320]`}>
          <User className="w-full h-full" />
        </div>
      </div>
    );
  };

  if (loading) {
    return <SimpleLoader />;
  }

  return (
    <>
      {/* Blur overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 mt-2 mx-4 lg:mx-40 rounded-3xl bg-transparent backdrop-blur-3xl shadow-lg'
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

            {/* Right Side - User Profile or Login Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Login Button (Always visible when not logged in) */}
              {!user ? (
                <div className="md:hidden">
                  <Link href="/auth/login">
                    <button className="bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 text-sm">
                      Grab It
                    </button>
                  </Link>
                </div>
              ) : null}

              {user ? (
                // User Profile Dropdown
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 hover:from-[#D9FDA3]/20 hover:to-cyan-400/20 transition-all duration-300 border border-white/10"
                  >
                    {/* User Avatar from Database */}
                    {renderAvatar('small')}
                    
                    <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50">
                      {/* User Info */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          {/* Larger Avatar */}
                          {renderAvatar('medium', 'flex-shrink-0')}
                          
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">
                              {user.displayName || user.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-gray-400 text-sm truncate">
                              {user.email || 'No email'}
                            </p>
                            <p className="text-gray-500 text-xs truncate mt-1">
                              ID: {getUserId().substring(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {profileItems.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleProfileLinkClick(item.path)}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200 text-left"
                          >
                            <div className="text-[#D9FDA3]">
                              {item.icon}
                            </div>
                            <span>{item.label}</span>
                          </button>
                        ))}

                        {/* Logout Button */}
                        <button
                          onClick={handleLogOut}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 mt-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Desktop Login Button
                <div className="hidden md:block">
                  <Link href="/auth/login">
                    <button className="bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95">
                      Grab It
                    </button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="mobile-menu-button text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Slide */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden fixed top-0 left-0 h-full w-full max-w-sm z-50 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#0a1a2d] border-r border-white/10 shadow-2xl overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="sticky top-0 bg-[#051320] border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user ? (
                  <>
                    {renderAvatar('medium', 'flex-shrink-0')}
                    <div>
                      <p className="font-semibold text-white truncate text-sm">
                        {user.displayName || user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {user.email || 'No email'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-[#D9FDA3]">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6">
              {/* Navigation Items */}
              <div className="flex flex-col space-y-1 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeNav === item.path
                        ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold'
                        : 'text-white hover:bg-white/10 hover:text-[#D9FDA3]'
                    }`}
                    onClick={() => {
                      setActiveNav(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      {activeNav === item.path && (
                        <div className="w-2 h-2 rounded-full bg-[#051320] animate-pulse" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* User Menu Items in Mobile */}
              {user ? (
                <>
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider px-4 mb-2">
                      Account
                    </h3>
                    {profileItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleProfileLinkClick(item.path)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-left"
                      >
                        <div className="text-[#D9FDA3]">
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              ) : (
                // Login Button in Mobile Menu
                <div className="border-t border-white/10 pt-6">
                  <Link 
                    href="/auth/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="w-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200 active:scale-95">
                      Login to Grab It
                    </button>
                  </Link>
                  <p className="text-gray-400 text-sm text-center mt-4">
                    Don't have an account?{' '}
                    <Link 
                      href="/auth/register" 
                      className="text-[#D9FDA3] hover:underline"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <p className="text-white/40 text-xs">
                  Swipe left or tap outside to close
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