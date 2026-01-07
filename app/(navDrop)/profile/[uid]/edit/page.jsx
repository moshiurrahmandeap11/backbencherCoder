"use client"
import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import useAuth from "@/app/lib/useAuth/useAuth";
import {
    ArrowLeft,
    Camera,
    Check,
    Loader2,
    Mail,
    Phone,
    Save,
    User,
    XCircle
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const { uid } = useParams();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch user data
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
        
        const response = await axiosInstance.get(`/users/uid/${uid}`);
        
        if (response.data.success) {
          const userData = response.data.data;
          setProfileUser(userData);
          
          // Set form data
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            bio: userData.bio || "",
          });
          
          // Set image preview
if (userData.profileImage) {
  const imageUrl = userData.profileImage.startsWith("http")
    ? userData.profileImage
    : `${axiosInstance.defaults.baseURL}${userData.profileImage}`;

  setImagePreview(imageUrl);
}

        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  // Check authorization
  useEffect(() => {
    if (!authLoading && currentUser && uid !== currentUser.uid) {
      setError("You can only edit your own profile");
      setTimeout(() => {
        router.push(`/profile/${uid}`);
      }, 2000);
    }
  }, [authLoading, currentUser, uid, router]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setProfileImage(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser || currentUser.uid !== uid) {
      setError("Unauthorized to edit this profile");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      // Prepare form data
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if selected
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      // Send update request
      const response = await axiosInstance.put(`/users/${uid}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess("Profile updated successfully!");
        
        // Clear image preview URL to prevent memory leaks
        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }

        // Redirect after 1 second
        setTimeout(() => {
          router.push(`/profile/${uid}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      
      if (error.response?.data?.errors) {
        setError(error.response.data.errors.join(', '));
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to update profile");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoading) {
    return <SimpleLoader />;
  }

  if (error && !formData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] pt-20 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => router.push(`/profile/${uid}`)}
              className="px-6 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#051320] via-[#0a1a2d] to-[#051320] pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push(`/profile/${uid}`)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </button>
        </div>

        {/* Messages */}
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
              <Check className="w-5 h-5" />
              <span>{success}</span>
            </div>
          </div>
        )}

        {/* Edit Profile Form */}
        <div className="rounded-3xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-gray-300 mb-6">Update your personal information</p>

          <form onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Profile Picture
              </label>
              
              <div className="flex items-center gap-6">
                {/* Image Preview */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 p-1">
                    {imagePreview ? (
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#051320]">
                        <Image
                          src={imagePreview}
                          alt="Profile preview"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#051320] flex items-center justify-center border-4 border-[#051320]">
                        <User className="w-8 h-8 text-[#D9FDA3]" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                    <Camera className="w-5 h-5 text-[#051320]" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex-1">
                  <p className="text-gray-300 text-sm mb-2">
                    Upload a new profile picture (Max 5MB)
                  </p>
                  <p className="text-gray-500 text-xs">
                    Supported formats: JPG, PNG, WebP
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSaving}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
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
                    onChange={handleInputChange}
                    required
                    disabled={isSaving}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSaving}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={isSaving}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D9FDA3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors resize-none"
                  placeholder="Tell us something about yourself..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => router.push(`/profile/${uid}`)}
                disabled={isSaving}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;