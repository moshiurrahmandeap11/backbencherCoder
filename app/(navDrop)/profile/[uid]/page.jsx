"use client"
import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import useAuth from "@/app/lib/useAuth/useAuth";
import {
    ArrowLeft,
    Calendar,
    Edit,
    Mail,
    Phone,
    Shield,
    User,
    UserCheck,
    XCircle
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const { uid } = useParams();
  console.log(uid);
  const { user: currentUser, loading } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch user data by UID
  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) {
        setError("User ID is required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        
        // UID দিয়ে ইউজার ডেটা fetch করুন
        const response = await axiosInstance.get(`/users/uid/${uid}`);
        
        if (response.data.success) {
          setProfileUser(response.data.data);
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 404) {
          setError("User not found");
        } else {
          setError("Failed to load user data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.uid === uid;

  if (loading || isLoading) {
    return <SimpleLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] pt-20 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] pt-20 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8 text-center">
            <p className="text-gray-300">No user data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] pt-24 p-4">
      <div className="container mx-auto max-w-8xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          {isOwnProfile && (
            <Link
              href={`/profile/${uid}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          )}
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-[#D9FDA3]/20 to-cyan-400/20"></div>
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 p-1">
                    {profileUser.profileImage ? (
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#051320]">
<img
  src={
    profileUser.profileImage?.startsWith("http")
      ? profileUser.profileImage
      : `${axiosInstance.defaults.baseURL}${profileUser.profileImage}`
  }
  alt={profileUser.name}
  width={128}
  height={128}
  className="w-full h-full object-cover"
/>

                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#051320] flex items-center justify-center border-4 border-[#051320]">
                        <User className="w-12 h-12 text-[#D9FDA3]" />
                      </div>
                    )}
                  </div>
                  
                  {/* Online/Verified Status */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-[#051320] flex items-center justify-center">
                    <UserCheck className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {profileUser.name}
                        {profileUser.emailVerified && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            <Shield className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{profileUser.email}</span>
                        </div>
                        
                        {profileUser.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{profileUser.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {formatDate(profileUser.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* User ID Badge */}
                    <div className="px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">UID:</span>
                        <code className="text-gray-300 font-mono text-sm">
                          {profileUser.uid?.substring(0, 12)}...
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - User Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Section */}
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#D9FDA3]" />
                    About
                  </h2>
                  
                  {profileUser.bio ? (
                    <p className="text-gray-300 whitespace-pre-line">{profileUser.bio}</p>
                  ) : (
                    <p className="text-gray-500 italic">No bio provided yet.</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#D9FDA3]/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#D9FDA3]" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white font-medium">{profileUser.email}</p>
                        </div>
                      </div>
                      
                      {profileUser.phone && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-[#D9FDA3]/10 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-[#D9FDA3]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Phone</p>
                            <p className="text-white font-medium">{profileUser.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#D9FDA3]/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#D9FDA3]" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Member Since</p>
                          <p className="text-white font-medium">
                            {formatDate(profileUser.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#D9FDA3]/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#D9FDA3]" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Status</p>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                              {profileUser.emailVerified ? "Verified" : "Unverified"}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${
                              profileUser.emailVerified ? "bg-green-500" : "bg-yellow-500"
                            }`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Quick Actions */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
                  
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-white/10">
                      <p className="text-gray-400 text-sm">Profile Completion</p>
                      <div className="mt-2">
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 transition-all duration-500"
                            style={{ 
                              width: `${(
                                (profileUser.name ? 25 : 0) +
                                (profileUser.email ? 25 : 0) +
                                (profileUser.phone ? 25 : 0) +
                                (profileUser.profileImage ? 25 : 0)
                              )}%`
                            }}
                          />
                        </div>
                        <p className="text-right text-sm text-gray-300 mt-1">
                          {(
                            (profileUser.name ? 25 : 0) +
                            (profileUser.email ? 25 : 0) +
                            (profileUser.phone ? 25 : 0) +
                            (profileUser.profileImage ? 25 : 0)
                          )}%
                        </p>
                      </div>
                    </div>
                    
                    {/* Account Info */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Account Type</span>
                        <span className="text-white font-medium">
                          {profileUser.role === "admin" ? "Administrator" : "Standard User"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Last Updated</span>
                        <span className="text-white font-medium">
                          {formatDate(profileUser.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  
                  <div className="space-y-2">
                    {isOwnProfile && (
                      <>
                        <Link
                          href={`/profile/${uid}/edit`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 hover:from-[#D9FDA3]/20 hover:to-cyan-400/20 transition-all border border-white/10 text-white"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </Link>
                        
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                      </>
                    )}
                    
                    <Link
                      href="/"
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            This is {isOwnProfile ? "your" : `${profileUser.name.split(' ')[0]}'s`} public profile page. 
            Some information may be hidden for privacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;