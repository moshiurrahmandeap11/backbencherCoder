"use client"
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import { CheckCircle, Eye, Heart, RefreshCw, Shield, ShoppingBag, Star, TrendingUp, Truck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ["All", "Development", "Design", "Security", "Hosting", "Backup"];
  const [activeFilter, setActiveFilter] = useState("All");

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
      "New": "bg-[#051320] text-[#D9FDA3]"
    };
    return colors[badgeName] || "bg-[#D9FDA3] text-[#051320]";
  };

  const getIcon = (categoryName) => {
    const icons = {
      "Development Tool": <Zap className="w-6 h-6" />,
      "Design Software": <TrendingUp className="w-6 h-6" />,
      "Security Service": <Shield className="w-6 h-6" />,
      "Hosting Service": <Truck className="w-6 h-6" />,
      "Backup Solution": <RefreshCw className="w-6 h-6" />
    };
    return icons[categoryName] || <ShoppingBag className="w-6 h-6" />;
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
      currency: 'USD'
    }).format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
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
          <p className="text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors"
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

  // Get first 4 products for grid
  const firstFourProducts = products.slice(0, 4);
  // Get the fifth product for highlighted section (if exists)
  const fifthProduct = products[4];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#051320] via-[#0a1a2d] to-[#051320]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-4">
            <Zap className="w-4 h-4 text-[#D9FDA3]" />
            <span className="text-[#D9FDA3] text-sm font-medium">Premium Products</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Discover Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9FDA3] to-cyan-400">Products</span>
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Carefully curated tools and services to boost your productivity and efficiency
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {firstFourProducts.map((product) => {
            const categoryName = getCategoryName(product.category);
            const badgeInfo = getBadgeInfo(product.badge);
            const badgeName = badgeInfo?.name || "Featured";
            const badgeColor = getBadgeColor(badgeName);
            const icon = getIcon(categoryName);
            const gradientColor = getGradientColor(categoryName);
            const discount = calculateDiscount(product.price, product.originalPrice);
            
            return (
              <div
                key={product._id}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#D9FDA3]/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9FDA3]/10">
                  {/* Badge */}
                  {badgeInfo && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`${badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {badgeName}
                      </span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/20 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>

                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                    {product.images && product.images.length > 0 ? (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-20`} />
                        <img 
                          src={`${axiosInstance.defaults.baseURL}${product.images[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                          }}
                        />
                      </>
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-20`} />
                    )}
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                        <div className="text-white">
                          {icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm font-medium">
                        {categoryName}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">4.5</span>
                        <span className="text-gray-400 text-sm">(25)</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-gray-300 text-sm mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: product.description?.replace(/<[^>]*>/g, '').substring(0, 100) || "No description available" 
                      }}
                    />

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                            >
                              {typeof feature === 'string' ? feature.substring(0, 15) : 'Feature'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <>
                              <span className="text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                              {discount > 0 && (
                                <span className="text-[#D9FDA3] text-sm font-semibold bg-[#D9FDA3]/10 px-2 py-1 rounded">
                                  Save {discount}%
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick View */}
                        <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors group">
                          <Eye className="w-5 h-5 text-gray-300 group-hover:text-white" />
                        </button>
                        
                        {/* Add to Cart */}
                        <button className="px-4 py-2.5 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-all duration-300 flex items-center gap-2 group">
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add</span>
                        </button>
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
          <div className="mt-12">
            <div
              className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10 p-8 md:p-12"
              onMouseEnter={() => setHoveredProduct(fifthProduct._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-6">
                    {getIcon(getCategoryName(fifthProduct.category))}
                    <span className="text-[#D9FDA3] font-medium">Featured Product</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {fifthProduct.name}
                  </h3>
                  
                  <p 
                    className="text-gray-300 text-lg mb-6"
                    dangerouslySetInnerHTML={{ 
                      __html: fifthProduct.description?.replace(/<[^>]*>/g, '') || "No description available" 
                    }}
                  />
                  
                  {fifthProduct.features && fifthProduct.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {fifthProduct.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#D9FDA3]" />
                          <span className="text-white">{typeof feature === 'string' ? feature.substring(0, 20) : 'Feature'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-white">{formatPrice(fifthProduct.price)}</span>
                        {fifthProduct.originalPrice > fifthProduct.price && (
                          <span className="text-gray-400 line-through text-lg">{formatPrice(fifthProduct.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white">4.5</span>
                        <span className="text-gray-400">(25 reviews)</span>
                      </div>
                    </div>
                    
                    <button className="px-8 py-3 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5" />
                      <span>Get Started Now</span>
                    </button>
                  </div>
                </div>
                
                {/* Right Side - Visual */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(getCategoryName(fifthProduct.category))} opacity-20 rounded-2xl blur-3xl`} />
                  <div className="relative h-64 md:h-80 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                    {fifthProduct.images && fifthProduct.images.length > 0 ? (
                      <img 
                        src={`${axiosInstance.defaults.baseURL}${fifthProduct.images[0]}`}
                        alt={fifthProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          // Show fallback
                          e.target.parentElement.innerHTML = `
                            <div class="text-center">
                              ${getIcon(getCategoryName(fifthProduct.category)).outerHTML || ''}
                              <div class="text-white text-2xl font-bold mt-4">${fifthProduct.name}</div>
                              <div class="text-[#D9FDA3] font-semibold mt-2">Limited Time Offer</div>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="text-center">
                        {getIcon(getCategoryName(fifthProduct.category))}
                        <div className="text-white text-2xl font-bold mt-4">{fifthProduct.name}</div>
                        <div className="text-[#D9FDA3] font-semibold mt-2">Limited Time Offer</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;