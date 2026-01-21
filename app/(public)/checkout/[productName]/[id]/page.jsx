"use client";
import SimpleLoader from '@/app/components/sharedItems/SimpleLoader/SimpleLoader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CheckoutPage = () => {
    const { productName, id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // URL থেকে product name এবং id পাওয়া গেছে
        console.log('Product Name:', productName);
        console.log('Product ID:', id);
        
        // যদি কোনো কারণে id না থাকে তবে products page-এ redirect
        if (!id) {
            router.push('/products');
            return;
        }
        
        setLoading(false);
    }, [productName, id, router]);

    if (loading) {
        return <SimpleLoader />
    }

    return (
        <div className="min-h-screen mt-20 bg-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Checkout
                    </h1>
                    <p className="text-gray-600">
                        Completing your purchase for: <span className="font-semibold text-blue-600">{decodeURIComponent(productName || '')}</span>
                    </p>
                </div>

                {/* Product Info Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-500 mb-1">Product Name</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {productName ? decodeURIComponent(productName).replace(/-/g, ' ') : 'N/A'}
                                </p>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-sm font-medium text-gray-500 mb-1">Product ID</p>
                                <p className="text-lg font-mono text-gray-700 bg-gray-50 p-2 rounded">
                                    {id || 'N/A'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-medium text-gray-700 mb-2">URL Parameters</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Path:</span>
                                    <code className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                        /checkout/{productName}/{id}
                                    </code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Decoded Name:</span>
                                    <span className="text-sm font-medium">
                                        {productName ? decodeURIComponent(productName) : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Form Placeholder */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Checkout Form</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipping Address
                            </label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                                placeholder="Enter your shipping address"
                            />
                        </div>
                        
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600">Product: {productName ? decodeURIComponent(productName).replace(/-/g, ' ') : 'Unknown'}</p>
                                <p className="text-xs text-gray-500">ID: {id || 'Unknown'}</p>
                            </div>
                            
                            <button
                                onClick={() => router.push('/products')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                </div>

                {/* Debug Info (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-gray-900 text-white rounded-lg">
                        <h3 className="font-medium mb-2">Debug Information</h3>
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify({
                                productName,
                                id,
                                decodedName: productName ? decodeURIComponent(productName) : null,
                                formattedName: productName ? decodeURIComponent(productName).replace(/-/g, ' ') : null,
                                path: `/checkout/${productName}/${id}`
                            }, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;