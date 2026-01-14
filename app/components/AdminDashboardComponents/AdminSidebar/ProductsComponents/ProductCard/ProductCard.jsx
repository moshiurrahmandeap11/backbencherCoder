import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import { Edit, Eye, Package, Trash2 } from "lucide-react";

const ProductCard = ({ product, categories, badges, onView, onEdit, onDelete }) => {
  console.log(product.images[0]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getBadgeInfo = (badgeId) => {
    const badge = badges.find(b => b._id === badgeId);
    return badge || null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <img 
            src={`${axiosInstance.defaults.baseURL}${product.images[0]}`} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
              {getBadgeInfo(product.badge)?.name || "Sale"}
            </span>
          </div>
        )}
        
        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={() => onView(product)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description?.replace(/<[^>]*>/g, '').substring(0, 60)}...
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{getCategoryName(product.category)}</span>
          <span>{product.features?.length || 0} features</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;