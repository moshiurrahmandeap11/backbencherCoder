"use client"
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import { ArrowRight, CheckCircle, Eye, Heart, RefreshCw, Shield, ShoppingBag, Star, TrendingUp, Truck, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SimpleLoader from '../../sharedItems/SimpleLoader/SimpleLoader';

const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Parse features from string/array - Fixed version
  const parseFeatures = (features) => {
    if (!features) return [];
    
    try {
      // Case 1: Already an array
      if (Array.isArray(features)) {
        return features.map(item => {
          // If item is string, clean it
          if (typeof item === 'string') {
            let cleaned = item.trim();
            // Remove surrounding quotes and brackets
            cleaned = cleaned.replace(/^["'\[\(\{]+|["'\]\)\}]+$/g, '');
            return cleaned.trim();
          }
          // Convert non-string to string
          return String(item).trim();
        }).filter(item => {
          // Filter out empty strings and unwanted characters
          const itemStr = String(item).trim();
          return itemStr.length > 0 && 
                 itemStr !== '[' && 
                 itemStr !== ']' && 
                 itemStr !== '"' && 
                 itemStr !== "'";
        });
      }
      
      // Case 2: String that might be JSON or comma-separated
      if (typeof features === 'string') {
        let cleaned = features.trim();
        
        // Try to parse as JSON first
        if (cleaned.startsWith('[') || cleaned.startsWith('{')) {
          try {
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) {
              return parsed.map(item => {
                if (typeof item === 'string') {
                  return item.trim().replace(/^["']+|["']+$/g, '');
                }
                return String(item).trim();
              }).filter(item => item.length > 0);
            }
          } catch {
            // If JSON parsing fails, continue with string processing
          }
        }
        
        // Handle comma-separated string
        // Remove all brackets and quotes first
        cleaned = cleaned.replace(/[\[\]{}()]/g, '');
        cleaned = cleaned.replace(/["']/g, '');
        
        // Split by comma and clean
        return cleaned
          .split(',')
          .map(item => item.trim())
          .filter(item => {
            return item.length > 0 && 
                   !['[', ']', '{', '}', '(', ')', '"', "'"].includes(item);
          });
      }
      
      return [];
    } catch (err) {
      console.error('Error parsing features:', err);
      return [];
    }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel for better performance
        const [productsResponse, categoriesResponse, badgesResponse] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get("/categories"),
          axiosInstance.get("/badges")
        ]);
        
        // Pre-process products to fix features
        const processedProducts = (productsResponse.data.data || []).map(product => ({
          ...product,
          // Clean features at fetch time
          features: parseFeatures(product.features)
        }));
        
        setProducts(processedProducts);
        setCategories(categoriesResponse.data.data || []);
        setBadges(badgesResponse.data.data || []);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    loadLikedProducts();
  }, []);

  // Load liked products from localStorage
  const loadLikedProducts = () => {
    try {
      const saved = localStorage.getItem('likedProducts');
      if (saved) {
        setLikedProducts(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading liked products:', err);
    }
  };

  // Save liked products to localStorage
  const saveLikedProducts = (ids) => {
    try {
      localStorage.setItem('likedProducts', JSON.stringify(ids));
    } catch (err) {
      console.error('Error saving liked products:', err);
    }
  };

  // Toggle product like
  const toggleLike = (productId, e) => {
    e?.stopPropagation();
    let updatedLikes;
    
    if (likedProducts.includes(productId)) {
      updatedLikes = likedProducts.filter(id => id !== productId);
    } else {
      updatedLikes = [...likedProducts, productId];
    }
    
    setLikedProducts(updatedLikes);
    saveLikedProducts(updatedLikes);
  };

  // Open product details modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Helper functions
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getBadgeInfo = (badgeId) => {
    if (!badgeId) return null;
    const badge = badges.find(b => b._id === badgeId);
    return badge || null;
  };

  const getBadgeColor = (badgeName) => {
    const colors = {
      "Best Seller": "bg-[#D9FDA3] text-[#051320]",
      "Trending": "bg-red-500 text-white",
      "Most Secure": "bg-blue-500 text-white",
      "Fast Delivery": "bg-[#D9FDA3] text-[#051320]",
      "New": "bg-[#051320] text-[#D9FDA3]",
      "Featured": "bg-purple-500 text-white",
      "Limited": "bg-orange-500 text-white"
    };
    return colors[badgeName] || "bg-[#D9FDA3] text-[#051320]";
  };

  const getIcon = (categoryName) => {
    const icons = {
      "Development Tool": <Zap className="w-5 h-5 md:w-6 md:h-6" />,
      "Design Software": <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      "Security Service": <Shield className="w-5 h-5 md:w-6 md:h-6" />,
      "Hosting Service": <Truck className="w-5 h-5 md:w-6 md:h-6" />,
      "Backup Solution": <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
    };
    return icons[categoryName] || <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />;
  };

  const getGradientColor = (categoryName) => {
    const colors = {
      "Development Tool": "from-purple-500/20 to-pink-500/20",
      "Design Software": "from-blue-500/20 to-cyan-500/20",
      "Security Service": "from-green-500/20 to-emerald-500/20",
      "Hosting Service": "from-orange-500/20 to-yellow-500/20",
      "Backup Solution": "from-indigo-500/20 to-purple-500/20"
    };
    return colors[categoryName] || "from-gray-500/20 to-gray-700/20";
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return "$0.00";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price || originalPrice === 0) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Clean HTML description
  const cleanDescription = (html) => {
    if (!html) return "No description available";
    return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  };

  // Loading state
  if (loading) {
    return <SimpleLoader />
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-red-400 text-sm font-medium">Error</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Failed to Load Products</h3>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // If no products
  if (products.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <ShoppingBag className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">No Products</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            No Products Available
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Check back soon for our latest products and services
          </p>
        </div>
      </section>
    );
  }

  // Get products for display
  const firstFourProducts = products.slice(0, 4);
  const fifthProduct = products[4];

  // Product Card Component
  const ProductCard = ({ product }) => {
    const categoryName = getCategoryName(product.category);
    const badgeInfo = getBadgeInfo(product.badge);
    const badgeName = badgeInfo?.name || "Featured";
    const badgeColor = getBadgeColor(badgeName);
    const icon = getIcon(categoryName);
    const gradientColor = getGradientColor(categoryName);
    const discount = calculateDiscount(product.price, product.originalPrice);
    const isLiked = likedProducts.includes(product._id);
    // No need to parse again, already processed
    const productFeatures = product.features || [];

    return (
      <div
        className="group relative"
        onMouseEnter={() => !isMobile && setHoveredProduct(product._id)}
        onMouseLeave={() => !isMobile && setHoveredProduct(null)}
      >
        {/* Product Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#D9FDA3]/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D9FDA3]/5">
          {/* Badge */}
          {badgeInfo && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
              <span className={`${badgeColor} px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold`}>
                {badgeName}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button 
            onClick={(e) => toggleLike(product._id, e)}
            className="absolute cursor-pointer top-3 right-3 md:top-4 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/20 transition-colors"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Product Image */}
          <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            {product.images?.[0] ? (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor}`} />
                <img 
                  src={`${axiosInstance.defaults.baseURL}${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor}`} />
            )}
            <div className="relative h-full flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <div className="text-white">
                  {icon}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 md:p-6">
            {/* Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                {categoryName}
              </span>
            </div>

            {/* Product Name */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 min-h-[40px]">
              {cleanDescription(product.description)}
            </p>

            {/* Features */}
            {productFeatures.length > 0 && (
              <div className="mb-4 md:mb-6">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {productFeatures.slice(0, isMobile ? 2 : 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                      title={feature}
                    >
                      {feature.length > (isMobile ? 12 : 15) 
                        ? `${feature.substring(0, isMobile ? 12 : 15)}...` 
                        : feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-gray-400 text-sm line-through hidden sm:block">
                        {formatPrice(product.originalPrice)}
                      </span>
                      {discount > 0 && (
                        <span className="text-[#D9FDA3] text-xs font-semibold bg-[#D9FDA3]/10 px-2 py-1 rounded">
                          -{discount}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Quick View */}
                <button 
                  onClick={() => openProductModal(product)}
                  className="p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Quick view"
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                </button>
                
                {/* Buy Now Button */}
                <Link href={`/products/buy-now/${product._id}`} className="flex-1">
                  <button className="px-3 md:px-4 py-2 md:py-2.5 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 min-w-[100px]">
                    <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">Buy</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Product Details Modal
  const ProductDetailsModal = () => {
    if (!selectedProduct) return null;

    const categoryName = getCategoryName(selectedProduct.category);
    const badgeInfo = getBadgeInfo(selectedProduct.badge);
    const badgeName = badgeInfo?.name || "Featured";
    const badgeColor = getBadgeColor(badgeName);
    const icon = getIcon(categoryName);
    const discount = calculateDiscount(selectedProduct.price, selectedProduct.originalPrice);
    const isLiked = likedProducts.includes(selectedProduct._id);
    // No need to parse again, already processed
    const productFeatures = selectedProduct.features || [];

    return (
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4"
        onClick={closeModal}
      >
        <div 
          className="bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D9FDA3]/10 to-cyan-400/10 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-1">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1">
                    {badgeInfo && (
                      <span className={`${badgeColor} px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold`}>
                        {badgeName}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs md:text-sm">{categoryName}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <button 
                  onClick={(e) => toggleLike(selectedProduct._id, e)}
                  className="p-1.5 md:p-2 cursor-pointer rounded-full bg-white/5 hover:bg-red-500/20 transition-colors"
                  aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button 
                  onClick={closeModal}
                  className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Product Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Left Column - Images */}
              <div>
                <div className="rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black mb-3 md:mb-4">
                  {selectedProduct.images?.[0] ? (
                    <img 
                      src={`${axiosInstance.defaults.baseURL}${selectedProduct.images[0]}`}
                      alt={selectedProduct.name}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-56 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.slice(1, 5).map((image, index) => (
                      <img
                        key={index}
                        src={`${axiosInstance.defaults.baseURL}${image}`}
                        alt={`${selectedProduct.name} - ${index + 1}`}
                        className="h-16 md:h-20 w-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-4 md:space-y-6">
                {/* Price Section */}
                <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {formatPrice(selectedProduct.price)}
                      </div>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 text-sm line-through">
                            {formatPrice(selectedProduct.originalPrice)}
                          </span>
                          {discount > 0 && (
                            <span className="text-[#D9FDA3] font-semibold bg-[#D9FDA3]/10 px-2 py-1 rounded-full text-sm">
                              Save {discount}%
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link href={`/products/buy-now/${selectedProduct._id}`} className="block">
                    <button className="w-full py-2.5 md:py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] rounded-lg md:rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D9FDA3]/20 transition-all duration-300 text-sm md:text-base">
                      Buy Now
                    </button>
                  </Link>
                </div>

                {/* Features */}
                {productFeatures.length > 0 && (
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Features</h3>
                    <div className="space-y-1.5 md:space-y-2">
                      {productFeatures.slice(0, 5).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 md:p-3 rounded-lg bg-white/5">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#D9FDA3] shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Description</h3>
                  <div 
                    className="text-gray-300 text-sm md:text-base"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedProduct.description || "No description available" 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-3 md:mb-4">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D9FDA3]" />
              <span className="text-[#D9FDA3] text-xs md:text-sm font-medium">Premium Products</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
              Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Products</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Explore our curated collection of premium digital products and services
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {firstFourProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Fifth Product - Highlighted */}
          {fifthProduct && (
            <div className="mt-8 md:mt-12">
              <div
                className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10 p-4 md:p-6 lg:p-8"
                onMouseEnter={() => !isMobile && setHoveredProduct(fifthProduct._id)}
                onMouseLeave={() => !isMobile && setHoveredProduct(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  {/* Left Side - Content */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4 md:mb-6">
                      {getIcon(getCategoryName(fifthProduct.category))}
                      <span className="text-[#D9FDA3] text-xs md:text-sm font-medium">Featured Product</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                      {fifthProduct.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
                      {cleanDescription(fifthProduct.description)}
                    </p>
                    
                    {fifthProduct.features && fifthProduct.features.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8">
                        {fifthProduct.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#D9FDA3] shrink-0" />
                            <span className="text-white text-sm md:text-base truncate" title={feature}>
                              {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {formatPrice(fifthProduct.price)}
                          </span>
                          {fifthProduct.originalPrice > fifthProduct.price && (
                            <span className="text-gray-400 text-base line-through">
                              {formatPrice(fifthProduct.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 md:mt-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white text-sm">4.5</span>
                          <span className="text-gray-400 text-sm">(25 reviews)</span>
                        </div>
                      </div>
                      
                      <Link href={`/products/buy-now/${fifthProduct._id}`} className="sm:flex-1 max-w-xs">
                        <button className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 md:gap-3">
                          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base">Buy Now</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Right Side - Visual */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(getCategoryName(fifthProduct.category))} opacity-20 rounded-xl md:rounded-2xl blur-xl`} />
                    <div className="relative h-48 md:h-64 lg:h-80 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                      {fifthProduct.images?.[0] ? (
                        <img 
                          src={`${axiosInstance.defaults.baseURL}${fifthProduct.images[0]}`}
                          alt={fifthProduct.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center p-4">
                          {getIcon(getCategoryName(fifthProduct.category))}
                          <div className="text-white text-lg md:text-xl font-bold mt-4">{fifthProduct.name}</div>
                          <div className="text-[#D9FDA3] font-semibold mt-2 text-sm md:text-base">Limited Time Offer</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View All Button */}
          {products.length > 5 && (
            <div className="text-center mt-8 md:mt-12">
              <Link href="/products">
                <button className="group cursor-pointer px-6 md:px-8 py-2.5 md:py-3.5 bg-transparent border border-[#D9FDA3] text-[#D9FDA3] rounded-full font-semibold hover:bg-[#D9FDA3] hover:text-[#051320] transition-all duration-300 flex items-center gap-2 md:gap-3 mx-auto">
                  <span className="text-sm md:text-base">View All Products</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {showModal && <ProductDetailsModal />}
    </>
  );
};

export default Products;