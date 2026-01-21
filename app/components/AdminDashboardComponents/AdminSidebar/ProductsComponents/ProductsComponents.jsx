import SimpleLoader from "@/app/components/sharedItems/SimpleLoader/SimpleLoader";
import axiosInstance from "@/app/lib/AxiosInstance/AxiosInstance";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddBadgeModal from "./AddBadgeModal/AddBadgeModal";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal";
import AddProductModal from "./AddProductsModal/AddProductsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import EditBadgeModal from "./EditBadgeModal/EditBadgeModal";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";
import EditProductModal from "./EditProductsModal/EditProductsModal";
import ProductCard from "./ProductCard/ProductCard";
import ProductTable from "./ProductsTable/ProductsTable";
import ProductViewModal from "./ProductViewModal/ProductViewModal";

const ProductsComponents = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal States
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showAddBadge, setShowAddBadge] = useState(false);
  const [showEditBadge, setShowEditBadge] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch Data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [productsRes, categoriesRes, badgesRes] = await Promise.all([
        axiosInstance.get("/products"),
        axiosInstance.get("/categories"),
        axiosInstance.get("/badges"),
      ]);

      setProducts(productsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
      setBadges(badgesRes.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter & Sort Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === "all" ||
      product.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Product CRUD Operations
  const handleAddProduct = async (productData, images) => {
    try {
      setActionLoading(true);

      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "features" && Array.isArray(productData[key])) {
          // Array এর প্রতিটি element আলাদা আলাদা append করুন
          productData[key].forEach((feature, index) => {
            formData.append(`features[${index}]`, feature);
          });
        } else if (key !== "images") {
          formData.append(key, productData[key]);
        }
      });

      // Append images
      if (images && images.length > 0) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }

      await axiosInstance.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchAllData();
      setShowAddProduct(false);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProduct = async (productId, productData, newImages) => {
    try {
      setActionLoading(true);

      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "features" && Array.isArray(productData[key])) {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (key !== "images" && key !== "deleteImages") {
          formData.append(key, productData[key]);
        }
      });

      // Append new images
      if (newImages && newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append("images", image);
        });
      }

      await axiosInstance.put(`/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchAllData();
      setShowEditProduct(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/products/${selectedProduct._id}`);
      await fetchAllData();
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setActionLoading(false);
    }
  };

  // Category Operations
  const handleAddCategory = async (categoryData) => {
    try {
      setActionLoading(true);
      await axiosInstance.post("/categories", categoryData);
      await fetchAllData();
      setShowAddCategory(false);
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCategory = async (categoryId, categoryData) => {
    try {
      setActionLoading(true);
      await axiosInstance.put(`/categories/${categoryId}`, categoryData);
      await fetchAllData();
      setShowEditCategory(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Failed to update category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/categories/${selectedCategory._id}`);
      await fetchAllData();
      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category");
    } finally {
      setActionLoading(false);
    }
  };

  // Badge Operations
  const handleAddBadge = async (badgeData) => {
    try {
      setActionLoading(true);
      await axiosInstance.post("/badges", badgeData);
      await fetchAllData();
      setShowAddBadge(false);
    } catch (err) {
      console.error("Error adding badge:", err);
      alert("Failed to add badge");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditBadge = async (badgeId, badgeData) => {
    try {
      setActionLoading(true);
      await axiosInstance.put(`/badges/${badgeId}`, badgeData);
      await fetchAllData();
      setShowEditBadge(false);
      setSelectedBadge(null);
    } catch (err) {
      console.error("Error updating badge:", err);
      alert("Failed to update badge");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBadge = async () => {
    try {
      setActionLoading(true);
      await axiosInstance.delete(`/badges/${selectedBadge._id}`);
      await fetchAllData();
      setShowDeleteModal(false);
      setSelectedBadge(null);
    } catch (err) {
      console.error("Error deleting badge:", err);
      alert("Failed to delete badge");
    } finally {
      setActionLoading(false);
    }
  };

  // Event Handlers
  const openEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const openEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditCategory(true);
  };

  const openEditBadge = (badge) => {
    setSelectedBadge(badge);
    setShowEditBadge(true);
  };

  const openDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const openDeleteCategory = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const openDeleteBadge = (badge) => {
    setSelectedBadge(badge);
    setShowDeleteModal(true);
  };

  const openViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  // Loading State
  if (loading) {
    return <SimpleLoader />;
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Products
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">
            {products.length} products • {filteredProducts.length} filtered
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddBadge(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Badge
          </button>
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Category
          </button>
          <button
            onClick={() => setShowAddProduct(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={fetchAllData}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search"
                : "Add your first product"}
            </p>
          </div>
        ) : (
          currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              categories={categories}
              badges={badges}
              onView={openViewProduct}
              onEdit={openEditProduct}
              onDelete={openDeleteProduct}
            />
          ))
        )}
      </div>

      {/* Products Table - Desktop */}
      <div className="hidden lg:block">
        <ProductTable
          products={currentProducts}
          categories={categories}
          badges={badges}
          onView={openViewProduct}
          onEdit={openEditProduct}
          onDelete={openDeleteProduct}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedProducts.length)} of{" "}
            {sortedProducts.length} products
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddProductModal
        show={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSubmit={handleAddProduct}
        categories={categories}
        badges={badges}
        loading={actionLoading}
      />

      <EditProductModal
        show={showEditProduct}
        onClose={() => setShowEditProduct(false)}
        onSubmit={handleEditProduct}
        product={selectedProduct}
        categories={categories}
        badges={badges}
        loading={actionLoading}
      />

      <AddCategoryModal
        show={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSubmit={handleAddCategory}
        loading={actionLoading}
      />

      <EditCategoryModal
        show={showEditCategory}
        onClose={() => setShowEditCategory(false)}
        onSubmit={handleEditCategory}
        category={selectedCategory}
        loading={actionLoading}
      />

      <AddBadgeModal
        show={showAddBadge}
        onClose={() => setShowAddBadge(false)}
        onSubmit={handleAddBadge}
        loading={actionLoading}
      />

      <EditBadgeModal
        show={showEditBadge}
        onClose={() => setShowEditBadge(false)}
        onSubmit={handleEditBadge}
        badge={selectedBadge}
        loading={actionLoading}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (selectedProduct) handleDeleteProduct();
          if (selectedCategory) handleDeleteCategory();
          if (selectedBadge) handleDeleteBadge();
        }}
        title={
          selectedProduct
            ? "Delete Product"
            : selectedCategory
              ? "Delete Category"
              : "Delete Badge"
        }
        itemName={
          selectedProduct?.name || selectedCategory?.name || selectedBadge?.name
        }
        message="This action cannot be undone."
        loading={actionLoading}
      />

      <ProductViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        product={selectedProduct}
        categories={categories}
        badges={badges}
      />
    </div>
  );
};

export default ProductsComponents;
