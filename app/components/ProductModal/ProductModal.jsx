// components/ProductModal.jsx
import { CheckCircle, Heart, Shield, ShoppingBag, Star, Truck, X, Zap } from 'lucide-react';
import { useEffect } from 'react';

const ProductModal = ({
  product,
  isOpen,
  onClose,
  getCategoryName,
  getBadgeInfo,
  getBadgeColor,
  getIcon,
  getGradientColor,
  formatPrice,
  calculateDiscount,
  isFavorite,
  onToggleFavorite,
  onBuyNow
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categoryName = getCategoryName(product.category);
  const badgeInfo = getBadgeInfo(product.badge);
  const badgeName = badgeInfo?.name || "Featured";
  const badgeColor = getBadgeColor(badgeName);
  const icon = getIcon(categoryName);
  const gradientColor = getGradientColor(categoryName);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const getFullIcon = (categoryName) => {
    const icons = {
      "Development Tool": <Zap className="w-8 h-8" />,
      "Design Software": <Zap className="w-8 h-8" />,
      "Security Service": <Shield className="w-8 h-8" />,
      "Hosting Service": <Truck className="w-8 h-8" />,
      "Backup Solution": <Shield className="w-8 h-8" />
    };
    return icons[categoryName] || <ShoppingBag className="w-8 h-8" />;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#051320] to-[#0a1a2d] rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                  <div className="text-white">
                    {getFullIcon(categoryName)}
                  </div>
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-gray-400 text-sm font-medium">
                    {categoryName}
                  </span>
                  {badgeInfo && (
                    <span className={`${badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                      {badgeName}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">4.5</span>
                    <span className="text-gray-400">(25 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={onToggleFavorite}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                
                <button 
                  onClick={onBuyNow}
                  className="px-6 py-3 bg-[#D9FDA3] text-[#051320] rounded-full font-semibold hover:bg-[#D9FDA3]/90 transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-white">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-gray-400 line-through text-xl">{formatPrice(product.originalPrice)}</span>
                        {discount > 0 && (
                          <span className="text-[#D9FDA3] font-semibold bg-[#D9FDA3]/10 px-3 py-1.5 rounded-full">
                            Save {discount}%
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">Including all taxes. No hidden fees.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <div 
                className="text-gray-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: product.description?.replace(/\[.*?\]/g, '') || "No description available" 
                }}
              />
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    typeof feature === 'string' && !feature.includes('[') && (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-[#D9FDA3] flex-shrink-0 mt-0.5" />
                        <span className="text-white text-sm">{feature}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="bg-white/5 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Category</div>
                  <div className="text-white font-medium">{categoryName}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Status</div>
                  <div className="text-[#D9FDA3] font-medium">In Stock</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Delivery</div>
                  <div className="text-white font-medium">Instant Download</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Support</div>
                  <div className="text-white font-medium">24/7 Email & Chat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;