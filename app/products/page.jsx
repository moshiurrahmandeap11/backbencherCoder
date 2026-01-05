"use client"
import { ArrowRight, CheckCircle, Eye, Heart, RefreshCw, Shield, ShoppingBag, Star, TrendingUp, Truck, Zap } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "CodeMaster Pro",
      category: "Development Tool",
      price: "$299",
      originalPrice: "$399",
      rating: 4.8,
      reviewCount: 124,
      description: "Advanced IDE with AI-powered code suggestions and real-time collaboration",
      features: ["AI Code Assistant", "Team Collaboration", "Cloud Sync", "100+ Plugins"],
      imageColor: "from-purple-500 to-pink-500",
      badge: "Best Seller",
      badgeColor: "bg-[#D9FDA3] text-[#051320]",
      icon: <Zap className="w-6 h-6" />,
      stock: 15
    },
    {
      id: 2,
      name: "Design Canvas X",
      category: "Design Software",
      price: "$199",
      originalPrice: "$249",
      rating: 4.6,
      reviewCount: 89,
      description: "Professional design tool with vector editing and prototyping capabilities",
      features: ["Vector Tools", "Prototyping", "Export Options", "Templates"],
      imageColor: "from-blue-500 to-cyan-500",
      badge: "Trending",
      badgeColor: "bg-red-500 text-white",
      icon: <TrendingUp className="w-6 h-6" />,
      stock: 25
    },
    {
      id: 3,
      name: "SecureVPN Plus",
      category: "Security Service",
      price: "$149",
      originalPrice: "$199",
      rating: 4.9,
      reviewCount: 256,
      description: "Military-grade encryption with unlimited bandwidth and global servers",
      features: ["No Logs", "Unlimited Bandwidth", "Global Servers", "Ad Blocker"],
      imageColor: "from-green-500 to-emerald-500",
      badge: "Most Secure",
      badgeColor: "bg-blue-500 text-white",
      icon: <Shield className="w-6 h-6" />,
      stock: 50
    },
    {
      id: 4,
      name: "SwiftHost Cloud",
      category: "Hosting Service",
      price: "$89",
      originalPrice: "$129",
      rating: 4.7,
      reviewCount: 187,
      description: "High-performance cloud hosting with 99.9% uptime guarantee",
      features: ["99.9% Uptime", "Free SSL", "CDN", "24/7 Support"],
      imageColor: "from-orange-500 to-yellow-500",
      badge: "Fast Delivery",
      badgeColor: "bg-[#D9FDA3] text-[#051320]",
      icon: <Truck className="w-6 h-6" />,
      stock: 10
    },
    {
      id: 5,
      name: "AutoBackup Pro",
      category: "Backup Solution",
      price: "$129",
      originalPrice: "$179",
      rating: 4.5,
      reviewCount: 76,
      description: "Automated cloud backup with version control and instant recovery",
      features: ["Auto Backup", "Version Control", "Instant Recovery", "Encrypted"],
      imageColor: "from-indigo-500 to-purple-500",
      badge: "New",
      badgeColor: "bg-[#051320] text-[#D9FDA3]",
      icon: <RefreshCw className="w-6 h-6" />,
      stock: 30
    }
  ];

  const filters = ["All", "Development", "Design", "Security", "Hosting", "Backup"];
  const [activeFilter, setActiveFilter] = useState("All");

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
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#D9FDA3]/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D9FDA3]/10">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${product.badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {product.badge}
                  </span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-red-500/20 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>

                {/* Product Image/Placeholder */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.imageColor} opacity-20`} />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                      <div className="text-white">
                        {product.icon}
                      </div>
                    </div>
                    
                    {/* Stock Indicator */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-white text-sm font-medium">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{product.rating}</span>
                      <span className="text-gray-400 text-sm">({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{product.price}</span>
                        <span className="text-gray-400 line-through">{product.originalPrice}</span>
                        <span className="text-[#D9FDA3] text-sm font-semibold bg-[#D9FDA3]/10 px-2 py-1 rounded">
                          Save ${parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))}
                        </span>
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
          ))}
        </div>

        {/* Fifth Product - Highlighted */}
        {products[4] && (
          <div className="mt-12">
            <div
              className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#051320] via-[#0a1a2d] to-[#051320] border border-white/10 p-8 md:p-12"
              onMouseEnter={() => setHoveredProduct(products[4].id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9FDA3]/10 border border-[#D9FDA3]/20 mb-6">
                    {products[4].icon}
                    <span className="text-[#D9FDA3] font-medium">Featured Product</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {products[4].name}
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-6">
                    {products[4].description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {products[4].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#D9FDA3]" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-white">{products[4].price}</span>
                        <span className="text-gray-400 line-through text-lg">{products[4].originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white">{products[4].rating}</span>
                        <span className="text-gray-400">({products[4].reviewCount} reviews)</span>
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${products[4].imageColor} opacity-20 rounded-2xl blur-3xl`} />
                  <div className="relative h-64 md:h-80 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      {products[4].icon}
                      <div className="text-white text-2xl font-bold mt-4">{products[4].name}</div>
                      <div className="text-[#D9FDA3] font-semibold mt-2">Limited Time Offer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="group px-8 py-3.5 bg-transparent border-2 border-[#D9FDA3] text-[#D9FDA3] rounded-full font-semibold hover:bg-[#D9FDA3] hover:text-[#051320] transition-all duration-300 flex items-center gap-3 mx-auto">
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;