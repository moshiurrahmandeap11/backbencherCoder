"use client"
import ProductModal from '@/app/components/ProductModal/ProductModal';
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import { Eye, Heart, Shield, ShoppingBag, Star, Truck, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("All");

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    if (savedFavorites) {
      setFavoriteProducts(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsResponse = await axiosInstance.get("/products");
        setProducts(productsResponse.data.data || []);
        
        // Fetch categories
        const categoriesResponse = await axiosInstance.get("/categories");
        setCategories(categoriesResponse.data.data || []);
        
        // Fetch badges
        const badgesResponse = await axiosInstance.get("/badges");
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
  }, []);

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
      "Featured": "bg-purple-500 text-white"
    };
    return colors[badgeName] || "bg-[#D9FDA3] text-[#051320]";
  };

  const getIcon = (categoryName) => {
    const icons = {
      "Development Tool": <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      "Design Software": <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      "Security Service": <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      "Hosting Service": <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      "Backup Solution": <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    };
    return icons[categoryName] || <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  };

  const getGradientColor = (categoryName) => {
    const colors = {
      "Development Tool": "from-purple-500 to-pink-500",
      "Design Software": "from-blue-500 to-cyan-500",
      "Security Service": "from-green-500 to-emerald-500",
      "Hosting Service": "from-orange-500 to-yellow-500",
      "Backup Solution": "from-indigo-500 to-purple-500"
    };
    return colors[categoryName] || "from-gray-500 to-gray-700";
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Toggle favorite
  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavoriteProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Handle quick view
  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle buy now
  const handleBuyNow = (productId, e) => {
    e.stopPropagation();
    router.push(`/products/buy-now/${productId}`);
  };

  // Filter products by category
  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(product => {
        const categoryName = getCategoryName(product.category);
        return categoryName === activeFilter;
      });

  // Get unique categories for filters
  const categoryFilters = ["All", ...new Set(categories.map(cat => cat.name).filter(Boolean))];

  // Get first 4 products for grid
  const firstFourProducts = filteredProducts.slice(0, 4);
  // Get the fifth product for highlighted section (if exists)
  const fifthProduct = filteredProducts[4];

  // Loading state
  if (loading) {
    return <SimpleLoader />
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <span className="text-red-400 text-sm font-medium">Error</span>
          </div>
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors text-sm sm:text-base"
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
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <ShoppingBag className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">No Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            No Products Available
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Check back soon for our latest products and services
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-3 sm:mb-4">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#D9FDA3]" />
              <span className="text-[#D9FDA3] text-xs sm:text-sm font-medium">Premium Products</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Products</span>
            </h2>
            
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2">
              Carefully curated tools and services to boost your productivity and efficiency
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12 px-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[#D9FDA3] text-[#051320] shadow-lg shadow-[#D9FDA3]/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {firstFourProducts.map((product) => {
              const categoryName = getCategoryName(product.category);
              const badgeInfo = getBadgeInfo(product.badge);
              const badgeName = badgeInfo?.name || "Featured";
              const badgeColor = getBadgeColor(badgeName);
              const icon = getIcon(categoryName);
              const gradientColor = getGradientColor(categoryName);
              const discount = calculateDiscount(product.price, product.originalPrice);
              const isFavorite = favoriteProducts.includes(product._id);
              
              return (
                <div
                  key={product._id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Card */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#D9FDA3]/30 hover:scale-[1.02] hover:shadow-xl sm:hover:shadow-2xl hover:shadow-[#D9FDA3]/10 h-full flex flex-col">
                    {/* Badge */}
                    {badgeInfo && (
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                        <span className={`${badgeColor} px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold`}>
                          {badgeName}
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => toggleFavorite(product._id, e)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/20 transition-colors"
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Product Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-20`} />
                      <div className="relative h-full flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                          <div className="text-white">
                            {icon}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      {/* Category */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-xs sm:text-sm font-medium">
                          {categoryName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-semibold text-sm sm:text-base">4.5</span>
                          <span className="text-gray-400 text-xs sm:text-sm">(25)</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p 
                        className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-grow"
                        dangerouslySetInnerHTML={{ 
                          __html: product.description?.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '').substring(0, 80) + '...' || "No description available" 
                        }}
                      />

                      {/* Price and Action Buttons */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">{formatPrice(product.price)}</span>
                              {product.originalPrice > product.price && (
                                <>
                                  <span className="text-gray-400 line-through text-sm sm:text-base">{formatPrice(product.originalPrice)}</span>
                                  {discount > 0 && (
                                    <span className="text-[#D9FDA3] text-xs sm:text-sm font-semibold bg-[#D9FDA3]/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                                      Save {discount}%
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2">
                            {/* Quick View */}
                            <button 
                              onClick={(e) => handleQuickView(product, e)}
                              className="p-1.5 sm:p-2 md:p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-white" />
                            </button>
                            
                            {/* Buy Now Button */}
                            <button 
                              onClick={(e) => handleBuyNow(product._id, e)}
                              className="px-3 py-1.5 sm:px-4 sm:py-2.5 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-all duration-300 flex items-center gap-1 sm:gap-2 group text-xs sm:text-sm"
                            >
                              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Buy Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fifth Product - Highlighted */}
          {fifthProduct && (
            <div className="mt-8 sm:mt-12">
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10 p-6 sm:p-8 md:p-12"
                onMouseEnter={() => setHoveredProduct(fifthProduct._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  {/* Left Side - Content */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4 sm:mb-6">
                      {getIcon(getCategoryName(fifthProduct.category))}
                      <span className="text-[#D9FDA3] font-medium text-sm sm:text-base">Featured Product</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                      {fifthProduct.name}
                    </h3>
                    
                    <p 
                      className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6"
                      dangerouslySetInnerHTML={{ 
                        __html: fifthProduct.description?.replace(/<[^>]*>/g, '').replace(/\[.*?\]/g, '') || "No description available" 
                      }}
                    />
                    
                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                      <div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{formatPrice(fifthProduct.price)}</span>
                          {fifthProduct.originalPrice > fifthProduct.price && (
                            <span className="text-gray-400 line-through text-base sm:text-lg">{formatPrice(fifthProduct.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 mt-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white text-sm sm:text-base">4.5</span>
                          <span className="text-gray-400 text-xs sm:text-sm">(25 reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => handleQuickView(fifthProduct, e)}
                          className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" />
                        </button>
                        
                        <button 
                          onClick={(e) => handleBuyNow(fifthProduct._id, e)}
                          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                        >
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Buy Now</span>
                        </button>
                        
                        <button 
                          onClick={(e) => toggleFavorite(fifthProduct._id, e)}
                          className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 transition-colors"
                        >
                          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favoriteProducts.includes(fifthProduct._id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Visual */}
                  <div className="relative mt-6 lg:mt-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(getCategoryName(fifthProduct.category))} opacity-20 rounded-xl sm:rounded-2xl blur-3xl`} />
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                          {getIcon(getCategoryName(fifthProduct.category))}
                        </div>
                        <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">{fifthProduct.name}</div>
                        <div className="text-[#D9FDA3] font-semibold text-sm sm:text-base mt-2">Limited Time Offer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          getCategoryName={getCategoryName}
          getBadgeInfo={getBadgeInfo}
          getBadgeColor={getBadgeColor}
          getIcon={getIcon}
          getGradientColor={getGradientColor}
          formatPrice={formatPrice}
          calculateDiscount={calculateDiscount}
          isFavorite={favoriteProducts.includes(selectedProduct._id)}
          onToggleFavorite={(e) => toggleFavorite(selectedProduct._id, e)}
          onBuyNow={(e) => handleBuyNow(selectedProduct._id, e)}
        />
      )}
    </>
  );
};

export default Products;