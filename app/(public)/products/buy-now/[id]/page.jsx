"use client";
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import axiosInstance from '@/app/lib/AxiosInstance/AxiosInstance';
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Clock,
  CreditCard,
  Headphones,
  Heart,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProductsBuyNowPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/products/${id}`);
      
      if (response.data.success) {
        setProduct(response.data.data);
        
        // Fetch related products
        fetchRelatedProducts(response.data.data.category);
        
        // Check if product is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
      } else {
        toast.error('Product not found');
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const response = await axiosInstance.get(`/products?category=${categoryId}&limit=4`);
      if (response.data.success) {
        setRelatedProducts(response.data.data.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart!', {
      icon: '🛒',
      style: {
        background: '#051320',
        color: '#D9FDA3',
        border: '1px solid #D9FDA3',
      }
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    handleAddToCart();
    
    // Create URL-friendly product name
    const productNameForURL = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
    
    // Navigate to checkout page with product name and ID
    router.push(`/checkout/${productNameForURL}/${id}`);
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.success('Removed from favorites');
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success('Added to favorites');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} on Backbencher Coder`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const calculateDiscount = () => {
    if (product?.originalPrice > product?.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const features = [
    { icon: <ShieldCheck className="w-5 h-5" />, text: '6 Months Free Service', color: 'text-green-400' },
    { icon: <Headphones className="w-5 h-5" />, text: '24/7 Support', color: 'text-amber-400' },
  ];

  // Function to get complete image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    const baseURL = axiosInstance.defaults.baseURL || 'http://localhost:5000';
    return `${baseURL}${imagePath}`;
  };

// Parse features array that might be stringified
const parseFeatures = (featuresArray) => {
  if (!featuresArray || !Array.isArray(featuresArray)) return [];
  
  console.log('Raw featuresArray:', featuresArray);
  
  try {
    // Step 1: Join all elements to recreate the original string
    const joinedString = featuresArray.join('');
    console.log('Joined string:', joinedString);
    
    // Step 2: Try to parse it step by step
    let currentString = joinedString;
    
    // Remove the outermost array brackets if present
    if (currentString.startsWith('[') && currentString.endsWith(']')) {
      currentString = currentString.slice(1, -1);
    }
    
    // The string should now be: "[\"hey\"", "\"hello\"", "\"hi\"]"
    // But with extra quotes and escapes
    
    // Try to parse it as JSON
    try {
      // First, let's clean up the string
      let cleaned = currentString
        .replace(/\\"/g, '"')  // Replace \" with "
        .replace(/^"/, '')     // Remove leading quote
        .replace(/"$/, '');    // Remove trailing quote
      
      console.log('Cleaned string:', cleaned);
      
      // Now cleaned should be: ["hey", "hello", "hi"]
      // Try to parse it
      const parsed = JSON.parse(cleaned);
      console.log('Parsed result:', parsed);
      
      if (Array.isArray(parsed)) {
        return parsed.filter(item => item && item.trim() !== '');
      }
    } catch (innerError) {
      console.error('Inner parse error:', innerError);
      
      // Alternative approach: extract text manually
      const regex = /"([^"\\]*(\\.[^"\\]*)*)"/g;
      const matches = [];
      let match;
      
      while ((match = regex.exec(joinedString)) !== null) {
        const value = match[1]
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t')
          .trim();
        
        if (value && value !== '[' && value !== ']') {
          matches.push(value);
        }
      }
      
      console.log('Manual extraction:', matches);
      return matches.filter(item => item && item.trim() !== '');
    }
    
  } catch (error) {
    console.error('Error parsing features array:', error);
  }
  
  // Fallback: return empty array
  return [];
};

  if (loading) {
    return <SimpleLoader />
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#051320] to-[#0a1a2d] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 text-xl mb-4">Product not found</p>
          <Link href="/products">
            <button className="px-6 py-3 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();
  const parsedFeatures = parseFeatures(product.features);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051320] to-[#0a1a2d] text-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-[#D9FDA3] truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={getImageUrl(product.images[selectedImage])}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-20 h-20 text-gray-400" />
                </div>
              )}
              
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}% OFF
                </div>
              )}
              
              {/* Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 pl-5">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#D9FDA3] scale-105' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image
                      src={getImageUrl(image)}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      unoptimized={process.env.NODE_ENV === 'development'}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-[#D9FDA3]">
                  ${product.price.toLocaleString()}
                </span>
                
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-bold">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-gray-300">Including all taxes</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Features & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className={feature.color}>
                      {feature.icon}
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleBuyNow}
                  className="flex cursor-pointer items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#D9FDA3] to-cyan-400 text-[#051320] font-semibold rounded-xl hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                >
                  <CreditCard className="w-5 h-5" />
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Estimated delivery: 2-4 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-white/10">
            <div className="flex space-x-8">
              <button className="py-4 border-b-2 border-[#D9FDA3] text-[#D9FDA3] font-semibold">
                Description
              </button>
            </div>
          </div>
          
          <div className="py-8">
            {/* Description with dangerouslySetInnerHTML */}
            <div className="prose prose-invert max-w-none">
              {product.description ? (
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-gray-300">No description available for this product.</p>
              )}
              
              {/* Key Features */}
              {parsedFeatures && parsedFeatures.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 text-white">Key Features</h4>
                  <ul className="space-y-3">
                    {parsedFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link href="/products" className="text-[#D9FDA3] hover:text-cyan-400 transition-colors flex items-center gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <div 
                  key={relatedProduct._id}
                  className="group bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden hover:border-[#D9FDA3]/30 transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/products/buy-now/${relatedProduct._id}`}>
                    <div className="relative h-48 overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={getImageUrl(relatedProduct.images[0])}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          unoptimized={process.env.NODE_ENV === 'development'}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 truncate">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[#D9FDA3] font-bold">
                          ${relatedProduct.price.toLocaleString()}
                        </span>
                        {relatedProduct.originalPrice > relatedProduct.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${relatedProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsBuyNowPage;