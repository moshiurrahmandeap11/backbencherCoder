"use client"
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import useAuth from '@/app/lib/useAuth/useAuth';
import {
  ArrowLeft,
  Eye, EyeOff,
  Lock,
  Mail,
  Smartphone,
  User,
  UserPlus,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser, loading, user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const totalSteps = 2;

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setError('You are already logged in!');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [user, router]);

  // Registration handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      console.log("Step 1: Creating Firebase authentication user...");
      
      // 1. Create authentication user in Firebase
      const authResult = await createUser(formData.email, formData.password);
      
      console.log("Firebase auth result:", authResult);
      
      // Check if we got a valid user object with UID
      if (!authResult || !authResult.user || !authResult.user.uid) {
        throw new Error('Failed to create authentication user - no UID received');
      }

      const firebaseUser = authResult.user;
      console.log("Firebase UID:", firebaseUser.uid);

      // 2. Prepare SIMPLE user data for backend WITH UID
      const userData = {
        uid: firebaseUser.uid, // Firebase UID
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.toLowerCase(),
        phone: formData.phone || '',
        profileImage: '',
        emailVerified: firebaseUser.emailVerified || false,
      };

      console.log("Step 2: Sending user data to backend:", userData);

      // 3. Send user data to backend with UID
      const response = await axiosInstance.post('/users', userData);
      
      console.log("Backend response:", response.data);
      
      if (response.data.success) {
        setSuccess('Account created successfully! Redirecting...');
        
        // 4. Redirect to home after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        throw new Error(response.data.error || 'Failed to create account in database');
      }

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      if (error.response?.data?.errors) {
        setError(`Validation errors: ${error.response.data.errors.join(', ')}`);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.code) {
        // Firebase error codes
        switch(error.code) {
          case 'auth/email-already-in-use':
            setError('Email already in use. Please try logging in instead.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please use a stronger password.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address. Please enter a valid email.');
            break;
          case 'auth/network-request-failed':
            setError('Network error. Please check your internet connection.');
            break;
          default:
            setError(error.message || 'Failed to create account. Please try again.');
        }
      } else {
        setError(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user types
    if (error) setError('');
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError('Please fill all required fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
    }
    
    setError('');
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password)
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;
  const strengthPercentage = (strengthScore / 5) * 100;

  const getStrengthColor = () => {
    if (strengthScore <= 2) return 'from-red-500 to-orange-500';
    if (strengthScore <= 4) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-emerald-500';
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  if (loading) {
    return <SimpleLoader />;
  }

  // If user is already logged in, show redirect message
  if (user) {
    return (
      <div className="min-h-screen mt-14 bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Already Logged In</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <p className="text-gray-400 text-sm">Redirecting to home page in 3 seconds...</p>
            <Link 
              href="/" 
              className="mt-4 inline-block text-[#D9FDA3] hover:text-cyan-400 transition-colors"
            >
              Go Home Now →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {[1, 2].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step < activeStep 
                    ? 'bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320]' 
                    : step === activeStep
                    ? 'border-2 border-[#D9FDA3] text-[#D9FDA3]'
                    : 'border-2 border-white/20 text-gray-400'
                }`}>
                  {step < activeStep ? (
                    <span className="font-semibold">✓</span>
                  ) : (
                    <span className="font-semibold">{step}</span>
                  )}
                </div>
                <span className={`text-sm ${
                  step <= activeStep ? 'text-white' : 'text-gray-400'
                }`}>
                  {step === 1 ? 'Personal Info' : 'Account Info'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 transition-all duration-500`}
              style={{ width: `${((activeStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <UserPlus className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">Join Our Community</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Create Your <span className="bg-gradient-to-r from-[#D9FDA3] to-cyan-400 bg-clip-text text-transparent">Account</span>
          </h1>
          
          <p className="text-gray-300">
            Start your journey with Backbencher Coder
          </p>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400">
              <span className="font-semibold">✓</span>
              <span>{success}</span>
            </div>
          </div>
        )}

        <div>
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Account Information */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-2">Account Information</h3>
                    
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          disabled={isSubmitting}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {formData.password && (
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-300 text-sm">Password strength</span>
                            <span className="text-gray-300 text-sm">{strengthScore}/5</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${getStrengthColor()} transition-all duration-500`}
                              style={{ width: `${strengthPercentage}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                            {[
                              { label: '8+ characters', met: passwordStrength.length },
                              { label: 'Uppercase letter', met: passwordStrength.uppercase },
                              { label: 'Lowercase letter', met: passwordStrength.lowercase },
                              { label: 'Number', met: passwordStrength.number },
                              { label: 'Special character', met: passwordStrength.special }
                            ].map((req, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${req.met ? 'bg-[#D9FDA3]' : 'bg-gray-600'}`} />
                                <span className={`text-xs ${req.met ? 'text-gray-300' : 'text-gray-500'}`}>
                                  {req.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                            formData.password && formData.confirmPassword
                              ? formData.password === formData.confirmPassword
                                ? 'border-green-500'
                                : 'border-red-500'
                              : 'border-white/10 focus:border-[#D9FDA3]'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          disabled={isSubmitting}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formData.password && formData.confirmPassword && (
                        <p className={`text-sm mt-2 ${
                          formData.password === formData.confirmPassword 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          {formData.password === formData.confirmPassword 
                            ? '✓ Passwords match' 
                            : '✗ Passwords do not match'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-5 h-5 mt-1 rounded bg-white/5 border border-white/10 checked:bg-[#D9FDA3] checked:border-[#D9FDA3] focus:ring-0 disabled:opacity-50"
                        />
                        <div>
                          <div className="font-medium text-white mb-1">
                            I agree to the Terms of Service and Privacy Policy
                          </div>
                          <p className="text-gray-300 text-sm">
                            By creating an account, you agree to our terms and acknowledge that you have read our privacy policy.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.agreeTerms}
                        className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-[#051320] border-t-transparent rounded-full animate-spin" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Already have account */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-[#D9FDA3] font-semibold hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;