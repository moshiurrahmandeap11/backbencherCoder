"use client";
import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import useAuth from "@/app/lib/useAuth/useAuth";
import { Eye, EyeOff, Lock, LogIn, Mail, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const { googleLogin, loading, logIn, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  // Create user in MongoDB with UID (for Google login)
  const createUserInDB = async (firebaseUser) => {
    try {
      // Prepare SIMPLE user data according to backend requirements
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email,
        phone: "",
        profileImage: firebaseUser.photoURL || "",
        emailVerified: firebaseUser.emailVerified || false,
      };

      console.log("Creating user in DB:", userData);

      const result = await axiosInstance.post('/users', userData);
      
      console.log("User created in DB:", result.data);
      return result.data;
    } catch (error) {
      console.error('Error creating user in DB:', error);
      
      // If user already exists (409 conflict), that's fine
      if (error.response?.status === 409) {
        console.log('User already exists in database');
        return { success: true, message: "User already exists" };
      }
      
      // Log detailed error
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
      if (error.response?.data?.error) {
        console.error("Backend error:", error.response.data.error);
      }
      
      throw error;
    }
  };

  // Function to update user timestamp
  const updateUserTimestamp = async (uid) => {
    try {
      console.log("Updating timestamp for user:", uid);
      await axiosInstance.patch(`/users/${uid}`, {
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating timestamp:', error);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setIsSubmitting(true);
      
      console.log("Starting Google login...");
      
      // Get Google user result from Firebase
      const googleResult = await googleLogin();
      
      // Extract the user object properly
      let firebaseUser = null;
      
      if (googleResult?.user) {
        firebaseUser = googleResult.user;
      } else if (googleResult?.uid) {
        firebaseUser = googleResult;
      }
      
      if (!firebaseUser || !firebaseUser.uid) {
        throw new Error("Google login successful but no user data received");
      }
      
      console.log("Firebase Google user:", {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL
      });
      
      // Create or update user in MongoDB with UID
      await createUserInDB(firebaseUser);
      
      // Update timestamp
      await updateUserTimestamp(firebaseUser.uid);
      
      console.log("Google login and DB sync completed");
    } catch (error) {
      console.error("Google login error:", error);
      
      // Handle specific error cases
      if (error.code) {
        switch(error.code) {
          case 'auth/popup-closed-by-user':
            setError("Google login was cancelled.");
            break;
          case 'auth/network-request-failed':
            setError("Network error. Please check your internet connection.");
            break;
          case 'auth/popup-blocked':
            setError("Popup was blocked. Please allow popups for this site.");
            break;
          case 'auth/cancelled-popup-request':
            setError("Only one popup can be opened at a time.");
            break;
          default:
            setError(`Google login failed: ${error.message}`);
        }
      } else if (error.response?.data?.errors) {
        setError(`Validation error: ${error.response.data.errors.join(', ')}`);
      } else if (error.response?.data?.error) {
        setError(`Backend error: ${error.response.data.error}`);
      } else {
        setError(error.message || "Google login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission (Email/Password login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { email, password } = formData;
      
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      console.log("Attempting Firebase login...");
      
      // Call logIn function from useAuth (Firebase login)
      const loginResult = await logIn(email, password);
      
      // Extract user from result
      let firebaseUser = null;
      if (loginResult?.user) {
        firebaseUser = loginResult.user;
      } else if (loginResult?.uid) {
        firebaseUser = loginResult;
      }
      
      if (firebaseUser?.uid) {
        console.log("Login successful, checking if user exists in DB...");
        
        // Check if user exists in database
        try {
          await axiosInstance.get(`/users/uid/${firebaseUser.uid}`);
          console.log("User found in DB, updating timestamp...");
          await updateUserTimestamp(firebaseUser.uid);
        } catch (dbError) {
          if (dbError.response?.status === 404) {
            // User doesn't exist in DB, create them
            console.log("User not found in DB, creating...");
            await createUserInDB(firebaseUser);
          }
        }
      }
      
      console.log("Login process completed");
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle Firebase auth errors
      if (error.code) {
        switch(error.code) {
          case 'auth/user-not-found':
            setError("No account found with this email.");
            break;
          case 'auth/wrong-password':
            setError("Incorrect password.");
            break;
          case 'auth/too-many-requests':
            setError("Too many failed attempts. Please try again later.");
            break;
          case 'auth/invalid-email':
            setError("Invalid email address.");
            break;
          case 'auth/user-disabled':
            setError("This account has been disabled.");
            break;
          case 'auth/invalid-credential':
            setError("Invalid email or password.");
            break;
          default:
            setError(`Login failed: ${error.message}`);
        }
      } else {
        setError(error.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Show loader while checking auth state
  if (loading) {
    return <SimpleLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Sign in to{" "}
            <span className="bg-gradient-to-r from-[#D9FDA3] to-cyan-400 bg-clip-text text-transparent">
              Backbencher Coder
            </span>
          </h1>
          <p className="text-gray-300">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
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

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
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
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-[#D9FDA3] checked:border-[#D9FDA3] focus:ring-0 disabled:opacity-50"
                />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-[#D9FDA3] text-sm hover:text-cyan-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer py-3.5 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#051320] border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid gap-3 mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="py-3 bg-white/5 cursor-pointer hover:bg-white/10 disabled:hover:bg-white/5 border border-white/10 rounded-xl text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <span>Google</span>
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Do not have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#D9FDA3] font-semibold hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
              >
                Sign up now
                <UserPlus className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;