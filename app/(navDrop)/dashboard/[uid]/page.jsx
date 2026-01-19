"use client";

import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import {
    ArrowRight,
    Bell,
    Calendar,
    CreditCard,
    Heart,
    HelpCircle,
    Package,
    Settings,
    Shield,
    TrendingUp,
    User,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { uid } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [purchasedLoading, setPurchasedLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/${uid}`);
        const userData = response.data.data;
        setUser(userData);

        if (userData.role === "admin") {
          setShowAdminPopup(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        setWishlistLoading(true);
        const savedFavorites =
          localStorage.getItem("favoriteProducts") ||
          localStorage.getItem("likedProducts");
        const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];

        if (favoriteIds.length > 0) {
          // Fetch all products
          const response = await axiosInstance.get("/products");
          const allProducts = response.data.data || [];

          // Filter products that are in wishlist
          const wishlistItems = allProducts.filter((product) =>
            favoriteIds.includes(product._id),
          );

          setWishlistProducts(wishlistItems);
        }
      } catch (err) {
        console.error("Error fetching wishlist products:", err);
      } finally {
        setWishlistLoading(false);
      }
    };

    const fetchPurchasedProducts = async () => {
      try {
        setPurchasedLoading(true);
        // In a real app, you would fetch purchased products from an API
        // For demo, we'll use mock data or fetch from /purchases endpoint
        const response = await axiosInstance.get("/products?limit=3");
        setPurchasedProducts(response.data.data || []);
      } catch (err) {
        console.error("Error fetching purchased products:", err);
      } finally {
        setPurchasedLoading(false);
      }
    };

    fetchWishlistProducts();
    fetchPurchasedProducts();
  }, []);

  const handleAdminRedirect = () => {
    setShowAdminPopup(false);
    router.push(`/dashboard/${uid}/admin/`);
  };

  const handleClosePopup = () => {
    setShowAdminPopup(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const removeFromWishlist = (productId) => {
    const savedFavorites =
      localStorage.getItem("favoriteProducts") ||
      localStorage.getItem("likedProducts");
    const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
    const updatedIds = favoriteIds.filter((id) => id !== productId);

    localStorage.setItem("favoriteProducts", JSON.stringify(updatedIds));
    localStorage.setItem("likedProducts", JSON.stringify(updatedIds));

    setWishlistProducts((prev) =>
      prev.filter((product) => product._id !== productId),
    );
  };

  if (loading) {
    return <SimpleLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-red-400 text-sm font-medium">Error</span>
          </div>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <span className="text-[#D9FDA3] text-sm font-medium">
              User Not Found
            </span>
          </div>
          <p className="text-gray-300">
            The requested user could not be found.
          </p>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <>
      {/* Admin Welcome Popup */}
      {showAdminPopup && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-2xl border border-white/10 p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Welcome, Administrator!
              </h3>
              <p className="text-gray-300 mb-6">
                You have administrator privileges. Would you like to access the
                admin dashboard?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdminRedirect}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  Go to Admin Dashboard
                </button>
                <button
                  onClick={handleClosePopup}
                  className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  Stay Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      <div className="min-h-screen bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#051320]/90 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center">
                  <span className="text-[#051320] font-bold text-lg">
                    {getInitials(user.name || user.email)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Welcome back, {user.name?.split(" ")[0] || "User"}!
                  </h1>
                  <p className="text-gray-300 text-sm">
                    {isAdmin ? "Administrator Account" : "Member Account"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5 text-gray-300" />
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-300" />
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <Settings className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Mobile Tabs */}
          <div className="flex overflow-x-auto gap-2 mb-6 md:hidden">
            {["overview", "wishlist", "purchases", "account"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#D9FDA3] text-[#051320]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Left Sidebar - Desktop */}
            <div className="hidden lg:block space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D9FDA3] to-cyan-400 flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#051320] font-bold text-2xl">
                      {getInitials(user.name || user.email)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {user.name || "User"}
                  </h3>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                      isAdmin
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {isAdmin ? "Administrator" : "Member"}
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing & Payment</span>
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-3">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </button>
                  {isAdmin && (
                    <button
                      onClick={handleAdminRedirect}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Stats
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">Wishlist</div>
                        <div className="text-white font-bold">
                          {wishlistProducts.length} items
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">Purchased</div>
                        <div className="text-white font-bold">
                          {purchasedProducts.length} products
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Desktop Tabs */}
              <div className="hidden md:flex gap-2 mb-6">
                {[
                  {
                    id: "overview",
                    label: "Overview",
                    icon: <TrendingUp className="w-4 h-4" />,
                  },
                  {
                    id: "wishlist",
                    label: "Wishlist",
                    icon: <Heart className="w-4 h-4" />,
                  },
                  {
                    id: "purchases",
                    label: "My Projects",
                    icon: <Package className="w-4 h-4" />,
                  },
                  {
                    id: "account",
                    label: "Account",
                    icon: <User className="w-4 h-4" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    {(tab.id === "wishlist" || tab.id === "purchases") && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          activeTab === tab.id
                            ? "bg-[#051320]/20 text-[#051320]"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {tab.id === "wishlist"
                          ? wishlistProducts.length
                          : purchasedProducts.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Overview Tab */}
                {(activeTab === "overview" || window.innerWidth >= 768) && (
                  <div className="space-y-6">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-[#D9FDA3]/10 to-cyan-400/10 border border-[#D9FDA3]/20 rounded-2xl p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome to Your Dashboard
                          </h2>
                          <p className="text-gray-300">
                            Manage your wishlist, projects, and account settings
                            in one place.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                            <Calendar className="w-4 h-4 text-[#D9FDA3]" />
                            <span className="text-white text-sm">
                              {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Grid - Mobile Only */}
                    <div className="grid grid-cols-2 gap-4 lg:hidden">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm">
                              Wishlist
                            </div>
                            <div className="text-white font-bold text-lg">
                              {wishlistProducts.length}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm">
                              Projects
                            </div>
                            <div className="text-white font-bold text-lg">
                              {purchasedProducts.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Link
                        href={`/dashboard/${uid}#wishlist`}
                        className="group"
                      >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D9FDA3]/30 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 flex items-center justify-center">
                              <Heart className="w-6 h-6 text-red-400" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#D9FDA3] group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            My Wishlist
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {wishlistProducts.length} saved items
                          </p>
                        </div>
                      </Link>

                      <Link
                        href={`/dashboard/${uid}#purchases`}
                        className="group"
                      >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D9FDA3]/30 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-400" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#D9FDA3] group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            My Projects
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {purchasedProducts.length} purchased items
                          </p>
                        </div>
                      </Link>

                      <Link
                        href={`/dashboard/${uid}#account`}
                        className="group"
                      >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D9FDA3]/30 transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                              <Settings className="w-6 h-6 text-purple-400" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#D9FDA3] group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Account Settings
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Manage your profile and preferences
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Wishlist Tab */}
                {(activeTab === "wishlist" || window.innerWidth >= 768) && (
                  <div id="wishlist" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          My Wishlist
                        </h2>
                        <p className="text-gray-300">
                          Products you've saved for later
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                        {wishlistProducts.length} items
                      </span>
                    </div>

                    {wishlistLoading ? (
                      <div className="text-center py-12">
                        <SimpleLoader />
                      </div>
                    ) : wishlistProducts.length === 0 ? (
                      <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="text-gray-300 mb-6">
                          Save products you love by clicking the heart icon
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlistProducts.map((product) => (
                          <div key={product._id} className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D9FDA3]/30">
                              {/* Product Image */}
                              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                                {product.images?.[0] && (
                                  <img
                                    src={`${axiosInstance.defaults.baseURL}${product.images[0]}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Remove from wishlist button */}
                                <button
                                  onClick={() =>
                                    removeFromWishlist(product._id)
                                  }
                                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/20 transition-colors"
                                >
                                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                </button>
                              </div>

                              {/* Product Details */}
                              <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                                  {product.name}
                                </h3>
                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                  {product.description
                                    ?.replace(/<[^>]*>/g, "")
                                    .substring(0, 80)}
                                  ...
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="text-xl font-bold text-white">
                                    {formatPrice(product.price)}
                                  </div>
                                  <Link
                                    href={`/products/buy-now/${product._id}`}
                                  >
                                    <button className="px-4 py-2 bg-[#D9FDA3] text-[#051320] rounded-xl font-semibold hover:bg-[#D9FDA3]/90 transition-colors text-sm">
                                      Buy Now
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Purchases/Projects Tab */}
                {(activeTab === "purchases" || window.innerWidth >= 768) && (
                  <div id="purchases" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Projects
                        </h2>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                        {purchasedProducts.length} projects
                      </span>
                    </div>

                    {purchasedLoading ? (
                      <div className="text-center py-12">
                        <SimpleLoader />
                      </div>
                    ) : purchasedProducts.length === 0 ? (
                      <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          No projects yet
                        </h3>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {purchasedProducts.map((product, index) => (
                          <div key={product._id} className="group">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#D9FDA3]/30 transition-all duration-300">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                                      <Package className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-white">
                                          {product.name}
                                        </h3>
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-medium">
                                          Active
                                        </span>
                                      </div>
                                      <p className="text-gray-300 text-sm mt-1">
                                        Purchased on{" "}
                                        {new Date().toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                      <div className="text-gray-300 text-sm mb-1">
                                        Price
                                      </div>
                                      <div className="text-white font-bold">
                                        {formatPrice(product.price)}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-gray-300 text-sm mb-1">
                                        Status
                                      </div>
                                      <div className="text-green-400 font-medium">
                                        Completed
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-gray-300 text-sm mb-1">
                                        Updates
                                      </div>
                                      <div className="text-white font-bold">
                                        3
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-gray-300 text-sm mb-1">
                                        Support
                                      </div>
                                      <div className="text-blue-400 font-medium">
                                        Active
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <Link
                                    href={`/products/buy-now/${product._id}`}
                                  >
                                    <button className="px-4 py-2 cursor-pointer bg-[#D9FDA3] text-[#051320] rounded-xl font-semibold hover:bg-[#D9FDA3]/90 transition-colors text-sm w-full md:w-auto">
                                      View Project
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
